import RestartGame from './components/RestartGame';
import RaceStats from './components/RaceStats';
import GamePlay from './components/GamePlay';
import useGameEngine from './hooks/useGameEngine';
import { calculateAccuracyPercentage } from './utils/Helpers';

const App = () => {
  const { state, words, timeLeft, typed, errors, restart, totalTyped } =
    useGameEngine();
  return (
    <>
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords words={words} />
        <GamePlay
          className="absolute inset-0"
          words={words}
          playerInput={typed}
        />
      </WordsContainer>
      <RestartGame
        className={'mx-auto mt-10 text-slate-500'}
        onRestart={restart}
      />
      <RaceStats
        state={state}
        className="mt-10"
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        wpm={totalTyped}
      />
    </>
  );
};

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-4xl max-w-5xl leading-relaxed mt-3">
      {children}
    </div>
  );
};

const GeneratedWords = ({ words }: { words: string }) => {
  return (
    <div className="text-slate-400" style={{ wordBreak: 'break-word' }}>
      {words}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-slate-400 font-medium">Time: {timeLeft}</h2>;
};

export default App;
