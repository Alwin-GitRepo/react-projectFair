/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple,
  } from 'mdb-react-ui-kit';
  import ProjectImg from '../Assets/ProjectImg.svg'
import { Col, Modal, Row } from 'react-bootstrap';
import { BASE_URL } from '../services/base_url';

function ProjectCard({data}) {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      {
        data &&
         <MDBCard onClick={handleShow} style={{width:'100%'}}>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage style={{maxHeight:'60vh',objectFit:'contain'}} src={data?`${BASE_URL}/uploads/${data.projectImage}`:'Null'} fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody className='w-100'>
        <MDBCardTitle>{data.title}</MDBCardTitle>
        {/* <MDBCardText>
          Some quick example text to 
        </MDBCardText> */}
        {/* <MDBBtn   href='#'>Button</MDBBtn> */}
      </MDBCardBody>
    </MDBCard>}

    {/* modal */}
     {data &&
      <Modal
        size='lg'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <img width={'100%'} style={{maxHeight:'60vh',objectFit:'cover'}} src={data?`${BASE_URL}/uploads/${data.projectImage}`:'Null'} alt='' />
                </Col>
                <Col>
                    <h4>{data.title}</h4>
                    <p className='text-muted' style={{textAlign : 'justify'}}>{data.overview}</p>
                    <h6>Technology used: {data.language}</h6>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <MDBBtn target='blank' href={data.github} color='dark' >
            Github 
          <i className="fa-brands fa-github mx-2"></i>
          </MDBBtn>
          <MDBBtn target='blank' href={data.linkedin} color='danger'>
            Live Link
          <i className="fa-solid fa-globe mx-2"></i>
          </MDBBtn>
        </Modal.Footer>
      </Modal>}
      
    </>
  )
}

export default ProjectCard