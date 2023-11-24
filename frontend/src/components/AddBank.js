import React, { useState } from 'react'
import './addproducts.css';
import {IoArrowBackCircle} from 'react-icons/io5';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {FaHome} from 'react-icons/fa';

export default function AddBank() {
    const navigate = useNavigate();
    const [bname, setBname] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
   
    const handleSubmit = () => {
        if(bname.length === 0){
            alert('Bank Name is Blank');
        }else if(amount.length === 0){
            alert("Amount is Blank");
        }else if(date.length=== 0){
            alert('Date is Blank');
        }
        else{
            const url = 'http://localhost/test/addbank.php';
            let fData = new FormData();
            fData.append('bname', bname);
            fData.append('amount', amount);
            fData.append('date', date);
            axios.post(url, fData).then(res => alert(res.data)) .catch(err => alert(err));
            navigate('/bank');
        }
    }
  return (
    <div className='apdiv'>
            <a href='/bank'>
            <button className='backbtn1'><IoArrowBackCircle/> Back</button>
            </a>
            <a href='/app'>
                    <button className='homebtn'><FaHome/>Home</button>
                </a>
        <form className='addproductsform' onSubmit={handleSubmit}>
            <p className='formp'>Add Expense</p>
            <div className='flex1'>
                <label className='label1'>
                    <input required="" placeholder='' type='text' className='input' value={bname} onChange={e=> setBname(e.target.value)}/>
                    <span>Bank Name</span>
                </label>
                <label className='label1'>
                    <input required="" placeholder='' type='number' className='input' value={amount} onChange={e=> setAmount(e.target.value)}/>
                    <span>Amount</span>
                </label>
                

            </div>
            <div className='flex1'>
                
                <label className='label1'>
                    <input required="" placeholder='' type='date' className='input' value={date} onChange={e=> setDate(e.target.value)}/>
                    <span>Date</span>
                </label>
            </div>
            
            <button className='submit'>Add</button>
        </form>
        </div>
  )
}
