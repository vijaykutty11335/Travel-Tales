import React, { useEffect, useState } from 'react'
import '../TalesViewer/talesviewer.css';
import { MdOutlineUpdate } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import axios from 'axios';

const TalesViewer = ({ taleViewerVisible, setTaleViewerVisible, taleId }) => {
    const [tale,setTale] =  useState(null);

    useEffect(() => {
        const FetchTaleById = async () => {
            if(!taleId) return;
            try {
                const taleById = await axios.get(`http://localhost:3000/api/travelTales/getTravelTaleById/${taleId}`);
                const fetchedTale = taleById.data.travelTale;
                console.log(fetchedTale);
                setTale(fetchedTale);

            } catch (error) {
                console.log(error.response?.data?.error?.message || "An error occured");
            }
        };
        FetchTaleById();
    }, [taleId]);

    if (!tale) return null;

    return (
        <>
            <div className={`viewer-container ${taleViewerVisible ? "visible" : "hidden"}`}>
                <div className='viewer-header'>
                    <div className='update-btn'>
                        <MdOutlineUpdate className='update-icon' />
                        <span>Update</span>
                    </div>
                    <div className='delete-btn'>
                        <MdDeleteOutline className='delete-icon' />
                        <span>Delete</span>
                    </div>
                    <div className='close-viewer'>
                        <IoClose className='close-icon' onClick={() => setTaleViewerVisible(false)} />
                    </div>
                </div>
                <div className='title-container'>
                    <span>{tale.title}</span>
                </div>
                <div className='date-locations'>
                    <div className='date-container'>
                        <span>{tale.visitedDate}</span>
                    </div>
                    <div className='location-container'>
                        <div className='location-text'>
                            <GrMapLocation className='location-icon' />
                            <span>{tale.visitedLocations?.join(', ')}</span>
                        </div>
                    </div>
                </div>
                <div className='img-container'>
                    <img src={`http://localhost:3000/uploads/${tale.imageUrl}`} alt={tale.title} />
                </div>
                <div className='tale-viewer'>
                    <p>{tale.tale}</p>
                </div>
            </div>
        </>
    )
}

export default TalesViewer
