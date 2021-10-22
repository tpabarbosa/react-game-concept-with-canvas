import { useState } from 'react';
import { useInterval } from './useInterval';

type Props = {
    initial: number;
}

export const useCounterDown = ({initial}: Props) => {
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
        setCount(0);
    }

    const unpause = () => {
        setIsCounting(true);
    }

    const counter = () => {
        setCount(count-1);
        if (count-1===0) {
            setIsCounting(false);    
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