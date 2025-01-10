const express = require('express');
const cors = require('cors');
const TravelTales = require('../models/travelTales');
const upload = require('../multer');
const fs = require('fs');
const path = require('path');
const { warn } = require('console');
const router = express.Router();
router.use(cors());

//Create new TravelTales
router.post('/addTravelTales', upload.single('imageUrl'), async(req,res) => {

    const {title, tale, visitedLocations, visitedDate} = req.body;

    if(!req.file) return res.status(400).json({message: "Image file is required!"});

    const imageUrl = req.file.filename;

    if(!title || !tale || !imageUrl || !visitedLocations || !visitedDate) return res.status(403).json({message: "All fileds are required"});
    const parsedDate = new Date(visitedDate);
    const formattedDate = new Date(parsedDate);

    try{
        const travelTales = new TravelTales({title, tale, imageUrl, visitedLocations, visitedDate: formattedDate});
        await travelTales.save();
        res.status(201).json({message: "Travel Tale added successfully!", travelTales});
    } catch(error) {
        console.error("An error occured", error.message);
        res.status(500).json({message: "An error occured"});
    }
});

//Update Travel Tale by Id
router.put('/updateTravelTale/:id', upload.single('imageUrl'), async(req,res) => {
    const {title, tale,visitedLocations, visitedDate} = req.body;
    const imageUrl = req.file ? req.file.filename : "";
    
    try{
        const traveltale = await TravelTales.findById(req.params.id);
        if(!traveltale) return res.status(404).json({message: "TravelTale not Found"});

        traveltale.title = title;
        traveltale.tale = tale;
        traveltale.visitedDate = new Date(visitedDate);
        // traveltale.visitedLocations = JSON.parse(visitedLocations);

        if(imageUrl){
                fs.unlinkSync(path.join(__dirname, '../uploads', traveltale.imageUrl));
                traveltale.imageUrl = imageUrl;
        }

        await traveltale.save();
        res.status(200).json({message: "Travel Tale is updated successfully!", traveltale});

    } catch(error) {
        console.error("An error occured",error.message);
        res.status(500).json({message: "An error occured"});
    }
});

//Get all Tarvel Tales
router.get('/getallTravelTales', async(req,res) => {
    try{
        const travelTales = await TravelTales.find();
        res.status(200).json({message: "All Travel Tales are retrived Successfully", travelTales});

    } catch(error) {
        console.error("An error occured", error.message);
        res.status(500).json({message: "An error occured"});
    }
});

//Get Travel Tale by Id
router.get('/getTravelTaleById/:id', async(req,res) => {
    try{
        const travelTale = await TravelTales.findById(req.params.id);
        if(!travelTale) return res.status(404).json({message: "Travel Tale not Found"});
        res.status(200).json({message: "Tarvel Tale Fetched Successfully!", travelTale});
    }
    catch(error){
        console.log("error",error)
        res.status(500).json({message: "An error occured"});
    }
})

//delete travel tale by id
router.delete('/deleteTravelTale/:id', async(req,res) => {
    try{
        const traveltale = await TravelTales.findByIdAndDelete(req.params.id);
        if(!traveltale) return res.status(404).json({message: "Travel Tale not found"});
        
        fs.unlinkSync(path.join(__dirname, '../uploads', traveltale.imageUrl));
        res.status(200).json({message: "Travel Tale deleted successfully!", traveltale});

    } catch(error) { 
        console.error("An error occured", error.message);
        res.status(500).json({message: "An error occured"});
    }
})

module.exports = router;