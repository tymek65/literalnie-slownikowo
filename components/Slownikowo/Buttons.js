import styles from './Buttons.module.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faMoon, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
const Buttons = ({ setIsHelpVisible, setIsModalVisible }) => {
  const handleDarkmode = () => {
    const theme = localStorage.getItem('theme');
    const colorblind = localStorage.getItem('colorblind') ?? false;
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', `light${colorblind}`);
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', `dark${colorblind}`);
      localStorage.setItem('theme', 'dark');
    }
  };
  return (
    <div className={styles.buttonsWrap}>
      <FontAwesomeIcon icon={faCircleQuestion} onClick={() => setIsHelpVisible((prev) => !prev)} />
      <FontAwesomeIcon icon={faMoon} onClick={handleDarkmode} />
      <FontAwesomeIcon icon={faChartSimple} onClick={() => setIsModalVisible(true)} />
    </div>
  );
};

export default Buttons;
