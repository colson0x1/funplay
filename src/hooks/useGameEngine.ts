import { useCallback, useEffect, useState } from 'react';
import { countErrors } from '../utils/Helpers';
import useCountdownEngine from './useCountdownEngine';
import useKeystroke from './useKeystroke';
import useWordEngine from './useWordEngine';

export type State = 'start' | 'run' | 'finish';

const NUMBER_OF_WORDS = 18;
const COUNTDOWN_SECONDS = 15;

const useGameEngine = () => {
  const [state, setState] = useState<State>('start');
  const { words, updateWords } = useWordEngine(NUMBER_OF_WORDS);
  const { timeLeft, startCountdown, resetCountdown } =
    useCountdownEngine(COUNTDOWN_SECONDS);
  const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } =
    useKeystroke(state !== 'finish');

  const [errors, setErrors] = useState(0);

  const isStarting = state === 'start' && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  useEffect(() => {
    if (isStarting) {
      setState('run');
      startCountdown();
    }
  }, [isStarting, startCountdown, cursor]);

  useEffect(() => {
    if (!timeLeft) {
      console.log('time is up...');
      setState('finish');
      sumErrors();
    }
  }, [timeLeft, sumErrors]);

  useEffect(() => {
    if (areWordsFinished) {
      console.log('words are finished...');
      sumErrors();
      updateWords();
      clearTyped();
    }
  }, [
    cursor,
    words,
    clearTyped,
    typed,
    areWordsFinished,
    updateWords,
    sumErrors,
  ]);

  const restart = useCallback(() => {
    console.log('restarting...');
    resetCountdown();
    resetTotalTyped();
    setState('start');
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  return { state, words, timeLeft, typed, errors, totalTyped, restart };
};

export default useGameEngine;
