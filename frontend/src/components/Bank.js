import React, { useEffect, useState } from 'react'
import {IoArrowBackCircle} from 'react-icons/io5';
import axios from 'axios';
import './bank.css';

export default function Bank() {
    const [data, setData] = useState([]);
    useEffect(() =>{
        axios.get('http://localhost:8081/bank')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    });

    const calculateTotal = () => {
        return data.reduce((total, d) => {
          const itemTotal = parseFloat(d.amount);
          return total + itemTotal;
        }, 0).toFixed(2); // Ensures the total is formatted to two decimal places
    }

  return (
    <div>
        <h1 className='productsh1'>Savings</h1>
        <div className='topbutton'>
            <a href='/app'>
            <button className='backbutton'><IoArrowBackCircle/> Back</button>
            </a>
            <h3 className='bankh3'>Total Savings: ${calculateTotal()}</h3>
            <a href='/addbank'>
            <button className='addbutton'>Add to Savings</button>
            </a>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Bank</th>
                    <th>Amount Saved</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody id='tablelistings'>
                {data.map( (d, i) => (
                    <tr>
                        <td>{d.bname}</td>
                        <td>${d.amount}</td>
                        <td>{d.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>    
        </div>
  )
}
