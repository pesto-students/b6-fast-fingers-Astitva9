import React from 'react';
import { Row, Col} from 'react-bootstrap';

const Header = () => {

    return (
        <Row>
            <Col sm={9} className="top-block-1">
            
                <h3 className="top-heading-1">
                    <img src={require('../../../assets/images/user-icon.png')} alt="User Icon" className="user-icon" />
                    {localStorage.userName}
                </h3>

                <h4 className="top-heading-2">
                    <img src={require('../../../assets/images/game-console.png')} alt="Level Icon" className="level-icon" />
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
    );
}

export default Header;