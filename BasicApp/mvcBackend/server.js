const express = require('express');
const path = require('path');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname,"../frotend")));

app.use("/api/items",itemRoutes);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/index.html"))
});

app.listen(3000,() =>{
    console.log("server is running at port 3000");
});