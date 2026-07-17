import { useEffect } from 'react';

const UMAMI_SRC = import.meta.env.VITE_UMAMI_SRC as string | undefined;
const UMAMI_WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined;

const Analytics = () => {
  useEffect(() => {
    if (!UMAMI_SRC || !UMAMI_WEBSITE_ID) return;
    if (document.querySelector('script[data-website-id]')) return;

    const script = document.createElement('script');
    script.defer = true;
    script.src = UMAMI_SRC;
    script.setAttribute('data-website-id', UMAMI_WEBSITE_ID);
    document.head.appendChild(script);
  }, []);

  return null;
};

export default Analytics;
