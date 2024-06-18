const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const empmodel = require('./model/employee');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

mongoose.connect('mongodb://127.0.0.1:27017/skyniche', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post('/addemployee', upload.single('image'), (req, res) => {
  const { empnumber, firstname, lastname, email, department, designation, dateOfJoining, salary } = req.body;
  const data = {
    empnumber,
    firstname,
    lastname,
    email,
    department,
    designation,
    date: dateOfJoining,
    salary,
    image: req.file ? req.file.filename : null,
  };

  empmodel.create(data)
    .then(employee => res.json(employee))
    .catch(err => res.status(500).json({ error: 'Internal Server Error' }));
});

app.get('/getemp', (req, res) => {
  empmodel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

app.get('/getemp/:id', (req, res) => {
  const id = req.params.id;
  empmodel.findById({ _id: id })
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

app.get('/getempbydept/:department', (req, res) => {
  const department = req.params.department;
  empmodel.find({ department: department })
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

app.delete('/deleteemp/:id', (req, res) => {
  const id = req.params.id;
  empmodel.findByIdAndDelete({ _id: id })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.put('/updateemp/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const updateData = {
      firstname: req.body.firstname,
      empnumber: req.body.empnumber,
      lastname: req.body.lastname,
      email: req.body.email,
      department: req.body.department,
      designation: req.body.designation,
      date: req.body.date, // Changed to req.body.date to match the frontend
      salary: req.body.salary
  };

  if (req.file) {
      updateData.image = req.file.filename;
  }

  empmodel.findByIdAndUpdate({ _id: id }, updateData, { new: true })
      .then(user => res.json(user))
      .catch(err => res.json(err));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
