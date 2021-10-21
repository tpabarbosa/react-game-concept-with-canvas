import { useState } from 'react';
import { useInterval } from './useInterval';

export const useCounter = () => {
    const [count, setCount] = useState(0);
    const [isCounting, setIsCounting] = useState(false)

    const start = () => {
        setCount(0);
        setIsCounting(true);
    }

    const stop = () => {
        setIsCounting(false);
    }

    const counter = () => {
        setCount(count+1);
    }

    useInterval(counter, isCounting ? 1000 : null);

    return {
        count,
        start,
        stop,
    };
}