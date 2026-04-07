import { Sparkles } from "lucide-react";
import { PageTransition } from "../components/ui/PageTransition";
import { ScrollReveal } from "../components/ui/ScrollReveal";
const bridesSide = [
  {
    id: "emily",
    name: "Emily Chen",
    role: "Maid of Honor",
    relationship: "Sarah's college roommate",
    trivia: "Can recite every line from The Princess Bride",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "olivia",
    name: "Olivia Martinez",
    role: "Bridesmaid",
    relationship: "Sarah's sister",
    trivia: "Once baked 200 cupcakes for a charity bake sale in one night",
    imageUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "priya",
    name: "Priya Sharma",
    role: "Bridesmaid",
    relationship: "Childhood best friend",
    trivia: "Has visited 32 countries and counting",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "rachel",
    name: "Rachel Kim",
    role: "Bridesmaid",
    relationship: "Work bestie since day one",
    trivia: "Secret talent: competitive crossword puzzler",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop",
  },
];
const groomsSide = [
  {
    id: "michael",
    name: "Michael Thompson",
    role: "Best Man",
    relationship: "James's brother",
    trivia:
      "Still holds the family record for most marshmallows fit in mouth (17)",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "david",
    name: "David Okafor",
    role: "Groomsman",
    relationship: "College roommate & gym buddy",
    trivia: "Makes the best jollof rice you've ever tasted",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "alex",
    name: "Alex Rivera",
    role: "Groomsman",
    relationship: "Friends since kindergarten",
    trivia: "Can solve a Rubik's cube in under 2 minutes",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "tom",
    name: "Tom Bennett",
    role: "Groomsman",
    relationship: "Teammate from the rugby club",
    trivia: "Has an encyclopedic knowledge of 90s sitcoms",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
  },
];

const MemberCard = ({ member, delay }) => {
  return (
    <ScrollReveal
      delay={delay}
      className="flex flex-col items-center text-center"
      width="100%"
    >
      <div className="flex flex-col items-center w-full">
        <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 border-4 border-gray-50 shadow-lg">
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-serif text-wedding-black mb-1">
          {member.name}
        </h3>
        <p className="text-xs uppercase tracking-widest text-wedding-gold font-medium mb-2">
          {member.role}
        </p>
        <p className="text-sm text-gray-500 italic mb-4">
          {member.relationship}
        </p>

        <div className="mt-auto bg-gray-50 rounded-lg p4 border border-gray-100 relative w-full">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-1 border-gray-100">
            <Sparkles size={14} className="text-wedding-gold" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed pt-2">
            {member.trivia}
          </p>
        </div>
      </div>
    </ScrollReveal>
  );
};

const BridalPartyPage = () => {
  return (
    <PageTransition className="bg-white">
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=2069&auto=format&fit=crop"
            alt="wedding party"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-serif mb-4">
              The Bridal Party
            </h1>
          </ScrollReveal>
        </div>
      </section>

      <div className="py-24 px-6 max-w-7xl mx-auto">
        {/* Bride's Side */}
        <section className="mb-24">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-wedding-black mb-4">
                The Bride's Side
              </h2>
              <div className="w-16 h-px bg-wedding-gold mx-auto"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 content-center">
            {bridesSide.map((member, index) => (
              <MemberCard key={member.id} member={member} delay={index * 0.1} />
            ))}
          </div>
        </section>

        {/* Groom's Side */}
        <section className="mb-24">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-wedding-black mb-4">
                The Groom's Side
              </h2>
              <div className="w-16 h-px bg-wedding-gold mx-auto"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {groomsSide.map((member, index) => (
              <MemberCard key={member.id} member={member} delay={index * 0.1} />
            ))}
          </div>
        </section>

        {/* Closing Section */}
        <section className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="bg-gray-50 p-10 md:p-16 rounded-sm border border-gray-100">
              <p className="text-lg md:text-xl text-gray-600 font-serif leading-relaxed italic">
                "Together, this crew has been through countless adventures,
                late-night talks, and unforgettable moments. We couldn't imagine
                our day without them."
              </p>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </PageTransition>
  );
};

export default BridalPartyPage;
