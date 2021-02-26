import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar () {
    const { currentExperience, expirenceToNextLevel } = useContext(ChallengeContext);

    const percenteToNextLevel = Math.round(currentExperience * 100) / expirenceToNextLevel;

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percenteToNextLevel}%` }} />

                <span className={styles.currentExperience} style={{ left: `${percenteToNextLevel}%` }}>
                    {currentExperience} xp
                </span>
            </div>  
            <span>{expirenceToNextLevel} xp</span>   
        </header>
    );
}