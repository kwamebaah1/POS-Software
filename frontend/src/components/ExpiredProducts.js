import React, { useState, useEffect } from 'react';
import {IoArrowBackCircle} from 'react-icons/io5';
import axios from 'axios';

export default function ExpiredProducts() {
    const [expiredProducts, setExpiredProducts] = useState([]);

    useEffect(() => {
        // Fetch expired products from Node.js backend
        axios.get('http://localhost:8081/expiredproducts')
          .then(response => {
            setExpiredProducts(response.data);
          })
          .catch(error => {
            console.error('Error fetching expired products:', error);
          });
      }, []);
    

  return (
    <div>
        <h1 className='productsh1'>Expired Products</h1>
        <div className='topbtns'>
            <a href='/app'>
            <button className='backbtn'><IoArrowBackCircle/> Back</button>
            </a>
            <a href='/products'>
            <button className='addbtn'>Go to Products</button>
            </a>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Expired Products</th>
                    <th>Quantity Left</th>
                    <th>Date Expired</th>
                </tr>
            </thead>
            <tbody id='tablelistings'>
                {expiredProducts.map( (d, i) => (
                    <tr key={d.id}>
                        <td>{d.pname}</td>
                        <td>{d.product_qty}</td>
                        <td>{d.date_expired}</td>
                    </tr>
                ))}
            </tbody>
        </table>    
        </div>
  )
}
