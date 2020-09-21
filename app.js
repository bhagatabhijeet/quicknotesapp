const express = require('express');
const path = require('path');
const fs = require('fs');
const serverUtil = require('./serverutils');
const { dataBase } = require('./serverutils');


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
    console.log("root");
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes",(req,res)=>{
    res.sendFile(path.join(__dirname,"public", "notes.html"));
});


app.get("/api/notes", (req, res) => {
    // console.log(dbPath);
    // let rawdata = fs.readFileSync(dbPath);
    // let jsonData = JSON.parse(rawdata);
    res.json(dataBase.jsonData()); 
});

app.post("/api/notes", (req, res) => {
    // console.log(req.data);
    // const postedNote =  serverUtil.storeNote(req.body)
    postedNote = dataBase.addNote(req.body);
    // let rawdata = fs.readFileSync(dbPath);
    // let jsonData = JSON.parse(rawdata);
    // jsonData.push(req.body);
    
    // fs.writeFileSync(dbPath,JSON.stringify(jsonData));
    // console.log(dbPath);
    // let rawdata = fs.readFileSync(dbPath);
    // let jsonData = JSON.parse(rawdata);
    // res.json(jsonData);
    // res.json("");
    // res.json(req.body);
    res.json(postedNote);
});

app.delete("/api/notes/:id",(req,res)=>{
    serverUtil.dataBase.deleteNote(req.params.id);
    res.end();
});

app.listen(PORT, () => {
    console.log("Server Started on port : " + PORT);
});