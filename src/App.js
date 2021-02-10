import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WelcomeScreen from "./components/WelcomeScreen";
import GameScreen from "./components/GameScreen";
import { Container } from "react-bootstrap";
import { EASY, MEDIUM, HARD, MINIMUM_TIME, DIFFICULTY_FACTOR_INC } from "./constants";
import { getWordFromDictionary } from "./utils";

function App() {
  const [formData, setFormData] = useState({
    userName: localStorage.userName ? localStorage.userName : "",
    difficultyLevel: EASY.VALUE,
  });

  const [gameStarted, setGameStarted] = useState(false);

  const [difficultyFactor, setDifficultyFactor] = useState(1);

  const [timerValue, setTimerValue] = useState(0);

  const [currentTimerValue, setCurrentTimerValue] = useState(0);

  const [gameWord, setGameWord] = useState("PESTO");

  const [inputValue, setInputValue] = useState("");

  const [scoreArray, setTheScoreArray] = useState([]);

  const [currentTotalScore, setCurrentTotalScore] = useState(0);

  const [totalScoreArray, setTotalScoreArray] = useState([]);

  const onchange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitUserData = (event) => {
    event.preventDefault();

    if (formData.userName && formData.difficultyLevel) {
      localStorage.setItem("userName", formData.userName);
      localStorage.setItem("difficultyLevel", formData.difficultyLevel);
      setGameStarted(true);
    }
  };

  const resetGameWord = async () => {
    const [_easyWords, _mediumWords, _hardWords] = getWordFromDictionary();

    let newWord = null;
    let timeForWord = 0;
    if (localStorage.difficultyLevel === MEDIUM.VALUE) {
      newWord = await getNewWord(difficultyFactor, _mediumWords);
      timeForWord = Math.round(newWord.length / difficultyFactor);
    } else if (localStorage.difficultyLevel === HARD.VALUE) {
      newWord = await getNewWord(difficultyFactor, _hardWords);
      timeForWord = Math.round(newWord.length / difficultyFactor);
    } else {
      newWord = await getNewWord(difficultyFactor, _easyWords);
      timeForWord = Math.round(newWord.length / difficultyFactor);
    }
    let maxTimeForWord = Math.max(timeForWord, 2);

    setInputValue("");

    setTimerValue(maxTimeForWord);

    setGameWord(newWord);
  };

  

  useEffect(() => {
    if (
      localStorage.userName &&
      localStorage.difficultyLevel &&
      gameStarted === true
    ) {
      setFormData({
        userName: localStorage.userName,
        difficultyLevel: localStorage.difficultyLevel
          ? localStorage.difficultyLevel
          : EASY.VALUE,
      });

      const [_easyWords, _mediumWords, _hardWords] = getWordFromDictionary();

      const generateWordDifficultyWise = async () => {
        let newWord = null;
        let timeForWord = 0;
        if (localStorage.difficultyLevel === MEDIUM.VALUE) {
          setDifficultyFactor(MEDIUM.DIFFICULTY_FACTOR);
          newWord = await getNewWord(MEDIUM.DIFFICULTY_FACTOR, _mediumWords);
          timeForWord = Math.round(newWord.length / MEDIUM.DIFFICULTY_FACTOR);
        } else if (localStorage.difficultyLevel === HARD.VALUE) {
          setDifficultyFactor(HARD.DIFFICULTY_FACTOR);
          newWord = await getNewWord(HARD.DIFFICULTY_FACTOR, _hardWords);
          timeForWord = Math.round(newWord.length / HARD.DIFFICULTY_FACTOR);
        } else {
          setDifficultyFactor(EASY.DIFFICULTY_FACTOR);
          newWord = await getNewWord(EASY.DIFFICULTY_FACTOR, _easyWords);
          timeForWord = Math.round(newWord.length / EASY.DIFFICULTY_FACTOR);
        }

        let maxTimeForWord = Math.max(timeForWord, 2);

        if (maxTimeForWord >= MINIMUM_TIME) setTimerValue(maxTimeForWord);
        else setTimerValue(MINIMUM_TIME);

        setGameWord(newWord);
      };

      generateWordDifficultyWise();
    }

    return () => {};
  }, [gameStarted, timerValue]);

  const getNewWord = async (_difficultyFactor, wordArray) => {
    if (_difficultyFactor >= MEDIUM.DIFFICULTY_FACTOR && _difficultyFactor < HARD.DIFFICULTY_FACTOR) {
      const random = Math.round(Math.random() * (wordArray.length - 1));
      return wordArray[random].toUpperCase();
    }
    if (_difficultyFactor < MEDIUM.DIFFICULTY_FACTOR) {
      const random = Math.round(Math.random() * (wordArray.length - 1));
      return wordArray[random].toUpperCase();
    }
    const random = Math.round(Math.random() * (wordArray.length - 1));
    return wordArray[random].toUpperCase();
  };

  const getScore = (currentTimerValue) => {
    setCurrentTimerValue(currentTimerValue);
  };

  const onWordChange = (e) => {
    e.persist();
    if (e.target.value.toUpperCase() === gameWord) {
      //Increase the difficulty factor by  0.01 on success
      const _difficultyFactor = difficultyFactor + DIFFICULTY_FACTOR_INC;

      setDifficultyFactor(_difficultyFactor);

      let level;
      if (_difficultyFactor >= EASY.DIFFICULTY_FACTOR && _difficultyFactor < MEDIUM.DIFFICULTY_FACTOR) level = EASY.VALUE;
      else if (_difficultyFactor >= MEDIUM.DIFFICULTY_FACTOR && _difficultyFactor < HARD.DIFFICULTY_FACTOR)
        level = MEDIUM.VALUE;
      else level = HARD.DIFFICULTY_FACTOR;

      localStorage.setItem("difficultyLevel", level);

      resetGameWord();

      setTheScoreArray([...scoreArray, currentTimerValue]);
    }
    setInputValue(e.target.value);
  };

  const stopMainGame = async (e) => {
    e.persist();
    setCurrentTotalScore(0);
    setGameStarted(false);
    resetGameWord();
    setDifficultyFactor(EASY.DIFFICULTY_FACTOR);
    setTheScoreArray([]);
    setTotalScoreArray([]);
  };

  const playAgainOnclick = (currentScore) => {
    setCurrentTotalScore(0);

    setTheScoreArray([]);

    setTotalScoreArray([...totalScoreArray, currentScore]);
  };

  let ScreenComponent = "";

  if (!gameStarted)
    ScreenComponent = (
      <WelcomeScreen
        onchange={onchange}
        submitUserData={submitUserData}
        formData={formData}
      />
    );
  else
    ScreenComponent = (
      <GameScreen
        gameWord={gameWord}
        onWordChange={onWordChange}
        inputValue={inputValue}
        timerValue={timerValue}
        resetGameWord={resetGameWord}
        getScore={getScore}
        scoreArray={scoreArray}
        stopMainGame={stopMainGame}
        setCurrentTotalScore={setCurrentTotalScore}
        currentTotalScore={currentTotalScore}
        playAgainOnclick={playAgainOnclick}
        totalScoreArray={totalScoreArray}
      />
    );

  return <Container fluid>{ScreenComponent}</Container>;
}

export default App;
