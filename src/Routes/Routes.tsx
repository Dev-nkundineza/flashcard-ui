import  * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from '../components/signup';
import LoginComponent from '../components/login';
import Home from '../components/home';



const AllRoutes: React.FC = ()=>{
    
    const [id, setId] = React.useState(42);
    const handleIdChange = React.useCallback((newId : any) => {
      setId(newId);
    }, []);
    
    return (
  

    <Routes>
    <Route path="/" element={<Home handleIdChange={handleIdChange}/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<LoginComponent/>}/>
    </Routes>
)};
   


export default AllRoutes;