
import { Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/Whatsapp';


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
