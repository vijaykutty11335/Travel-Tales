import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import '../TravelTalesPage/TravelTales.css'
import { MdFavorite } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import AddTales from '../AddTalesContainer/AddTales';

const TravelTales = ({addTaleVisible, setAddTaleVisible, taleViewerVisible, setTaleViewerVisible}) => {

  const [isFav, setIsFav] = useState(false);

  const handleIsFav = () => {
    setIsFav(!isFav);
  }

  return (
    <>
      <div className={`maincontainer ${addTaleVisible ? "blurred" : ""} ${taleViewerVisible ? "blurred" : ""}`}>
        <Navbar />
        <AddTales />
        <IoAddCircle className='add-icon' onClick={() => setAddTaleVisible(true)}/>
        <div className='subcontainer'>
          <div className='tale-container'>
            <MdFavorite className={`fav-icon ${isFav ? "visible" : ""}`}  onClick={handleIsFav}/>
            <div className='card-img'>
              <img src="./samples/3d-rendering-chinese-great-wall.jpg" alt="wall" />
            </div>
            <div className='card-texts'  onClick={() => setTaleViewerVisible(true)}>
              <div className='card-title'>
                <span>The great wall of China</span>
              </div>
              <span className='card-date'>8th Jun 2024</span>
              <div className='card-tale'>
                <span>It was a great experience of walking along with the wall</span>
              </div>
              <div className='card-locations'>
                <div className='locations'>
                <GrMapLocation className='cardLocation-icon'/>
                <span>Machu pichu, Peru</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default TravelTales
