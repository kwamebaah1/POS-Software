import React, { useEffect, useState, useRef  } from 'react';
import './products.css';
import axios from 'axios';
import {IoArrowBackCircle} from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';


const Sales = () => {
        const [purchaseData, setPurchaseData] = useState([]);
        const chartContainer = useRef(null);
        const [chartInstance, setChartInstance] = useState(null);

        const {id} = useParams();
        const [data, setData] = useState([]);
        const navigate =useNavigate();

        const chartContainerStyle = {
            width: '80%',
            maxWidth: '1000px',
            height: '500px',
            margin: '0 auto',
            textAlign: 'center',
          };
        
          const chartStyle = {
            width: '100%',
            height: '100%',
          };

        useEffect(() => {
            // Fetch data from Node.js backend
            axios.get('http://localhost:8081/sale')
              .then(response => {
                setPurchaseData(response.data);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
          }, []);
          

          useEffect(() => {
            if (chartContainer && chartContainer.current && purchaseData.length > 0) {
              if (chartInstance) {
                chartInstance.destroy();
              }
        
              const dates = purchaseData.map(data => data.date);
              const purchaseCounts = purchaseData.map(data => data.purchaseCount);
        
              const chartData = {
                labels: dates,
                datasets: [
                  {
                    label: 'Number of Purchases',
                    data: purchaseCounts,
                    fill: false,
                    borderColor: 'rgba(75,192,192,1)',
                    tension: 0.1,
                    backgroundColor: 'transparent',
                    pointBorderWidth: 4,
                    pointBorderColor: 'transparent'
                  }
                ]
                
              };
              
              const ctx = chartContainer.current.getContext('2d');
              const newChartInstance = new Chart(ctx, {
                type: 'line',
                data: chartData
              });
        
              setChartInstance(newChartInstance);
            }
          }, [purchaseData]);

        useEffect(() =>{
            getProducts();
        },[]);
        function getProducts() {
            axios.get('http://localhost:8081/sales')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
        }
    
        const handleDelete = async (id) =>{
            try{
                await axios.delete("http://localhost:8081/sales/" +id)
                window.location.reload()
            }catch(err){
                console.log(err)
            } 
        }
    
        return(
            <div>
                
            <h1 className='productsh1'>Sales Made</h1>
            <div className='topbtns'>
                <a href='/app'>
                <button className='backbtn'><IoArrowBackCircle/> Back</button>
                </a>
                <a href='/invoices'>
                <button className='addbtn'>Add Invoice</button>
                </a>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Invoice Number</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Sub Total</th>
                    </tr>
                </thead>
                <tbody id='tablelistings' >
                    {data.map( (d, key) => (
                        <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{d.invnum}</td>
                            <td>{d.pname}</td>
                            <td>${d.product_price}</td>
                            <td>{d.quantity}</td>
                            <td>{d.date}</td>
                            <td>${d.cart_total}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={chartContainerStyle}>
                    <h3>Number of Sales Made Everyday</h3>
                    <div style={chartStyle}>
                    <canvas ref={chartContainer} />
                    </div>
                </div>
            </div>
        );
    };
export default Sales;