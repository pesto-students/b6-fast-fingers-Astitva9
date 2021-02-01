import React from 'react';
import { Row, Col} from 'react-bootstrap';
import '../index.css';
function formatTimeLeft(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
  
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    return `${minutes}:${seconds}`;
  }
const ExitModule = ({startGame, resetGame, currentTotalScore, playAgainOnclick}) => {

    const startNewGame = () => {
        resetGame();
        startGame(true);
        playAgainOnclick(currentTotalScore);
    }

    return (
        <div className="text-center exit-main-block">
            <Row>
                <Col>
                    <h2>GAME SCORE</h2>
                </Col>
            </Row>
            
            <Row>
                <Col>
                    <h1 className="high-score">{formatTimeLeft(currentTotalScore)}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>NEW HIGH SCORE</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2 className="play-agn-btn" onClick={startNewGame}>
                        <img src={require('../../../assets/images/try-again-btn.png')} alt="Try Again" className="try-again-icon"/>
                        PLAY AGAIN
                    </h2>
                </Col>
            </Row>
        </div>
    );

}

export default ExitModule;