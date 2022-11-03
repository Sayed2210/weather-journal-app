// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express= require('express');

// Start up an instance of app
const app= express();
const bodyParser= require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors= require('cors');
app.use(cors()); 

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port= 5500;
const server = app.listen(port, ()=>{
    console.log("server running"); 
     console.log(`running on localhost: ${port}`);}
 );

 //add a GET route 
 app.get('/all', (req,res) =>{
    res.send(projectData).status(200);
    projectData= {};
 })

 //add a POST route
 app.post('/add',(req,res)=>{
    projectData=
     {
      date: req.body.date,
      temp: req.body.temp,
      content: req.body.content,
    }
    res.send(projectData).status(200);
 })

