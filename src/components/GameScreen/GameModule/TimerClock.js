import React, { useRef, useState, useCallback} from "react";

const RenderTime = ({ startgame, remainingTime }) => {
    const currentTime = useRef(remainingTime);
    const prevTime = useRef(null);
    const isNewTimeFirstTick = useRef(false);
    const [, setOneLastRerender] = useState(0);

    //console.log({currentTime});
    useCallback(() => {
      console.log('called on time',remainingTime);
      currentTime.current = remainingTime;
     
    }, [remainingTime])
  
    if (currentTime.current !== remainingTime) {
      isNewTimeFirstTick.current = true;
      prevTime.current = currentTime.current;
      currentTime.current = remainingTime;
    } else {
      isNewTimeFirstTick.current = false;
    }
  
    // force one last re-render when the time is over to trigger the last animation
    if (remainingTime === 0) {
      setTimeout(() => {
        setOneLastRerender(val => val + 1);
        //startgame(false)
      }, 20);
    }
  
    const isTimeUp = isNewTimeFirstTick.current;
  
    return (
      <div className="time-wrapper">
        <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
          {remainingTime}
        </div>
        
      </div>
    );
  };

export default RenderTime;