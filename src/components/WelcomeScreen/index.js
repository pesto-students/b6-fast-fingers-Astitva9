import React from 'react';
import { Row, Col, Form} from 'react-bootstrap';
import './index.css'
const WelcomeScreen = () => {
    return (
        <div>
            <Row className="welcome-row">
                
                <Col className="welcome-col">
                    <img src={require("../../assets/images/keyboard-FF.png")} alt="Fast Finger" className="welcome-banner"/>
                    <h2>Fast Fingers</h2>
                    <div className="separator">The Ultimate Typing Game </div>
                </Col>
                
            </Row>

            <Row className="welcome-form-row">
                
                <Col className="welcome-form-col">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                    
                            <Form.Control type="text" placeholder="Type Your Name" className="name-field"/>
                     
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1"> 
                            <Form.Control as="select" className="select-field">
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </Form.Control>
                        </Form.Group>
                       
                        <button class="start-game-btn" type="submit">
                            <img class="icon-play" src={require('../../assets/images/play-btn-FF.png')} alt="Start Icon" className="play-icon" />START GAME
                        </button>
                    </Form>
                </Col>
                
            </Row>
        </div>
    );
}

export default WelcomeScreen;