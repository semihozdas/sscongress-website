import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { cn } from '@/lib/utils';

function GridPattern({ width = 40, height = 40, x = -1, y = -1, ...props }) {
  const id = 'grid-pattern';
  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

export default function InfiniteGrid({ className, children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(420px at ${mouseX}px ${mouseY}px, white, transparent)`;

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className={cn('group relative overflow-hidden', className)} onMouseMove={onMouseMove}>
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]">
        <GridPattern className="absolute inset-0 h-full w-full fill-white/[0.02] stroke-white/[0.04]" width={40} height={40} />
      </div>
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern className="absolute inset-0 h-full w-full fill-emerald-500/[0.08] stroke-emerald-500/[0.18]" width={40} height={40} />
      </motion.div>
      {children}
    </div>
  );
}
