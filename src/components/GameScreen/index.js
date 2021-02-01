import React,{useState} from 'react';
import Header from './header';
import Footer from './footer'
import GameModule from './GameModule';
import ExitModule from './ExitModule';

import './index.css'
const GameScreen = ({mainGameStarted, gameWord, onWordChange, inputValue, timerValue, resetGame, getScore, scoreArray}) => {

    
    let mainModule = '';

    const [singleGameStarted, setSingleGameStarted] = useState(true)

    if(singleGameStarted)
        mainModule = <GameModule 
                        startgame={setSingleGameStarted} 
                        gameWord={gameWord}
                        onWordChange={onWordChange}
                        inputValue={inputValue}
                        timervalue={timerValue}
                        getScore={getScore}
                        scoreArray={scoreArray}
                    />;
    else
        mainModule = <ExitModule 
                        startGame={setSingleGameStarted}
                        resetGame={resetGame}
                        scoreArray={scoreArray}
                    />;
   
    return (

        <div className="">
            <Header scoreArray={scoreArray}/>
            {mainModule}
            <Footer 
                mainGameStarted={mainGameStarted}
                resetGame={resetGame}
            />
        </div>

    );

}

export default GameScreen;