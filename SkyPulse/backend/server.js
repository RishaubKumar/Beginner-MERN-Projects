const express = require('express');
// const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// using data base is (optional) in case you want to store data in database then use it other wise leave the schema and connection step you can directly store data in array or json file or can create the object
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/weather',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

//serve frontend
app.use(express.static(path.join(__dirname,"..","public"))); 

// const weatherSchema = mongoose.Schema({
//     city: String,
//     country: String,
//     temperature: Number,
//     description: String,
//     timeStamp:{type : Date,default: Date.now}
// })
// const Weather = mongoose.model('Weather',weatherSchema);

// // Proxy API endpoint
// app.get("/api/weather/:city",async(req , res)=>{
//     try{
//         const {city} = req.params;
//         const apikey = process.env.OPENWEATHER_API_KEY;
//         const url = `https://history.openweathermap.org/data/2.5/aggregated/year?q=${city}&appid=${apikey}&units=metric`

//         const response = await axios.get(url);
//         const Weatherdata = response.data;

//         // save to database (optional)
//         // const weatherDoc = new Weather({
//         //     city: Weatherdata.name,
//         //     country: Weatherdata.sys.country,
//         //     temperature: Weatherdata.main.temp,
//         //     description: Weatherdata.weather[0].description
//         // })
//         res.json(Weatherdata);
//     }catch(error){
//         res.status(500).json({error:"City not found or API error"});
//     }
// })

// // forecast endpoint
// app.get("/api/forecast/:city",async(req,res)=>{
//     try{
//         const {city} = req.params;
//         const apikey = process.env.OPENWEATHER_API_KEY;
//         const url = `https://history.openweathermap.org/data/2.5/aggregated/year?q=${city}&appid=${apikey}&units=metric`

//         const response = await axios.get(url);
//         const watherdata = response.data;
//         res.json(watherdata);
//     }catch(err){
//         res.status(500).json({err:'forcaste Unavilable'});
//     }

// })

app.get("/api/forecast/:city", async (req, res) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const city = req.params.city;

    const url =
      `https://api.openweathermap.org/data/2.5/forecast` +
      `?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    const { data } = await axios.get(url);
    return res.json(data);
  } catch (error) {
    console.log("OPENWEATHER ERROR:", error?.response?.status, error?.response?.data); // debug

    const status = error?.response?.status || 500;
    const data = error?.response?.data || { message: "Internal server error" };

    return res.status(status).json(data); // <-- key change [web:110]
  }
});

app.get("/api/weather/:city", async (req, res) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const city = req.params.city;

    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    const { data } = await axios.get(url);
    return res.json(data);
  } catch (error) {
    console.log("OPENWEATHER ERROR:", error?.response?.status, error?.response?.data);

    const status = error?.response?.status || 500;
    const data = error?.response?.data || { message: "Internal server error" };

    return res.status(status).json(data); 
  }
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})