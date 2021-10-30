import { useState } from 'react';
import { useInterval } from './useInterval';

type Props = {
    initial: number;
}

export type CounterDownType = {
    count: number;
    start: (value?: number|undefined)=>void;
    stop: () => void;
    pause: () => void;
    unpause: () => void;
    isCounting: boolean;
}

export const useCounterDown = ({initial}: Props): CounterDownType => {
    const [count, setCount] = useState(initial);
    const [isCounting, setIsCounting] = useState(false)

    const start = (value?: number) => {
        setCount(value?? initial);
        setIsCounting(true);
    }

    const pause = () => {
        setIsCounting(false);
    }

    const stop = () => {
        setIsCounting(false);
        setCount(initial);
    }

    const unpause = () => {
        setIsCounting(true);
    }

    const counter = () => {
        setCount(count-1);
        if (count-1===0) {
            stop();  
        }
    }

    useInterval(counter, isCounting ? 1000 : null);

    return {
        count,
        start,
        stop,
        pause,
        unpause,
        isCounting
    };
}