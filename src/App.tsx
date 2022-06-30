import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes/Routes';
import Footer from './components/footer';
import Header from './components/header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () =>{
   return (
      <BrowserRouter>
       <ToastContainer/>
      <Header />
       <Routes />
       <Footer/>
      </BrowserRouter>
      );
}

export default App;
