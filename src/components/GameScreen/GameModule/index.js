import React from 'react';
import { Row, Col} from 'react-bootstrap';
import CountDownTimer from './CountDownTimer';
import '../index.css';
const GameModule = ({startgame, gameWord, onWordChange, inputValue, timervalue}) => {

    
    const getCurrentWordComponent = () => {
        const wordCharacters = gameWord.split('');
        const userInputCharacters = inputValue.split('');
        return (
          <div className="new-word">
            {wordCharacters.map((char, i) => {
              let color;
              if (i < inputValue.length) {
                color = char === userInputCharacters[i] ? '#54ba18' : '#445298';
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
                            <div className="score-div">
                                <p className="highest-heading"></p>
                                <p className="white-heading">Game 1 : 00:09</p>
                                
                            </div>
                            <div className="score-div">
                                <div className="highest-heading">Personal Best</div>
                                <p className="white-heading">Game 2 : 00:09</p>
                                
                            </div>
                            <div className="score-div">
                                <p className="highest-heading"></p>
                                <p className="white-heading">Game 3 : 00:09</p>
                                
                            </div>
                        </Row>
                    </div>
                </div>
            </Col>
            <Col sm={6} className="game-block text-center">
                <Row>
                    <Col><CountDownTimer 
                            startgame={startgame}
                            remainingtime={timervalue}
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