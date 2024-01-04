/* eslint-disable jsx-a11y/alt-text */
import { MDBBtn } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import ProjectImg from '../Assets/ProjectImg.svg'
import ProjectCard from '../components/ProjectCard'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getHomeProjectAPI } from '../services/allAPIs'
import { toast } from 'react-toastify'
import { toastConfig } from '../components/MyProjects'


function Home() {
  const [homeProject,setHomeProject] = useState([]) //to hold 4 project details
  const [isLoggedIn,setIsLoggedIn]=useState(false)// to hold login status
  const nav =useNavigate()

  const getHomeProjects = async ()=>{
      const result = await getHomeProjectAPI();
      if(result.status == 200){
        setHomeProject(result.data)
      }else{
        toast.error("Cannot get home projects",toastConfig)
      }
  }

  useEffect(()=>{
    getHomeProjects();
    if(sessionStorage.getItem('token')){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])

  return (
    <>
              <Header />
        <div className="container">
          {/* landing section */}
        <Row>
          <Col className='m-4 d-flex flex-column justify-content-center'>
            <h1>Project Fair</h1>
            <p style={{textAlign:'justify'}} className='text-muted'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis possimus cumque voluptates numquam, 
              impedit vitae ut sint dolores blanditiis ullam dicta asperiores dolorem reprehenderit pariatur illo temporibus aut aliquid natus?
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam odit accusantium ab nulla. Tempore a officiis aspernatur reprehenderit nesciunt impedit perspiciatis mollitia
              , sequi deserunt? Voluptatem doloremque neque asperiores ipsam veritatis?
              </p>
            {
              isLoggedIn?
              <MDBBtn  color='warning' onClick={()=>nav('/dashboard')} className='w-50'>Mange Your Projects</MDBBtn>
              :
            <MDBBtn outline color='warning' onClick={()=>nav('/login')} className='w-50'>Get Started</MDBBtn>
            }
          </Col>
              <Col>
                  <img width={'100%'} src={ProjectImg}></img>
              </Col>
        </Row>
        {/* next section */}
        <div>
          <h1 className='text-center m-3'>Explore Our Projects</h1>
              <marquee scrollAmount={13} >
                  <div className='d-flex gap-5'>
                      {homeProject.length>0?
                      homeProject.map((project,index)=>(
                        <div key={index} className='w-25'> 
                          <ProjectCard data={project} />
                      </div>
                        ))
                      :
                      "no projects added."}
                  </div>  
              </marquee>  
                
                <div className='d-flex justify-content-center my-3'>
                  <Link   to={'/projects'} style={{textDecoration:'none'}}>
                    <MDBBtn outline color='warning' >View More <i className='fa-solid fa-arrow-right'/></MDBBtn>
                  </Link>
                </div>
        </div>

       
        </div>
        <Footer />
    </>
  )
}

export default Home