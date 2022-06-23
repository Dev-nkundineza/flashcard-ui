import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes/Routes';
import Footer from './components/footer';
import Header from './components/header';

const App: React.FC = () =>{
   return (
      <BrowserRouter>
      <Header />
       <Routes />
       <Footer/>
      </BrowserRouter>
      );
}

export default App;
