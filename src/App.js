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

  const onchange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const submitUserData = (event) =>{
      event.preventDefault();

      if(formData.userName && formData.difficultyLevel){
        localStorage.setItem('userName', formData.userName);
        localStorage.setItem('difficultyLevel', formData.difficultyLevel);
        setGameStarted(true);
      }else{
        
      }
      
  }

  useEffect(() => {
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
    }
  },[])

  

  let ScreenComponent = '';

  if(!gameStarted)
  ScreenComponent = <WelcomeScreen onchange={onchange} submitUserData={submitUserData} formData={formData}/>
  else
  ScreenComponent = <GameScreen mainGameStarted={setGameStarted}/>

  return (
    <Container fluid>
      {ScreenComponent}
      
    </Container> 
  );
}

export default App;
