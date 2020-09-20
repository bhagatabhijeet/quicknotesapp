const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3000;
const dbDir = path.join(__dirname, 'db');
const dbPath = path.join(dbDir, "db.json");


app.use(express.static(path.join(__dirname, "public")));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/notes", (req, res) => {
    console.log(dbPath);
    let rawdata = fs.readFileSync(dbPath);
    let jsonData = JSON.parse(rawdata);
    res.json(jsonData); 
});

app.post("/api/notes", (req, res) => {
    // console.log(req.data);
    let rawdata = fs.readFileSync(dbPath);
    let jsonData = JSON.parse(rawdata);
    jsonData.push(req.body);
    
    fs.writeFileSync(dbPath,JSON.stringify(jsonData));
    // console.log(dbPath);
    // let rawdata = fs.readFileSync(dbPath);
    // let jsonData = JSON.parse(rawdata);
    // res.json(jsonData);
    res.json();
});


app.listen(PORT, () => {
    console.log("Server Started on port : " + PORT);
});