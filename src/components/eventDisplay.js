import React, {useState} from 'react'
import makeArray from "./makeArray"
import InputField from "./InputField"
import format from 'date-fns/format'

import "./style.css";

const EventDisplay = ({selectedDate, renderMonth, currentEvents, allEvents, handleNew, handleRemove}) => {

    const [newEvent, setNewEvent] = useState("");
    const dayFormat = "MM/dd/yyyy"
    const dayFormatShort = "eee do"

    const handleClick = (evt) => {
        evt.preventDefault()
        handleRemove(evt.currentTarget.id)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        handleNew(newEvent)
        setNewEvent("")
    }

    const DisplaySegment = () => {
        let arrayEvents
        let prettified
        if(selectedDate.getTime()!==new Date(0).getTime()){
            arrayEvents = makeArray(currentEvents);
            prettified = arrayEvents.map((event, index) => (
                <div className="item" key={index} id={currentEvents[index]._id} onClick={handleClick} >
                • {event}
                </div>
            ))
        }
        else{
            arrayEvents = makeArray(allEvents);
            prettified = arrayEvents.map((event, index) => (
                <div className="item" key={index} id={allEvents[index]._id} onClick={handleClick} >
                {format(new Date(allEvents[index].date), dayFormat)}: {event}
                </div>
            ))
        }

        return prettified;
    }

    return(
        <div className="eventDisplay">
            <h3>{`${selectedDate.getTime()===new Date(0).getTime() ? "All events" : "Your events for " + format(new Date(selectedDate),dayFormatShort) }` } </h3>
            <div>
                <DisplaySegment/>
                <InputField renderMonth = {renderMonth}
                handleSubmit = {handleSubmit}
                newEvent = {newEvent}
                setNewEvent = {setNewEvent}
                />
            </div>
        </div>
        
    )
}

export default EventDisplay;