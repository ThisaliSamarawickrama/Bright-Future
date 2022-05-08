const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URI;
global.URL = url;

mongoose.connect(url, { useNewUrlParser: true,   useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB connection successfully");
});

const student = require('./routes/student.js');
app.use('/student', student);

const teacher = require('./routes/teacher.js');
app.use('/teacher', teacher);

const payment = require('./routes/payment.js');
app.use('/payment', payment);


const class_teacher = require('./routes/class.js');
app.use('/class_teacher', class_teacher);


const result = require('./routes/result.js');
app.use('/result', result);


const user = require('./routes/user.js');
app.use('/user', user);

app.listen(port,() =>{
    console.log(`Server is running on port: ${port}`);
});