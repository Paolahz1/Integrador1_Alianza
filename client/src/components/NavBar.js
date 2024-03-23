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
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
} from 'mdb-react-ui-kit';

export default function App() { 
const [openBasic, setOpenBasic] = useState(false);

return (
<MDBNavbar expand='lg' light bgColor='light'>
    <MDBContainer fluid>
    <MDBNavbarBrand href='#'>Brand</MDBNavbarBrand>

    <MDBNavbarToggler
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
        onClick={() => setOpenBasic(!openBasic)}
    >
        <MDBIcon icon='bars' fas />
    </MDBNavbarToggler>

    <MDBCollapse navbar open={openBasic}>
        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
        <MDBNavbarItem>
            <MDBNavbarLink active aria-current='page' href='#'>
            Home
            </MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
            <MDBNavbarLink href='/Login'>Login</MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
            <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                    Dropdown
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem >
                        <MDBNavbarLink href='/Login'>Login</MDBNavbarLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem link>Another action</MDBDropdownItem>
                    <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </MDBNavbarItem>

        <MDBNavbarItem>
            <MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>
            Disabled
            
            </MDBNavbarLink>
        </MDBNavbarItem>
        </MDBNavbarNav>
        
    </MDBCollapse>
</MDBContainer>
</MDBNavbar>
);
}