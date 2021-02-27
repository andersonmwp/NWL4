import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox () {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext)
    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeSuceeded() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >   
                            Falhei
                        </button>
                        <button 
                            type="button"
                            className={styles.challengeSuceededButton}
                            onClick={handleChallengeSuceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeBoxNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>

                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                        Avance de level completando desafios.
                    </p>
                </div>
            ) }
        </div>
    )
}