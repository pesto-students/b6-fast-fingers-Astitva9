import React,{useEffect, useState} from 'react';
import { Row, Col} from 'react-bootstrap';
function formatTimeLeft(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
  
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    return `${minutes}:${seconds}`;
  }
const Header = ({scoreArray}) => {


    const [currentTotalScore, setCurrentTotalScore] = useState('0:00');

    useEffect(() => {
        let totalScore = scoreArray.reduce((a, b) => a + b,0)

        setCurrentTotalScore(formatTimeLeft(totalScore))
        return () => {
            setCurrentTotalScore('0:00');
        }
    }, [scoreArray])

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
                    SCORE : {currentTotalScore}
                </h4>
            
            </Col>
        </Row>
    );
}

export default Header;