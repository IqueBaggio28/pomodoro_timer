import React, { useState, useEffect } from 'react';
import sound from './457454__rudmer_rotteveel__karabiner_click_04.wav'
import alarm from './697897__johnnie_holiday__jh-alarm-clock-1.wav';
import './timer.css';

function Timer() {
    const initialTime = 25 * 60;

    const [working, setWorking] = useState(true); // to check if its woking or break
    const [running, setRunning] = useState(false); // to check if its running or paused
    const [cycle, setCycle] = useState(0); // to count how many cycles passed
    const [inProgress, setInProgress] = useState(false); // to check if its in the middle of working or break
    const [time, setTime] = useState(initialTime); // time remaining
    const [startTime, setStartTime] = useState(initialTime);

    const breakTime = Math.floor(startTime * 0.2);

    useEffect(() => {

        let timerId;
        if (running && time > 0) {
            timerId = setInterval(() => {
                setTime(prev => {
                    if (prev <= 1 && working) {
                        setCycle((prev) => prev + 1);
                    }
                    if (prev <= 1) {
                        clearInterval(timerId);
                        setRunning(false);
                        setWorking(!working);
                        setInProgress(false);
                        playAlarm();

                        if ( cycle % 3  === 0 && cycle !== 0){
                            return working ? breakTime * 3 :startTime;
                        }   
                        return working ? breakTime : startTime;
                    }
                    return prev - 1;
                });
            }, 1000); 
        }

        return () => clearInterval(timerId);
    }, [running, time, working, initialTime, breakTime]);

    function playSound(){
        new Audio(sound).play();
    }

    function playAlarm(){
        new Audio(alarm).play();
    }

    const toggleRunning = () => {
        setRunning(prev => !prev);
        setInProgress(true);
        playSound();
    };
    

    function handleReset() {
        setTime(working ? startTime : breakTime);
        setRunning(false);
        setInProgress(false);
    }

    function displayTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const calculateProgress = () => {
        const totalTime = working ? startTime : breakTime;
        return (time / totalTime) * 100;
    }

    return (
        <div className={`timer`}>
            <audio src={sound} controls style={{ display: 'none' }}></audio> 
            <h1>{working ? 'Working...' : 'Break Time!'}</h1>
            <div className='clock'>
                <div className='time'>{displayTime(time)}</div>
                <button className='arrowUp' onClick={() => {
                    setTime(prev => prev + 300);
                    setStartTime(prev => prev + 300)
                }} disabled={time === 55 * 60 || inProgress || !working}></button>
                <button className='arrowDown' onClick={() => {
                    setTime(prev => prev - 300);
                    setStartTime(prev => prev - 300)
                }} disabled={time === 300 || inProgress || !working}></button>
                <p className='cycle'>{`# ${cycle}`}</p>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${calculateProgress()}%` }}></div>
                </div>
            </div>
            <div className='utils'>
                <button className='btn' onClick={toggleRunning}>
                    {running ? 'Pause' : 'Start'}
                </button>
                <button className='btn' onClick={handleReset}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Timer;
