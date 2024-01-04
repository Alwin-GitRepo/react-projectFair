import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import MyProjects from '../components/MyProjects'
import MyProfile from '../components/MyProfile'
import Footer from '../components/Footer'

function Dashboard() {
  const [userDetails,setUserDetails] = useState({});
  useEffect(()=>{
      setUserDetails(JSON.parse(sessionStorage.getItem('existingUser')))
  },[])
  
  return (
    <>
        <Header insideDashboard />
        { userDetails && 
        <h3 className='m-4'>Welcome { userDetails.username} 👋</h3>}
        <Row>
            <Col>
              {/* My Projects */}
              <MyProjects />
            </Col>
            <Col>
              {/* My Profile */}
              <MyProfile />
            </Col>
        </Row>

        <Footer />

    </>
  )
}

export default Dashboard