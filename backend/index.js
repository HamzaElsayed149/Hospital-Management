const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const doctorModel = require('./models/doctorModel');
const patientModel = require('./models/patientModel');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });



app.get('/doctors', async (req, res) => {
    const doctors = await doctorModel.find();
    res.json(doctors);
});
app.post('/addDoctor', upload.single('image'), async (req, res) => {
    try {
        const doctor = new doctorModel({
            name: req.body.name,
            specialty: req.body.specialty,
            imageUrl: `/uploads/${req.file.filename}`  
        });
        await doctor.save();
        res.status(201).json({ message: 'Doctor added successfully', doctor });
    } catch (err) {
        res.status(500).json({ message: 'Error adding doctor' });
    }
});
app.delete('/deleteDoctor/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await doctorModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting doctor' });
    }
});






app.get('/patient', async (req, res) => {
    const patient = await patientModel.find();
    res.json(patient);
});

app.post('/addpatient', async (req, res) => {
    try {
        const patient = new patientModel({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender  
        });
        await patient.save();
        res.status(201).json({ message: 'patient added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding doctor' });
    }
});
app.delete('/deletpatient/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await patientModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting patient' });
    }
});









mongoose.connect('mongodb+srv://hamza:123@cluster0.gjkjlov.mongodb.net/hospital-collection?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(5555, () => {
    console.log('Server running on port 5555');
});
