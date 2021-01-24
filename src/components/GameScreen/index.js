import React from 'react';
import { Row, Col} from 'react-bootstrap';
import CountDownTimer from './CountDownTimer'
import './index.css'
const GameScreen = () => {

    

   
    return (

        <div className="">
            <Row>
                <Col sm={9} className="top-block-1">
                   
                    <h3 className="top-heading-1">
                        <img src={require('../../assets/images/user-icon.png')} alt="User Icon" className="user-icon" />
                        {localStorage.userName}
                    </h3>

                    <h4 className="top-heading-2">
                        <img src={require('../../assets/images/game-console.png')} alt="Level Icon" className="level-icon" />
                        {localStorage.difficultyLevel}
                    </h4>
                   
                </Col>
                <Col sm={3} className="top-block-2">
                   
                    <h3 className="top-heading-1">      
                        FAST FINGERS  
                    </h3>

                    <h4 className="top-heading-2">
                        SCORE : 00:99
                    </h4>
                   
                </Col>
            </Row>
            <Row>
                <Col sm={3}>
                    <div class="text-center">
                        <div class="scores-box">
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
                <Col sm={6}>
                    <Row>
                        <Col className="timer-main-block">
                            <CountDownTimer/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col sm={5}>
                <h4 className="footer-heading">
                    <img src={require('../../assets/images/cross-sign.png')} alt="Exit" className="exit-icon" />
                    STOP GAME
                </h4>
                </Col>
                <Col sm={7}></Col>
            </Row>
        </div>

    );

}

export default GameScreen;