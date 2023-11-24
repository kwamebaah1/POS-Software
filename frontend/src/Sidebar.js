import {
    FaTh,
    FaRegChartBar,
    FaShoppingBag,
    FaThList,
    FaHome,
    FaMoneyBillWave,
} from "react-icons/fa";
import {MdDeliveryDining} from 'react-icons/md';
import {AiOutlinePieChart} from 'react-icons/ai';
import {BsQuestionCircle} from 'react-icons/bs';
import { NavLink } from "react-router-dom";
import React, { useState} from 'react';
import './sidebar.css';
import logo from './Assets/img2.jpg';



export default function Sidebar() {
    const[isOpen, setIsOpen] = useState(false);
    const toggle = () =>setIsOpen(!isOpen);
    const menuItem=[
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/sales",
            name:"Sales",
            icon:<FaRegChartBar/>
        },
        {
            path:"/products",
            name:"Products",
            icon:<FaShoppingBag/>
        },
        {
            path:"/suppliers",
            name:"Suppliers",
            icon:<FaThList/>
        },
    ]
    return(
        < div className="sideBar grid">
           <div className="logoDiv flex">
            <img className="logoimg" src={logo} alt="Image Name" />
            <h2 className="logoh2">POS</h2>
           </div>
            <div className="menuDiv">
                <h3 className="divTitle">
                    QUICK MENU
                </h3>
                <ul className="menuLists grid">
                    <li className="listItem">
                        <a href="/app" className="menuLink flex">
                            <FaTh className="icon"/>
                            <span className="smallText">
                                Dashboard
                            </span>
                        </a>
                    </li>

                    <li className="listItem">
                        <a href="/products" className="menuLink flex">
                            <FaShoppingBag className="icon"/>
                            <span className="smallText">
                                Products
                            </span>
                        </a>
                    </li>

                    <li className="listItem">
                        <a href="/invoices" className="menuLink flex">
                            <MdDeliveryDining className="icon"/>
                            <span className="smallText">
                                Invoices
                            </span>
                        </a>
                    </li>

                    <li className="listItem">
                        <a href="/suppliers" className="menuLink flex">
                            <FaThList className="icon"/>
                            <span className="smallText">
                                Suppliers
                            </span>
                        </a>
                    </li>

                    <li className="listItem">
                        <a href="/expenses" className="menuLink flex">
                            <FaThList className="icon"/>
                            <span className="smallText">
                                Expenses
                            </span>
                        </a>
                    </li>
                </ul>

            </div>
            <div className="settingsDiv">
                <h3 className="divTitle">
                    PROGRESS
                </h3>
                <ul className="menuLists grid">
                    <li className="listItem">
                        <a href="/sales" className="menuLink flex">
                            <FaRegChartBar className="icon"/>
                            <span className="smallText">
                                Sales
                            </span>
                        </a>
                    </li>

                    <li className="listItem">
                        <a href="/profits" className="menuLink flex">
                            <AiOutlinePieChart className="icon"/>
                            <span className="smallText">
                                Profits
                            </span>
                        </a>
                    </li>

                    <li className="listItem">
                        <a href="/bank" className="menuLink flex">
                            <FaMoneyBillWave className="icon"/>
                            <span className="smallText">
                                Bank
                            </span>
                        </a>
                    </li>
                </ul>    
            </div>

            <div className="sideBarCard">
                <BsQuestionCircle className="icon"/>
                <div className="cardContent">
                    <div className="circle1"></div>
                    <div className="circle2"></div>
                    <h3 className="cardh3">Help Center</h3>
                    <p className="cardp">Having trouble with POS, please contact us for more questions.</p>
                    <button className="btn">Go to help center</button>
                </div>
            </div>
        </div>
    )
}

