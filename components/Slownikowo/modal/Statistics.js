import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { timeLeft, getEmojiGrid, formHelpers } from '../../../utils/slownikowoHelpers';
import { useState, useLayoutEffect } from 'react';
import styles from './Statistics.module.sass';
import { toast } from 'react-toastify';
const Statistics = ({ stats, game, randomWord }) => {
  const [time, setTime] = useState(timeLeft);
  let message = getEmojiGrid(game, randomWord.puzzleNumber);
  const { isDisabled: gameEnded } = formHelpers(game, '', '', 15);
  const handleShare = () => {
    navigator.clipboard.writeText(message);
    toast.info('Skopiowano do schowka', {
      autoClose: 2000,
      pauseOnHover: false,
    });
  };
  useLayoutEffect(() => {
    setTime(timeLeft());
    const interval = setInterval(() => {
      setTime(timeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);
  return (
    <>
      {gameEnded && <h2>{randomWord.word.toUpperCase()}</h2>}

      <div className={styles.slownikowoStats}>
        <h3>STATYSTYKI</h3>
        <div>
          <div>
            <p>{stats?.slownikowo?.zagrane ?? 0}</p>
            <p>ZAGRANE GRY</p>
          </div>
          <div>
            <p>{stats?.slownikowo?.wygrane ?? 0}</p>
            <p>WYGRANE GRY</p>
          </div>
          <div>
            <p>{stats?.slownikowo?.zrzedu ?? 0}</p>
            <p>WYGRANYCH Z RZĘDU</p>
          </div>
        </div>
      </div>

      <div className={styles.sharediv}>
        <div>
          {time}
          <p>Do następnego słowa</p>
        </div>

        {gameEnded && (
          <>
            <button onClick={handleShare}>UDOSTĘPNIJ</button>
            <a className={styles.twitterWrap} target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`}>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </>
        )}
      </div>
    </>
  );
};

export default Statistics;
