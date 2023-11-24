import React, {useEffect, useState} from 'react';
import './login.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function Login() {

    const [userID, setUserID] = useState('')
    const [password, setPassword] = useState('')
    const navigateTo = useNavigate()

    const [loginStatus, setLoginStatus] = useState('')
    const [statusHolder, setStatusHolder] = useState('message')
    axios.defaults.withCredentials = true;
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/login', {userID, password})
        .then(res => {
        console.log()
        
        if(res.data.Status === "Success") {
            navigateTo('/app')
           
        } else{
            navigateTo('/')
            setLoginStatus('Credentials Dont Exist!')
        }
        })
    }

    useEffect(()=>{
        if(loginStatus !==''){
            setStatusHolder('showMessage')
            setTimeout(()=> {
                setStatusHolder('message')
            }, 4000)
        }
    },[loginStatus])

    return(
        <div className='section'>
            <div className="form-box">
                <div className="form-value">
                    <form onSubmit={handleSubmit}>
                        <span className={statusHolder}>{loginStatus}</span>
                        <h2>AUGE VENTURES POS</h2>
                        <div className="inputbox">
                            <ion-icon name="mail-outline"></ion-icon>
                            <input className="input1" type="email" required onChange={e => setUserID(e.target.value)}/>
                            <label for="">User ID</label>
                        </div>
                        <div className="inputbox">
                            <ion-icon name="lock-closed-outline"></ion-icon>
                            <input className="input1" type="password" required onChange={e => setPassword(e.target.value)}/>
                            <label for="">Password</label>
                        </div>
                        <button className="loginbtn">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
