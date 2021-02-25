import styles from '../styles/components/Profile.module.css';

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/andersonmwp.png" alt="Anderson Moura" />

            <div>
                <strong>Anderson Moura</strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level 1
                    
                </p>
            </div>
        </div>
    );
}