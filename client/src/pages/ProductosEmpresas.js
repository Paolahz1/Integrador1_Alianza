import React, { useEffect, useState } from 'react';
import SelectableTable from "../components/DataTable/SelectableTable";
import { Navbar, Nav } from 'react-bootstrap';

import {
    MDBContainer
}

from 'mdb-react-ui-kit';

const ProductosEmpresa = () => {
    const [users, setUsers] = useState([]);
    const  [empSelected, setEmpSelected] = useState ('metales'); 
    const handleChange = (empresa) => {
        setEmpSelected (empresa)
    };

    useEffect (() => {
        console.log("effect runs"); 
        const getProducts = async () => {
            try {
                const response = await fetch ("http://localhost:5000/productos/obtener/" +empSelected, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                });
            
            if(!response.ok){
                throw new Error('Error al obtener los datos');
            }
    
            const data = await response.json();
            console.log('La respuesta en el front:', data, " URL " + empSelected); 
            setUsers(data); 

            } catch (error) {
                console.error(error.message);
            }
        };
        getProducts(); //Se debe inicializar su llamado 

    }, [empSelected]);

    return(

    <MDBContainer fluid>
        <Navbar expand="md" bg="light" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => handleChange('metales')}>Metales</Nav.Link>
                    <Nav.Link onClick={() => handleChange('materialesConstruc')}>Materiales de Construcción</Nav.Link>
                    <Nav.Link onClick={() => handleChange('personal')}>Personal</Nav.Link>
                    <Nav.Link onClick={() => handleChange('transporte')}>Transporte</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    
        <SelectableTable  users={users}/>    

    </MDBContainer>
    
    )
}

export default ProductosEmpresa; 


