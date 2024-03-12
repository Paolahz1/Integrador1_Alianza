import React from 'react';
import { Navbar, Nav } from 'react';

const Header = ({ links }) => {
return (
<Navbar bg="light" expand="lg">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
        {links.map((link, index) => (
        <Nav.Link key={index} href={link.url}>
            ¡Vamos a {link.name}!
        </Nav.Link>
        ))}
    </Nav>
    </Navbar.Collapse>
</Navbar>
);
};

export default Header;