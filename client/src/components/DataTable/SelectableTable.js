import { MDBContainer, MDBInput } from 'mdb-react-ui-kit';
import React, { useEffect, useState }  from 'react';
import DataTable from 'react-data-table-component'; 

export default function  SelectableTable({users}) {      

    const column = [
    {
        name: "Nombre",
        selector: row => row.name
    },
    {
        name: "Descripción",
        selector: row => row.description
    }
    ]

    const data = users.map(user => ({
        name: user.name,
        description: user.description,
    }));

    console.log ("prueba en Selecctable",data); 

    const data1 = [
        { name: 'paola2', 
        description: 'muy bonita' }
    ]

    const [records, setRecords] = useState([]);
    const [inputValues, setInputValue] = useState('');

    useEffect(() => {
        const firstRecord = data;
        setRecords(firstRecord)
    }, []);
    console.log("1", records); 

    const handleChangeInput = (e) => {
        setInputValue(e.target.value.toLowerCase())
    }
    useEffect (() => {
        const filteredRecords = data.filter(record => {
            return record.name.toLowerCase().includes(inputValues)
        })
            setRecords(filteredRecords)
    }, [inputValues])
    
    console.log ("2 ", records)

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
                fontSize: '13px',
                fontWeight: 400,
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontSize: '18px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },

    }
    
    return (
        <MDBContainer fluid> 
            <MDBInput wrapperClass='mb-4' id='text' type='text' size="lg" name ="email"  onChange={handleChangeInput}  placeholder='Filtrar por nombre'/>
            <DataTable
                columns = {column}
                data = {records}
                selectableRows
                onSelectedRowsChange={data => console.log(data)}
                pagination
                fixedHeader
                customStyles={customStyles}
            />
        </MDBContainer>
    );
}

{/*
    return (
        
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
*/}