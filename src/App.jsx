import './App.css';
import React, {useEffect,useState,useRef} from 'react';

import  TimeLeft  from './components/TimeLeft';
import  Session  from './components/Session';
import Break from './components/Break';

  
  
  export default function App (){
    const audio = useRef(null)
    const initialMinutesBreak = 300
    const initialMinuteSession = (60*25)
    const minute = 60
    
    const [currentSessionType, setCurrentSessionType] = useState('Session')
    const [intervalId, setIntervalId] = useState(null)
    const [sessionLength, setSessionLength] = useState(initialMinuteSession)
    const [breakLength, setBreakLength] = useState(initialMinutesBreak)
    const [timeLeft, setTimeLeft] = useState(sessionLength)
  
   
    useEffect(()=>{
      setTimeLeft(sessionLength)
    },[sessionLength])
    
    useEffect(()=>{
      if(timeLeft === 0){
        audio.current.play()
        if(currentSessionType === "Session"){
          setCurrentSessionType("Break")
          setTimeLeft(breakLength)
        }else if(currentSessionType === "Break"){
           setCurrentSessionType("Session")
          setTimeLeft(sessionLength)
        }
      }
    },[breakLength,currentSessionType,sessionLength,timeLeft])
    
   
    const decrementBreakLength = () =>{
      const newBreakLength = breakLength - minute
      if(newBreakLength > 0){
        setBreakLength(newBreakLength)
      }
    }
    
    const incrementBreakLength = () =>{
      const newBreakLength = breakLength + 60
      if(newBreakLength <= 60 * 60){
        setBreakLength(breakLength + minute)  
      }
    }
    
    
    const decrementSessionLength = () =>{
      const newSessionLength = sessionLength - minute
       
      if(newSessionLength > 0){
        setSessionLength(newSessionLength)
      }
    }
    
    const incrementSessionLength = () =>{
      const newSessionLength = sessionLength + 60
      if(newSessionLength <= 60 * 60){
        setSessionLength(sessionLength + minute)  
      }
      
    }
    
  
    const isStarted = intervalId !== null
    const handleStartStop = () =>{
       if(isStarted){
        clearInterval(intervalId)
        setIntervalId(null)
       }else{   
        setIntervalId( setInterval(()=>{
        setTimeLeft(prevTimeLeft => prevTimeLeft-1)
        },1000))
           
        }
      }
      
    const handleResetButton = () =>{
      audio.current.load()
      clearInterval(intervalId)
      setInterval(null)
      setCurrentSessionType("Session")
      setSessionLength(initialMinuteSession)
      setBreakLength(60*5)
      setTimeLeft(initialMinuteSession)
    }
      return(
        <div className="content">     
          <Break
            breakLength={breakLength}
            decrementBreakLength={decrementBreakLength}
            incrementBreakLength={incrementBreakLength}
           />
          <TimeLeft 
            handleResetButton = {handleResetButton}
            handleStartStop = {handleStartStop}
            startStopButtonLabel = {isStarted ? 'Stop' : 'Start'}
            timerLabel={currentSessionType}
            timeLeft={timeLeft}
            breakLength={breakLength}
            sessionLength = {sessionLength}
          />
         
          <Session
           sessionLength = {sessionLength}
           decrementSessionLength = {decrementSessionLength}
           incrementSessionLength = {incrementSessionLength}
           />
          
          
          <audio id="beep"
            ref={audio}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav">
          </audio>
        </div>
      )
    
  }
