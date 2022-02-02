import React from "react";
import moment from "moment";

export default function Session({sessionLength,
    decrementSessionLength,
    incrementSessionLength}){

const sessionLengthInMinutes = moment.duration(sessionLength,'s').minutes() 
return(
   <div id="session-label">
     <p>Session Length</p>
     <button id="session-decrement" onClick={decrementSessionLength}>-</button>
     <span id="session-length">{sessionLengthInMinutes}</span>
     <button id="session-increment" onClick={incrementSessionLength}>+</button>
   </div>
)
}