const express = require('express');
const path = require('path');
const fs = require('fs');
const serverUtil = require('./serverutils');
const { dataBase } = require('./serverutils');

// create express app
const app = express();

// use port 3000 in dev and provess.env.PORT (80) in production
const PORT = process.env.PORT || 3000;

//use of static public dir
app.use(express.static(path.join(__dirname, "public")));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));

// use of express.json to handle json response
app.use(express.json());

// Routes
// **************************************************
// GET /
app.get("/", (req, res) => {
    console.log("root");
    res.sendFile(path.join(__dirname, "index.html"));
});

// GET /notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// GET /api/notes
app.get("/api/notes", (req, res) => {
    res.json(dataBase.jsonData());
});

// POST /api/notes
app.post("/api/notes", (req, res) => {
    postedNote = dataBase.addNote(req.body);
    res.json(postedNote);
});

// DELETE /api/note/:id
app.delete("/api/notes/:id", (req, res) => {
    serverUtil.dataBase.deleteNote(req.params.id);
    res.end();
});

// start listening on port
app.listen(PORT, () => {
    console.log("Server Started on port : " + PORT);
});