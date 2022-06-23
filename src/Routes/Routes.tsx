import  * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginComponent from '../components/login';
import Home from '../components/home';
import Dashboard from '../components/dashboard';



const AllRoutes: React.FC = ()=>{
    
    const [id, setId] = React.useState(42);
    const handleIdChange = React.useCallback((newId : any) => {
      setId(newId);
    }, []);
    
    return (
  

    <Routes>
    <Route path="/" element={<Home handleIdChange={handleIdChange}/>}/>
    <Route path="/signin" element={<LoginComponent/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
)};
   


export default AllRoutes;