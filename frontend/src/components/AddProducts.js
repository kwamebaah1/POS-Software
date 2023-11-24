import React, { useState } from 'react';
import './addproducts.css';
import {IoArrowBackCircle} from 'react-icons/io5';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { FaHome} from 'react-icons/fa';



const AddProducts = () => {
    const navigate = useNavigate();
    const [pname, setPname] = useState('')
    const [costPrice, setCostPrice] = useState('')
    const [sellingPrice, setSellingPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [todaysDate, setTodaysDate] = useState('')
    const handleSubmit=()=>{
        if(pname.length === 0){
            alert('Product Name is Blank');
        }else if(costPrice.length === 0){
            alert("Cost Price is Blank")
        }else if(quantity.length === 0){
            alert("Qty is Blank")
        }else if(expiryDate.length === 0){
            alert("Expiry Date is Blank")
        }else if(todaysDate.length === 0){
            alert("Todays Date is Blank")
        }
        else{
            const url = 'http://localhost/test/formsubmit.php';
            let fData = new FormData();
            fData.append('pname', pname);
            fData.append('costPrice', costPrice);
            fData.append('sellingPrice', sellingPrice);
            fData.append('quantity', quantity);
            fData.append('expiryDate', expiryDate);
            fData.append('todaysDate', todaysDate);
            Axios.post(url, fData).then(res => alert(res.data)) .catch(err => alert(err));
            navigate('/products');
            window.location.reload()
        }
    }


    return(
        <div className='apdiv'>
            <a href='/products'>
            <button className='backbtn1'><IoArrowBackCircle/> Back</button>
            </a>
                <a href='/app'>
                    <button className='homebtn'><FaHome/>Home</button>
                </a>
        <form className='addproductsform'  onSubmit={handleSubmit}>
            <p className='formp'>Add Products</p>
            <div className='flex1'>
                <label className='label1'>
                    <input required="" placeholder='' type='text' className='input' value={pname} onChange={(event)=> setPname(event.target.value)}/>
                    <span>Product Name</span>
                </label>
                <label className='label1'>
                    <input required="" placeholder='' type='number' className='input' value={sellingPrice} onChange={(event)=> setSellingPrice(event.target.value)}/>
                    <span>Selling Price</span>
                </label>
                

            </div>
            <div className='flex1'>
                <label className='label1'>
                    <input required="" placeholder='' type='number' className='input' value={costPrice} onChange={(event)=> setCostPrice(event.target.value)}/>
                    <span>Cost Price</span>
                </label>
                <label className='label1'>
                    <input required="" placeholder='' type='number' className='input' value={quantity} onChange={(event)=> setQuantity(event.target.value)}/>
                    <span>Quantity</span>
                </label>
            </div>
            <div className='flex1'>
                <label className='label1'>
                    <input required="" placeholder='' type='date' className='input' value={expiryDate} onChange={(event)=> setExpiryDate(event.target.value)}/>
                    <span>Expiry Date</span>
                </label>
                <label className='label1'>
                    <input required="" placeholder='' type='date' className='input' value={todaysDate} onChange={(event)=> setTodaysDate(event.target.value)}/>
                    <span>Todays date</span>
                </label>
            </div>
            <button className='submit'>Add</button>
        </form>
        </div>
    );
};

export default AddProducts;





/*Axios.post('http://localhost:8081/addproducts', {
            pname: pname, 
            product_price: sellingPrice, 
            cost_price: costPrice, 
            product_qty: quantity, 
            date_expired: expiryDate,
            date_recieved: todaysDate
        })
        .then(res => {
            if(res.data.Status === "Success") {
            navigate('/products');
            } else{
                navigate('/addproducts')
            }
            console.log('Product Added')
        }).catch(err => console.log(err));*/