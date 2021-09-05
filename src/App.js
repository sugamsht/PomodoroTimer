import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [breakTime, setBreakTime] = useState(5);
  const [start, setStart] = useState(false);

  const minuteTimer = minutes < 10 ? `0${minutes}` : minutes;
  const secondTimer = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
    if (start) {
      let interval = setInterval(() => {
        clearInterval(interval);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
          else {
            let minutes = displayMessage ? 25 : breakTime;
            let seconds = 0;

            setSeconds(seconds);
            setMinutes(minutes);
            setDisplayMessage(!displayMessage);
          }
        } else { setSeconds(seconds - 1); }
      }, 1000);
    }
  }, [breakTime, displayMessage, minutes, seconds, start]);



  function handleChange(newValue) {
    if ((newValue >= 1 && newValue < 61) && !displayMessage)
      setMinutes(newValue);
  }

  function Breaker(newBreak) {
    if ((newBreak >= 1 && newBreak < 61) && !displayMessage)
      setBreakTime(newBreak);
  }
  function start_stop() {
    setStart(!start);
    // setSeconds(seconds + 1);
  }

  function reset() {
    setBreakTime(5);
    setMinutes(25);
    setSeconds(0);
    setDisplayMessage(false);
    setStart(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Menu">
          <BreakTime onChange={Breaker} value={breakTime} />
          <TotalTime onChange={handleChange} value={minutes} />
        </div>
        <div id="timer-label">Session</div>
        <div id="time-left">
          <h1> {minuteTimer}:{secondTimer} </h1>
        </div>
        <button id="start_stop" onClick={start_stop}>Start</button>
        <button id="reset" onClick={reset}>Reset</button>
        <div className="timer-label">
          {displayMessage && <div> Break time! New session starts in: {breakTime} minutes </div>}
        </div>
      </header>
    </div>
  );
}

function BreakTime({ value, onChange }) {

  var breakTimer = value;
  return (
    <div id="break-label" >
      <h3>Break Time</h3>
      <div class="break">
        <button id="break-decrement" onClick={() => onChange(breakTimer - 1)}>-</button>
        <div id="break-length">{breakTimer < 2 ? 1 : breakTimer} </div>
        <button id="break-increment" onClick={() => onChange(breakTimer + 1)} >+</button>
      </div>
    </div>
  )
}

function TotalTime({ value, onChange }) {

  var newVal = value;

  return (
    <div id="session-label" >
      <h3>Set Timer</h3>
      <div class="session">
        <button id="session-decrement" onClick={() => onChange(newVal - 1)}>-</button>
        <div id="session-length">{value < 2 ? 1 : value}</div>
        <button id="session-increment" onClick={() => onChange(newVal + 1)} >+</button>
      </div>
    </div>
  )
}
export default App;
