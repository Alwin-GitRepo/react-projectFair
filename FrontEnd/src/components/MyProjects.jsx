/* eslint-disable jsx-a11y/img-redundant-alt */
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { Col, Row, Toast } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import uploadImage from '../Assets/Image upload-bro.svg'
import { addProjectAPI, deleteUserProjectAPI, editUserProjectAPI, getUserProjectAPI } from '../services/allAPIs';
import { toast } from 'react-toastify';


export const toastConfig = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "colored",
  }

function MyProjects() {
    const [show, setShow] = useState(false);
    const [projectDetails,setProjectDetails] = useState({
      title:"",
      language:"",
      github:"",
      linkedin:"",
      overview:"",
      projectImage:""
    })
    
    const [userProjectDetails,setUserProjectDetails] = useState([])
    
    const[imagePreview,setImagePreview] = useState("") //to hold image url

    const [token,setToken] = useState('') //to hold token

    const [isEdit,setIsEdit] = useState(false)

    const [projectId,setProjectId] = useState('')

    const handleChange =(e)=>{
      setProjectDetails({...projectDetails,[e.target.name]:e.target.value})
  }
    const handleClose = () => setShow(false);
    const handleShow = () => {
      setShow(true)
      setProjectDetails({
        title:"",
        language:"",
        github:"",
        linkedin:"",
        overview:"",
        projectImage:""
      })
    setImagePreview("")
    };

    useEffect(()=>{
      if(sessionStorage.getItem('token')){
        setToken(sessionStorage.getItem("token"))
      }else{
        setToken("")
      }
    },[])


    // for image conversion
    useEffect(()=>{
      if(projectDetails.projectImage){
        setImagePreview(URL.createObjectURL(projectDetails.projectImage))
      }

    },[projectDetails.projectImage])

    // handle add- for adding project details
    const handleAdd =async(e)=>{
      e.preventDefault();
      const {title,language,github,linkedin,overview,projectImage} = projectDetails;

      if(!title || !language || !github || !linkedin || !overview || !projectImage){
        alert ("please fill in the form")
      }else{
        // creation of request body
        const reqBody = new FormData();
        reqBody.append('title',title)
        reqBody.append('language',language)
        reqBody.append('github',github)
        reqBody.append('linkedin',linkedin)
        reqBody.append('overview',overview)
        reqBody.append('projectImage',projectImage)
        // creation of requestHeader
        if(token){
          var reqHeader = {
            "Content-Type":"multipart/form-data", //image data
            "Authorization": `Bearer ${token}`
          }
        }
        // api call
        const result = await addProjectAPI(reqBody,reqHeader)
        console.log("Result:"+result);
        if(result.status == 200)
        {
          console.log(result.data);
          toast.success("Project added successfull",toastConfig) //actual result
          handleClose()
        }else{
          console.log(result.response.data); //error
        }
      }
    }

    if(sessionStorage.getItem('token')){
      var tokenString = sessionStorage.getItem("token")
    }
    // get users
    const getUserProjects = async()=>{
      if(tokenString){
         var reqHeader = {
          "Content-Type":"application/json", 
          "Authorization": `Bearer ${tokenString}`
        }
      }
      
      const result = await getUserProjectAPI(reqHeader);
      if(result.status == 200){
        setUserProjectDetails(result.data)
      }else{
        toast.error("Cannot fetch project details",toastConfig)
      }
    }

    // edit user project
    const editUserProject = async(e)=>{
      e.preventDefault();
      if(tokenString){
         var reqHeader = {
          "Content-Type":"application/json", 
          "Authorization": `Bearer ${token}`
        }
      }
      const reqBody = projectDetails;
      let id = projectId;
      const result = await editUserProjectAPI(id,reqBody,reqHeader);
      if(result.status == 200){
        setUserProjectDetails(result.data)
        handleClose()
        getUserProjects();
      }else{
        toast.error("Cannot edit  project details",toastConfig)
        handleClose()
      }
    }
    // delete functionality
    const handleDelete=async(id)=>{
      if(tokenString){
        var reqHeader = {
          "Content-Type":"application/json", 
          "Authorization": `Bearer ${token}`
        }
     }
      const result = await deleteUserProjectAPI(id,reqHeader);
      console.log(result);
      if(result.status == 200){
        toast.success("Project deleted successfully",toastConfig)
        getUserProjects();
      }else{
        toast.error("Cannot delete project",toastConfig)
      }

    } 


    useState(()=>{
      getUserProjects()
    },[])


  
    

  return (
    <>
        <div className='card shadow p-3 m-4 bg-light '>
                <h3 className='text-center'>My Projects</h3>
                <div className='ms-auto'>
                    <MDBBtn onClick={(e)=>{handleShow(e)
                      setIsEdit(false)}} color='info' >Add Project <i className='fa-solid fa-plus mx-1'/></MDBBtn>
                </div>
                {userProjectDetails.length>0 && userProjectDetails.map((project,index)=>(
                  <div key={index} className='border my-3 d-flex align-items-center p-3'>
                  <h4>{project.title}</h4>
                  <div className='ms-auto d-flex column-gap-2'>
                      <MDBBtn onClick={(e)=>{
                        handleShow(e)
                        setProjectDetails({title: project.title,github: project.github,linkedin: project.linkedin,overview: project.overview,language:project.language})
                        setIsEdit(true)
                        setProjectId(project._id)
                        }}
                         color='dark'><i className="fa-solid fa-pen-to-square mx-1" /></MDBBtn>
                      <MDBBtn color='dark'><i className="fa-brands fa-github mx-1" /></MDBBtn>
                      <MDBBtn onClick={(e)=>handleDelete(project._id)} color='dark'><i className="fa-solid fa-trash mx-1" /></MDBBtn>
                  </div>
              </div>
                ))}
        </div>

        {/* modal */}
        <Modal
        size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                <label style={{height:'100%'}}>
                    <input type="file" className='d-none' 
                    onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                    <img width={'100%'} height={'100%'} style={{objectFit:'cover'}}
                    src={imagePreview?imagePreview:uploadImage} alt="project Image" />
                </label>
                </Col>
                <Col>
                <div className='d-flex flex-column row-gap-2 justify-content-center my-3 px-3' >
                    <MDBInput 
                    onChange={(e)=>handleChange(e)}
                    value={projectDetails.title}
                    label='Project-title'
                    name='title'
                    id='controlledValue'
                    type='text'
                    size='lg'
                    />
                    <MDBInput 
                    onChange={(e)=>handleChange(e)}
                    value={projectDetails.language}
                    label='Language to be used'
                    name='language'
                    id='controlledValue'
                    type='text'
                    size='lg'
                    />
                    <MDBInput 
                    onChange={(e)=>handleChange(e)}
                    value={projectDetails.github}
                    label='Enter Your GitHub Link'
                    name='github'
                    id='controlledValue'
                    type='text'
                    size='lg'
                    />
                    <MDBInput 
                    onChange={(e)=>handleChange(e)}
                    value={projectDetails.linkedin}
                    label='Enter Your Linkedin Link'
                    name='linkedin'
                    id='controlledValue'
                    type='text'
                    size='lg'
                    />
                    <MDBInput 
                    label='Project Overview'
                    onChange={(e)=>handleChange(e)}
                    value={projectDetails.overview}
                    name='overview'
                    id='controlledValue'
                    type='text'
                    size='lg'
                    />
                </div>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          {/* <MDBBtn color='dark' >
            Github 
          <i className="fa-brands fa-github mx-2"></i>
          </MDBBtn> */}
          {isEdit?
          <MDBBtn onClick={editUserProject}  color='danger'>
            Update
          <i className="fa-solid fa-edit mx-2"></i>
          </MDBBtn>
          :
          <MDBBtn onClick={handleAdd}  color='danger'>
            Add
          <i className="fa-solid fa-plus mx-2"></i>
          </MDBBtn>
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MyProjects