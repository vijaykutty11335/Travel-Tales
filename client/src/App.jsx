import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TravelTales from './components/TravelTalesPage/TravelTales'
import AddTales from './components/AddTalesContainer/AddTales';
import TalesViewer from './components/TalesViewer/TalesViewer';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';

const AppContent = () => {
  const [addTaleVisible, setAddTaleVisible] = useState(false);
  const [taleViewerVisible, setTaleViewerVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [taleId, setTaleId] = useState("");
  const [taleUpdateId, setTaleUpdateId] = useState("");
  const [tales, setTales] = useState([]);

  const location = useLocation();
  const hideNavbar = ['/', '/login'];

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTales = async () => {
      try {
        const res = await axios.get('https://travel-tales-8zwx.onrender.com/api/travelTales/getAllTravelTales', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTales(res.data.travelTales);
      } catch(error){
        console.error('Error fetching tales:', error);
      }
    }
    fetchTales();
  }, [token]);

  const refreshTales = async() =>{
    try {
      const res = await axios.get('https://travel-tales-8zwx.onrender.com/api/travelTales/getAllTravelTales', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTales(res.data.travelTales);
    } catch(error){
      console.error('Error fetching tales:', error);
    }
  }

  return (
    <>
      {!hideNavbar.includes(location.pathname) && (
        <Navbar setSearchTerm={setSearchTerm} addTaleVisible={addTaleVisible} taleViewerVisible={taleViewerVisible} />

      )}
      <AddTales addTaleVisible={addTaleVisible} setAddTaleVisible={setAddTaleVisible} taleUpdateId={taleUpdateId} setTaleUpdateId={setTaleUpdateId} refreshTales={refreshTales}/>
      <TalesViewer taleViewerVisible={taleViewerVisible} setTaleViewerVisible={setTaleViewerVisible} taleId={taleId} setAddTaleVisible={setAddTaleVisible} setTaleUpdateId={setTaleUpdateId} refreshTales={refreshTales} />
      <Routes>
        <Route path='/travelTales' element={<TravelTales addTaleVisible={addTaleVisible} setAddTaleVisible={setAddTaleVisible} taleViewerVisible={taleViewerVisible} setTaleViewerVisible={setTaleViewerVisible} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setTaleId={setTaleId} tales={tales}/>} />
        <Route path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

const App = () => {

  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
