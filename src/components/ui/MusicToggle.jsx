import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    // Note: You'll need to add a piano music file to public/piano-music.mp3
    audioRef.current = new Audio("/piano-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Soft background volume
    audioRef.current.addEventListener("canplaythrough", () => {
      setIsLoaded(true);
    });
    audioRef.current.addEventListener("error", () => {
      console.warn(
        "Background music file not found. Add piano-music.mp3 to public folder.",
      );
      setIsLoaded(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Auto-hide hint after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    // if (!audioRef.current || !isLoaded) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback failed:", err);
      });
      setIsPlaying(true);
      setShowHint(false);
    }
  };

  // Don't show if audio file isn't loaded
  // if (!isLoaded) return null;
  return (
    <div className="fixed bottom-6 right-25 z-40 flex items-center gap-3">
      {/* Text Hint */}
      <AnimatePresence>
        {showHint && !isPlaying && (
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: 30,
            }}
            transition={{
              duration: 1.0,
            }}
            className="bg-white text-wedding-black text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-gray-100 whitespace-nowrap"
          >
            🎵 Play music
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-wedding-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-wedding-gold transition-colors duration-300"
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {/* Pulse ring when not playing */}
        {!isPlaying && (
          <span className="absolute inset-0 rounded-full animate-ping bg-wedding-gold/30" />
        )}

        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{
                rotate: -90,
                opacity: 0,
              }}
              animate={{
                rotate: 0,
                opacity: 1,
              }}
              exit={{
                rotate: 90,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <Volume2 size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="paused"
              initial={{
                rotate: -90,
                opacity: 0,
              }}
              animate={{
                rotate: 0,
                opacity: 1,
              }}
              exit={{
                rotate: 90,
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <VolumeX size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
