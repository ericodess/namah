import React, {
    useState,
    useEffect
} from 'react';

//Components
import {
    AudioPlayerButton,
    AudioController,
    AudioVolumeController
} from './index';

//Services
import {getMouseClickPosition} from '../services';

const AudioPlayer = (props) => {
    const [audio] = useState(new Audio(props.audio));
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [audioDuration,setAudioDuration] = useState(0);
    const [audioCurrentTime,setAudioCurrentTime] = useState(0);
    const [audioCurrentVolume,setAudioCurrentVolume] = useState(0.5);

    audio.ontimeupdate = () => {
        setAudioCurrentTime(audio.currentTime);
    };

    window.addEventListener("load", () => {
        audio.volume = 0.6;
    });

    const playerHandler = () => {
        setIsAudioPlaying(!isAudioPlaying);
    };

    const controllerHandler = (event) => {
        const clickedValue = getMouseClickPosition(event, 'x', 'progress-bar');  

        audio.currentTime = clickedValue * audioDuration;
        setAudioCurrentTime(clickedValue * audioDuration);
    };
    
    const volumeHandler = (event) => {
        const clickedValue = getMouseClickPosition(event, 'x', 'volume-bar');

        audio.volume = clickedValue;
        setAudioCurrentVolume(clickedValue);
    };

    useEffect(() => {
        isAudioPlaying ? audio.play() : audio.pause();

        audio.addEventListener('ended', () => {
            setIsAudioPlaying(false);
        });

        audio.addEventListener('loadeddata', () => {
            setAudioDuration(audio.duration);
        });

        return () => {
            audio.removeEventListener('ended', () => {
                setIsAudioPlaying(false);
            });

            audio.pause();
        };
    }, [audio,isAudioPlaying,audioCurrentVolume]);

    return(
        <div className="player">
            <AudioPlayerButton 
                audioURL={props.audioURL}
                isAudioPlaying={isAudioPlaying}
                playerHandler={playerHandler}
            />
            <AudioController
                audioCurrentTime={audioCurrentTime}
                audioFullDuration={audioDuration}
                controllerHandler={controllerHandler}
            >
                <AudioVolumeController
                    currentVolume={audioCurrentVolume}
                    volumeHandler={volumeHandler}
                />
            </AudioController>
        </div>
    );
}

export default AudioPlayer;