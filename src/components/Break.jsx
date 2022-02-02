import React from "react"
import moment from "moment"

export default function Break({breakLength,
    decrementBreakLength,
    incrementBreakLength}){

const breakLengthInMinutes = moment.duration(breakLength,'s').minutes()

return(
<div id="break-label">
      <p>Break Length</p>
      <button id="break-decrement" onClick={decrementBreakLength}>-</button>
      <span id="break-length">{breakLengthInMinutes}</span>
      <button id="break-increment" onClick={incrementBreakLength}>+</button>   
    </div>
)

}
