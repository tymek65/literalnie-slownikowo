import styles from './InfoBar.module.sass';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
const InfoBar = ({ game }) => {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/infos?gra=${game}`).then((res) => {
      setInfo(res.data);
    });
  }, [game]);
  return (
    <>
      {info.length > 0 && (
        <div style={{ backgroundColor: info[0].type === 'info' ? '#81C285' : '#AD4A4A' }} className={styles.infoBanner}>
          <p>{info[0]?.value}</p>
          {info[0].buttonText && info[0].buttonLink && (
            <Link href={info[0].buttonLink}>
              <button>{info[0].buttonText}</button>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default InfoBar;
