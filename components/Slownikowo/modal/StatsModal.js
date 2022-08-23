import { useState } from 'react';
import styles from './StatsModal.module.sass';
import Statistics from './Statistics';
import Export from './Export';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import ModalWrap from './ModalWrap';

const StatsModal = ({ game, randomWord, setIsModalVisible }) => {
  const stats = JSON.parse(localStorage.getItem('statystykiNew'));

  const [exportVisible, setExportVisible] = useState(false);

  return (
    <ModalWrap setIsModalVisible={setIsModalVisible}>
      <div className={styles.modalContentWrap}>{!exportVisible ? <Statistics stats={stats} game={game} randomWord={randomWord} /> : <Export stats={stats} setExportVisible={setExportVisible} />}</div>
      <FontAwesomeIcon className={styles.changePageButton} onClick={() => setExportVisible((prev) => !prev)} icon={exportVisible ? faChartSimple : faFileExport} />
    </ModalWrap>
  );
};

export default StatsModal;
