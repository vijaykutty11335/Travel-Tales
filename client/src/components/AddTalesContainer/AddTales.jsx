import React, { useState } from 'react'
import { IoAddOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import '../AddTalesContainer/Addtales.css';
import { AiOutlineFileImage } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";


const AddTales = ({addTaleVisible, setAddTaleVisible}) => {
  const [locations, setLocations] = useState([]);
  const [inputLocation, setInputLocation] = useState("");

  const handleAddLocation = () =>{
    if(inputLocation.trim()){
      setLocations([...locations, inputLocation.trim()]);
      setInputLocation("");
    }
  }

  const handleRemoveLocation = (index) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      handleAddLocation();
    }
  }

  return (
    <>
      <div className={`form-container ${addTaleVisible ? "visible" : "hidden"}`}>
        <div className='form-header'>
          <div className='addStory-title'>
            <span>Add Tale</span>
          </div>
          <div className='header-right'>
            <div className='addStory-btn'>
              <IoAddOutline className='form-addbtn' />
              <span>Add Tale</span>
            </div>
            <div className='closeContainer'>
              <IoClose className='form-closeBtn' onClick={() => setAddTaleVisible(false)}/>
            </div>
          </div>
        </div>
        <form action="">
          <div className='title-text'>
            <span>TITLE</span>
          </div>
          <div className='title-input'>
            <input type="text" placeholder='Add Title' />
          </div>
          <div className='formDate-container'>
            <input type="date" />
          </div>
          <div className='addImg-container'>
            <AiOutlineFileImage className='addImg-btn' />
            <span>Browse image file to upload</span>
            <img src="./samples/view-spectacular-nature-landscape.jpg" className='form-img' />
            <MdDeleteOutline className= 'formDelete-img'/>
          </div>
          <div className='tale-text'>
            <span>TALE</span>
          </div>
            <textarea className='tale-form' name="tale" placeholder='Your tale...' ></textarea>
          <div className='locations-text'>
            <span>VISITED LOCATIONS</span>
          </div>
          <div className='locations-listContainer'>
            {locations.map((location, index) => (
            <div className='locations-list' key={index}>
              <GrMapLocation className='locationList-icon'/>
              <span>{location}</span>
              <IoClose className='location-remover' onClick={() => handleRemoveLocation(index)}/>
            </div>
            ))}
          </div>
          <div className='location-input'>
              <input type="text" placeholder='Add Location' value={inputLocation} onChange={(e) => setInputLocation(e.target.value)} onKeyDown={handleKeyDown}/>
              <IoAddOutline className='addLocation-btn' onClick={handleAddLocation}/>
            </div>

        </form>
      </div>
    </>
  )
}

export default AddTales
