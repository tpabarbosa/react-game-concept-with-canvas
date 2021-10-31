import { useMemo } from "react";

type Audios = 'music' | 'victory' | 'defeated' | 'clockTicking' | 'coinCollected' | 'monster' | 'chasing';
type ConversionType = {
    [audio in Audios]: HTMLAudioElement
};


export type AudioPlayerType = {
    play: (audio: Audios) => void,
    playLoop: (audio: Audios) => void,
    pause: (audio: Audios) => void,
    stop: (audio: Audios) => void,
    setMuted: (value: boolean) => void,
}

export const useAudioPlayer = (): AudioPlayerType => {
    
    const music = useMemo(() => new Audio('assets/audios/music.mp3'), []);
    const victory = useMemo(() => new Audio('assets/audios/victory.mp3'), []);
    const defeated = useMemo(() => new Audio('assets/audios/defeated.mp3'), []);
    const clockTicking = useMemo(() => new Audio('assets/audios/clock_ticking.mp3'), []);
    const coinCollected = useMemo(() => new Audio('assets/audios/coin.mp3'), []);
    const monster = useMemo(() => new Audio('assets/audios/monster.mp3'), []);
    const chasing = useMemo(() => new Audio('assets/audios/chasing.mp3'), []);

    const conversion: ConversionType = {
        'music': music,
        'victory': victory,
        'defeated': defeated,
        'clockTicking': clockTicking,
        'coinCollected': coinCollected,
        'monster': monster,
        'chasing': chasing
    }


    const play = (audio: Audios) => {
        conversion[audio].play();
    }

    const playLoop = (audio: Audios) => {
        conversion[audio].loop = true;
        conversion[audio].play();
    }

    const pause = (audio: Audios) => {
        conversion[audio].pause();
    }

    const stop = (audio: Audios) => {
        conversion[audio].pause();
        conversion[audio].currentTime = 0;
    }

    const setMuted = (value: boolean) => {
        Object.values(conversion).forEach((audio) => audio.muted = value);
    }

    return {
        play,
        playLoop,
        pause,
        stop,
        setMuted
    }
}