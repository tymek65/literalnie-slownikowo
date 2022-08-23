import QRCode from 'react-qr-code';
import styles from './Export.module.sass';

const Export = ({ stats }) => {
  return (
    <>
      <div className={styles.qrwrap}>
        <QRCode
          value={`literalnie://?zagrane=${stats?.slownikowo?.zagrane || 0}&wygrane=${stats?.slownikowo?.wygrane || 0}&streak=${stats?.slownikowo?.zrzedu || 0}&distribution=${
            JSON.stringify(stats?.slownikowo?.dystrybucja) || JSON.stringify([0, 0, 0, 0, 0])
          }&type=slownikowo
          `}
        />
      </div>
      <a
        className={styles.exportbutton}
        href={`literalnie://?zagrane=${stats?.slownikowo?.zagrane || 0}&wygrane=${stats?.slownikowo?.wygrane || 0}&streak=${stats?.slownikowo?.zrzedu || 0}&distribution=${
          JSON.stringify(stats?.slownikowo?.dystrybucja) || JSON.stringify([0, 0, 0, 0, 0])
        }&type=slownikowo
        `}
        target="_blank"
        rel="noreferrer"
      >
        <p>Przenieś statystyki!</p>
      </a>
    </>
  );
};

export default Export;
