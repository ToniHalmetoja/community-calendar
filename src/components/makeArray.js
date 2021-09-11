function makeArray(objectData){

    let arrayed = [];
    for(let i=0; i<objectData.length; i++){
        arrayed.push(objectData[i].note)
    }

return arrayed;
}

export default makeArray