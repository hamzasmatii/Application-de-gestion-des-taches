import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /TaskPages/AfficherTasks when the app loads
    router.push('/TaskPages/AfficherTasks');
  }, [router]);

  return null; // No need to render anything since the user will be redirected
};

export default Home;
