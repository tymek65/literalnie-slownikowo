import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './slownikowo.module.sass';
import Head from 'next/head';
import Buttons from '../components/Slownikowo/Buttons';
import GameWrap from '../components/Slownikowo/GameWrap';
import Header from '../components/Header';
import { handleSubmit, loadGuesses, loadSolution } from '../utils/slownikowoHelpers';
import { formHelpers } from '../utils/slownikowoHelpers';
import GuessesDots from '../components/Slownikowo/GuessesDots';
import InstructionModal from '../components/Slownikowo/modal/InstructionModal';
import StatsModal from '../components/Slownikowo/modal/StatsModal';

export default function Slownikowo() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [randomWord, setRandomWord] = useState({ word: null, puzzleNumber: null });
  let loading = false;
  const GAME_TRIES = 15;
  const inputText = useRef(null);
  const { isDisabled, inputColor, inputValue } = formHelpers(guesses, currentGuess, randomWord.word, GAME_TRIES);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (loading) return;
    loading = true;
    try {
      const state = await handleSubmit(currentGuess, randomWord.word, GAME_TRIES, guesses.length);
      setGuesses((prev) => [...prev, { slowo: currentGuess, state }]);
      setCurrentGuess('');
      loading = false;
    } catch (err) {
      loading = false;
      toast.error(err, {
        autoClose: 2000,
        pauseOnHover: false,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if (guesses.length > 0) {
      let array = [];
      for (const element of guesses) {
        array.push(element.slowo);
      }
      localStorage.setItem('boardStateSlownikowo', JSON.stringify({ slownikowo: { slowa: array, haslo: randomWord.word } }));
    }
    for (const element of guesses) {
      if (element.state === 2) {
        inputText.current.blur();
        setTimeout(() => {
          setIsModalVisible(true);
        }, 600);
      }
    }
    if (guesses.length === GAME_TRIES) {
      inputText.current.blur();
      setTimeout(() => {
        setIsModalVisible(true);
      }, 600);
    }
  }, [guesses, randomWord.word]);

  useEffect(() => {
    if (randomWord.word !== null) {
      setGuesses([]);
      setCurrentGuess('');
      const boardState = JSON.parse(localStorage.getItem('boardStateSlownikowo'));
      if (boardState?.slownikowo?.haslo === randomWord.word) {
        const loadedGuesses = loadGuesses(boardState.slownikowo.slowa, randomWord.word);
        setGuesses(loadedGuesses);
      }
    }
  }, [randomWord.word]);

  useEffect(() => {
    inputText.current.focus();
  }, []);

  useEffect(() => {
    const getSolution = async () => {
      const solution = await loadSolution();
      setRandomWord(solution);
    };
    getSolution();
    const data = localStorage.getItem('firstSlownikowo');
    if (data === null) {
      setIsHelpVisible(true);
      localStorage.setItem('firstSlownikowo', false);
    }
  }, []);

  if (!randomWord)
    return (
      <div className={styles.center}>
        <p>Słownikowo | Ładowanie...</p>
      </div>
    );
  return (
    <>
      <ToastContainer hideProgressBar pauseOnFocusLoss="false" position="top-center" type="warning" theme="dark" />
      <div className={styles.slownikowoMain}>
        {isModalVisible && <StatsModal setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} game={guesses} randomWord={randomWord} toast={toast} />}
        {isHelpVisible && <InstructionModal setIsHelpVisible={setIsHelpVisible} />}

        <Head>
          <title>Słownikowo</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#538d4e" />
          <meta name="description" content="Słownikowo | Polska gra słowna od twórców literalnie.fun!" />
        </Head>
        <Header title="SŁOWNIKOWO" infoBar="slownikowo" />
        <div className={styles.gamewrap}>
          <GuessesDots proby={guesses} />

          <GameWrap guesses={guesses} randomWord={randomWord.word}>
            <form onSubmit={(e) => handleCheck(e)}>
              <input
                disabled={isDisabled}
                value={inputValue}
                style={{ color: inputColor }}
                ref={inputText}
                onChange={(e) => setCurrentGuess(e.target.value.toLocaleLowerCase().trim())}
                type="text"
                placeholder="WPISZ SŁOWO"
              />
            </form>
          </GameWrap>
          <Buttons setIsHelpVisible={setIsHelpVisible} setIsModalVisible={setIsModalVisible} />
        </div>
      </div>
    </>
  );
}
