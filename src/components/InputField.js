const InputField = ({renderMonth,handleSubmit,newEvent,setNewEvent}) => {
    let inputForm;
    if(!renderMonth){
        inputForm = 
        <form onSubmit={handleSubmit} key="1">    
            <input 
            className = "input"
            type="text"
            value={newEvent}
            onChange={e=>setNewEvent(e.target.value)}
            />
            <button className="submit" type="submit" value="submit">Save new event!</button>
        </form>
    }
    else{
        inputForm = <p>Select date to make new events!</p>
    }

    return inputForm;
}

export default InputField