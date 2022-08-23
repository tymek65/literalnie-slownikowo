import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './ModalWrap.module.sass';
const ModalWrap = ({ children, setIsModalVisible }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.result}>
        <div className={styles.closeButton} onClick={() => setIsModalVisible(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalWrap;
