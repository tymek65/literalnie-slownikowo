import axios from 'axios';

export const checkIfValid = async (word) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/slowas?slowo=${word}`).catch((err) => {
    // assume word is correct if db is down
    return true;
  });
  if (data.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const handleStatystyki = (result, guesses) => {
  const oldStats = JSON.parse(localStorage.getItem('statystykiNew'));
  let dystrybucjaTemp = oldStats?.slownikowo?.dystrybucja || [0, 0, 0, 0, 0];
  dystrybucjaTemp[parseInt(guesses / 3)]++;

  const newStats = {
    ...oldStats,
    slownikowo: {
      wygrane: result === 'win' ? (oldStats?.slownikowo?.wygrane || 0) + 1 : oldStats?.slownikowo?.wygrane || 0,
      zagrane: (oldStats?.slownikowo?.zagrane || 0) + 1,
      zrzedu: result === 'win' ? (oldStats?.slownikowo?.zrzedu || 0) + 1 : 0,
      dystrybucja: dystrybucjaTemp,
    },
  };
  localStorage.setItem('statystykiNew', JSON.stringify(newStats));
};

export const loadGuesses = (guesses, solution) => {
  let state = [];
  for (const guess of guesses) {
    if (guess === solution) {
      state.push({ slowo: guess, state: 2 });
    } else {
      switch (guess.localeCompare(solution, 'pl')) {
        case 1:
          state.push({ slowo: guess, state: 0 });
          break;
        case -1:
          state.push({ slowo: guess, state: 1 });
          break;
      }
    }
  }
  return state;
};
export const loadSolution = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/haslas?_limit=1&_sort=created_at:DESC`).catch((err) => {
    throw err;
  });
  const { data: puzzleNumber } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/haslas/count`).catch((err) => {
    throw err;
  });
  return { word: await data[0].slowo, puzzleNumber: await puzzleNumber };
};

export const handleSubmit = async (guess, solution, maxTries, currentGuessesCount) => {
  if (currentGuessesCount >= maxTries) {
    throw 'Wykorzystałeś już wszystkie próby!';
  }
  const valid = await checkIfValid(guess);
  if (!valid) {
    throw 'Brak podanego słowa w bazie!';
  }
  if (currentGuessesCount + 1 === maxTries && guess !== solution) {
    handleStatystyki('lose', currentGuessesCount);
  }
  if (guess === solution) {
    handleStatystyki('win', currentGuessesCount);
    return 2;
  } else {
    switch (guess.localeCompare(solution, 'pl')) {
      case 1:
        return 0;
      case -1:
        return 1;
    }
  }
};

export const formHelpers = (guesses, currentGuess, solution, maxTries) => {
  const hasWon =
    guesses.filter((element) => {
      return element.state === 2;
    }).length > 0
      ? true
      : false;
  const isDisabled = hasWon || guesses.length >= maxTries;
  const inputColor = hasWon ? '#89B789' : 'unset';
  const inputValue = hasWon ? solution : currentGuess;
  return { isDisabled, inputColor, inputValue };
};
export const timeLeft = () => {
  var olddate = new Date();
  var utc = olddate.getTime() + olddate.getTimezoneOffset() * 60000;
  var date = new Date(utc + 3600000 * 1);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let time = hours + ':' + minutes + ':' + seconds;
  let timeLeft = '00:00:00';
  let timeLeftArray = timeLeft.split(':');
  let timeArray = time.split(':');
  let timeLeftHours = parseInt(timeLeftArray[0]);
  let timeLeftMinutes = parseInt(timeLeftArray[1]);
  let timeLeftSeconds = parseInt(timeLeftArray[2]);
  let hoursLeft = timeLeftHours - timeArray[0];
  let minutesLeft = timeLeftMinutes - timeArray[1];
  let secondsLeft = timeLeftSeconds - timeArray[2];
  if (secondsLeft < 0) {
    secondsLeft = 60 + secondsLeft;
    minutesLeft--;
  }
  if (minutesLeft < 0) {
    minutesLeft = 60 + minutesLeft;
    hoursLeft--;
  }
  if (hoursLeft < 0) {
    hoursLeft = 24 + hoursLeft;
  }
  if (hoursLeft < 10) {
    hoursLeft = '0' + hoursLeft;
  }
  if (minutesLeft < 10) {
    minutesLeft = '0' + minutesLeft;
  }
  if (secondsLeft < 10) {
    secondsLeft = '0' + secondsLeft;
  }
  return hoursLeft + ':' + minutesLeft + ':' + secondsLeft;
};

export const getEmojiGrid = (guesses, puzzleNumber) => {
  let gora = '';
  let dol = '';
  const liczby = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '1️⃣0️⃣', '1️⃣1️⃣', '1️⃣2️⃣', '1️⃣3️⃣', '1️⃣4️⃣', '1️⃣5️⃣', '1️⃣6️⃣', '1️⃣7️⃣', '1️⃣8️⃣', '1️⃣9️⃣', '2️⃣0️⃣'];

  for (let i = 0; i < guesses.length - 1; i++) {
    if (guesses[i].state === 1) {
      gora += `${(i < 9 && guesses.length >= 11 ? '0️⃣' + liczby[i] : liczby[i]) + '⬇️'.repeat(5 - parseInt(guesses.length / 11))}  \n`;
    } else if (guesses[i].state === 0) {
      dol = `${(i < 9 && guesses.length >= 11 ? '0️⃣' + liczby[i] : liczby[i]) + '⬆️'.repeat(5 - parseInt(guesses.length / 11))} \n` + dol;
    }
  }

  return `slownikowo.fun ${puzzleNumber} ${guesses.length}/15 \n\n` + gora + (guesses.filter((element) => element.state === 2).length > 0 ? '✅' : '❌').repeat(6) + '\n' + dol;
};
