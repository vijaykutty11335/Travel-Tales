import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TravelTales from './components/TravelTalesPage/TravelTales'
import AddTales from './components/AddTalesContainer/AddTales';
import TalesViewer from './components/TalesViewer/TalesViewer';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';

const App = () => {
  const [addTaleVisible, setAddTaleVisible] = useState(false);
  const [taleViewerVisible, setTaleViewerVisible] = useState(false);

  return (
    <>
    <AddTales addTaleVisible={addTaleVisible} setAddTaleVisible={setAddTaleVisible}/>
    <TalesViewer taleViewerVisible={taleViewerVisible} setTaleViewerVisible={setTaleViewerVisible}/>
    <Router>
      <Routes>
        <Route path='/travelTales' element={<TravelTales addTaleVisible={addTaleVisible} setAddTaleVisible={setAddTaleVisible} taleViewerVisible={taleViewerVisible} setTaleViewerVisible={setTaleViewerVisible}/>}/>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
