import React,{useState,useEffect} from 'react';
import { Row, Col} from 'react-bootstrap';
function formatTimeLeft(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
  
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    return `${minutes}:${seconds}`;
  }
const Header = ({currentTotalScore}) => {

    const [currentScore, setCurrentScore] = useState(0);

    useEffect(() => {
        setCurrentScore(currentTotalScore);
        return () => {
            setCurrentScore(0);
        }
    }, [currentTotalScore])

    console.log({currentTotalScore});

    console.log({currentScore});
    

    return (
        <Row>
            <Col sm={9} className="top-block-1">
            
                <h3 className="top-heading-1">
                    <img src={require('../../../assets/images/user-icon.png')} alt="User Icon" className="user-icon" />
                    {localStorage.userName.toUpperCase()}
                </h3>

                <h4 className="top-heading-2">
                    <img src={require('../../../assets/images/game-console.png')} alt="Level Icon" className="level-icon" />
                    {localStorage.difficultyLevel.toUpperCase()}
                </h4>
            
            </Col>
            <Col sm={3} className="top-block-2">
            
                <h3 className="top-heading-1">      
                    FAST FINGERS  
                </h3>

                <h4 className="top-heading-2">
                    SCORE : {formatTimeLeft(currentScore)}
                </h4>
            
            </Col>
        </Row>
    );
}

export default Header;