import React,{useState} from 'react';
import Header from './header';
import Footer from './footer'
import GameModule from './GameModule';
import ExitModule from './ExitModule';

import './index.css'
const GameScreen = ({mainGameStarted}) => {

    
    let mainModule = '';

    const [singleGameStarted, setSingleGameStarted] = useState(true)

    if(singleGameStarted)
        mainModule = <GameModule startGame={setSingleGameStarted}/>;
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