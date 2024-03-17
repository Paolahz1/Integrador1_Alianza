import React, { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalComponent from "../components/Modal";
import { MDBModalBody } from 'mdb-react-ui-kit';

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBCardBody,
    MDBCard,
    MDBCheckbox,
    MDBBtn
} from 'mdb-react-ui-kit';



const RegistroCliente = () => {
    
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const [formData, setFormData] = useState({
        nombre: '',
        tipo_documento: 'DNI', 
        documento: '',
        nombre_usuario: '',
        contrasena: '',
        email : null,
        tipo_usuario: 'cliente',
        telefono : '',
    });

    /* 
    Al usar ...formData, aseguras que mantienes los valores existentes
    y solo actualizas el campo específico que cambió:
    */
    const handleChange = (e) => {
        const { name, value } = e.target;
        const trimmedValue = value.trim(); // Eliminar espacios al principio y al final
    
        // Validar que el campo sea nombre para aplicar la lógica de espacios
        if (name === 'nombre') {
            // Eliminar espacios duplicados en el nombre
        
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            // Si no es el campo nombre, actualizar el valor directamente
            setFormData({
                ...formData,
                [name]: trimmedValue,
            });
        }
    };
    /*  Este controlador se activa cuando el usuario envía
    el formulario, ya sea al presionar un botón de envío 
    dentro del formulario o al presionar la tecla "Enter" 
    */
    const onSubmitForm = async (e) => {

    e.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        });

        if (!response.ok) {
        console.error(`Error en la solicitud: ${response.status}`);
        return;
        }
        const responseBody = await response.json();
        const {data} = responseBody; 
        console.log("La respuestas en el front", data);
    
        if (data == 1){
            setModalMessage('Error en el registro: No se pudo completar la operación.');
            setMostrarModal(true);
        }
        if(data == 0){
            setModalMessage('Registro exitoso.');
            setMostrarModal(true);
        }
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
                            <MDBInput wrapperClass='mb-4' id='email' type='email' size="lg" name ="email" value = {formData.email} onChange={handleChange}  placeholder='Email'/>
                        </MDBCol> 
                        <MDBCol col='6'> 
                            <MDBInput wrapperClass='mb-4' id='telefono' type='text' size="lg" name ="telefono" value = {formData.telefono} onChange={handleChange}   placeholder='Telefono' required/>
                        </MDBCol>
                    </MDBRow>  
                    <MDBRow> 
                        <MDBCol col='6'  > 
                            <MDBInput wrapperClass='mb-4' id='documento' type='text' size="lg" name ="documento" value = {formData.documento} onChange={handleChange}   placeholder='Número de identificación' required/>
                        </MDBCol> 
                        <MDBCol col='6'> 
                            <label>
                                Tipo de Documento: 
                                
                                <select
                                name="tipo_documento"
                                value={formData.tipo_documento}
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

                    <MDBInput wrapperClass='mb-4' label='' id='nombre_usuario' type='text' size="lg" name ="nombre_usuario" value = {formData.nombre_usuario} onChange={handleChange} required placeholder='Nombre de usuario'/>
                    <MDBInput wrapperClass='mb-4' label='' id='contrasenaUser' type='password' size="lg" name ="contrasena" value = {formData.contrasena} onChange={handleChange} required placeholder='Contraseña'/>
                    
                    <MDBCheckbox name='flexCheck' id='flexCheckDefault'  label='Acepta términos y condiciones' />

                        <Button type = "submit" variant = "dark" className='text-center mt-5 '>
                                Registrarse
                        </Button>              
                </form>
            </MDBCardBody>
        </MDBCard>
        {/*mostrarModal && (
        <ModalComponent>
            <MDBModalBody>
                <p>No se pudo completar la operación.</p>
            </MDBModalBody>
            <MDBBtn onClick={() => setMostrarModal(false)}>Cerrar</MDBBtn>
        </ModalComponent>
        )*/}
        /*
        Aquí le envío los parametros, pero no los ejecuto como tal,
        de eso se encarga el componente internamente
         */

        {mostrarModal && (
            <ModalComponent 
            show={mostrarModal} 
            message={modalMessage} 
            onClose={() => setMostrarModal(false)}
            />
        )}
        
    </MDBContainer>
    );
};

export default RegistroCliente;


