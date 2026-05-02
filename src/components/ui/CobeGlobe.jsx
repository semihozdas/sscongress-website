import { useEffect, useRef, useCallback } from 'react';
import createGlobe from 'cobe';
import { useTheme } from '../../context/ThemeContext';

const MARKERS = [
  { id: 'ankara',   label: 'Ankara',   country: 'TR', location: [39.9334,  32.8597], size: 0.12 },
  { id: 'istanbul', label: 'İstanbul', country: 'TR', location: [41.0082,  28.9784], size: 0.10 },
  { id: 'doha',     label: 'Doha',     country: 'QA', location: [25.2854,  51.5310], size: 0.10 },
  { id: 'moscow',   label: 'Moskova',  country: 'RU', location: [55.7558,  37.6173], size: 0.10 },
  { id: 'kazan',    label: 'Kazan',    country: 'RU', location: [55.7961,  49.1088], size: 0.10 },
  { id: 'london',   label: 'Londra',   country: 'UK', location: [51.5074,  -0.1278], size: 0.09 },
  { id: 'berlin',   label: 'Berlin',   country: 'DE', location: [52.5200,  13.4050], size: 0.08 },
  { id: 'mecca',    label: 'Mekke',    country: 'SA', location: [21.3891,  39.8579], size: 0.09 },
  { id: 'bangkok',  label: 'Bangkok',  country: 'TH', location: [13.7563, 100.5018], size: 0.08 },
  { id: 'dubai',    label: 'Dubai',    country: 'AE', location: [25.2048,  55.2708], size: 0.09 },
];

function project(lat, lon, phi, theta) {
  const latR = lat * Math.PI / 180;
  const lonR = lon * Math.PI / 180 - Math.PI;
  const cL = Math.cos(latR);
  let x = -cL * Math.cos(lonR);
  let y =  Math.sin(latR);
  let z =  cL * Math.sin(lonR);

  const r = 0.85;
  x *= r; y *= r; z *= r;

  const cP = Math.cos(phi), sP = Math.sin(phi);
  const cT = Math.cos(theta), sT = Math.sin(theta);

  const x2 =  cP * x + sP * z;
  const y2 =  sP * sT * x + cT * y - cP * sT * z;
  const z2 = -sP * cT * x + sT * y + cP * cT * z;

  return { sx: (x2 + 1) / 2, sy: (-y2 + 1) / 2, z: z2 };
}

export default function CobeGlobe() {
  const canvasRef        = useRef(null);
  const pointerInteracting = useRef(null);
  const lastPointer      = useRef(null);
  const dragOffset       = useRef({ phi: 0, theta: 0 });
  const velocity         = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef     = useRef(0);
  const thetaOffsetRef   = useRef(0);
  const isPausedRef      = useRef(false);
  const labelLayerRef    = useRef(null);
  const labelRefs        = useRef({});
  const labelStateRef    = useRef({});
  const containerSizeRef = useRef({ w: 0, h: 0 });
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
      phiOffsetRef.current   += dragOffset.current.phi;
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

    const refreshSize = () => {
      if (!labelLayerRef.current) return;
      const r = labelLayerRef.current.getBoundingClientRect();
      containerSizeRef.current = { w: r.width, h: r.height };
    };

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

      refreshSize();

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

        const curPhi   = phi + phiOffsetRef.current + dragOffset.current.phi;
        const curTheta = 0.3 + thetaOffsetRef.current + dragOffset.current.theta;

        globe.update({
          phi: curPhi,
          theta: curTheta,
          dark,
          mapBrightness,
          baseColor,
          markerColor,
          glowColor,
          markers: MARKERS,
        });

        const { w, h } = containerSizeRef.current;
        if (w > 0) {
          for (const m of MARKERS) {
            const el = labelRefs.current[m.id];
            if (!el) continue;
            const { sx, sy, z } = project(m.location[0], m.location[1], curPhi, curTheta);
            const tx = Math.max(8, Math.min(w - 8, sx * w));
            const ty = sy * h;
            const visible = z >= 0.05;
            const prev = labelStateRef.current[m.id] || {};
            if (Math.abs((prev.tx ?? 0) - tx) > 0.5 || Math.abs((prev.ty ?? 0) - ty) > 0.5) {
              el.style.transform = `translate3d(${tx}px,${ty}px,0) translate(-50%,calc(-100% - 14px))`;
            }
            if (prev.visible !== visible) el.style.opacity = visible ? '1' : '0';
            labelStateRef.current[m.id] = { tx, ty, visible };
          }
        }

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

    const sizeObserver = new ResizeObserver(refreshSize);
    if (labelLayerRef.current) sizeObserver.observe(labelLayerRef.current);

    return () => {
      sizeObserver.disconnect();
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
      <div ref={labelLayerRef} className="cobe-label-layer" aria-hidden="true">
        {MARKERS.map((m) => (
          <span
            key={m.id}
            ref={(el) => { labelRefs.current[m.id] = el; }}
            className="cobe-label"
          >
            <span className="cobe-label__name">{m.label}</span>
            {m.country && <span className="cobe-label__country">{m.country}</span>}
          </span>
        ))}
      </div>
      <style>{`
        .cobe-label-layer { position:absolute; inset:0; pointer-events:none; }
        .cobe-label {
          position:absolute; top:0; left:0;
          display:inline-flex; flex-direction:column; align-items:center; gap:2px;
          padding:5px 10px; border-radius:9999px;
          font-family:'Inter',system-ui,sans-serif; font-size:11px; line-height:1;
          white-space:nowrap; pointer-events:none;
          opacity:0; transition:opacity 220ms ease-out;
          will-change:transform,opacity; transform-origin:50% 100%;
          backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);
          background:rgba(255,255,255,0.92);
          color:#064e3b;
          border:1px solid rgba(16,185,129,0.28);
          box-shadow:0 4px 14px -4px rgba(16,185,129,0.25),0 2px 6px -2px rgba(0,0,0,0.06);
        }
        .cobe-label__name { font-family:'Outfit','Inter',sans-serif; font-weight:700; }
        .cobe-label__country {
          font-size:9px; opacity:0.65; letter-spacing:0.10em;
          text-transform:uppercase; font-weight:600;
        }
        .cobe-label::after {
          content:""; position:absolute; bottom:-3px; left:50%;
          width:6px; height:6px;
          transform:translateX(-50%) rotate(45deg);
          background:inherit; border-right:inherit; border-bottom:inherit;
        }
        [data-theme="dark"] .cobe-label {
          background:rgba(7,14,10,0.82);
          color:#d1fae5;
          border-color:rgba(16,185,129,0.40);
          box-shadow:0 4px 14px -4px rgba(0,0,0,0.5),inset 0 0 0 1px rgba(16,185,129,0.10);
        }
      `}</style>
    </div>
  );
}
