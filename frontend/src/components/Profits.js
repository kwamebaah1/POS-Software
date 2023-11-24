import React, { useState, useEffect } from 'react';
import { FaHome} from 'react-icons/fa';
import axios from 'axios';
import './profits.css';
import { Bar } from 'react-chartjs-2';


export default function Profits() {
    const [totalProfits, setTotalProfits] = useState(0);
    const [totalProfitsSum, setTotalProfitsSum] = useState(0);
    const [totalSum, setTotalSum] = useState(0);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        // Fetch total profits from the backend API
        axios.get('http://localhost:8081/profits')
          .then(response => {
            setTotalProfits(response.data.totalProfits);
          })
          .catch(error => {
            console.error('Error fetching total profits: ', error);
          });
      }, []);

      useEffect(() => {
        // Fetch total profits sum from the backend API
        axios.get('http://localhost:8081/profit')
          .then(response => {
            setTotalProfitsSum(response.data.totalProfitsSum);
          })
          .catch(error => {
            console.error('Error fetching total profits sum: ', error);
          });
      }, []);

      useEffect(() => {
        setTotalSum(totalProfitsSum + totalProfits);
      }, [totalProfitsSum, totalProfits]);

      useEffect(() => {
        axios.get('http://localhost:8081/profitsgraph')
          .then(response => {
            const data = response.data;
    
            if (Array.isArray(data) && data.length > 0) {
              const dates = data.map(entry => entry.purchase_date);
              const profits = data.map(entry => entry.totalProfits);
    
              setChartData({
                labels: dates,
                datasets: [
                  {
                    label: 'Profits',
                    data: profits,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                  }
                ]
              });
            } else {
              // Handle empty data or unexpected format
              console.error('Invalid or empty data received.');
            }
          })
          .catch(error => {
            console.error('Error fetching profits data: ', error);
          });
      }, []);
  return (
    <div>
        <div className='invtop'>
        <h3 className='invh3'>Profit Evaluations</h3>
        <a href='/app'>
        <button className='invhome'>Home<FaHome/></button>
        </a>
        </div>
        <div className='profitdiv'>
            <div className='topbuttons'>
                <p className='p1'>Profits in Stock: ${totalProfits}</p>
                <p className='p2'>Profits Made in Sales: ${totalProfitsSum}</p>
                <p className='p3'>Total Profits: ${totalSum}</p>
            </div>
            <hr></hr>
            <h2 className='hprofit'>Profits Made Per Day</h2>
            <div style={{  height: '500px', width: '80%', margin: '0 auto' }}>
        {chartData.labels && chartData.datasets ? (
          <Bar data={chartData} options={{ maintainAspectRatio: false }} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
        </div>
        
    </div>
  )
}
