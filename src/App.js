import React,{useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeScreen from './components/WelcomeScreen'; 
import GameScreen from './components/GameScreen'; 
import { Container} from 'react-bootstrap';
import data from './data/dictionary.json';


function App() {

  const [formData, setFormData] = useState({
    userName:'',
    difficultyLevel: ""
  });

  const [gameStarted, setGameStarted] = useState(false)

  const [difficultyFactor, setDifficultyFactor] = useState(1);

  const [timerValue, setTimerValue] = useState(0);

  const [currentTimerValue, setCurrentTimerValue] = useState(0);

  const [gameWord, setGameWord] = useState('PESTO');

  const [inputValue, setInputValue] = useState('');

  const [scoreArray, setTheScoreArray] = useState([]);

  const [currentTotalScore, setCurrentTotalScore] = useState(0);

  const [totalScoreArray, setTotalScoreArray] = useState([]);

  

  const onchange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const submitUserData = (event) =>{
      event.preventDefault();

      if(formData.userName && formData.difficultyLevel){
        localStorage.setItem('userName', formData.userName);
        localStorage.setItem('difficultyLevel', formData.difficultyLevel);
        setGameStarted(true);
      }
      
  }

  const resetGame = async () => {
    const [ _easyWords, _mediumWords, _hardWords] = getWordFromDictionary();
    
    let newWord = null;
    let timeForWord = 0;
    if(localStorage.difficultyLevel === 'Medium'){
      newWord = await getNewWord(difficultyFactor,_mediumWords);
      timeForWord = Math.round(newWord.length / difficultyFactor);
    }else if(localStorage.difficultyLevel === 'Hard'){

      newWord = await getNewWord(difficultyFactor,_hardWords);
      timeForWord = Math.round(newWord.length / difficultyFactor);
    }else{

      newWord = await getNewWord(difficultyFactor,_easyWords);
      timeForWord = Math.round(newWord.length / difficultyFactor);
    }
    let maxTimeForWord = Math.max(timeForWord, 2);

    setInputValue('');

    setTimerValue(maxTimeForWord);

    setGameWord(newWord);
  }

  const getWordFromDictionary = () =>{
    const _easyWords = [];
    const _mediumWords = [];
    const _hardWords = [];

    for (let word of data) {
      if (word.length <= 4) {
        _easyWords.push(word);
      } else if (word.length <= 8) {
        _mediumWords.push(word);
      } else {
        _hardWords.push(word);
      }
    }

    return [
      _easyWords,
      _mediumWords,
      _hardWords
    ]
  }
 

  useEffect( () => {

    if(localStorage.userName && localStorage.difficultyLevel && gameStarted === true){

      setFormData({ 
        userName : localStorage.userName,
        difficultyLevel : (localStorage.difficultyLevel)? localStorage.difficultyLevel : 'Easy'
      });

      
    const [ _easyWords, _mediumWords, _hardWords] = getWordFromDictionary();

      const generateWordDifficultyWise = async () => {
        let newWord = null;
        let timeForWord = 0;
        if(localStorage.difficultyLevel === 'Medium'){
          setDifficultyFactor(1.5);
          newWord = await getNewWord(1.5,_mediumWords);
          timeForWord = Math.round(newWord.length / 1.5);
        }else if(localStorage.difficultyLevel === 'Hard'){
          setDifficultyFactor(2);
          newWord = await getNewWord(2,_hardWords);
          timeForWord = Math.round(newWord.length / 2);
        }else{
          setDifficultyFactor(1);
          newWord = await getNewWord(1,_easyWords);
          timeForWord = Math.round(newWord.length / 1);
        }

        
        let maxTimeForWord = Math.max(timeForWord, 2);

        if(maxTimeForWord >= 2)
          setTimerValue(maxTimeForWord);
        else
          setTimerValue(2);
       
        setGameWord(newWord);
      }
           
      generateWordDifficultyWise();
      
    }

    return () => {}
   
  },[gameStarted, timerValue])


  const getNewWord = async(_difficultyFactor,wordArray) => {
    if (_difficultyFactor >= 1.5 && _difficultyFactor < 2) {
      const random = Math.round(Math.random() * (wordArray.length - 1));
      return wordArray[random].toUpperCase();
    }
    if (_difficultyFactor < 1.5) {
      const random = Math.round(Math.random() * (wordArray.length - 1));
      return wordArray[random].toUpperCase();
    }
    const random = Math.round(Math.random() * (wordArray.length - 1));
    return wordArray[random].toUpperCase();
  };

  const getScore = (currentTimerValue) => {
    setCurrentTimerValue(currentTimerValue);
  }

  const onWordChange = (e) =>{
    e.persist();
    if(e.target.value.toUpperCase() === gameWord){
      
      //Increase the difficulty factor by  0.01 on success
      const _difficultyFactor = difficultyFactor + 0.01;

      setDifficultyFactor(_difficultyFactor);

      let level;
      if (_difficultyFactor >= 1 && _difficultyFactor < 1.5) level = 'Easy';
      else if (_difficultyFactor >= 1.5 && _difficultyFactor < 2) level = 'Medium';
      else level = 'Hard';

      localStorage.setItem('difficultyLevel', level);

      resetGame();

      setTheScoreArray([...scoreArray, currentTimerValue]);

    }
    setInputValue(e.target.value);
  }
  
  const stopMainGame = async (e) => {
    e.persist();
    setCurrentTotalScore(0)
    setGameStarted(false);
    resetGame();
    setDifficultyFactor(1);
    setTheScoreArray([]);
    setTotalScoreArray([]);
  
  }

  const playAgainOnclick = (currentScore) =>{

    setCurrentTotalScore(0);

    setTheScoreArray([]);

    setTotalScoreArray([...totalScoreArray, currentScore])

}
  

  let ScreenComponent = '';

  if(!gameStarted)
  ScreenComponent = <WelcomeScreen onchange={onchange} submitUserData={submitUserData} formData={formData}/>
  else
  ScreenComponent = <GameScreen 
                      mainGameStarted={setGameStarted}
                      gameWord={gameWord}
                      onWordChange={onWordChange}
                      inputValue={inputValue}
                      timerValue={timerValue}
                      resetGame={resetGame}
                      getScore={getScore}
                      scoreArray={scoreArray}
                      stopMainGame={stopMainGame}
                      setCurrentTotalScore={setCurrentTotalScore}
                      currentTotalScore={currentTotalScore}
                      playAgainOnclick={playAgainOnclick}
                      totalScoreArray={totalScoreArray}
                    />

  return (
    <Container fluid>
      {ScreenComponent}
    </Container> 
  );
}

export default App;
