import React, { useEffect, useState } from 'react';
import {IoArrowBackCircle} from 'react-icons/io5';
import axios from 'axios';

const Suppliers = () => {
    const [data, setData] = useState([]);
    useEffect(() =>{
        axios.get('http://localhost:8081/suppliers')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    });

    const handleDelete = async (id) =>{
        try{
            await axios.delete("http://localhost:8081/suppliers/" +id)
            window.location.reload()
        }catch(err){
            console.log(err)
        } 
    }

    return(
        <div>
        <h1 className='productsh1'>Suppliers</h1>
        <div className='topbtns'>
            <a href='/app'>
            <button className='backbtn'><IoArrowBackCircle/> Back</button>
            </a>
            <a href='/addsupplier'>
            <button className='addbtn'>Add Supplier</button>
            </a>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Supplier</th>
                    <th>Address</th>
                    <th>Contact Number</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id='tablelistings'>
                {data.map( (d, i) => (
                    <tr>
                        <td>{d.sname}</td>
                        <td>{d.address}</td>
                        <td>{d.contact}</td>
                        <td>
                            <button className='deletebtn' onClick={()=>handleDelete(d.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>    
        </div>
    );
};

export default Suppliers;