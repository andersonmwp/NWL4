import { fail } from 'assert';
import { createContext, useState, ReactNode } from 'react';

import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number; 
    expirenceToNextLevel: number; 
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    starNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const expirenceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1);
    }

    function starNewChallenge () {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)
    }

    function resetChallenge () {
        setActiveChallenge(null);
    }

    function completeChallenge () {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= expirenceToNextLevel) {
            finalExperience = finalExperience - expirenceToNextLevel;
            levelUp();

            setCurrentExperience(finalExperience);
            setActiveChallenge(null);
            setChallengesCompleted(challengesCompleted + 1);
        }
    }

    return (
        <ChallengeContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                challengesCompleted,
                activeChallenge,
                expirenceToNextLevel,
                levelUp,
                starNewChallenge,
                resetChallenge,
                completeChallenge,
            }}
        >
            {children}
        </ChallengeContext.Provider>
    );
}

