import '../styles/globals.css'; // Global styles (ensure this file exists or you create it)
import { useEffect } from 'react'; // Optional: If you need to run any code on app load

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Optional: Any global initialization code, like tracking, etc.
  }, []);

  return (
    <Component {...pageProps} />  // Renders the active page component
  );
}

export default MyApp;