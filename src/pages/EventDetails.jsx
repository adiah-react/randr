import {
  Church,
  Clock,
  Info,
  Lock,
  MapPin,
  Mic,
  Music,
  PartyPopper,
  Users,
  UtensilsCrossed,
  Wine,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/Button";
import { PageTransition } from "../components/ui/PageTransition";
import { ScrollReveal } from "../components/ui/ScrollReveal";
import { useInvitation } from "../hooks/useInvitation";

export function EventDetails() {
  const { isAuthenticated, hasFullAccess, isCeremonyOnly } = useInvitation();

  // Hide reception completely for ceremony-only guests
  // const showReception = !isAuthenticated || hasFullAccess;
  const showReception = hasFullAccess;

  const timelineEvents = [
    {
      time: "2:00 PM",
      title: "Church",
      description: "Ceremony begins",
      icon: Church,
    },
    { time: "4:00 PM", title: "Cocktails", description: "Drinks", icon: Wine },
    {
      time: "5:00 PM",
      title: "Introductions",
      description: "Meet the wedding party",
      icon: Users,
    },
    {
      time: "7:00 PM",
      title: "Speeches",
      description: "Toasts & tributes",
      icon: Mic,
    },
    {
      time: "7:30 PM",
      title: "Dinner",
      description: "Sit-down dinner",
      icon: UtensilsCrossed,
    },
    {
      time: "9:00 PM",
      title: "Dancing",
      description: "First dance & open floor",
      icon: Music,
    },
    {
      time: "10:00 PM",
      title: "Party",
      description: "Celebrate into the night",
      icon: PartyPopper,
    },
  ];

  const visibleEvents = showReception ? timelineEvents : [timelineEvents[0]];

  return (
    <PageTransition className="bg-white text-wedding-black">
      {/* Hero Banner */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            // src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
            src="/venue.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-serif mb-4">
              Event Details
            </h1>
            <p className="text-xl text-gray-200 font-light max-w-2xl mx-auto">
              We are honored to have you join us. Here is everything you need to
              know about our special day.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Event Details Content */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {showReception /* Two-column layout when reception is visible */ ? (
            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-0">
              {/* Ceremony */}
              <div className="flex-1 text-center flex justify-center">
                <ScrollReveal delay={0.2}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-wedding-black mb-6">
                    <Clock className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-serif mb-2">The Ceremony</h2>
                  <p className="text-wedding-gold font-medium uppercase tracking-widest text-sm mb-6">
                    2:00 PM - 3:30 PM
                  </p>

                  <div className="space-y-3 text-gray-600 font-light text-lg">
                    <p className="font-medium text-black">
                      St. Benedict's RC Church
                    </p>
                    <p>La Romaine</p>
                    <p>San Fernando</p>
                    <div className="pt-4">
                      <a
                        href="https://maps.app.goo.gl/YAKzXUvbEEc5QJ977"
                        className="inline-flex items-center text-sm font-medium text-wedding-black hover:text-wedding-gold transition-colors border-b border-black hover:border-wedding-gold pb-0.5"
                        target="_blank"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        View Map
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-gray-200 self-stretch mx-4"></div>
              <div className="md:hidden w-24 h-px bg-gray-200 mx-auto"></div>

              {/* Reception */}
              <div className="flex-1 text-center flex justify-center">
                <ScrollReveal delay={0.4}>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-wedding-black mb-6">
                    <Info className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-serif mb-2">The Reception</h2>
                  <p className="text-wedding-gold font-medium uppercase tracking-widest text-sm mb-6">
                    4:00 PM - 11:30 PM
                  </p>

                  {isAuthenticated && hasFullAccess ? (
                    <div className="space-y-3 text-gray-600 font-light text-lg">
                      <p className="font-medium text-black">
                        Paradise Pointe Banquet Hall
                      </p>
                      <p>1 Baboonia Trace, Warner Village</p>
                      <p>Charlieville</p>
                      <div className="pt-4">
                        <a
                          href="https://maps.app.goo.gl/f11CoLwikGStdAFd8"
                          className="inline-flex items-center text-sm font-medium text-wedding-black hover:text-wedding-gold transition-colors border-b border-black hover:border-wedding-gold pb-0.5"
                          target="_blank"
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          View Map
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-8 rounded-sm border border-gray-100 max-w-sm mx-auto">
                      <Lock className="w-6 h-6 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-900 font-medium mb-2">
                        Private Event Details
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Please enter your invitation code to view full details.
                      </p>
                      <Link to="/invite">
                        <Button variant="outline" size="sm">
                          Unlock Access
                        </Button>
                      </Link>
                    </div>
                  )}
                </ScrollReveal>
              </div>
            </div>
          ) : (
            <div className="max-w-lg mx-auto text-center flex justify-center">
              <ScrollReveal delay={0.2}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 text-wedding-black mb-6">
                  <Clock className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-serif mb-2">The Ceremony</h2>
                <p className="text-wedding-gold font-medium uppercase tracking-widest text-sm mb-6">
                  2:00 PM
                </p>

                <div className="space-y-3 text-gray-600 font-light text-lg">
                  <p className="font-medium text-black">
                    St. Benedicts RC Church
                  </p>
                  <p>La Romaine</p>
                  <p>San Fernando</p>
                  <div className="pt-4">
                    <a
                      href="https://maps.app.goo.gl/YAKzXUvbEEc5QJ977"
                      target="_blank"
                      className="inline-flex items-center text-sm font-medium text-wedding-black hover:text-wedding-gold transition-colors border-b border-black hover:border-wedding-gold pb-0.5"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      View Map
                    </a>
                  </div>
                </div>

                <p className="mt-12 text-wedding-black font-medium">
                  It would mean so much to us to have you join us for our
                  wedding ceremony.
                </p>
                <p className="mt-4 text-wedding-black font-medium">
                  While we wish we could celebrate the full day with everyone we
                  hold dear, we’ve had to keep our reception quite intimate,
                  with immediate family and close friends.
                </p>
                <p className="mt-4 text-wedding-black font-medium">
                  Thank you for your understanding and we hope to still have you
                  as part of our special day.
                </p>
              </ScrollReveal>
            </div>
          )}

          {/* Schedule of the Day Timeline */}
          <div className="mt-32 mb-12">
            {/* <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif text-wedding-black mb-4">
                  Schedule of the Day
                </h2>
                <div className="w-16 h-px bg-wedding-gold mx-auto"></div>
              </div>
            </ScrollReveal> */}

            {showReception ? (
              <div className="relative max-w-8xl mx-auto px-4">
                {/* Desktop Horizontal Line */}
                <div className="hidden md:block absolute top-[4.5rem] lef-0 w-full h-px bg-gray-200 z-0"></div>

                {/* Mobile Vertical Line */}
                <div className="md:hidden absolute left-[2.25rem] top-4 bottom-4 w-px bg-gray-200 z-0"></div>

                <div className="flex flex-col md:flex-row justify-between relative z-10 gap-12 md:gap-4">
                  {visibleEvents.map((event, index) => {
                    const Icon = event.icon;
                    return (
                      <ScrollReveal
                        key={index}
                        delay={index * 0.1}
                        className="flex md:flex-col items-center md:items-center relative flex-1"
                      >
                        <div className="flex md:flex-col items-center md:items-center relative flex-1">
                          {/* Mobile: Icon container on left */}
                          <div className="md:hidden flex-shrink-0 w-16 h-16 bg-white border-2 border-wedding-gold rounded-full flex items-center justify-center mr-6 z-10">
                            <Icon className="w-6 h-6 text-wedding-gold" />
                          </div>

                          {/* Desktop: Icon above */}
                          <div className="hidden md:flex w-16 bg-white border-2 border-wedding-gold rounded-full items-center justify-center mb-6 z-10 shadow-sm">
                            <Icon className="w-6 h-6 text-wedding-gold" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 md:text-center pt-1 md:pt-0">
                            <p className="text-wedding-gold font-medium uppercase tracking-widest text-xs mb-1">
                              {event.time}
                            </p>
                            <h3 className="text-xl font-serif text-wedding-black mb-1">
                              {event.title}
                            </h3>
                            <p className="text-sm text-gray-500 font-light">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Ceremony Only Layout
              <div className="max-w-md mx-auto text-center">
                <ScrollReveal>
                  <div className="w-20 h-20 mx-auto bg-white border-2 border-wedding-gold rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Church className="w-8 h-8 text-wedding-gold" />
                  </div>
                  <p className="text-wedding-gold font-medium uppercase tracking-widest text-sm mb-2">
                    {visibleEvents[0].time}
                  </p>
                  <h3 className="text-2xl font-serif text-wedding-black mb-2">
                    {visibleEvents[0].title}
                  </h3>
                  <p className="text-gray-500 font-light">
                    {visibleEvents[0].description}
                  </p>
                </ScrollReveal>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <ScrollReveal
            delay={0.6}
            className="mt-24 max-w-2xl mx-auto text-center bg-gray-50 p-12 rounded-sm"
          >
            <h3 className="text-2xl font-serif mb-4">Dress Code</h3>
            <p className="text-gray-600 text-lg font-light mb-8">
              {isCeremonyOnly
                ? "We kindly ask that guests dress in formal or semi-formal attire."
                : "Black Tie Optional. We ask that men wear tuxedos or dark suits and women wear evening gowns or cocktail dresses. Please see the colour palette below."}
            </p>
          </ScrollReveal>
          <ScrollReveal className="max-w-xl mt-12 mx-auto" delay={0.8}>
            <img src="/colour-palette.jpeg" alt="" className="object-cover" />
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
}
