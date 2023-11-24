import React, { useState, useEffect } from "react";
import './activity.css';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';




const Activity =() => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        // Fetch sales data from Node.js backend
        axios.get('http://localhost:8081/saleschart')
          .then(response => {
            setSalesData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      const dates = salesData.map(data => data.date);
      const salesCounts = salesData.map(data => data.salesCount);
    
      const chartData = {
        labels: dates,
        datasets: [
          {
            label: 'Number of Sales',
            data: salesCounts,
            backgroundColor: 'rgba(75,192,192,0.2)', // Adjust color and transparency
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1
          }
        ]
      };

      const chartOptions = {
        indexAxis: 'x', // Set vertical bars
        scales: {
          x: {
            beginAtZero: true // Start the x-axis from zero
          },
          y: {
            // Additional y-axis configurations if needed
          }
        }
      };
    return(
        <div style={{  height: '500px', width: '90%', margin: '0 auto'}}>
            <h3 className='salesh3'>Sales Made Everyday</h3>
            {salesData.length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
    ) : (
      <p>Loading data...</p>
    )}
        </div>
    )
}

export default Activity

// width: '90%', maxWidth: '800px', margin: '0 auto'