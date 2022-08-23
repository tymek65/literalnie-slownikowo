import InfoBar from './InfoBar';
import styles from './Header.module.sass';
import Link from 'next/link';
import { animated, useSpring } from 'react-spring';
import { useState, Fragment } from 'react';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Header = ({ title, infoBar }) => {
  const [toggle, setToggle] = useState(false);
  const sites = [
    { name: 'LITERALNIE', url: 'https://literalnie.fun' },
    { name: 'SŁOWNIKOWO', url: '/' },
    { name: 'BOMBOWO', url: 'https://literalnie.fun/bombowo' },
  ];
  const springStyles = useSpring({ top: toggle ? '55px' : '-200px', opacity: toggle ? 1 : 0 });
  return (
    <>
      <animated.nav style={springStyles} className={styles.menu}>
        {sites.map((site, index) => (
          <Fragment key={index}>
            {site.name !== title && (
              <Link href={site.url} passHref>
                <a>{site.name}</a>
              </Link>
            )}
          </Fragment>
        ))}
      </animated.nav>
      <div className={styles.headerWrap}>
        <div className={styles.slownikowoHeader}>
          <div className={styles.dummytitle}></div>
          <h1 onClick={() => setToggle((prev) => !prev)}>{title}</h1>
          <FontAwesomeIcon onClick={() => setToggle((prev) => !prev)} icon={toggle ? faCaretUp : faCaretDown} />
        </div>
        <InfoBar game={infoBar} />
      </div>
    </>
  );
};

export default Header;
