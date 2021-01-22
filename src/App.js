import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeScreen from './components/WelcomeScreen'; 
import {Container} from 'react-bootstrap';

function App() {
  return (
    <Container>
      <WelcomeScreen/>
    </Container>
  );
}

export default App;
