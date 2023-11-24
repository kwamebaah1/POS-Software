import React, { useEffect, useState } from 'react';
import {IoArrowBackCircle} from 'react-icons/io5';
import axios from 'axios';

const Expenses = () => {
    const [data, setData] = useState([]);
    useEffect(() =>{
        axios.get('http://localhost:8081/expenses')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    });

    const handleDelete = async (id) =>{
        try{
            await axios.delete("http://localhost:8081/expenses/" +id)
            window.location.reload()
        }catch(err){
            console.log(err)
        } 
    }

    return(
        <div>
        <h1 className='productsh1'>Expenses</h1>
        <div className='topbtns'>
            <a href='/app'>
            <button className='backbtn'><IoArrowBackCircle/> Back</button>
            </a>
            <a href='/addexpense'>
            <button className='addbtn'>Add Expense</button>
            </a>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Expense</th>
                    <th>Cost</th>
                    <th>Reason</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id='tablelistings'>
                {data.map( (d, i) => (
                    <tr>
                        <td>{d.ename}</td>
                        <td>{d.cost}</td>
                        <td>{d.reason}</td>
                        <td>{d.date}</td>
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

export default Expenses;