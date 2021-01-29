import React,{useState} from 'react';
import Header from './header';
import Footer from './footer'
import GameModule from './GameModule';
import ExitModule from './ExitModule';

import './index.css'
const GameScreen = ({mainGameStarted, gameWord, onWordChange, inputValue, timerValue, resetGame}) => {

    
    let mainModule = '';

    const [singleGameStarted, setSingleGameStarted] = useState(true)

    if(singleGameStarted)
        mainModule = <GameModule 
                        startgame={setSingleGameStarted} 
                        gameWord={gameWord}
                        onWordChange={onWordChange}
                        inputValue={inputValue}
                        timervalue={timerValue}
                    />;
    else
        mainModule = <ExitModule 
                        startGame={setSingleGameStarted}
                        resetGame={resetGame}
                    />;
   
    return (

        <div className="">
            <Header/>
            {mainModule}
            <Footer 
                mainGameStarted={mainGameStarted}
                resetGame={resetGame}
            />
        </div>

    );

}

export default GameScreen;