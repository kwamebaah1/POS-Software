import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {IoArrowBackCircle} from 'react-icons/io5';


export default function Update() {
    const [products, setProducts] = useState({
        pname:"",
        sellingPrice:"",
        costPrice:"",
        quantity:"",
        expiryDate:"",
        todaysDate:"",
    });

    useEffect(() =>{
        axios.get('http://localhost:8081/products/' +id)
            .then(res => {
            console.log(res);
            setProducts(res.data[0]);
        })
        .catch(err => console.log(err))
    }, []);
        
       
    const handleChange = (e) => {
        setProducts((prev) => ({...prev, [e.target.name]: e.target.value}));
    };
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await axios.put(`http://localhost:8081/products/${productId}`, products)
            navigate('/products')
        }catch (err){
            console.log(err);
        }
        };
    const location = useLocation();
    const navigate = useNavigate();
    const productId = location.pathname.split("/")[2];
    const {id} = useParams();
    
    return(
    <div className='apdiv'>
            <a href='/products'>
            <button className='backbtn1'><IoArrowBackCircle/> Back</button>
            </a>
        <form className='addproductsform'  onSubmit={handleSubmit}>
            <p className='formp'>Update Product</p>
            <div className='flex1'>
                <label className='label1'>
                    <input required="" placeholder='' type='text' id="pname" className='input' value={products.pname} name="pname" onChange={handleChange}/>
                    <span>Product Name</span>
                </label>
                <label className='label1'>
                    <input required="" placeholder='' type='number' className='input' id="product_price" value={products.sellingPrice} name="sellingPrice" onChange={handleChange}/>
                    <span>Selling Price</span>
                </label>
                

            </div>
            <div className='flex1'>
                <label className='label1'>
                    <input required="" placeholder='' type='number' className='input' id="cost_price" value={products.costPrice} name="costPrice" onChange={handleChange}/>
                    <span>Cost Price</span>
                </label>
                <label className='label1'>
                    <input required="" placeholder='' type='number' className='input' id="product_qty" value={products.quantity} name="quantity" onChange={handleChange}/>
                    <span>Quantity</span>
                </label>
            </div>
            <div className='flex1'>
                <label className='label1'>
                    <input required="" placeholder='' type='date' className='input' id="date_expired" value={products.expiryDate} name="expiryDate" onChange={handleChange}/>
                    <span>Expiry Date</span>
                </label>
                <label className='label1'>
                    <input required="" placeholder='' type='date' className='input' id="date_recieved" value={products.todaysDate} name="todaysDate" onChange={handleChange}/>
                    <span>Todays date</span>
                </label>
            </div>
            <button className='submit'>Update</button>
        </form>
        </div>
    );
}

//axios.put('http://localhost/test/${id}/edit', inputs).then(function(res){
    