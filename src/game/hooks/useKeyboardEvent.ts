import {useEffect} from 'react';

export const useKeyboardEvent = (event: string, handler: any) => {

    useEffect(() => {
        window.addEventListener(event, handler);
        return () => {
            window.removeEventListener(event, handler);
        }
    })
}