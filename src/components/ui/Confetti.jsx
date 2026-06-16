import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = [
  "#D4AF37",
  "#FFFFFF",
  "#F5E6C8",
  "#E8C547",
  "#FBF3D5",
  "#C9A227",
];

const Confetti = ({ count = 120, loop = false }) => {
  const pieces = useMemo(() => {
    return Array.from({
      length: count,
    }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 6 + Math.random() * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * (loop ? 3 : 0.6),
      duration: 2.5 + Math.random() * 2.5,
      rotation: Math.random() * 360,
      drift: (Math.random() - 0.5) * 200,
      shape: Math.random() > 0.5 ? "square" : "circle",
    }));
  }, [count, loop]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            top: "-10%",
            left: `${piece.left}%`,
            opacity: 1,
            rotate: piece.rotation,
            x: 0,
          }}
          animate={{
            top: "110%",
            x: piece.drift,
            rotate: piece.rotation + 360,
            opacity: [1, 1, 0.8, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: loop ? Infinity : 0,
            repeatDelay: loop ? Math.random() * 2 : 0,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.shape === "circle" ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
