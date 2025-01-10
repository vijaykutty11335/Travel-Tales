import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TravelTales from './components/TravelTalesPage/TravelTales'
import AddTales from './components/AddTalesContainer/AddTales';
import TalesViewer from './components/TalesViewer/TalesViewer';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';

const AppContent = () => {
  const [addTaleVisible, setAddTaleVisible] = useState(false);
  const [taleViewerVisible, setTaleViewerVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [taleId, setTaleId] = useState("");
  const [taleUpdateId, setTaleUpdateId] = useState("");

  const location = useLocation();
  const hideNavbar = ['/', '/login'];

  return (
    <>
        {!hideNavbar.includes(location.pathname) && (
          <Navbar setSearchTerm={setSearchTerm} addTaleVisible={addTaleVisible} taleViewerVisible={taleViewerVisible} />
        
        )}
        <AddTales addTaleVisible={addTaleVisible} setAddTaleVisible={setAddTaleVisible} taleUpdateId={taleUpdateId} setTaleUpdateId={setTaleUpdateId}/>
        <TalesViewer taleViewerVisible={taleViewerVisible} setTaleViewerVisible={setTaleViewerVisible} taleId={taleId} setAddTaleVisible={setAddTaleVisible} setTaleUpdateId={setTaleUpdateId}/>
        <Routes>
        <Route path='/travelTales' element={<TravelTales addTaleVisible={addTaleVisible} setAddTaleVisible={setAddTaleVisible} taleViewerVisible={taleViewerVisible} setTaleViewerVisible={setTaleViewerVisible} searchTerm={searchTerm} setSearchTerm={setSearchTerm} setTaleId={setTaleId}/>} />
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
