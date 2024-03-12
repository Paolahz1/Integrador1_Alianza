import React, {useState, Fragment} from  'react';
import Header from './Header';

const InputTodo = ({descrio}) => {

    const [description, setDescription ] = useState(descrio)
        
    const onSubmitForm = async e => {
        e.preventDefault(); 
        try {
            const body = {description};
            const response = await fetch ("http://localhost:5000/todos/", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });        
        if (!response.ok) {
            console.error(`Error en la solicitud: ${response.status}`);
            return;
        }
            const responseBody = await response.text();
            console.log(responseBody);
        } catch (error) {
            console.error (error.message);
        }
    }; 
    
    return (
        <Fragment>
            <Header
            links = {"https:localhost:5000/contactanos"}
            /> 
            <div>
                <h1 className= "text-center mt-5"> Pern Todo List</h1>
                <form className='d-flex' onSubmit={onSubmitForm}>
                    <input 
                    type='text' className='form-control' 
                    value={description} onChange = { e => setDescription(e.target.value)}
                    />
                    <button className='btn btn-success'>Add</button>
                </form>
            </div>
        </Fragment>
    )
}

export default InputTodo;