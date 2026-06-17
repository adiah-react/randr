import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  ChevronDown,
  Heart,
  MessageCircle,
  UploadCloud,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/Button";
import Confetti from "../components/ui/Confetti";
import { CountdownTimer } from "../components/ui/CountdownTimer";
import { PageTransition } from "../components/ui/PageTransition";
import { subscribeToPhotos } from "../lib/firebaseService";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1170&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1170&auto=format&fit=crop",
];

export function LandingPage() {
  // Wedding date: June 20, 2026
  const weddingDate = new Date("2026-06-20T14:00:00");
  // const weddingDate = new Date("2026-06-16T13:46:00");

  const [isMarried, setIsMarried] = useState(
    weddingDate.getTime() - new Date().getTime() <= 0,
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [photos, setPhotos] = useState([]);

  // Subscribe to guest-uploaded photos in real time
  useEffect(() => {
    const unsubscribe = subscribeToPhotos(setPhotos);
    return () => unsubscribe();
  }, []);

  const hasGuestPhotos = photos.length > 0;

  const handleCountdownComplete = () => {
    setIsMarried(true);
    setShowConfetti(true);
    // confetti burst plays for a while then settles
    setTimeout(() => setShowConfetti(false), 8000);
  };

  // Celebrate with a confetti burst on first load if the day has already arrived
  useEffect(() => {
    if (isMarried) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 8000);
      return () => clearTimeout(timer);
    }
    // We only want this to run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageTransition className="bg-wedding-black text-white">
      {/* Confetti burst on the moment of marriage */}
      <AnimatePresence>
        {showConfetti && <Confetti count={150} loop />}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/hero.jpeg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="z-10 text-center space-y-8 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {isMarried ? (
              <motion.p
                key="married-tagline"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="text-wedding-gold text-lg md:text-2xl italic font-serif tracking-wide"
              >
                Just Married 💍
              </motion.p>
            ) : (
              <motion.p
                key="pre-tagline"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                }}
                className="text-wedding-grey text-lg md:text-xl italic font-serif tracking-wide"
              >
                &quot;Two souls, one heart&quot;
              </motion.p>
            )}
          </AnimatePresence>

          <motion.h1
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.4,
              duration: 1,
              ease: "easeOut",
            }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight leading-none"
          >
            Rhiannon{" "}
            <span className="text-wedding-gold text-4xl md:text-6xl align-middle mx-2">
              &
            </span>{" "}
            Rashaad
          </motion.h1>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.6,
              duration: 0.8,
            }}
            className="flex flex-col items-center space-y-6"
          >
            <p className="text-wedding-grey text-xl tracking-[0.2em] uppercase font-light">
              {isMarried ? "June 20, 2026 • Forever Begins" : "June 20, 2026"}
            </p>

            {/* Countdown / Time Married Timer */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
                duration: 0.8,
              }}
              className="pt-4"
            >
              <CountdownTimer
                targetDate={weddingDate}
                onComplete={handleCountdownComplete}
              />
            </motion.div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              {isMarried ? (
                <>
                  <a href="#gallery">
                    <Button variant="primary" className="w-full sm:w-auto">
                      <Camera size={16} className="mr-2" />
                      View Gallery
                    </Button>
                  </a>
                  <Link to="/guestbook">
                    <Button
                      variant="outlineWhite"
                      className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-black"
                    >
                      <MessageCircle size={16} className="mr-2" />
                      Sign Guestbook
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/details">
                  <Button
                    variant="outlineWhite"
                    className="border-white text-white hover:bg-white hover:text-black"
                  >
                    Event Details
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.2,
            duration: 1,
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow"
        >
          <ChevronDown className="text-wedding-grey w-8 h-8 opacity-70" />
        </motion.div>
      </section>

      {/* Married: Unlocked Gallery Section */}
      {isMarried && (
        <section
          id="gallery"
          className="py-24 px-6 bg-white text-wedding-black"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
              }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-wedding-gold/10 mb-4">
                <Heart className="w-6 h-6 text-wedding-gold" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-4">
                Our Wedding Day
              </h2>
              <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
                A glimpse into the most magical day of our lives. Thank you for
                being part of our story.
              </p>
              <div className="w-16 h-px bg-wedding-gold mx-auto mt-6"></div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {hasGuestPhotos
                ? photos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{
                        opacity: 0,
                        scale: 0.95,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: Math.min(index, 8) * 0.08,
                        duration: 0.6,
                      }}
                      className={`group relative overflow-hidden rounded-sm ${index === 0 ? "col-span-2 row-span-2" : ""}`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption || `Photo by ${photo.uploaderName}`}
                        className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Attribution overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        {photo.caption && (
                          <p className="text-white text-sm font-light line-clamp-2">
                            {photo.caption}
                          </p>
                        )}
                        <p className="text-white/70 text-xs mt-0.5">
                          — {photo.uploaderName}
                        </p>
                      </div>
                    </motion.div>
                  ))
                : FALLBACK_IMAGES.map((src, index) => (
                    <motion.div
                      key={src}
                      initial={{
                        opacity: 0,
                        scale: 0.95,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.6,
                      }}
                      className={`overflow-hidden rounded-s ${index === 0 ? "col-span-2 row-span-2" : ""}`}
                    >
                      <img
                        src={src}
                        alt={`Wedding moment ${index + 1}`}
                        className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
                      />
                    </motion.div>
                  ))}
            </div>

            {/* Add Your Photos CTA */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="mt-10 text-center"
            >
              <Link to="/upload">
                <Button variant="secondary" size="lg">
                  <UploadCloud size={18} className="mr-2" />
                  Add Your Photos
                </Button>
              </Link>
              <p className="text-sm text-gray-400 mt-3">
                {hasGuestPhotos
                  ? "Help us fill the gallery - share your snapshots from the day!"
                  : "Be the first to share a memory from our special day!"}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Introduction / Teaser Section (only before the wedding) */}
      {!isMarried && (
        <section className="py-24 px-6 bg-white text-wedding-black">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6">
                We're Getting Married
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                We invite you to join us as we celebrate our love and new
                beginning. Please join us for an evening of romance, laughter,
                and joy.
              </p>
              <div className="mt-10">
                <Link to="/story">
                  <Button variant="secondary">Read Our Story</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </PageTransition>
  );
}
