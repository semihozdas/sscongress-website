import { useEffect, useRef, useCallback } from 'react';
import createGlobe from 'cobe';
import { useTheme } from '../../context/ThemeContext';

const MARKERS = [
  { id: 'ankara',   location: [39.9334,  32.8597], size: 0.12 },
  { id: 'istanbul', location: [41.0082,  28.9784], size: 0.10 },
  { id: 'doha',     location: [25.2854,  51.5310], size: 0.10 },
  { id: 'moscow',   location: [55.7558,  37.6173], size: 0.10 },
  { id: 'kazan',    location: [55.7961,  49.1088], size: 0.10 },
  { id: 'london',   location: [51.5074,  -0.1278], size: 0.09 },
  { id: 'berlin',   location: [52.5200,  13.4050], size: 0.08 },
  { id: 'mecca',    location: [21.3891,  39.8579], size: 0.09 },
  { id: 'bangkok',  location: [13.7563, 100.5018], size: 0.08 },
  { id: 'dubai',    location: [25.2048,  55.2708], size: 0.09 },
];

export default function CobeGlobe() {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const lastPointer = useRef(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const { isDark } = useTheme();

  const handlePointerDown = useCallback((e) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
    isPausedRef.current = true;
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (pointerInteracting.current === null) return;
    const deltaX = e.clientX - pointerInteracting.current.x;
    const deltaY = e.clientY - pointerInteracting.current.y;
    dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 };
    const now = Date.now();
    if (lastPointer.current) {
      const dt = Math.max(now - lastPointer.current.t, 1);
      const cap = 0.15;
      velocity.current = {
        phi:   Math.max(-cap, Math.min(cap, ((e.clientX - lastPointer.current.x) / dt) * 0.3)),
        theta: Math.max(-cap, Math.min(cap, ((e.clientY - lastPointer.current.y) / dt) * 0.08)),
      };
    }
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let globe = null;
    let animId;
    let phi = 0.5;

    const dark          = isDark ? 1 : 0;
    const mapBrightness = isDark ? 6 : 10;
    const baseColor     = isDark ? [0.07, 0.16, 0.11] : [0.94, 0.99, 0.97];
    const markerColor   = [0.063, 0.725, 0.506];
    const glowColor     = isDark ? [0.063, 0.6, 0.4] : [0.5, 0.9, 0.75];

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width,
        height: width,
        phi: 0.5,
        theta: 0.3,
        dark,
        diffuse: 1.4,
        mapSamples: 16000,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markers: MARKERS,
        opacity: 0.85,
      });

      function animate() {
        if (!isPausedRef.current) {
          phi += 0.003;
          if (Math.abs(velocity.current.phi) > 0.0001 || Math.abs(velocity.current.theta) > 0.0001) {
            phiOffsetRef.current   += velocity.current.phi;
            thetaOffsetRef.current += velocity.current.theta;
            velocity.current.phi   *= 0.95;
            velocity.current.theta *= 0.95;
          }
          const tMin = -0.4, tMax = 0.4;
          if (thetaOffsetRef.current < tMin)
            thetaOffsetRef.current += (tMin - thetaOffsetRef.current) * 0.1;
          else if (thetaOffsetRef.current > tMax)
            thetaOffsetRef.current += (tMax - thetaOffsetRef.current) * 0.1;
        }
        globe.update({
          phi:   phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.3 + thetaOffsetRef.current + dragOffset.current.theta,
          dark,
          mapBrightness,
          baseColor,
          markerColor,
          glowColor,
          markers: MARKERS,
        });
        animId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => { if (canvas) canvas.style.opacity = '1'; });
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
      return () => {
        ro.disconnect();
        if (animId) cancelAnimationFrame(animId);
        if (globe) globe.destroy();
      };
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (globe) globe.destroy();
    };
  }, [isDark]);

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          opacity: 0,
          transition: 'opacity 1.2s ease',
          borderRadius: '50%',
          touchAction: 'none',
          filter: 'drop-shadow(0 0 60px rgba(16,185,129,0.3))',
        }}
      />
    </div>
  );
}
