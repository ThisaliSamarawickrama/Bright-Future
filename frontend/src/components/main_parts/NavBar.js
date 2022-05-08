import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBCollapse
} from 'mdb-react-ui-kit';

export default function NavBar() {
  const [showBasic, setShowBasic] = useState(false);
  const [showNavRight, setShowNavRight] = useState(false);

  return (
    <div className="fixed-top">
    <MDBNavbar expand='lg' light  style={{ backgroundColor:'#C1E1C1'}}>
      <MDBContainer >
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                <MDBNavbarItem>
                    <MDBNavbarLink active aria-current='page' href='#'>
                        <MDBIcon fab icon="facebook-f" className="text-muted"/>
                    </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <MDBNavbarLink active aria-current='page' href='#'>
                        <MDBIcon fab icon="whatsapp" className="text-muted"/>
                    </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <MDBNavbarLink active aria-current='page' href='#'>
                        <MDBIcon fab icon="instagram" className="text-muted"/>
                    </MDBNavbarLink>
                </MDBNavbarItem> 
                <MDBNavbarItem>
                    <MDBNavbarLink active aria-current='page' href='#'>
                        <MDBIcon fab icon="twitter" className="text-muted"/>
                    </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <MDBNavbarLink active aria-current='page' href='#'>
                        <MDBIcon fab icon="linkedin-in" className="text-muted"/>
                    </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <MDBNavbarLink active aria-current='page' href='#'>
                        <MDBIcon fab icon="youtube" className="text-muted"/>
                    </MDBNavbarLink>
                </MDBNavbarItem>
          </MDBNavbarNav>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarRightAlignExample'
          aria-controls='navbarRightAlignExample'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavRight(!showNavRight)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showNavRight}>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            <MDBNavbarItem className='pt-1'>
              <MDBNavbarLink active aria-current='page' href='#'>
                <MDBIcon size='1x' fas icon="user-alt" />
              </MDBNavbarLink>
            </MDBNavbarItem> 
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='#'>
              <MDBBtn color='dark' outline className="shadow-0 btn-sm">LogOUt</MDBBtn>
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>  
    <MDBNavbar expand='lg' light bgColor='white'>
      <MDBContainer >
        <MDBNavbarBrand className='text-dark' href='/AdminDashboard'><MDBIcon size='2x' fas icon="graduation-cap" />&nbsp;BRIGHT <i>Future</i></MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink className='text-muted' active aria-current='page' href='#'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className='text-muted' active aria-current='page' href='#'>
                About Us
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className='text-muted' active aria-current='page' href='#'>
                Services
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className='text-muted' active aria-current='page' href='#'>
                Careers
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className='text-muted' active aria-current='page' href='#'>
                Contact Us
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control ' style={{backgroundColor:'#f7f9fa'}} placeholder='Search..' aria-label='Search' />
            <MDBBtn color='dark' className="shadow-0">Search</MDBBtn>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </div>
  );
}