// here we will update the backend to inlcude CRUD 
const { error } = require('console');
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
    res.json(newItem);
})
//Read (GET)
app.get("/api/items",(req,res)=>{
    res.json(items);
});
// Update (PUT)
app.put("/api/items/:id",(req , res)=>{
    const id = Number(req.params.id);
    const {name} = req.body;
    const item = items.find(i => i.id === id);
    if(!item) {
    return res.status(404).json({error: "Item not found"});
    }
    item.name = name ; 
    return res.json(item);
})
// Delete (DELETE)
app.delete("/api/items/:id",(req, res)=>{
    const {id} = req.params;
    items = items.filter(i => i.id != id);
    res.json({message:"Item deleted"});
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