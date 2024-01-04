import { MDBBtn, MDBInput } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap';

function MyProfile() {
    const [open, setOpen] = useState(false);
  return (
    <>
        <div className="card shadow m-4 p-3 bg-light text-center">
            
            <div className='d-flex align-items-center justify-content-center w-100'>
                <h3 className='text-center my-3 ms-auto'>My Profile</h3>
                <MDBBtn
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                color='link' className='ms-auto'>{
                    open?<i class="fa-solid fa-chevron-up" />:<i class="fa-solid fa-chevron-down" />}</MDBBtn>
            </div>


            <Collapse in={open}>
            <div>
                <label >
                    <input type="file" className='d-none' />
                    <img  width={'90px'} 
                    src="https://cdn-icons-png.flaticon.com/128/149/149071.png" alt="user Upload" />
                </label>
                
    
                <div className='d-flex flex-column row-gap-2 justify-content-center my-3 px-5' >
                    <MDBInput 
                    label='Enter Your Name'
                    id='controlledValue'
                    type='text'
                    size='lg'
                    />
                    <MDBInput 
                    label='Enter Your GitHub Link'
                    id='controlledValue'
                    type='text'
                    size='lg'
                    />
                    <MDBInput 
                    label='Enter Your Linkedin Link'
                    id='controlledValue'
                    type='text'
                    size='lg'
                    />
                </div>
    
                <div className='text-center'>
                    <MDBBtn color='info'>Update</MDBBtn>
                </div>
            </div>
            </Collapse>

        </div>
    </>
  )
}

export default MyProfile