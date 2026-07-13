import React from 'react';
import { motion } from 'framer-motion';

interface SunflowerSVGProps {
  size?: number;
  animate?: boolean;
}

const SunflowerSVG: React.FC<SunflowerSVGProps> = ({ size = 200, animate: shouldAnimate = true }) => {
  const svgContent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Petals */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const cx = 100 + Math.cos(angle) * 60;
        const cy = 100 + Math.sin(angle) * 60;
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={18}
            ry={30}
            fill="#F9A825"
            transform={`rotate(${i * 30}, ${cx}, ${cy})`}
            opacity={0.9}
          />
        );
      })}

      {/* Inner petals */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const cx = 100 + Math.cos(angle) * 38;
        const cy = 100 + Math.sin(angle) * 38;
        return (
          <ellipse
            key={`inner-${i}`}
            cx={cx}
            cy={cy}
            rx={10}
            ry={20}
            fill="#FFB300"
            transform={`rotate(${i * 45}, ${cx}, ${cy})`}
            opacity={0.8}
          />
        );
      })}

      {/* Center dark disc */}
      <circle cx="100" cy="100" r="28" fill="#4E342E" />
      <circle cx="100" cy="100" r="22" fill="#3E2723" />

      {/* Seed pattern dots */}
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i * 137.5 * Math.PI) / 180;
        const r = 4 + (i % 5) * 3;
        const cx = 100 + Math.cos(angle) * r;
        const cy = 100 + Math.sin(angle) * r;
        return (
          <circle
            key={`seed-${i}`}
            cx={cx}
            cy={cy}
            r={1.5}
            fill="#6D4C41"
            opacity={0.8}
          />
        );
      })}

      {/* Center highlight */}
      <circle cx="95" cy="95" r="6" fill="#5D4037" opacity={0.3} />
    </svg>
  );

  if (!shouldAnimate) return svgContent;

  return (
    <motion.div
      animate={{
        rotate: [0, 3, 0, -3, 0],
        scale: [1, 1.03, 1, 1.03, 1],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {svgContent}
    </motion.div>
  );
};

export const LilySVG: React.FC<{ size?: number }> = ({ size = 80 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Petals */}
    {Array.from({ length: 6 }, (_, i) => {
      const angle = (i * 60 * Math.PI) / 180;
      const cx = 40 + Math.cos(angle) * 22;
      const cy = 40 + Math.sin(angle) * 22;
      return (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={10}
          ry={18}
          fill="#F8BBD9"
          transform={`rotate(${i * 60}, ${cx}, ${cy})`}
          opacity={0.9}
        />
      );
    })}
    {/* Center */}
    <circle cx="40" cy="40" r="10" fill="#FFB300" />
    <circle cx="40" cy="40" r="5" fill="#F9A825" />
  </svg>
);

export default SunflowerSVG;
