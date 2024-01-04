import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getAllProjectAPI } from '../services/allAPIs'
import { toast } from 'react-toastify'
import { toastConfig } from '../components/MyProjects'

function Projects() {
  const [allProjects,setAllProjects] = useState([])
  const [searchQuery,setSearchQuery] = useState("")

  const getAllProjects = async()=>{
    if(sessionStorage.getItem('token')){
      const token = sessionStorage.getItem('token')
      // console.log(token);
      var reqHeader = {
        "Content-Type":"application/json", //image data
        "Authorization": `Bearer ${token.split('"').join('')}`
      }
      const result = await getAllProjectAPI(searchQuery,reqHeader)
      if(result.status==200){
        setAllProjects(result.data)
      }
      else{
        toast.error('Cannot get all projects',toastConfig)
      }
    }
  }

  useEffect(()=>{
    getAllProjects()
  },[searchQuery])


  return (
    <>
    <Header />
        <div className='container d-flex flex-column align-items-center'>
              <h1 className='m-3'>All Projects</h1>
            <div className='d-flex flex-row align-items-center border rounded w-50 m-3 p-1'>
              <input onChange={(e)=>setSearchQuery(e.target.value)} value={searchQuery} type="text" className='form-control  w-100 border-0 shadow-0' placeholder='search by technology name' />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>

        <div className='container my-4'>
          <Row>
            {
              allProjects.length>0?allProjects.map((project,index)=>(
                <Col key={index} xs={3} className='m-5'>
              <ProjectCard data={project} />
            </Col>
                )):'No projects found.'
              }
          </Row>
        </div>

        <Footer />
    </>
  )
}

export default Projects