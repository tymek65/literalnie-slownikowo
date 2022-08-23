import '../styles/globals.css';
import { useEffect } from 'react';
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const theme = localStorage.getItem('theme') ?? 'light';
    const colorblind = localStorage.getItem('colorblind') ?? false;
    document.documentElement.setAttribute('data-theme', `${theme}${colorblind}`);
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
