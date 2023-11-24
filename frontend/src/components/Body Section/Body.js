import React from "react";
import './body.css';
import Top from './Top/Top';
import Listing from './Listing/Listing';
import Activity from "./Activity/Activity";
import Footer from "./Footer/Footer";


const Body =() => {
    return(
            <div className="mainContent">
                <Top/>

                <div className="bottom flex">
                    <Listing/>
                </div>
                <div>
                <Activity/>
                </div>
                <div className="bot">
                    <Footer/>
                </div>
            </div>
            
    )
}

export default Body