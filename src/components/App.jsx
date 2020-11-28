import React, { useState } from "react";
import randomWords from "random-words";
import Canvas from "./Canvas";
var wordCountVar = 0;
var secondsCounter = 0;
var displaySeconds = 0;
var minCounter = 0;
var displayMin = 0;
function App(props) {
  // call random word
  const [word, setWord] = useState("");
  // set to reset input feald
  const [typed, setTyped] = useState("");

  // set StopWatch
  const [seconds, setSeconds] = useState("00");
  const [minutes, setMinutes] = useState("00");

  function timeLoop() {
    secondsCounter++;
    if (secondsCounter < 10) {
      displaySeconds = "0" + secondsCounter.toString();
    } else {
      displaySeconds = secondsCounter;
    }
    if (secondsCounter === 59) {
      secondsCounter = -1;
    }
    if (secondsCounter === 0) {
      minCounter++;
    }
    if (minCounter < 10) {
      displayMin = "0" + minCounter.toString();
    } else {
      displayMin = minCounter;
    }
    setSeconds(displaySeconds);
    setMinutes(displayMin);
  }

  // words per minute calculation

  function wordsPerMin() {
    var secFraction = seconds / 60;
    var minFraction = minutes / 1;
    var timeInFraction = secFraction + minFraction;
    var wpm = wordCountVar / timeInFraction;
    console.log(wpm);
    console.log(timeInFraction);
  }

  function callRandomWord() {
    setWord(randomWords());
  }

  // add new word after typed word has matced set word
  function handleChange(event) {
    const typedText = event.target.value;
    setTyped(typedText);
    if (typedText === word) {
      wordCountVar++;
      wordsPerMin();
      setWord(randomWords());
      setTyped("");
    }
  }

  // call functions after start button is pressed
  function handleOnClick() {
    toggleSwitch();
    callRandomWord();
    setInterval(timeLoop, 1000);
  }
  const [toggle, setToggle] = useState(false);
  function toggleSwitch() {
    setToggle(true);
  }

  return (
    <div className="container">
      {toggle ? <Canvas /> : null}
      {toggle ? (
        <p>
          {minutes}:{seconds}
        </p>
      ) : null}
      <h1>{word} </h1>
      {toggle ? (
        <input
          className="textInput"
          placeholder="start....."
          onChange={handleChange}
          value={typed}
          autoFocus
        ></input>
      ) : null}
      {toggle ? null : <button onClick={handleOnClick}>start</button>}
    </div>
  );
}

export default App;
