import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import '../TravelTalesPage/TravelTales.css'
import { MdFavorite } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import AddTales from '../AddTalesContainer/AddTales';
import axios from 'axios';
import {format} from 'date-fns';

const TravelTales = ({addTaleVisible, setAddTaleVisible, taleViewerVisible, setTaleViewerVisible, searchTerm, setSearchTerm, setTaleId}) => {

  const [isFav, setIsFav] = useState(false);
  const [allTales, setAllTales] = useState([]);

  const handleIsFav = () => {
    setIsFav(!isFav);
  }

useEffect(() => {
  const handleGetAllTraveltales = async() => {
    try{
      const fetchedTales = await axios.get('http://localhost:3000/api/travelTales/getallTravelTales');
      const talesArray = fetchedTales.data.travelTales;
      console.log(talesArray);
      setAllTales(talesArray);

  } catch(error) {
    console.error("An error occured", error.message);
  }
  }
  handleGetAllTraveltales();

},[])

const handleGetTravelTaleById = async(id) => {
  try{
    const travelTale = await axios.get(`http://localhost:3000/api/travelTales/getTravelTaleById/${id}`);
    const taleArray = travelTale.data.travelTale;
    setTaleId(taleArray._id);


  } catch(error){
    console.error(error.response?.data?.error?.message || "An error occured");
  }
}

const filteredData = allTales.filter((item) => {
    return(
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.visitedDate.includes(searchTerm)
    )
})

  return (
    <>
      <div className={`maincontainer ${addTaleVisible ? "blurred" : ""} ${taleViewerVisible ? "blurred" : ""}`}>
        <Navbar setSearchTerm={setSearchTerm}/>
        <AddTales />
        <IoAddCircle className='add-icon' onClick={() => setAddTaleVisible(true)}/>
        <div className='subcontainer'>
          { filteredData.map((tale, index) => (

          <div className='tale-container' key={index}>
            <MdFavorite className={`fav-icon ${isFav ? "visible" : ""}`}  onClick={handleIsFav}/>
            <div className='card-img'>
              <img src={`http://localhost:3000/uploads/${tale.imageUrl}`} alt={tale.title}/>
            </div>
            <div className='card-texts'  onClick={() => {setTaleViewerVisible(true); handleGetTravelTaleById(tale._id);}}>
              <div className='card-title'>
                <span>{tale.title}</span>
              </div>
              <span className='card-date'>{format(new Date(tale.visitedDate), 'MMMM dd, yyyy')}</span>
              <div className='card-tale'>
                <span>{tale.tale}</span>
              </div>
              <div className='card-locations'>
                <div className='locations'>
                <GrMapLocation className='cardLocation-icon'/>
                <span>{tale.visitedLocations.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default TravelTales
