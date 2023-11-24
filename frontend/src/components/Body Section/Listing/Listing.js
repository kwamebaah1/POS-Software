import React from "react";
import './listing.css';
import {FaShoppingBag,
FaRegChartBar,
FaThList,
FaBook}
 from 'react-icons/fa';
 


const Listing =() => {
    return(
        <div>
            <div className="button flex">
                <a href="/invoices">
                <button className="btn">Invoice <FaBook className="icon"/></button>
                </a>
                <a href="/sales">
                <button className="salesbtn">Sales <FaRegChartBar className="icon"/></button>
                </a>
                <a href="/addproducts">
                    <button className="productbtn">Add Product <FaShoppingBag className="icon"/></button>
                </a>
                < a href='/suppliers'>
                <button className="supplybtn">Suppliers <FaThList className="icon"/></button>
                </a>
            </div>
            
        </div>
    )
}

export default Listing

/*
import iimage from '../../../Assets/snikkers.jpg';
 import img5 from '../../../Assets/mouthwash.jpg';
 import immage from '../../../Assets/flakes.jpg';
 import dimage from '../../../Assets/drugsimg.jpg';
<div className="imglist">
                <h1 className="hihi"> Top Sellers</h1>

                <div className="row">
                    <div className="column" id="machu">
                        <img className="iim" src={iimage}/>
                        <div className="layer">
                            <h3 className="h3h3">SNACKS</h3>
                        </div>
                    </div>
                    <div className="column" id="park">
                        <img className="iim" src={img5}/>
                        <div className="layer">
                            <h3 className="h3h3">MOUTHWASH</h3>
                        </div>
                    </div>
                    <div className="column" id="rialto">
                        <img className="iim" src={immage}/>
                        <div className="layer">
                            <h3 className="h3h3">FLAKES</h3>
                        </div>
                    </div>
                    
                    
                </div>
            </div> */