import React, { useState } from 'react';
import {
MDBBtn,
MDBModal,
MDBModalDialog,
MDBModalContent,
MDBModalHeader,
MDBModalTitle,
MDBModalBody,
MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function ModalComponent({ show, message, onClose }) {
const [basicModal, setBasicModal] = useState(show);

const closeModal = () => {
onClose(); // Llamar a la función onClose para realizar acciones adicionales al cerrar el modal
};

return (
<>
    <MDBModal staticBackdrop open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
    <MDBModalDialog>
        <MDBModalContent>
        <MDBModalHeader>
            <MDBModalTitle>Modal title</MDBModalTitle>
        </MDBModalHeader>
        <MDBModalBody>
            <p>{message}</p>
        </MDBModalBody>
        <MDBModalFooter>
            <MDBBtn color='secondary' onClick={closeModal}>Cerrar</MDBBtn>
        </MDBModalFooter>
        </MDBModalContent>
    </MDBModalDialog>
    </MDBModal>
</>
);
}
