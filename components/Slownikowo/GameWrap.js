import GuessList from './GuessList';
import styles from './GameWrap.module.sass';
const GameWrap = ({ children, guesses, randomWord }) => {
  const top = guesses
    .filter((guess) => guess.state === 1)
    .reverse()
    .sort((a, b) => (a.slowo.localeCompare(b.slowo, 'pl') === 1 ? -1 : 1))
    .slice(0, 5);

  const bottom = guesses
    .filter((element) => element.state === 0)
    .reverse()
    .sort((a, b) => (a.slowo.localeCompare(b.slowo, 'pl') === -1 ? -1 : 1))
    .slice(0, 5);

  return (
    <div className={styles.slownikowoMain}>
      <GuessList position="top" guesses={top} randomWord={randomWord} />
      {children}
      <GuessList position="bottom" guesses={bottom} randomWord={randomWord} />
    </div>
  );
};

export default GameWrap;
