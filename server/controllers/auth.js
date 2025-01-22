const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

//Signup Router
router.post('/signup',  async(req,res) => {
    const {name, email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message: "User already exists"});
    
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({name, email, password: hashedPassword});
        await user.save();

        const payload = {userId: user.id};
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
        res.json({token});

    } catch(error) {
        console.error("An error occured");
        res.status(500).json({message: "An error occured"});
    }
})

//Login Router
router.post('/login', async(req,res) => {
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "Invalid Credentials"});

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched) return res.status(400).json({message: "Invalid Credentials"});

        const payload = {userId: user._id, name: user.name, email: user.email};
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});

        res.json({token});

    } catch(error) {
        console.error("An error occured", error.message);
        res.status(500).json({message: "An error occured"});
    }
})

module.exports = router;