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
    difficultyLevel: "Easy"
  });

  const [gameStarted, setGameStarted] = useState(false)

  const [difficultyFactor, setDifficultyFactor] = useState(1);

  const [timerValue, setTimerValue] = useState(0)



  const [gameWord, setGameWord] = useState('PESTO')


  const onchange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const [inputValue, setInputValue] = useState('');

  const submitUserData = (event) =>{
      event.preventDefault();

      if(formData.userName && formData.difficultyLevel){
        localStorage.setItem('userName', formData.userName);
        localStorage.setItem('difficultyLevel', formData.difficultyLevel);
        setGameStarted(true);
      }else{
        
      }
      
  }

  useEffect( () => {
    // console.log(localStorage.userName);
    if(localStorage.userName){

      setFormData({ 
        userName : localStorage.userName,
        difficultyLevel : (localStorage.difficultyLevel)? localStorage.difficultyLevel : 'Easy'
      });


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

        console.log({maxTimeForWord});

        setTimerValue(maxTimeForWord);
       
        console.log({newWord});
        setGameWord(newWord);
      }
           
      generateWordDifficultyWise();
      
    }
  },[])

  

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

  const onWordChange = (e) =>{
    if(e.target.value.toUpperCase() === gameWord){
      console.log("Word matched");
    }
    setInputValue(e.target.value);
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
                    />

  return (
    <Container fluid>
      {ScreenComponent}
      
    </Container> 
  );
}

export default App;
