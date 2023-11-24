import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './login';
import Product from './components/Products';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Suppliers from './components/Suppliers';
import Sales from './components/Sales';
import AddProducts from './components/AddProducts';
import AddSupplier from './components/Addsupplier';
import Update from './components/update';
import Expenses from './components/Expenses';
import AddExpense from './components/AddExpense';
import Invoices from './components/Invoices';
import Bank from './components/Bank';
import AddBank from './components/AddBank';
import Profits from './components/Profits';
import ExpiredProducts from './components/ExpiredProducts';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/app" element ={<App />} />
        <Route path="/products" element={<Product/>} />
        <Route path="/suppliers" element={<Suppliers/>} />
        <Route path="/sales" element={<Sales/>} />
        <Route path="/addproducts" element={<AddProducts/>} />
        <Route path="/addsupplier" element={<AddSupplier/>} />
        <Route path="/update/:id" element={<Update/>} />
        <Route path="/expenses" element={<Expenses/>} />
        <Route path="/addexpense" element={<AddExpense/>} />
        <Route path="/invoices" element={<Invoices/>} />
        <Route path="/bank" element={<Bank/>} />
        <Route path="/addbank" element={<AddBank/>} />
        <Route path="/profits" element={<Profits/>} />
        <Route path="/expiredproducts" element={<ExpiredProducts/>} />
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//