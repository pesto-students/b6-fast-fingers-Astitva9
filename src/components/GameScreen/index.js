import React,{useState, useEffect} from 'react';
import Header from './header';
import Footer from './footer'
import GameModule from './GameModule';
import ExitModule from './ExitModule';
import './index.css';

const GameScreen = ({mainGameStarted, gameWord, onWordChange, inputValue, timerValue, resetGame, getScore, scoreArray, stopMainGame}) => {

    
    let mainModule = '';

    const [singleGameStarted, setSingleGameStarted] = useState(true)

    const [currentTotalScore, setCurrentTotalScore] = useState(0);

    const [totalScoreArray, setTotalScoreArray] = useState([]);

    useEffect(() => {
        let totalScore = scoreArray.reduce((a, b) => a + b,0)

        setCurrentTotalScore(totalScore)
        return () => {
            setCurrentTotalScore(0);
        }
    }, [scoreArray])

    //console.log({currentTotalScore});

    const playAgainOnclick = (currentScore) =>{

        console.log({currentScore});
        setCurrentTotalScore(0);

        setTotalScoreArray([...totalScoreArray, currentScore])

    }

    console.log({totalScoreArray});

    if(singleGameStarted)
        mainModule = <GameModule 
                        startgame={setSingleGameStarted} 
                        gameWord={gameWord}
                        onWordChange={onWordChange}
                        inputValue={inputValue}
                        timervalue={timerValue}
                        getScore={getScore}
                        totalScoreArray={totalScoreArray}
                    />;
    else
        mainModule = <ExitModule 
                        startGame={setSingleGameStarted}
                        resetGame={resetGame}
                        currentTotalScore={currentTotalScore}
                        playAgainOnclick={playAgainOnclick}
                    />;
   
    return (

        <div className="">
            <Header currentTotalScore={currentTotalScore}/>
            {mainModule}
            <Footer 
                stopMainGame={stopMainGame}
            />
        </div>

    );

}

export default GameScreen;