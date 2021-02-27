import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFineshed:boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { starNewChallenge } = useContext(ChallengeContext)


    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFineshed, setHasFineshed] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown () {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFineshed(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000) 
        }else if (isActive && time == 0) {
            setHasFineshed(true);
            setIsActive(false);
            starNewChallenge();
        }
    }, [isActive, time])
   
    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFineshed,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}