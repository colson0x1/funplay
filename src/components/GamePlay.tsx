import Caret from './Caret';
import cn from 'classnames';

const GamePlay = ({
  playerInput,
  className,
  words,
}: {
  playerInput: string;
  words: string;
  className?: string;
}) => {
  const typedCharacters = playerInput.split('');

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => {
        return (
          <Character
            key={`${char}_${index}`}
            actual={char}
            expected={words[index]}
          />
        );
      })}
      <Caret />
    </div>
  );
};

const Character = ({
  actual,
  expected,
}: {
  actual: string;
  expected: string;
}) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === ' ';
  return (
    <span className={cn({ 
      'text-red-500': isCorrect && !isWhiteSpace,
      "text-orange-600": isCorrect && !isWhiteSpace,
      "bg-red-500/50": !isCorrect && !isWhiteSpace 
      })}>
      {expected}
    </span>
  );
};

export default GamePlay;
