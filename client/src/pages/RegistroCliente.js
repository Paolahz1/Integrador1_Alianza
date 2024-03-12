import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCardBody,
    MDBCard,
    MDBCheckbox
} from 'mdb-react-ui-kit';



const RegistroCliente = () => {

    const [formData, setFormData] = useState({
        nombre: '',
        tipoDocumento: 'DNI', 
        numeroDocumento: '',
        nombreUsuario: '',
        password: '',
    });

    /* 
    Al usar ...formData, aseguras que mantienes los valores existentes
    y solo actualizas el campo específico que cambió:
    */
    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value,
        });
    };
    
    /*  Este controlador se activa cuando el usuario envía
    el formulario, ya sea al presionar un botón de envío 
    dentro del formulario o al presionar la tecla "Enter" 
    */
    const onSubmitForm = async (e) => {
    console.log (formData);

    e.preventDefault();

        console.log(formData);
    try {
        const response = await fetch('http://localhost:5000/usuario/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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

    <MDBContainer fluid>

        <MDBCard className='mt-5 mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 text-center'>

                <h2 className="text-center mt-5">Registrate con nosotros</h2>

                <form  onSubmit={onSubmitForm}>
                    
                    <MDBInput wrapperClass='mb-4'  id='nombre' type='text' size="lg" name ="nombre" value = {formData.nombre} onChange={handleChange} required placeholder='Nombre'/>
                
                    <MDBRow> 
                        <MDBCol col='6'  > 
                            <MDBInput wrapperClass='mb-4' id='numeroId' type='text' size="lg" name ="numeroDocumento" value = {formData.numeroDocumento} onChange={handleChange}   placeholder='Número de identificación'/>
                        </MDBCol> 
                        <MDBCol col='6'> 
                            <label>
                                Tipo de Documento: 
                                <select
                                name="tipoDocumento"
                                value={formData.tipoDocumento}
                                onChange={handleChange}
                                required
                                >
                                <option value="DNI">DNI</option>
                                <option value="Pasaporte">Pasaporte</option>
                                <option value="Cédula">Cédula</option>
                                <option value="NIT">NIT</option>

                                </select>
                            </label>
                        </MDBCol>
                    </MDBRow>   

                    <MDBInput wrapperClass='mb-4' label='' id='nombreUsuario' type='text' size="lg" name ="nombreUsuario" value = {formData.nombreUsuario} onChange={handleChange} required placeholder='Nombre de usuario'/>
                    <MDBInput wrapperClass='mb-4' label='' id='password' type='password' size="lg" name ="password" value = {formData.password} onChange={handleChange} required placeholder='Contraseña'/>
                    
                    <MDBCheckbox name='flexCheck' id='flexCheckDefault'  label='Acepta términos y condiciones' />

                        <Button type = "submit" variant = "dark" className='text-center mt-5 '>
                                Registrarse
                        </Button>              
                </form>
            </MDBCardBody>
        </MDBCard>
    </MDBContainer>
    );
};

export default RegistroCliente;


