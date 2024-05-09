// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const mongoose = require('mongoose');
require('dotenv').config()




const userRoutes = require('./routes/user')
const PORT = process.env['PORT'] || 5000;

const URI = process.env['momgo_url'];
// Initialize express app
const app = express();


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection

mongoose.connect(URI, {
    authSource: "admin",
    user: "root",
    pass: "example",
    useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log("MongoDB unabel to connect\n",err));





(async () => {

app.use(morgan())
    .use(express.json())
    .use(userRoutes);

    app.listen(PORT, () => {
        console.log(`server started port ${PORT}`);
});
}) ()