import React from "react"
import moment from "moment"
import momentDurationFormatSetup from "moment-duration-format"

momentDurationFormatSetup(moment)
export default function TimeLeft ({handleResetButton,handleStartStop,startStopButtonLabel,timeLeft,timerLabel}){

    const formattedTimeLeft = moment.duration(timeLeft,'s').format('mm:ss', {trim: false})
    return(
      <div className="session-label">
        <p id="timer-label">{timerLabel}</p>
        <p id="time-left">{formattedTimeLeft}</p>
        <button id="start_stop" onClick={handleStartStop}>{startStopButtonLabel}</button>
        <button id="reset" onClick={handleResetButton}>Reset</button>
      </div>
    )
  }