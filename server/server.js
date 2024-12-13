require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/user', require('./controllers/auth'));
app.use('/api/travelTales', require('./controllers/travelTales'));
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on Port ${PORT}...`));
