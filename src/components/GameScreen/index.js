import React,{useState} from 'react';
import Header from './header';
import Footer from './footer'
import GameModule from './GameModule';
import ExitModule from './ExitModule';

import './index.css'
const GameScreen = ({mainGameStarted, gameWord, onWordChange, inputValue, timerValue}) => {

    
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
        mainModule = <ExitModule startGame={setSingleGameStarted}/>;
   
    return (

        <div className="">
            <Header/>
            {mainModule}
            <Footer mainGameStarted={mainGameStarted}/>
        </div>

    );

}

export default GameScreen;