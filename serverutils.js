const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, 'db');
const dbPath = path.join(dbDir, "db.json");

// function storeNote(noteData){      
//     noteData.id=getNextAvailableId();
//     let rawdata = fs.readFileSync(dbPath);
//     let jsonData = JSON.parse(rawdata);
//     jsonData.unshift(noteData);    
//     fs.writeFileSync(dbPath,JSON.stringify(jsonData));
//     return noteData;
// }

// function getNextAvailableId(){
//     const rawdata = fs.readFileSync(dbPath);
//     const jsonData = JSON.parse(rawdata);
//     jsonData.sort((a, b)=>{a.id-b.id});
//     let availableId=1;
//     for(let avId=0;avId<jsonData.length;avId++){
//         if(parseInt(jsonData[avId].id) === avId+1){
//             availableId++;            
//         }
//         if(parseInt(jsonData[avId].id) !== avId){
//             break;           
//         }
//     }
//     return availableId;
// }



class DataBase{
    constructor(){

    }

    rawData(){
        return fs.readFileSync(dbPath);
    }

    jsonData(){
        return JSON.parse(this.rawData());
    }

    nextAvailableId(){
        // const rawdata = fs.readFileSync(dbPath);
        // const jsonData = JSON.parse(rawdata);
        let jData = this.jsonData().sort((a, b)=>{a.id-b.id});
        let availableId=1;
        for(let avId=0;avId<jData.length;avId++){
            if(parseInt(jData[avId].id) === avId+1){
                availableId++;            
            }
            if(parseInt(jData[avId].id) !== avId){
                break;           
            }
        }
        return availableId;
    }

    addNote(note){
        note.id=this.nextAvailableId();
        let noteData = this.jsonData();
        noteData.unshift(note);
        this.storeData(noteData);
        return noteData;
    }

    deleteNote(id){
        let index =  this.jsonData().findIndex(element=>parseInt(element.id) === parseInt(id));
        if(index !== -1){
            let noteData =this.jsonData();
            noteData.splice(index,1);
            this.storeData(noteData);
        }
    }

    storeData(jsonData){
        fs.writeFileSync(dbPath,JSON.stringify(jsonData));
    }
}

let dataBase = new DataBase(); 

module.exports={dataBase}

