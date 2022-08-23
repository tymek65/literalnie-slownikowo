import styles from './GuessesDots.module.sass';
const GuessesDots = ({ proby }) => {
  return (
    <div className={styles.circleWrap}>
      {Array.from({ length: 15 }).map((_, index) => (
        <div className={styles.circle} style={{ backgroundColor: proby.length > index && (proby[index].state === 2 ? '#89B789' : '#BCB175') }} key={index}></div>
      ))}
    </div>
  );
};

export default GuessesDots;
