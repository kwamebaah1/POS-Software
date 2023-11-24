import React from "react";
import './top.css';
import {BiSearchAlt} from 'react-icons/bi';
import {MdOutlineNotificationsNone} from 'react-icons/md';  
import video from '../../../Assets/store.mp4';
import {BsArrowRightShort} from 'react-icons/bs';
import img2 from '../../../Assets/pharm2.jpg';



const Top =() => {
    return(
        <div className="topSection">
            <div className="headerSection flex">
                <div className="title">
                    <h1>Welcome</h1>
                    <p>Hello User, welcome back!</p>
                </div>
                <div className="searchBar flex">
                    <input className="searchInput" type="text" placeholder="Search Dasboard"/>
                    <BiSearchAlt className="icon"/>
                </div>
                <div className="adminDiv">
                    <a href='/expiredproducts'>
                    <MdOutlineNotificationsNone className="adminIcon"/>
                    </a>
                </div>
            </div>

            <div className="cardSection flex">
                <div className="rightCard flex">
                    <h1 className="cardh1">Sell extraordinary products</h1>

                    <div className="buttons flex">
                        <button className="btn">Add Purchase</button>
                        <button className="btn transparent">Top Sellers</button>
                    </div>

                    <div className="videoDiv">
                        <video clasName="iVideo" src={video} autoPlay loop muted></video>
                    </div>
                </div>

                <div className="leftCard flex">
                    <div className="main flex">
                        <div className="textDiv">
                            <h1 className="stath1">My Stat</h1>
                            <div className="flex">
                                <span>
                                    Today <br/> <small className="smallText">4 Orders</small>
                                </span>
                            </div>

                            <div className="flex">
                                <span>
                                    This month <br/> <small className="smallText">137 Orders</small>
                                </span>
                            </div>
                            <a href='/invoices'>
                            <span className="flex link">
                                Go to Purchases <BsArrowRightShort className="icon"/>
                            </span>
                            </a>
                        </div>

                        <div className="imgDiv">
                            <img className="imgD" src={img2} alt="Image Name"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Top