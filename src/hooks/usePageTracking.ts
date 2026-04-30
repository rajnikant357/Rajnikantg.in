import { useEffect } from 'react';

function usePageTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sendPageview = () => {
      try {
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('config', 'G-9YGWFD4GZ3', {
            page_path: window.location.pathname,
          });
        }
      } catch (e) {
        // ignore errors
      }
    };

    // initial pageview
    sendPageview();

    const handleLocationChange = () => sendPageview();

    // listen for back/forward
    window.addEventListener('popstate', handleLocationChange);

    // patch pushState/replaceState to detect SPA navigations
    const _pushState = history.pushState;
    const _replaceState = history.replaceState;

    history.pushState = function (...args: any[]) {
      const res = _pushState.apply(this, args as any);
      window.dispatchEvent(new Event('locationchange'));
      return res;
    };

    history.replaceState = function (...args: any[]) {
      const res = _replaceState.apply(this, args as any);
      window.dispatchEvent(new Event('locationchange'));
      return res;
    };

    window.addEventListener('locationchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('locationchange', handleLocationChange);
      history.pushState = _pushState;
      history.replaceState = _replaceState;
    };
  }, []);
}

export default usePageTracking;
