
import { Outlet } from 'react-router-dom';
import './App.css'

import Footer from './components/Footer';
import WhatsAppButton from './components/Whatsapp';
import Navbar from './components/NavBar/Navbar';


function App() {


  return (
  
      <>
      <Navbar/>
        <Outlet/>
        <Footer/>
      <WhatsAppButton/>
      </>
        
    
  )
}

export default App;
