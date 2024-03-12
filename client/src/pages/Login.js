import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCardBody
}
from 'mdb-react-ui-kit';


const Login = () => {

    const [loginData, SetLogingData] = useState({
        username : "",
        password : ''
    }); 

const handleChange = (e) => {
    SetLogingData ({
        ...loginData,
        [e.target.name]: e.target.value
    });
};

const onSubmitForm = async (e) => {
    e.preventDefault();

        console.log(loginData);
    try {
        const response = await fetch('http://localhost:5000/usuario/registro', {
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

        <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol md='5'>
            <MDBCardBody className='d-flex flex-column'>
            
            <form nSubmit={onSubmitForm}>

                <div className="text-center">
                    <h3 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Ingresa a tu cuenta</h3>
                </div>
                
                <MDBInput wrapperClass='mb-4' label='Nombre de usuario' id='nombreUsuario' type='text' size="lg" name ="username" value = {loginData.username} onChange={handleChange} />
                <MDBInput wrapperClass='mb-4' label='Contaseña' id='password' type='password' size="lg" name='password' value={loginData.password} onChange={handleChange}/>
                
                <MDBBtn type="submit" className="mb-4 w-100" size="lg">Ingresar</MDBBtn>

                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>¿No tienes un cuenta?
                    <a href="#!" style={{color: '#393f81'}}>Registrate aquí</a>
                </p>

            </form> 

            </MDBCardBody>
        </MDBCol>

        </MDBRow>

    </MDBContainer>
    );

}

export default Login;
