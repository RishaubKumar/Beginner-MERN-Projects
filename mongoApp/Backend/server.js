const express = require("express");
const path = require("path");
const mongoose = require("mongoose");//required mongoose to connect with mongodb 
const app = express();

app.use(express.static(path.join(__dirname , "../frontend")));
app.use(express.json());

// creating connection using mongo databse practice-app
mongoose.connect("mongodb://127.0.0.1:27017/mongo-app")
.then(()=>{console.log("Database Connected")})
.catch(err => console.log("database error",err))

// Creating mongoose schema to define the structure of database
userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    }
})

// creating a database model which will use to call the database (it means fetch and updating the data inside the database)
const User = mongoose.model("User", userSchema); //The mongoose.model() function takes two primary parameters: the singular name of the collection for which the model is being created, and the schema definition that dictates the structure of the documents in that collection

// let names = [];
// let idCount =1;

// After using mongodb we have to fetch the data from mongodb using async await 
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/index.html"));
})

// get
app.get("/api/names",async(req,res)=>{
    const users = await User.find();
    try{
        res.json(users);
    }catch(err){
        res.status(404).json({error: err.message});
    }
})
//post
app.post("/api/names",async(req,res)=>{
    try{
        const {name , id} = req.body;
    const newItem = new User({id,name})
    newItem.save()

    res.status(201).json(newItem);}
    catch(err){
        res.status(404).json({error:err.message});
    }
})
// EDIT
// app.put("/api/names/:id",async(req,res)=>{
    // try{
    //     const updatedName = await User.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
    //     res.status(200).json(updatedName);
    // }catch (err){
    //     res.status(404).json({error:err.message});
    // }
    // const id = Number(req.params.id);
    // const {newName} = req.body;
    // const item = names.find(i => i.id === id);
    // if(!item){
    //     return res.status(404).json({error:"Name not in the list which you want to update"})
    // }
    // item.newName = newName;
    // return res.json(item);
// }
// )
// UPDATE by _id
app.put("/api/names/:id", async (req, res) => {
  try {
    const updatedItem = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    // await User.findByIdAndUpdate( id,        // 1️⃣ What to find (req.params.id)
                            //  update,     // 2️⃣ What to change ({ name: req.body.name })
                            //  options );  // 3️⃣ How to behave ({ new: true })


    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE
app.delete("/api/names/:id",async(req,res)=>{
    try{
        const deletedItem = await User.findByIdAndDelete(req.params.id);
        if(!deletedItem){
           return res.status(404).json({error:"item not found in db."})
        }
    res.json({message:"name deleted from the array."})}
    catch(err){
        res.status(404).json({error:err.message});
    }
})
const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is listening at prot ${port}`);
})