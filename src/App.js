import React,{useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeScreen from './components/WelcomeScreen'; 
import {Container} from 'react-bootstrap';

function App() {

  const [formData, setFormData] = useState({
    userName:'',
    difficultyLevel: "1"
  });

  const [gameStarted, setGameStarted] = useState(false)

  const onchange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const submitUserData = (event) =>{
      event.preventDefault();
      localStorage.setItem('userName', formData.userName);
      setGameStarted(true);
  }

  useEffect(() => {
    if(localStorage.userName){
      setFormData({ userName : localStorage.userName });
    }
  },[])

  let ScreenComponent = '';

  if(!gameStarted)
  ScreenComponent = <WelcomeScreen onchange={onchange} submitUserData={submitUserData} formData={formData}/>

  return (
    <Container>
      {ScreenComponent}
    </Container>
  );
}

export default App;
