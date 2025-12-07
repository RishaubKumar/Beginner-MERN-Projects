// here we will update the backend to inlcude CRUD 
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json()); // To parse json body
app.use(express.static(path.join(__dirname,"../frontend")));

let items = [];
let idCount = 1;

//Homepage
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/index.html"));
});

// ---------------CRUD API-------------
//Create (POST)
app.post("/api/items",(req,res)=>{
    const {name} = req.body;
    const newItem = {id: idCount++,name};
    items.push(newItem);
})
// start server
const port = process.env.port || 3000;

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`)
})


// // here is the basic app backend where we can connect the frontend with backend in most simplest way by just serving a static html file through fontend
// const express = require('express');
// const path = require('path');

// const app = express();

// // server the frontend folder
// app.use(express.static(path.join(__dirname,"../frontend")));

// // Route for homepage
// app.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname,"../frontend/index.html"));
// });

// // start server
// const port = process.env.port || 3000;

// app.listen(port,()=>{
//     console.log(`Server is listening at port ${port}`)
// })