import React from 'react';
import { Row, Col} from 'react-bootstrap';
import '../index.css';

const ExitModule = ({startGame}) => {

    const startNewGame = () => {
        startGame(true);
    }

    return (
        <div className="text-center exit-main-block">
            <Row>
                <Col>
                    <h2>SCORE : GAME 5</h2>
                </Col>
            </Row>
            
            <Row>
                <Col>
                    <h1 className="high-score">2:17</h1>
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