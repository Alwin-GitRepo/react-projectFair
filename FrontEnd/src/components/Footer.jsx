import React from 'react'
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBBtn
  } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <>
        <MDBFooter className='text-center text-white ' style={{ backgroundColor: '#f1f1f1' }}>
      <MDBContainer className='pt-4'>
        <section className='mb-4 d-flex justify-content-center gap-2'>
          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1 d-flex justify-content-center align-items-center text-decoration-none'
            href='#!'
            role='button'
          >
            <MDBIcon fab className=' fab fa-md fa-facebook-f' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1 d-flex justify-content-center align-items-center text-decoration-none'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-md fa-x-twitter' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1 d-flex justify-content-center align-items-center text-decoration-none'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-md fa-google' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1 d-flex justify-content-center align-items-center text-decoration-none'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-md fa-instagram' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1 d-flex justify-content-center align-items-center text-decoration-none'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-md fa-linkedin' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1 d-flex justify-content-center align-items-center text-decoration-none'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-md fa-github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Copyright:
        <a className='text-info' style={{textDecoration:'none'}} href='/'>
          Project Fair.com
        </a>
      </div>
    </MDBFooter>
    </>
  )
}

export default Footer