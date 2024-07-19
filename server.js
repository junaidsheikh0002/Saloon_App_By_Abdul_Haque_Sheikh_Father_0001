const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost/salon', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(cors());

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone_number: String,
});

const User = mongoose.model('User', userSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    service_id: mongoose.Schema.Types.ObjectId,
    date: Date,
    time: String,
    status: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

// Service Schema
const serviceSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    price: Number,
});

const Service = mongoose.model('Service', serviceSchema);

// User registration
app.post('/register', async(req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send('User registered successfully');
});

// Create booking
app.post('/booking', async(req, res) => {
    const booking = new Booking(req.body);
    await booking.save();
    res.send('Booking created successfully');
});

// List services
app.get('/services', async(req, res) => {
    const services = await Service.find();
    res.json(services);
});

app.listen(3000, () => console.log('Server started on port 3000'));