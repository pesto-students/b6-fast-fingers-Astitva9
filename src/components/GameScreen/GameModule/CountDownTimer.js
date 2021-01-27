import React from "react";
//import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import RenderTime from './TimerClock'



const CountDownTimer= ({startgame,remainingtime}) => {

    return (
      <div className="timer-block">
        <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={remainingtime}
          colors={"#ff5155"}
        >
          
          <RenderTime
            startgame={startgame}
            remainingtime={remainingtime}
          />

        </CountdownCircleTimer>
        </div>
      </div>
    );
}


export default CountDownTimer; 
