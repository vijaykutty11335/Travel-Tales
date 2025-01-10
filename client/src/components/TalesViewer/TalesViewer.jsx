import React, { useEffect, useState } from 'react'
import '../TalesViewer/talesviewer.css';
import { MdOutlineUpdate } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import axios from 'axios';
import {format} from 'date-fns';
import {useSpeechSynthesis} from 'react-speech-kit'

const TalesViewer = ({ taleViewerVisible, setTaleViewerVisible, taleId, setTaleUpdateId, setAddTaleVisible }) => {
    const [tale,setTale] =  useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const {speak, speaking, cancel} = useSpeechSynthesis();
    console.log(isSpeaking);

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

    const handleDeleteTale = async(id) => {
        try{
            await axios.delete(`http://localhost:3000/api/travelTales/deleteTravelTale/${id}`);
            console.log("Travel Tale Deleted Successfully!");
            setTaleViewerVisible(false);

        } catch(error){
            console.log("An error occured",error);
        }
    }

    useEffect(() => {
        setIsSpeaking(speaking);
    },[speaking])
    
    const textToSpeech = () => {
        if(speaking){
            cancel();
        }
        else if(tale?.tale){
            speak({text: tale.tale});
        }
    }

    if (!tale) return null;

    return (
        <>
            <div className={`viewer-container ${taleViewerVisible ? "visible" : "hidden"}`}>
                <div className='viewer-header'>
                    <div className='update-btn' onClick={() => {setTaleUpdateId(tale._id); setTaleViewerVisible(false); setAddTaleVisible(true)}}>
                        <MdOutlineUpdate className='update-icon' />
                        <span>Update</span>
                    </div>
                    <div className='delete-btn' onClick={() => handleDeleteTale(tale._id)}>
                        <MdDeleteOutline className='delete-icon' />
                        <span>Delete</span>
                    </div>
                    <div className='close-viewer'>
                        <IoClose className='close-icon' onClick={() => {setTaleViewerVisible(false); if(speaking) cancel(); setIsSpeaking(false)}} />
                    </div>
                </div>
                <div className='title-container'>
                    <span>{tale.title}</span>
                </div>
                <div className='date-locations'>
                    <div className='date-container'>
                        <span>{format(new Date(tale.visitedDate), 'MMMM dd, yyyy')}</span>
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
                <div className='text-speech' onClick={textToSpeech}>
                    {isSpeaking ? (<HiMiniSpeakerWave className='speakerOn-icon'/>) : (<HiMiniSpeakerXMark className='speakerOff-icon'/>)}
                </div>
                <div className='tale-viewer'>
                    <p>{tale.tale}</p>
                </div>
            </div>
        </>
    )
}

export default TalesViewer
