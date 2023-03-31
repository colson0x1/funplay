import { useRef } from 'react';
import {MdRefresh} from 'react-icons/md';

const RestartGame = ({
    onRestart: handleRestart,
    className = "",
}: {
    onRestart: () => void;
    className?: string;
}) => {
    const buttonRefresh = useRef<HTMLButtonElement>(null);

    const clickHandler = () => {
        buttonRefresh.current?.blur();
        handleRestart();
    }

    return (
        <button onClick={clickHandler} className={`block rounded px-8 py-2 hover:bg-slate-100/50 ${className}`}
        >
            <MdRefresh className="w-6 h-6" />
        </button>
    );
};

export default RestartGame;