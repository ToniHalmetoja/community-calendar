import React from 'react'
import {format, isSameDay, startOfMonth} from 'date-fns'
import dayName from './dayName';
import {ReadAll, ReadOne} from "./crud";
import "./style.css";

function CalendarCell({date, 
  showEvents, 
  wday, 
  isTargetMonth, 
  isSelectedDay, 
  isToday,
  allEvents,
  holidays,
  children}) {

  const apiFormat = "yyyy-LL-dd"
  let holidayName = "";
  
  const handleClick = async (evt) => {
        const target = evt.currentTarget.id;
        if(!isSelectedDay){
          const eventData = await ReadOne(target);
          showEvents(target, eventData)
        }
        else{
          const eventData = await ReadAll();
          showEvents(target, eventData)
        }
    }

    const getDailyEventCount = () => {
      let eventCount = 0;
      for(let i = 0; i < allEvents.length; i++){
        if(isSameDay(date, new Date(allEvents[i].date))){
          eventCount++;
        }
      }
      if(eventCount > 0){
        return eventCount;
      }
      else{
        return null;
      }
    }

    const isHoliday = () => {
      let index = children-1;
      /*Hacky as hell but I could not think of any other way to ensure that holidays had time to update before this function triggers*/
      if(holidays.length !== 0 && holidays[0].datum === format(startOfMonth(new Date(date)), apiFormat) && isTargetMonth){
        if(holidays[index].datum === format(date, apiFormat) && holidays[index]["röd dag"] === "Ja"){
          holidayName = holidays[index].helgdag;
          return true;  
        }
      }
      else{
        return false;
      }
    }

     return (
      <div index={children-1} key={date} id={date} className={`${isToday ? "days today" : "days"} ${isHoliday() ? "holiday" : ""} ${isTargetMonth ? "thisMonth" : "anotherMonth"} ${isSelectedDay ? "selected" : ""}`} 
      onClick={handleClick}>
      {dayName(wday)} {children} 
      <p className="eventcount">{getDailyEventCount()}</p>
      <p className="holidayName">{holidayName}</p>
      </div>
    )
  }
  
  export default CalendarCell