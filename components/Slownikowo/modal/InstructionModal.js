import styles from './InstructionModal.module.sass';
import { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import ModalWrap from './ModalWrap';

const InstructionModal = ({ setIsHelpVisible }) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const handleScreenChange = () => {
    if (screens[currentScreen + 1]) {
      setCurrentScreen((prev) => prev + 1);
    }
  };
  const screens = [
    <>
      <div className={styles.screen2helper}>
        <p>Odgadnij dzisiejsze słowo na</p>
        <h3 className={styles.instrukcjaHeader}>
          <b>SŁOWNIKOWO</b>
        </h3>
        <p>
          Wpisz dowolne słowo i naciśnij{' '}
          <svg className={styles.enterButton} width="59" height="47" viewBox="0 0 59 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="58.4308" height="46.7393" rx="5.54336" fill="#616161" />
            <rect width="58.4308" height="46.7393" rx="5.54336" fill="black" fillOpacity="0.1" />
            <path
              d="M38.7232 15.3362C38.363 15.3362 38.0175 15.4721 37.7628 15.7141C37.5081 15.956 37.365 16.2842 37.365 16.6264V21.7872C37.365 22.1294 37.2219 22.4575 36.9672 22.6995C36.7124 22.9414 36.367 23.0774 36.0067 23.0774H22.981L24.7467 21.413C25.0025 21.1701 25.1462 20.8406 25.1462 20.497C25.1462 20.1534 25.0025 19.8239 24.7467 19.5809C24.491 19.338 24.1441 19.2015 23.7824 19.2015C23.4207 19.2015 23.0738 19.338 22.818 19.5809L18.7432 23.4515C18.6196 23.5742 18.5226 23.7189 18.458 23.8773C18.3221 24.1914 18.3221 24.5437 18.458 24.8579C18.5226 25.0162 18.6196 25.1609 18.7432 25.2836L22.818 29.1542C22.9443 29.2751 23.0945 29.3711 23.26 29.4366C23.4255 29.5021 23.6031 29.5359 23.7824 29.5359C23.9617 29.5359 24.1392 29.5021 24.3047 29.4366C24.4702 29.3711 24.6205 29.2751 24.7467 29.1542C24.874 29.0343 24.9751 28.8916 25.0441 28.7344C25.113 28.5771 25.1485 28.4085 25.1485 28.2382C25.1485 28.0679 25.113 27.8992 25.0441 27.742C24.9751 27.5848 24.874 27.4421 24.7467 27.3221L22.981 25.6578H36.0067C37.0874 25.6578 38.1239 25.25 38.888 24.5241C39.6522 23.7982 40.0815 22.8137 40.0815 21.7872V16.6264C40.0815 16.2842 39.9384 15.956 39.6837 15.7141C39.429 15.4721 39.0835 15.3362 38.7232 15.3362Z"
              fill="#E8F0EA"
            />
          </svg>
          by spróbować odgadnąć hasło.
        </p>
      </div>
    </>,
    <>
      <div className={styles.screen2helper}>
        <p>
          Jeśli słowo przejdzie do <p className={styles.pYellow}>góry</p>, znajduje się ono <p className={styles.pYellow}>wcześniej</p> w słowniku niż hasło.
        </p>
        <div>
          <p className={styles.text2}>NIESPODZIEWANE</p>
          <p className={styles.text1}>WPISZ SŁOWO</p>
        </div>
      </div>
    </>,
    <>
      <div className={styles.screen2helper}>
        <p>
          Jeśli słowo przejdzie do <p className={styles.pYellow}>dołu</p>, znajduje się ono <p className={styles.pYellow}>później</p> w słowniku niż hasło.
        </p>
        <div>
          <p className={styles.text2}>NIESPODZIEWANE</p>
          <p className={styles.text1}>WPISZ SŁOWO</p>
          <p className={styles.text2}>PRZYJEMNOŚĆ</p>
        </div>
      </div>
    </>,
    <>
      <div className={styles.screen2helper}>
        <p>Na stronie codziennie dostępne jest nowe hasło, na którego odgadnięcie masz po piętnaście prób, powodzenia!</p>
        <div>
          <p className={styles.text3}>BIEDNY</p>
          <p className={styles.text2}>NIESPODZIEWANE</p>
          <p className={styles.textWin}>PAŃSTWO</p>
          <p className={styles.text2}>PRZYJEMNOŚĆ</p>
          <p className={styles.text3}>WSCHÓD</p>
        </div>
      </div>
    </>,
  ];
  const transitions = useTransition(screens[currentScreen], {
    from: { opacity: 0, x: -20 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: 20 },
    exitBeforeEnter: true,
  });
  return (
    <ModalWrap setIsModalVisible={setIsHelpVisible}>
      {transitions((style, item, t) => {
        return <animated.div style={style}>{item}</animated.div>;
      })}
      <button style={{ display: currentScreen + 1 === screens.length && 'none' }} onClick={() => handleScreenChange()} className={styles.nextButton}>
        Dalej
      </button>
      <div className={styles.currentScreenDots} style={{ marginTop: currentScreen + 1 === screens.length && '50px' }}>
        {screens.map((_, index) => (
          <div
            key={index}
            style={{ backgroundColor: index + 1 === screens.length && index === currentScreen ? '#89b789' : index === currentScreen && '#bcb175' }}
            onClick={() => setCurrentScreen(index)}
            className={styles.currentScreenDot}
          ></div>
        ))}
      </div>
    </ModalWrap>
  );
};

export default InstructionModal;
