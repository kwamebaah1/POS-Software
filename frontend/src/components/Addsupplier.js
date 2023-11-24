import React, { useState } from 'react';
import './addproducts.css';
import {IoArrowBackCircle} from 'react-icons/io5';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {FaHome} from 'react-icons/fa';


const AddSupplier = () => {
    const navigate = useNavigate();
    const [sname, setSname] = useState('')
    const [contact, setContact] = useState('')
    const [address, setAddress] = useState('')
   
    const handleSubmit = () => {
        if(sname.length === 0){
            alert('Supplier Name is Blank');
        }else if(contact.length === 0){
            alert("Contact is Blank");
        }else if(address.length=== 0){
            alert('Contact is Blank');
        }
        else{
            const url = 'http://localhost/test/addsupplier.php';
            let fData = new FormData();
            fData.append('sname', sname);
            fData.append('contact', contact);
            fData.append('address', address);
            axios.post(url, fData).then(res => alert(res.data)) .catch(err => alert(err));
            navigate('/suppliers');
        }
    }
    
    return(
        <div className='apdiv'>
            <a href='/suppliers'>
            <button className='backbtn1'><IoArrowBackCircle/> Back</button>
            </a>
            <a href='/app'>
                    <button className='homebtn'><FaHome/>Home</button>
                </a>
        <form className='addproductsform' onSubmit={handleSubmit}>
            <p className='formp'>Add Supplier</p>
            <div className='flex1'>
                <label className='label1'>
                    <input required="" placeholder='' type='text' className='input' value={sname} onChange={e=> setSname(e.target.value)}/>
                    <span>Supplier Name</span>
                </label>
                <label className='label1'>
                    <input required="" placeholder='' type='number' className='input' value={contact} onChange={e=> setContact(e.target.value)}/>
                    <span>Contact</span>
                </label>
                

            </div>
            <div >
                <label className='label1'>
                    <input required="" placeholder='' type='text' className='input' value={address} onChange={e=> setAddress(e.target.value)}/>
                    <span>Address</span>
                </label>
                
            </div>
            
            <button className='submit'>Add</button>
        </form>
        </div>
    );
};

export default AddSupplier;