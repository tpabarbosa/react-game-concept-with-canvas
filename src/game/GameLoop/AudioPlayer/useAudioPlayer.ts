import { useMemo } from "react";

type Audios = 'music' | 'victory' | 'defeated' | 'clockTicking';
type ConversionType = {
    [audio in Audios]: HTMLAudioElement
}

export const useAudioPlayer = () => {

    const music = useMemo(() => new Audio('assets/audios/music.mp3'), []);
    const victory = useMemo(() => new Audio('assets/audios/victory.mp3'), []);
    const defeated = useMemo(() => new Audio('assets/audios/defeated.mp3'), []);
    const clockTicking = useMemo(() => new Audio('assets/audios/clock_ticking.mp3'), []);

    const conversion: ConversionType = {
        'music': music,
        'victory': victory,
        'defeated': defeated,
        'clockTicking': clockTicking
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

    return {
        play,
        playLoop,
        pause,
        stop,
    }
}