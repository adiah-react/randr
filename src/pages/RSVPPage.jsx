import { MusicIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GuestRSVPCard } from "../components/rsvp/GuestRSVPCard";
import { Button } from "../components/ui/Button";
import { PageTransition } from "../components/ui/PageTransition";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { ThankYouModal } from "../components/ui/ThankYouModal";
import { useInvitation } from "../hooks/useInvitation";

export function RSVPPage() {
  const { invitation, submitRSVP, isLoading } = useInvitation();
  const navigate = useNavigate();
  const [guestStates, setGuestStates] = useState({});
  const [songRequest, setSongRequest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shown, setShown] = useState(false);

  // Initialize state from invitation
  useEffect(() => {
    if (invitation && !showModal) {
      setSongRequest(invitation.songRequest || "");
      const initialStates = {};
      invitation.guests.forEach((guest) => {
        initialStates[guest.id] = {
          status: guest.rsvpStatus,
          dietaryNotes: guest.dietaryNotes || "",
          mealPreference: guest.mealPreference || "",
          drinksAlcohol: guest.drinksAlcohol,
          favoriteDrink: guest.favoriteDrink || "",
        };
      });
      setGuestStates(initialStates);
    }
  }, [invitation]);

  // useEffect(() => {
  //   if (showModal) {
  //     const timer = setTimeout(async () => {
  //       const updated = await firebaseValidateCode(invitation.code);
  //       if (updated) {
  //         setInvitation(updated);
  //       }

  //       navigate("/welcome", {
  //         state: { rsvpSubmitted: true },
  //       });
  //     }, 4000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [showModal, navigate]);

  const handleGuestChange = (
    guestId,
    status,
    notes,
    meal,
    drinksAlcohol,
    favoriteDrink,
  ) => {
    setGuestStates((prev) => ({
      ...prev,
      [guestId]: {
        status,
        dietaryNotes: notes,
        mealPreference: meal,
        drinksAlcohol,
        favoriteDrink,
      },
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const rsvpData = Object.entries(guestStates).map(([guestId, data]) => ({
      guestId,
      status: data.status === "pending" ? "attending" : data.status,
      dietaryNotes: data.dietaryNotes,
      mealPreference: data.mealPreference,
      drinksAlcohol: data.drinksAlcohol,
      favoriteDrink: data.favoriteDrink,
    }));

    const validData = rsvpData.filter((d) => d.status !== "pending");
    const success = await submitRSVP(validData, songRequest);
    setIsSubmitting(false);

    if (success) {
      setShowModal(true);

      alert(
        "RSVP submitted successfully! You will be redirected to the welcome page.",
      );

      // Auto-redirect after 2 seconds
      setTimeout(() => {
        setShowModal(false);
        navigate("/welcome", {
          state: {
            rsvpSubmitted: true,
          },
        });
      }, 3000);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/welcome", {
      state: { rsvpSubmitted: true },
    });
  };

  if (!invitation) return null;

  // TODO: This might not be what we want...
  // Check if all guests have a selection (not pending)
  const allSelected = Object.values(guestStates).every(
    (g) => g.status !== "pending",
  );

  // Check attending guests have meal selected
  const allMealsSelected = Object.values(guestStates).every(
    (g) =>
      g.status !== "attending" || (g.mealPreference && g.mealPreference !== ""),
  );

  const canSubmit = allSelected && allMealsSelected;

  return (
    <PageTransition className="min-h-screen relative mt-24">
      {/* Background Image */}
      <div className="fixed inset-0">
        <img
          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/92" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-28 px-4 md:px-6">
        <div className="w-full max-w-2xl mx-auto">
          <ScrollReveal className="text-center mb-12" width="100%">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 text-wedding-black">
              RSVP
            </h1>
            <p className="text-lg text-gray-500 font-light">
              Please let us know if you can join us by June 1st.
            </p>
          </ScrollReveal>

          {/* Per-person RSVP Cards */}
          <div className="space-y-6 mb-10">
            {invitation.guests.map((guest, index) => (
              <ScrollReveal key={guest.id} delay={index * 0.1} width="100%">
                <GuestRSVPCard
                  guestId={guest.id}
                  name={guest.name}
                  status={guestStates[guest.id]?.status || "pending"}
                  dietaryNotes={guestStates[guest.id]?.dietaryNotes}
                  mealPreference={guestStates[guest.id]?.mealPreference}
                  drinksAlcohol={guestStates[guest.id]?.drinksAlcohol}
                  favoriteDrink={guestStates[guest.id]?.favoriteDrink}
                  onChange={handleGuestChange}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Song Request (per invitation) */}
          <ScrollReveal delay={0.3} width="100%">
            <div className="bg-white border border-gray-100 rounded-sm shadow-sm p-5 md:p-8 mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <MusicIcon className="w-5 h-5 text-wedding-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-wedding-black">
                    Song Request
                  </h3>
                  <p className="text-xs text-gray-400">
                    Help us build the perfect playlist
                  </p>
                </div>
              </div>
              <label
                htmlFor="song-request"
                className="block text-xs font-medium text-gray-400 uppercase tracking-widest mb-2"
              >
                What song will get you on the dance floor?
              </label>
              <input
                id="song-request"
                type="text"
                value={songRequest}
                onChange={(e) => setSongRequest(e.target.value)}
                className="w-full border border-gray-200 rounded-sm py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-wedding-gold transition-colors bg-transparent text-sm"
                placeholder="e.g. From Now On - The Greatest Showman"
              />
            </div>
          </ScrollReveal>

          {/* Submit */}
          <ScrollReveal
            delay={0.4}
            className="flex flex-col items-stretch md:items-center gap-3"
            width="100%"
          >
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting || isLoading}
              size="lg"
              className="w-full md:w-auto md:min-w-[240px]"
            >
              {isSubmitting ? "Submitting..." : "Submit RSVP"}
            </Button>
            {!canSubmit && allSelected && !allMealsSelected && (
              <p className="text-xs text-gray-400">
                Please select a meal preference for all attending guests.
              </p>
            )}
          </ScrollReveal>

          <ThankYouModal
            isOpen={showModal}
            onClose={handleModalClose}
            title="RSVP Received!"
            message="Thank you for letting us know. We're so excited to celebrate with you! You'll be redirected shortly"
          />
        </div>
      </div>
    </PageTransition>
  );
}
