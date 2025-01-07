import React, { useEffect, useRef, useState } from 'react'
import { IoAddOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import '../AddTalesContainer/Addtales.css';
import { AiOutlineFileImage } from "react-icons/ai";
import { GrMapLocation } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";


const AddTales = ({addTaleVisible, setAddTaleVisible}) => {
  const [locations, setLocations] = useState([]);
  const [inputLocation, setInputLocation] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [error, setError] = useState("");
  const [fields, setFields] = useState({title: "", tale: "", visitedDate: ""});
  const fileInputRef = useRef(null);

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

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if(file) setSelectedImg(URL.createObjectURL(file));
  }

  const handleFieldsChange = (e) => {
      setFields({...fields, [e.target.name] : e.target.value});
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      handleAddLocation();
    }
  }

  const handleAddTale = async() => {
    if(!fields.title || !fields.tale || !fields.visitedDate || locations.length===0){
      return setError("All fields are required");
    }
    setError("");
    
    const formData = new FormData();
    formData.append('title', fields.title);
    formData.append('tale', fields.tale);
    formData.append('visitedDate', fields.visitedDate);
    formData.append('visitedLocations', locations.join(', '));
    
    const imgFile = fileInputRef.current.files[0];
    if(imgFile){
      formData.append('imageUrl', imgFile);
    }

    try{
      await axios.post('http://localhost:3000/api/travelTales/addTravelTales', formData, {
        headers : {
          'Content-Type' : 'multipart/form-data'
        }
      });
      setError("");
      setAddTaleVisible(false);
      setLocations([]);
      setFields({title: "", tale: "", visitedDate: ""});
      setSelectedImg(null);

    } catch(error) {
      console.log(error.message);
      setError(error.response?.data?.message || "An error occured");
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
            <div className='addStory-btn' onClick={handleAddTale}>
              <IoAddOutline className='form-addbtn' />
              <span>Add Tale</span>
            </div>
            <div className='closeContainer'>
              <IoClose className='form-closeBtn' onClick={() => setAddTaleVisible(false)}/>
            </div>
          </div>
        </div>
        <form action="">
          { error && <div className='error-container'>
            <span>{error}</span>
          </div>}
          <div className='title-text'>
            <span>TITLE</span>
          </div>
          <div className='title-input'>
            <input type="text" name='title' placeholder='Add Title' value={fields.title} onChange={handleFieldsChange}/>
          </div>
          <div className='formDate-container'>
            <input type="date" name='visitedDate' value={fields.visitedDate} onChange={handleFieldsChange}/>
          </div>
          <div className='addImg-container'>
            <AiOutlineFileImage className='addImg-btn' onClick={() => fileInputRef.current.click()}/>

            {/* hidden Input */}
            <input type="file"
            accept='image/*'
            onChange={handleImgChange}
            ref={fileInputRef}
            id='img'
            style={{display : 'none'}}
            name='image'
             />

            <span>Browse image file to upload</span>
            {selectedImg && <img src={selectedImg} className='form-img' />}
            {selectedImg && <MdDeleteOutline className= 'formDelete-img' onClick={() => setSelectedImg(null)}/>}
          </div>
          <div className='tale-text'>
            <span>TALE</span>
          </div>
            <textarea className='tale-form' name="tale" placeholder='Your tale...' value={fields.tale} onChange={handleFieldsChange}></textarea>
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
        <ToastContainer/>
      </div>
    </>
  )
}

export default AddTales
