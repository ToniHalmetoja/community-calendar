
import React, {useEffect, useState} from 'react'

import {format, getDate, getDay, isSameDay, eachDayOfInterval, endOfWeek,
eachWeekOfInterval, addMonths, subMonths, startOfMonth, endOfMonth, 
isSameMonth, getDayOfYear} from 'date-fns'

import CalendarCell from "./calendarCell"
import EventDisplay from "./eventDisplay"
import {Write, Delete, ReadAll, Holidays} from "./crud"

const getCalendarArray = date => {
    const mondays = eachWeekOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date)
    }, {weekStartsOn: 1})

    return mondays.map(monday =>
        eachDayOfInterval(
            {start: monday, 
            end: endOfWeek(monday, {weekStartsOn: 1})}
        )
    )
  }  

function Calendar(){

    const [targetDate, setTargetDate] = useState(new Date())
    const calendar = getCalendarArray(targetDate)
    const today = new Date()
    const yearFormat = "LLLL yyyy"
    const apiFormat = "yyyy/LL"
    
    const [ selectedDate, setSelectedDate] = useState(new Date(0));
    const [ currentEvents, setCurrentEvents] = useState({});
    const [ allEvents, setAllEvents ] = useState({});
    const [ renderMonth, setRenderMonth ] = useState(true);
    const [ holidays, setHolidays ] = useState([]);
   
    useEffect(() => {
      async function returnMonths(){
        setSelectedDate(new Date(0));
        let response = await ReadAll();
        setCurrentEvents(response);
        setAllEvents(response);
        response = await Holidays(format(targetDate, apiFormat));
        setHolidays(response.dagar);
        setRenderMonth(true);
      }
      returnMonths()
    },[targetDate])

    const handleNew = async (newEvent) => {
      if(newEvent){
        const response = await Write(selectedDate, newEvent);
        if(response === "Update ok"){
          let response = await ReadAll();
          setAllEvents(response);
          var result = response.filter(obj => obj.date.includes(selectedDate.toString()))            
          setCurrentEvents(result)
        }
      }
    }

    const handleRemove = async (id) => {
      const response = await Delete(id);
      if(response === "Update ok"){
        let response = await ReadAll();
        setAllEvents(response);
        var result = response.filter(obj => obj.date.includes(selectedDate.toString()))            
        setCurrentEvents(result)
      }
    }

    const showEvents = (id, events) => {
      const newSelection = new Date(id);
      if(selectedDate.getTime() !== newSelection.getTime()){
        setSelectedDate(newSelection)
        setRenderMonth(false);
      }
      else{
        setSelectedDate(new Date(0));
        setRenderMonth(true);
      }
      const newEvents = [...events];
      setCurrentEvents(newEvents); /*Update reference, otherwise React won't know*/
    }
  
    return(
      <>
      <header className="header">
        <button className="nav" onClick={() => setTargetDate(subMonths(targetDate, 1))}>&#60;</button>
        <p className="monthYear">{format(targetDate, yearFormat)}</p>
        <button className="nav" onClick={() => setTargetDate(addMonths(targetDate, 1))}>&#62;</button>
      </header>
      <div className="wrapper">
          <section className="calendar">
              {calendar.map((weekRow, rowNum) => (
              <div className="oneWeek" key={rowNum}>
                {weekRow.map((date) => (
                  <CalendarCell 
                    date={date} 
                    key={getDayOfYear(date)} 
                    wday={getDay(date)} 
                    isTargetMonth={isSameMonth(date, targetDate)} 
                    isSelectedDay={isSameDay(date, selectedDate)}
                    isToday={isSameDay(date, today)}
                    showEvents={showEvents}
                    allEvents={allEvents}
                    holidays={holidays}
                    >
                    {getDate(date)}
                  </CalendarCell>
                ))}
              </div>
              ))}
          </section>
          <EventDisplay 
          selectedDate={selectedDate} 
          renderMonth = {renderMonth} 
          currentEvents={currentEvents} 
          allEvents={allEvents}
          handleNew={handleNew}
          handleRemove={handleRemove}
          />
      </div>
      </>
    )
}



export default Calendar