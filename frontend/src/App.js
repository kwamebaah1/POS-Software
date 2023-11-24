import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Body from './components/Body Section/Body';


const App = () => {
  return (
    <div className='container'>
        <Sidebar/>
        <Body/>
    </div>

  );
};

export default App;


