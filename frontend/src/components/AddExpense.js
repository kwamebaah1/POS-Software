import React, { useState } from 'react';
import './addproducts.css';
import {IoArrowBackCircle} from 'react-icons/io5';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {FaHome} from 'react-icons/fa';

const AddExpense = () => {
    const navigate = useNavigate();
    const [ename, setEname] = useState('')
    const [cost, setCost] = useState('')
    const [reason, setReason] = useState('')
    const [date, setDate] = useState('')
   
    const handleSubmit = () => {
        if(ename.length === 0){
            alert('Expense Name is Blank');
        }else if(cost.length === 0){
            alert("Cost is Blank");
        }else if(reason.length=== 0){
            alert('Reason is Blank');
        }else if(date.length=== 0){
            alert('Date is Blank');
        }
        else{
            const url = 'http://localhost/test/addexpense.php';
            let fData = new FormData();
            fData.append('ename', ename);
            fData.append('cost', cost);
            fData.append('reason', reason);
            fData.append('date', date);
            axios.post(url, fData).then(res => alert(res.data)) .catch(err => alert(err));
            navigate('/expenses');
        }
    }
    
    return(
        <div className='apdiv'>
            <a href='/expenses'>
            <button className='backbtn1'><IoArrowBackCircle/> Back</button>
            </a>
            <a href='/app'>
                    <button className='homebtn'><FaHome/>Home</button>
                </a>
        <form className='addproductsform' onSubmit={handleSubmit}>
            <p className='formp'>Add Expense</p>
            <div className='flex1'>
                <label className='label1'>
                    <input required="" placeholder='' type='text' className='input' value={ename} onChange={e=> setEname(e.target.value)}/>
                    <span>Expense</span>
                </label>
                <label className='label1'>
                    <input required="" placeholder='' type='number' className='input' value={cost} onChange={e=> setCost(e.target.value)}/>
                    <span>Cost</span>
                </label>
                

            </div>
            <div className='flex1'>
                <label className='label1'>
                    <input required="" placeholder='' type='text' className='input' value={reason} onChange={e=> setReason(e.target.value)}/>
                    <span>Reason</span>
                </label>
                <label className='label1'>
                    <input required="" placeholder='' type='date' className='input' value={date} onChange={e=> setDate(e.target.value)}/>
                    <span>Date</span>
                </label>
            </div>
            
            <button className='submit'>Add</button>
        </form>
        </div>
    );
};

export default AddExpense;