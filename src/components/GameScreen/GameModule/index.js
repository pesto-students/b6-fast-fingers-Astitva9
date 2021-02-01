import React from 'react';
import { Row, Col} from 'react-bootstrap';
import CountDownTimer from './CountDownTimer';
import '../index.css';

function formatTimeLeft(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
  
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    return `${minutes}:${seconds}`;
}
const GameModule = ({startgame, gameWord, onWordChange, inputValue, timervalue, getScore, totalScoreArray}) => {

    let scorePanel ='';
    if(totalScoreArray.length>0){
      
        scorePanel = totalScoreArray.map((singleScore, index) =>{
            
            let isPersonalBest = false
            if(Math.max(...totalScoreArray) === singleScore){
                isPersonalBest=true;

            }
            
            return (
                <div className="score-div">
                    <div className="highest-heading">{ (isPersonalBest === true)? 'Personal Best':'' }</div>
                    <p className="white-heading">Game {index} : {formatTimeLeft(singleScore)}</p>
                </div>
            )
        })
    }
   


    const getCurrentWordComponent = () => {
        const wordCharacters = gameWord.split('');
        const userInputCharacters = inputValue.split('');
        return (
          <div className="new-word">
            {wordCharacters.map((char, i) => {
              let color;
              if (i < inputValue.length) {
                if(char === userInputCharacters[i].toUpperCase())
                    color ='#069a0b';
                else
                    color ='#680bcc';
              }
              return (
                <span key={i} style={{ color: color }}>
                  {char}
                </span>
              );
            })}
          </div>
        );
      };
    

    return (
        <Row className="gm-main-row">
            <Col sm={3}>
                <div className="text-center">
                    <div className="scores-box">
                        <Row>
                            <Col className="score-heading">SCORE BOARD</Col>
                            <hr></hr>
                        </Row>

                        <Row>
                            {scorePanel}
                        </Row>
                    </div>
                </div>
            </Col>
            <Col sm={6} className="game-block text-center">
                <Row>
                    <Col>
                        <CountDownTimer 
                            startgame={startgame}
                            timeLimit={timervalue}
                            currentWord={gameWord}
                            getScore={getScore}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col className="word-suggestion">{getCurrentWordComponent()}</Col>
                </Row>
                <Row>
                    <Col>
                        <input 
                        className="answer-field"
                        value={inputValue}
                        onChange={onWordChange}
                        autoFocus={true}
                        />
                        
                    </Col>
                </Row>
                
            </Col>
        </Row>
    );
}

export default GameModule;