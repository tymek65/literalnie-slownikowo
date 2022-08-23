import { Fragment } from 'react';
import { animated, useTransition } from 'react-spring';
import styles from './GuessList.module.sass';
const GuessList = ({ guesses, randomWord, position }) => {
  const transition = useTransition(guesses, {
    from: { opacity: 0, y: position === 'top' ? 20 : -20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: position === 'top' ? -20 : 20 },
  });
  return (
    <div className={position === 'top' ? styles.top : styles.bottom}>
      {transition((style, item, _, index) => {
        return (
          <animated.div className={styles.word} style={{ ...style, opacity: 1 - 0.15 * index, fontSize: 40 - 5 * index + 'px' }}>
            {Array.from(item.slowo).map((letter, index1) => {
              return (
                <Fragment key={letter.toString() + index1}>
                  <span
                    style={{
                      color: letter.toLowerCase() === randomWord.charAt(index1) && (index1 === 0 || (index1 !== 0 && item.slowo.substring(0, index1) === randomWord.substring(0, index1))) && '#89B789',
                    }}
                  >
                    {letter.toString()}
                  </span>
                  {item.slowo.substring(0, index1 + 1) === randomWord.substring(0, index1 + 1) && item.slowo === item.slowo.substring(0, index1 + 1) && <p>...</p>}
                </Fragment>
              );
            })}
          </animated.div>
        );
      })}
    </div>
  );
};

export default GuessList;
