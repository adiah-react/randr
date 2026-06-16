import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function getDiffParts(diffMs) {
  const abs = Math.abs(diffMs);
  return {
    days: Math.floor(abs / (1000 * 60 * 60 * 24)),
    hours: Math.floor((abs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((abs % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((abs % (1000 * 60)) / 1000),
  };
}

export function CountdownTimer({ targetDate, className = "", onComplete }) {
  const initialDiff = targetDate.getTime() - new Date().getTime();
  const [isMarried, setIsMarried] = useState(initialDiff <= 0);
  const [timeParts, setTimeParts] = useState(getDiffParts(initialDiff));

  const hasFiredComplete = useRef(initialDiff <= 0);

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;
      if (difference <= 0 && !hasFiredComplete.current) {
        hasFiredComplete.current = true;
        setIsMarried(true);
        onComplete?.();
      }
      setIsMarried(difference <= 0);
      setTimeParts(getDiffParts(difference));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const timeUnits = [
    {
      label: "Days",
      value: timeParts.days,
    },
    {
      label: "Hours",
      value: timeParts.hours,
    },
    {
      label: "Minutes",
      value: timeParts.minutes,
    },
    {
      label: "Seconds",
      value: timeParts.seconds,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      {isMarried && (
        <motion.span
          initial={{
            opacity: 0,
            y: -8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-wedding-gold text-xs md:text-sm uppercase tracking-[0.3e] font-medium"
        >
          Married for
        </motion.span>
      )}
      <div className={`flex gap-4 md:gap-8 justify-centre ${className}`}>
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
            }}
            className="flex flex-col items-center"
          >
            <div
              className={`backdrop-blur-s border rounded-sm px-4 py-3 md:px-6 md:py-4 min-w-[60px] md:min-w-[80px] transition-colors ${isMarried ? "bg-wedding-gold/20 border-wedding-gold/40" : "bg-white/10 border-white/20"}`}
            >
              <span className="text-3xl md:text-5xl font-serif text-white tabular-nums">
                {unit.value.toString().padStart(2, "0")}
              </span>
            </div>
            <span className="text-xs md:text-sm text-gray-300 uppercase tracking-widest mt-2">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
