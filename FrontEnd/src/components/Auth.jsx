import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Register from '../pages/Register';
import Login from '../pages/Login';
import LoginImage from '../Assets/LoginImage.svg'
import { Link, useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import Header from './Header';
import { loginAPI, registerAPI } from '../services/allAPIs';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastConfig = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
    }

function Auth({register}) {
    const registerForm = register?true:false;
    const [user,setUser] = useState({username:"",email:"",password:""})
    const navigate = useNavigate()
    // handle onchange
    const handleChange =(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    // handling register onclick
    const handleRegister = async (e) => {
        e.preventDefault();
        if (user.username !== "" && user.email !== "" && user.password !== "") {
            const result = await registerAPI(user);
            if(result.status=== 200){
                // alert(`${result.username} has been registered`)
                console.log("result",result);
                toast.success(`${result.data.username} has been registered`,toastConfig);
                setUser({username:"",email:"",password:""})
                navigate('/login')
            }
            else if(result.response.status === 406){
                toast.error(`${user.username} has already been registered`,toastConfig);
            }
        } else {
            toast.error("Fill all the fields...", toastConfig);
        }
    }
    
    // handling login onclick
    const handleLogin = async (e) => {
        e.preventDefault();
        if(user.email !== "" && user.password !== ""){
            const result = await loginAPI(user)
           if(result.status === 200){
            toast.success(`${result.data.existingUser.username} has been Logged in successfully`,toastConfig);
            // to store user data and token in session storage
            sessionStorage.setItem('existingUser',JSON.stringify(result.data.existingUser))
            sessionStorage.setItem('token',result.data.token)
            setUser({username:"",email:"",password:""})
            navigate('/')
           }else if(result.response.status ===401){
            toast.error(`Invalid password`,
            );
           }
           else{
               toast.error(`No user found with this email id!`,toastConfig);
              }
        }else{
            toast.error("Fill all the fields...", toastConfig);
        }
    }

    
  return (
    <div>
        {/* <Header /> */}
        <div  className='bg-warning'>
            <div className="container p-5" style={{height:'100vh'}}>
                    <div className='rounded overflow-hidden shadow shadow-lg bg-light'style={{height:'100%'}}>
                        <div className='d-flex  ' style={{height:'100%'}}>
                            <div style={{flex:0.4,height:'100%'}}  className='p-4' >
                            <Link to={'/'} className='text-muted ' style={{textDecoration:'none'}} ><i class="fa-solid fa-arrow-left me-1"></i>Back to Home</Link>
                                <img style={{objectFit:"contain"}}  height={'100%'} src={LoginImage} alt="" />
                            </div>
    
                            <div style={{flex:.6}} >
                                <div className="d-flex flex-column align-items-center justify-content-center" style={{height:'100%'}}>
                                    <h2>Project Fair<i class="fa-solid fa-lightbulb mx-2 text-warning"></i></h2>
                                
                                    <h4  className='mb-3 text-muted'>{register?'Sign Up your Account':'Sign In your Account'}</h4>
                                <form action="" className='w-100 px-5'>
                                    {
                                        registerForm ?
                                        <div className='text-center px-5'>
                                                <input value={user.username} onChange={(e)=>handleChange(e)} type="text" name='username' className='form-control mb-2' size={'lg'} placeholder='Enter Your Name'/>
                                                <input value={user.email} onChange={(e)=>handleChange(e)} type="text" name='email' className='form-control mb-2' size={'lg'} placeholder='Enter Your Email'/>
                                                <input value={user.password} onChange={(e)=>handleChange(e)} type="text" name='password' className='form-control mb-2' size={'lg'} placeholder='Enter Your Password'/>
                                                <p>already have an account?
                                                    <Link to={'/login'} style={{textDecoration:'none'}} className='text-warning fw-bold'>Login</Link>
                                                </p>
                                                <MDBBtn onClick={(e)=>handleRegister(e)} color='warning'>Register</MDBBtn>
                                        </div>:
                                        <div className='text-center px-5'>
                                                <input type="text" value={user.email} onChange={(e)=>handleChange(e)} name='email'  className='form-control mb-2' size={'lg'} placeholder='Enter Your Email'/>
                                                <input type="text" value={user.password} onChange={(e)=>handleChange(e)} name='password'  className='form-control mb-2' placeholder='Enter Your Password'/>
                                                <p>don't have an account?
                                                    <Link to={'/register'} style={{textDecoration:'none'}} className='text-warning fw-bold'>Register</Link>
                                                </p>
                                                <MDBBtn onClick={(e)=>handleLogin(e)} color='warning'>Login</MDBBtn>
                                        </div>
                                    }
                                </form>
    
                                </div>
                            </div>
    
                        </div>
                    </div>
            </div>
        </div>
    </div>
   
  )
}

export default Auth