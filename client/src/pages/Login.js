import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCardBody
}
from 'mdb-react-ui-kit';
const imagen = require('../img/logotipo.png');


const Login = () => {

    const [loginData, SetLogingData] = useState({
        username : "",
        password : ""
    }); 

const handleChange = (e) => {
    const {name, value} = e.target;

    SetLogingData ({
        ...loginData,
        [name]: value.trim()
    });
};

const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
        });

        if (!response.ok) {
        console.error(`Error en la solicitud: ${response.status}`);
        return;
        }

        const responseBody = await response.text();
        console.log(responseBody);
    } catch (error) {
        console.error(error.message);
    }
    };


return (
    <MDBContainer fluid className="p-3 my-5">

        <MDBRow>

        <MDBCol col='10' md='6' className="text-center"ñ>
            <img src= {imagen} className="img-fluid" alt="image logo" />
        </MDBCol>

        <MDBCol md='5'>
            <MDBCardBody className='d-flex flex-column'>
            
            <form onSubmit={onSubmitForm}>

                <div className="text-center">
                    <h3 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Ingresa a tu cuenta</h3>
                </div>
                
                <MDBInput wrapperClass='mb-4' label='Nombre de usuario' id='username' type='text' size="lg" name ="username" value = {loginData.username} onChange={handleChange} required/>
                <MDBInput wrapperClass='mb-4' label='Contaseña' id='password' type='password' size="lg" name='password' value={loginData.password} onChange={handleChange} required/>
                
                <MDBBtn type="submit" className="mb-4 w-100" size="lg">Ingresar</MDBBtn>

                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>¿No tienes un cuenta?
                    <Link to="/registro" style={{color: '#393f81'}}>Registrate aquí</Link>
                </p>

            </form> 

            </MDBCardBody>
        </MDBCol>

        </MDBRow>

    </MDBContainer>
    );

}

export default Login;
