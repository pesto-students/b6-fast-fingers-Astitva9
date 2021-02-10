import data from "../data/dictionary.json";
import { EASY, MEDIUM } from "../constants";

export const getWordFromDictionary = () => {
  const _easyWords = [];
  const _mediumWords = [];
  const _hardWords = [];

  for (let word of data) {
    if (word.length <= EASY.CHAR_RANGE) {
      _easyWords.push(word);
    } else if (word.length <= MEDIUM.CHAR_RANGE) {
      _mediumWords.push(word);
    } else {
      _hardWords.push(word);
    }
  }

  return [_easyWords, _mediumWords, _hardWords];
};

export function formatTimeLeft(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}
