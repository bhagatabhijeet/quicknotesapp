const fs = require('fs');
const path = require('path');

// Constants to hold the db pathe
const dbDir = path.join(__dirname, 'db');
const dbPath = path.join(dbDir, "db.json");

// Database wrapper class to perform operations on db/db.json
class DataBase {
    constructor() {

    }
    // Method to return raw/ string from db.json
    rawData() {
        return fs.readFileSync(dbPath);
    }

    // Method to return parse JSON from db.json
    jsonData() {
        return JSON.parse(this.rawData());
    }

    /**
     * Method to get the next available note id. 
     * This is to fill the gaps in the ids
     * for example if the db.json contains notes with ids : 1,3,4,...
     * This method will return next avilable id = 2
     */
    nextAvailableId() {
        let jData = this.jsonData().sort((a, b) => { a.id - b.id });
        let availableId = 1;
        for (let avId = 0; avId < jData.length; avId++) {
            if (parseInt(jData[avId].id) === avId + 1) {
                availableId++;
            }
            if (parseInt(jData[avId].id) !== avId) {
                break;
            }
        }
        return availableId;
    }

    // Method to add and store note.
    addNote(note) {
        note.id = this.nextAvailableId();
        let noteData = this.jsonData();

        //note that I use unshift and not push. This is to show the latest not on top when rendering.
        noteData.unshift(note);
        this.storeData(noteData);
        return noteData;
    }

    // Method to delete note
    deleteNote(id) {
        let index = this.jsonData().findIndex(element => parseInt(element.id) === parseInt(id));
        if (index !== -1) {
            let noteData = this.jsonData();
            noteData.splice(index, 1);
            this.storeData(noteData);
        }
    }

    // Mehod to convert json to string and save
    storeData(jsonData) {
        fs.writeFileSync(dbPath, JSON.stringify(jsonData));
    }
}

// Create instance of DataBase
let dataBase = new DataBase();

// export DataBase class's instance to other modules
module.exports = { dataBase }

