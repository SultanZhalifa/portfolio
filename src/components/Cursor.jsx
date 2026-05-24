import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (dotRef.current)  dotRef.current.style.opacity = '0';
      if (ringRef.current) { ringRef.current.style.width = '44px'; ringRef.current.style.height = '44px'; ringRef.current.style.marginLeft = '-6px'; ringRef.current.style.marginTop = '-6px'; }
    };
    const onLeaveLink = () => {
      if (dotRef.current)  dotRef.current.style.opacity = '1';
      if (ringRef.current) { ringRef.current.style.width = '32px'; ringRef.current.style.height = '32px'; ringRef.current.style.marginLeft = '0'; ringRef.current.style.marginTop = '0'; }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: '6px', height: '6px',
        borderRadius: '50%', background: '#fff',
        pointerEvents: 'none', zIndex: 99999,
        transition: 'opacity 0.2s',
        willChange: 'transform',
      }} />
      {/* Ring */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: '32px', height: '32px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.2)',
        pointerEvents: 'none', zIndex: 99998,
        transition: 'width 0.25s, height 0.25s, margin 0.25s',
        willChange: 'transform',
      }} />
      <style>{`
        @media (pointer: coarse) {
          /* hide cursor elements on touch devices */
          [data-cursor] { display: none !important; }
        }
        * { cursor: none !important; }
        @media (pointer: coarse) { * { cursor: auto !important; } }
      `}</style>
    </>
  );
}
