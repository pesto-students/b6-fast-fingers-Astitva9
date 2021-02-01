import React from 'react';
import { Row, Col, Form} from 'react-bootstrap';
import './index.css'
const WelcomeScreen = ({submitUserData, onchange, formData}) => {

    const {userName, difficultyLevel} = formData;

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
                    <Form onSubmit={submitUserData}>
                        <Form.Group controlId="formBasicEmail">
                    
                            <Form.Control 
                                type="text" 
                                placeholder="Type Your Name" 
                                className="name-field"
                                name="userName"
                                value={userName}
                                onChange={onchange}
                                required={true}
                            />
                     
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1"> 
                            <Form.Control 
                                as="select" 
                                className="select-field" 
                                name="difficultyLevel"
                                value={difficultyLevel}
                                onChange={onchange}
                                required={true}
                            >
                                <option value="">Select Difficulty Level</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </Form.Control>
                        </Form.Group>
                       
                        <button className="start-game-btn" type="submit">
                            <img src={require('../../assets/images/play-btn-FF.png')} alt="Start Icon" className="play-icon" />START GAME
                        </button>
                    </Form>
                </Col>
                
            </Row>
        </div>
    );
}

export default WelcomeScreen;