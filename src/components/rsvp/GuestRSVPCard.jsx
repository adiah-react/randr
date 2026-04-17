import { AnimatePresence, motion } from "framer-motion";
import { UserIcon } from "lucide-react";

const MEAL_OPTIONS = [
  { value: "chicken", label: "Chicken", emoji: "🍗" },
  { value: "fish", label: "Fish", emoji: "🐟" },
  { value: "vegetarian", label: "Vegetarian", emoji: "🥗" },
];

export function GuestRSVPCard({
  guestId,
  name,
  status,
  dietaryNotes,
  mealPreference,
  drinksAlcohol,
  favoriteDrink,
  onChange,
  accessLevel,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-100 rounded-sm shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 md:px-8 pt-6 md:pt-8 pb-4 md:pb-6 flex items-center gap-3 md:gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-5 h-5 text-gray-400" />
        </div>
        <h3 className="text-2xl font-serif text-wedding-black">{name}</h3>
      </div>

      {/* RSVP Selection */}
      <div className="px-5 md:px-8 pb-6">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
          Will you be joining us?
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() =>
              onChange(
                guestId,
                "attending",
                dietaryNotes,
                mealPreference,
                drinksAlcohol,
                favoriteDrink,
              )
            }
            className={`flex-1 py-3 px-4 rounded-sm border text-center transition-all duration-200
              ${
                status === "attending"
                  ? "border-wedding-gold bg-wedding-gold/5 text-wedding-black font-medium"
                  : "border-gray-200 text-gray-500 hover:border-wedding-gold/50"
              }
              `}
          >
            <span className="block text-lg mb-0.5">Joyfully Accepts</span>
          </button>

          <button
            type="button"
            onClick={() => onChange(guestId, "declined", "", "")}
            className={`flex-1 py-3 px-4 rounded-sm border text-center transition-all duration-200
              ${
                status === "declined"
                  ? "border-gray-800 bg-gray-50 text-wedding-black font-medium"
                  : "border-gray-200 text-gray-500 hover:border-gray-400"
              }
              }`}
          >
            <span className="block text-lg mb-0.5">Regretfully Declines</span>
          </button>
        </div>
      </div>

      {/* Expanded Details (when attending) */}
      {accessLevel === "full" && (
        <AnimatePresence initial={false}>
          {status === "attending" && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-8 pb-6 md:pb-8 space-y-6 border-t border-gray-100 pt-6">
                {/* Meal Preference */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
                    Meal Preference
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {MEAL_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          onChange(
                            guestId,
                            "attending",
                            dietaryNotes,
                            option.value,
                            drinksAlcohol,
                            favoriteDrink,
                          )
                        }
                        className={`py-3 px-3 rounded-sm border text-center transition-all duration-200 ${mealPreference === option.value ? "border-wedding-gold bg-wedding-gold/5 text-wedding-black font-medium" : "border-gray-200 text-gray-500 hover:border-wedding-gold/50"}`}
                      >
                        <span className="block text-lg mb-1">
                          {option.emoji}
                        </span>
                        <span className="block text-xs">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Requirements */}
                <div>
                  <label
                    htmlFor={`dietary-${guestId}`}
                    className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2"
                  >
                    Dietary Requirements or Allergies
                  </label>
                  <textarea
                    id={`dietary-${guestId}`}
                    value={dietaryNotes || ""}
                    onChange={(e) =>
                      onChange(
                        guestId,
                        "attending",
                        e.target.value,
                        mealPreference,
                        drinksAlcohol,
                        favoriteDrink,
                      )
                    }
                    placeholder="Any allergies or dietary restrictions we should know about?"
                    className="w-full border border-gray-200 rounded-sm py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-wedding-gold transition-colors resize-none bg-transparent text-sm"
                    rows={2}
                  />
                </div>

                {/* Alcohol Preference */}
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">
                    Will you be drinking alcohol?
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        onChange(
                          guestId,
                          "attending",
                          dietaryNotes,
                          mealPreference,
                          true,
                          favoriteDrink,
                        )
                      }
                      className={`flex-1 py-2.5 px-4 rounded-sm border text-sm text-center transition-all duration-200 ${drinksAlcohol === true ? "border-wedding-gold bg-wedding-gold/5 text-wedding-black font-medium" : "border-gray-200 text-gray-500 hover:border-wedding-gold/50"}`}
                    >
                      🥂 Yes, cheers!
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onChange(
                          guestId,
                          "attending",
                          dietaryNotes,
                          mealPreference,
                          false,
                          "",
                        )
                      }
                      className={`flex-1 py-2.5 px-4 rounded-sm border text-sm text-center transition-all duration-200 ${drinksAlcohol === false && drinksAlcohol !== undefined ? "border-gray-800 bg-gray-50 text-wedding-black font-medium" : "border-gray-200 text-gray-500 hover:border-gray-400"}`}
                    >
                      🧃 No thanks
                    </button>
                  </div>

                  {/* Favourite drink - shown when alcohol = yes */}
                  <AnimatePresence initial={false}>
                    {drinksAlcohol === true && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: "easeInOut",
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4">
                          <label
                            htmlFor={`drink-${guestId}`}
                            className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2"
                          >
                            What's your go-to wedding drink?
                          </label>
                          <input
                            id={`drink-${guestId}`}
                            type="text"
                            value={favoriteDrink || ""}
                            onChange={(e) =>
                              onChange(
                                guestId,
                                "attending",
                                dietaryNotes,
                                mealPreference,
                                true,
                                e.target.value,
                              )
                            }
                            placeholder="e.g. Champagne, Old Fashioned, Rosé..."
                            className="w-full border border-gray-200 rounded-sm py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-wedding-gold transition-colors bg-transparent text-sm"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Declined state subtle message */}
      <AnimatePresence initial={false}>
        {status === "declined" && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-8 pb-6 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-400 italic">
                We'll miss you! We hope to celebrate with you another time.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
