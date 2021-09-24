/*Change to wherever the backend is*/
const fetchURL = "https://calendar-community.herokuapp.com";

const ReadAll = async () => {
    
    const response = await fetch(fetchURL + "/readall", {method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
        });
        
    const eventData = await response.json();

    eventData.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    });
    return eventData;
}

const ReadOne = async (date) => {
    
    const response = await fetch(fetchURL + "/readone", {method: "POST",
        body: JSON.stringify({
          id: date.toString()
        }),
        headers: {
            'Content-Type': 'application/json'
        }
        });
        
        const eventData = await response.json();
        return eventData;
        
}


const Write = async (date, note) => {
   const resp = await fetch(fetchURL + "/write", {method: "POST",
        body: JSON.stringify({
          date: date.toString(),
          note: note
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const response = await resp.json();
    return response;
}

const Delete = async (id) => {
    const resp = await fetch(fetchURL + "/delete", {method: "POST",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const response = await resp.json();
    return response;
}

const Holidays = async (month) => {
    const resp = await fetch("https://sholiday.faboul.se/dagar/v2.1/" + month, {method: "GET"});
    const response = await resp.json();
    return response;
}

export {
    ReadAll,
    ReadOne,
    Write,
    Delete, 
    Holidays
}