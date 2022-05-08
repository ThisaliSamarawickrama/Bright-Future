
import React, { useState } from 'react';
import {
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBNavbarBrand,
} from 'mdb-react-ui-kit';

function NavBar() {
    const [showBasic, setShowBasic] = useState(false);
    const [showNavRight, setShowNavRight] = useState(false);
    return (
            <nav class="navbar navbar-expand-lg fixed-top pt-5 shadow-0">
                <div class="container">
                    <MDBNavbarBrand className='text-dark' href='/'><MDBIcon size='2x' fas icon="graduation-cap" />&nbsp;BRIGHT <i>Future</i></MDBNavbarBrand>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                    <MDBCollapse navbar show={showNavRight}>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                        <MDBNavbarLink href='/'>
                            <h6 className='text-black-50'>Home</h6>
                        </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className='ms-4'>
                        <MDBNavbarLink href=''>
                            <h6 className='text-black-50'>About</h6>
                        </MDBNavbarLink>
                        </MDBNavbarItem>
                         <MDBNavbarItem className='ms-4'>
                        <MDBNavbarLink href=''>
                            <h6 className='text-black-50'>Help</h6>
                        </MDBNavbarLink>
                        </MDBNavbarItem>
                         <MDBNavbarItem className='ms-4'>
                        <MDBNavbarLink href=''>
                            <h6 className='text-black-50'>Service</h6>
                        </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem className='ms-4 me-4'>
                        <MDBNavbarLink   >
                            <h6 className='text-black-50'><a  href='Login' className='text-black-50'>Login</a> / <a  href='Register' className='text-black-50'>Registration</a> &nbsp;&nbsp;<MDBIcon fas icon="user-circle" /></h6>
                        </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                    </MDBCollapse>
            </div>
        </div>
        </nav>
          )
};

export default NavBar;