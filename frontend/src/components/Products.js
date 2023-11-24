import React, { useEffect, useState } from 'react';
import './products.css';
import axios from 'axios';
import {IoArrowBackCircle} from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';


const Product = () => {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const navigate =useNavigate();
    useEffect(() =>{
        getProducts();
    },[]);
    function getProducts() {
        axios.get('http://localhost:8081/products')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }

    const handleDelete = async (id) =>{
        try{
            await axios.delete("http://localhost:8081/products/" +id)
            window.location.reload()
        }catch(err){
            console.log(err)
        } 
    }

    return(
        <div>
        <h1 className='productsh1'>Products</h1>
        <div className='topbtns'>
            <a href='/app'>
            <button className='backbtn'><IoArrowBackCircle/> Back</button>
            </a>
            <a href='/addproducts'>
            <button className='addbtn'>Add Product</button>
            </a>
        </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Qty Left</th>
                    <th>Date Received</th>
                    <th>Date expired</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id='tablelistings' >
                {data.map( (d, key) => (
                    <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{d.pname}</td>
                        <td>{d.product_price}</td>
                        <td>{d.product_qty}</td>
                        <td>{d.date_received}</td>
                        <td>{d.date_expired}</td>
                        <td>
                            <button onClick={()=>navigate(`/update/${d.product_id}`)} className='updatebtn'>Update</button>
                            <button className='deletebtn' onClick={()=>handleDelete(d.product_id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default Product;

//<button onClick={()=>navigate('/update/:id')} className='updatebtn'>Update</button>
//<Link to ={'/update/${product.id}'} className='updatebtn'>Update</Link>


