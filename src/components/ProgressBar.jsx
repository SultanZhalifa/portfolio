import { useEffect, useState } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
      zIndex: 9999, background: 'transparent', pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #fff 0%, #666 100%)',
        transition: 'width 0.1s linear',
        boxShadow: '0 0 8px rgba(255,255,255,0.3)',
      }} />
    </div>
  );
}
