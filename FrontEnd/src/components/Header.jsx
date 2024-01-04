import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';



function Header({insideDashboard}) {
//   const  Wishlist = useSelector((state)=>state.wishlistReducer)
//   const Cart = useSelector((state)=>state.cartReducer)
    const [openNav, setOpenNav] = useState(false);
    const [openNavText, setOpenNavText] = useState(false);
    const navigate = useNavigate();
  return (
    <>
        <MDBNavbar expand='lg' light bgColor='light' sticky>
      <MDBContainer fluid className='px-5 py-1'>
        <MDBNavbarBrand onClick={()=>navigate('/')} >
        <img
            src='https://cdn-icons-png.flaticon.com/512/1087/1087815.png'
              className='me-2'
              style={{mixBlendMode:'darken'}}
              height='30'
              alt=''
              loading='lazy'
            />
          Project Fair</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenNavText(!openNavText)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar open={openNavText}>
        </MDBCollapse>
      </MDBContainer>
      {insideDashboard && <div className='me-4'>
        <MDBBtn href='/login' outline color='dark' className='d-flex align-items-center gap-2' >Logout <i className="fa-solid fa-right-from-bracket "></i></MDBBtn>
      </div>}
    </MDBNavbar>
    </>
  )
}

export default Header