const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, 'db');
const dbPath = path.join(dbDir, "db.json");

function storeNote(noteData){      
    noteData.id=getNextAvailableId();
    let rawdata = fs.readFileSync(dbPath);
    let jsonData = JSON.parse(rawdata);
    jsonData.unshift(noteData);    
    fs.writeFileSync(dbPath,JSON.stringify(jsonData));
    return noteData;
}

function getNextAvailableId(){
    const rawdata = fs.readFileSync(dbPath);
    const jsonData = JSON.parse(rawdata);
    jsonData.sort((a, b)=>{a.id-b.id});
    let availableId=1;
    for(let avId=0;avId<jsonData.length;avId++){
        if(parseInt(jsonData[avId].id) === avId+1){
            availableId++;            
        }
        if(parseInt(jsonData[avId].id) !== avId){
            break;           
        }
    }
    return availableId;
}


module.exports={storeNote}

