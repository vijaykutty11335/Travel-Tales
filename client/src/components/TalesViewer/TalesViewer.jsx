import React from 'react'
import '../TalesViewer/talesviewer.css';
import { MdOutlineUpdate } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";

const TalesViewer = ({taleViewerVisible, setTaleViewerVisible}) => {

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
                        <IoClose className='close-icon' onClick={() => setTaleViewerVisible(false)}/>
                    </div>
                </div>
                <div className='title-container'>
                    <span>Adventure in Amazon forest</span>
                </div>
                <div className='date-locations'>
                    <div className='date-container'>
                        <span>14-11-2024</span>
                    </div>
                    <div className='location-container'>
                        <div className='location-text'>
                            <GrMapLocation className='location-icon' />
                            <span>Amazon Forest, Brazil</span>
                        </div>
                    </div>
                </div>
                <div className='img-container'>
                    <img src="./samples/view-spectacular-nature-landscape.jpg" />
                </div>
                <div className='tale-viewer'>
                    <p>Exploring the Amazon Rainforest is a journey into the heart of nature's most vibrant and untamed wilderness. As you glide along the winding rivers in a canoe, the dense canopy above teems with life—playful monkeys swinging between branches, colorful toucans and macaws calling from the treetops, and the occasional glimpse of a jaguar's stealthy movement. The air is thick with the earthy scent of moss and damp leaves, mingled with the distant roar of cascading waterfalls.
                    
                    Guided walks reveal an astonishing array of flora and fauna, from towering kapok trees to medicinal plants and tiny, dazzling insects. Nights in the Amazon are equally magical, with the symphony of nocturnal creatures echoing under a blanket of stars.

                    Each moment is an awe-inspiring reminder of the interconnected beauty and power of this unique ecosystem, leaving you with a profound sense of wonder and respect for the natural world.
                    </p>
                </div>
            </div>
        </>
    )
}

export default TalesViewer
