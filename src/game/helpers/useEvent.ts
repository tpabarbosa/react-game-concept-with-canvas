import {useEffect} from 'react';

export const useEvent = (event: string, handler: any) => {

    useEffect(() => {
        window.addEventListener(event, handler);
        return () => {
            window.removeEventListener(event, handler);
        }
    })
}