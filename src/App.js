import React,{useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeScreen from './components/WelcomeScreen'; 
import GameScreen from './components/GameScreen'; 


function App() {

  const [formData, setFormData] = useState({
    userName:'',
    difficultyLevel: "Easy"
  });

  const [gameStarted, setGameStarted] = useState(true)

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
    console.log(localStorage.userName);
    if(localStorage.userName){

      setFormData({ 
        userName : localStorage.userName,
        difficultyLevel : (localStorage.difficultyLevel)? localStorage.difficultyLevel : 'Easy'
      });
      
    }
  },[])

  

  let ScreenComponent = '';

  if(!gameStarted)
  ScreenComponent = <WelcomeScreen onchange={onchange} submitUserData={submitUserData} formData={formData}/>
  else
  ScreenComponent = <GameScreen/>

  return (
    <div>
      {ScreenComponent}
      
    </div> 
  );
}

export default App;
