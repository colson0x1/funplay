import { motion } from 'framer-motion';
import { formatPercentage } from '../utils/Helpers';
import { State } from '../hooks/useGameEngine';

const RaceStats = ({
  state,
  errors,
  accuracyPercentage,
  wpm,
  className,
}: {
  state: State;
  errors: number;
  accuracyPercentage: number;
  wpm: number;
  className?: string;
}) => {
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  if (state !== "finish") {
    return null;
  }

  return (
    <motion.ul
      className={`flex flex-col items-center text-black space-y-3 ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        className="text-xl font-semibold"
        transition={{ ...duration, delay: 0 }}
      >
        Stats
      </motion.li>

      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        WPM: {wpm} 
      </motion.li>

      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1.4 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      
    </motion.ul>
  );
};

export default RaceStats;
