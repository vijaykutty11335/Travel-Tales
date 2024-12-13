const express = require('express');
const cors = require('cors');
const TravelTales = require('../models/travelTales');
const path = require('path');
const upload = require('../multer');
const router = express.Router();
router.use(cors());

//Create new TravelTales
router.post('/addTravelTales', upload.single('image'), async(req,res) => {
    const {title, story, visitedLocation, visitedDate} = req.body;

    const imageUrl = `http://localhost:3000/api/travelTales/${req.file.filename}`;

    if(!req.file) return res.status(400).json({message: "Image file is required!"});

    if(!title || !story || !imageUrl || !visitedLocation || !visitedDate) return res.status(403).json({message: "All fileds are required"});

    const parsedVisitedDate = new Date(parseInt(visitedDate));

    try{
        const travelTales = new TravelTales({title, story, imageUrl, visitedLocation, visitedDate: parsedVisitedDate});
        await travelTales.save();
        res.status(201).json({message: "Travel Tale added successfully!", travelTales});
    } catch(error) {
        console.error("An error occured", error.message);
        res.status(500).json({message: "An error occured"});
    }
})

//Get all tarvel Tales
router.get('/getallTravelTales', async(req,res) => {
    try{
        const travelTales = await TravelTales.find();
        res.status(200).json({message: "All Travel Tales are retrived Successfully", travelTales});

    } catch(error) {
        console.error("An error occured", error.message);
        res.status(500).json({message: "An error occured"});
    }
})

module.exports = router;