




import { useState, useEffect, useRef } from 'react';

import { Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
// import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BloomType } from '@/types';
import tickAudio from '../../../public/tick.mp3'
import celebrationAudio from '../../../public/celebration.mp3'
const BloomTracking = () => {
    const location = useLocation();
    const bloomData: BloomType = location.state?.additionalData;
    const [duration,] = useState(0.2); //setDuration
    const [timeRemaining, setTimeRemaining] = useState(0.2 * 60);
    const [isRunning, setIsRunning] = useState(false);

    const tickSound = useRef<HTMLAudioElement | null>(null);
    const completeSound = useRef<HTMLAudioElement | null>(null);
    const [isTickSoundOn, setIsTickSoundOn] = useState(true)
    // Detailed time formatting
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const pad = (num: number) => num.toString().padStart(2, '0');

        return hours > 0
            ? `${hours}:${pad(minutes)}:${pad(seconds)}`
            : `${pad(minutes)}:${pad(seconds)}`;
    };

    // Start/Resume Timer
    const startTimer = () => {
        // if (duration < 5 || duration > 90) {
        //     alert('Please enter a time between 5 and 90 minutes');
        //     return;
        // }
        setIsRunning(true);
    };

    // Pause Timer
    const pauseTimer = () => {
        setIsRunning(false);
    };

    // Reset Timer
    const resetTimer = () => {
        setIsRunning(false);
        setTimeRemaining(duration * 60);
    };

    useEffect(() => {
        // Create audio elements
        tickSound.current = new Audio(tickAudio);
        completeSound.current = new Audio(celebrationAudio)
        // Set volume
        tickSound.current.volume = 0.2;
        tickSound.current.volume = 0.8;
        return () => {
            completeSound.current = null
            tickSound.current = null;
        };
    }, []);

    // Timer Countdown Logic
    useEffect(() => {
        let interval: number;
        if (isRunning && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(time => {
                    // Play tick sound
                    if (isTickSoundOn) {
                        if (time > 1) {
                            tickSound.current?.play();
                        }
                    }
                    return time - 1;
                });
            }, 1000);
        } else if (timeRemaining === 0) {
            completeSound.current?.play()
            resetTimer()
            setIsRunning(false);
        }

        return () => clearInterval(interval);
    }, [isRunning, timeRemaining]);



    // // Duration Change Handler
    // const handleDurationChange = (newDuration:number) => {
    //     const numDuration = Number(newDuration);
    //     setDuration(numDuration);

    //     if (!isRunning) {
    //         setTimeRemaining(numDuration * 60);
    //     }
    // };



    const sessionCounts = (sessions: number) => {
        const circles = [];

        for (let i = 1; i <= sessions; i++) {
            circles.push(
                <Tooltip key={i}>
                    <TooltipTrigger asChild>
                        <div key={i} className='w-5 h-5 rounded-full border-2 cursor-pointer border-[#2E2E2E]'></div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Session {i}</p>
                    </TooltipContent>
                </Tooltip>

            );
        }

        return <TooltipProvider><div className="flex space-x-2 mt-10">{circles}</div></TooltipProvider>;

    };


    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            // Prevent the default browser behavior
            event.preventDefault();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div className="flex items-center justify-center flex-col w-full h-full">
            {/* <div className="flex items-center space-x-4">
                <Timer className="text-blue-600" />
                <Input
                    type="number"
                    placeholder="Enter minutes (5-90)"
                    value={duration}
                    onChange={(e) => handleDurationChange(e.target.value)}
                    min={5}
                    max={90}
                    className="flex-grow"
                />
            </div> */}
            <p className='bg-[#a1d6b263] px-3 py-1 rounded-lg border-[#A1D6B2] border text-sm'>{bloomData?.name}</p>


            {sessionCounts(bloomData?.numberOfSessions)}

            <div className="text-center text-9xl font-head font-bold text-white/95 tracking-wider mt-6" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {formatTime(timeRemaining)}
            </div>

            <div className="flex justify-center space-x-4 mt-14">
                {!isRunning && (
                    <Button
                        onClick={startTimer}
                        className="card-hover bg-green-900 hover:bg-green-900 flex 
                        items-center text-white/80"
                        disabled={timeRemaining === 0}
                        size={'sm'}
                    >
                        <Play /> <p className='font-semibold tracking-wider'>Start</p>
                    </Button>
                )}

                {isRunning && (
                    <Button
                        onClick={pauseTimer}
                        className="bg-yellow-900 card-hover hover:bg-yellow-900 flex 
                        items-center text-white/80"
                        size={'sm'}
                    >
                        <Pause /> <p className='font-semibold tracking-wider'>Pause</p>
                    </Button>
                )}

                <Button
                    onClick={resetTimer}
                    className="bg-red-900 hover:bg-red-900 card-hover flex 
                        items-center "
                    disabled={timeRemaining === duration * 60}
                    size={'sm'}
                >
                    <RotateCcw /> <p className='font-semibold tracking-wider'>Reset</p>
                </Button>
                {
                    isTickSoundOn ? <VolumeX onClick={() => {
                        setIsTickSoundOn(false)
                    }} className='cursor-pointer' /> : <Volume2 onClick={() => {
                        setIsTickSoundOn(true)
                    }} className='cursor-pointer' />
                }


            </div>

        </div>
    );
};

export default BloomTracking;