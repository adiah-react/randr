import adrian from "../assets/bridal-party/adrian.jpeg";
import anilla from "../assets/bridal-party/anilla.jpeg";
import christina from "../assets/bridal-party/christina.jpeg";
import darion from "../assets/bridal-party/darion.jpeg";
import darlene from "../assets/bridal-party/darlene.jpeg";
import dejhan from "../assets/bridal-party/dejhan.jpeg";
import freedom from "../assets/bridal-party/freedom.jpeg";
import jenna from "../assets/bridal-party/jenna.jpeg";
import kefim from "../assets/bridal-party/kefim.jpeg";
import nathaniel from "../assets/bridal-party/nathaniel.jpg";
import sashta from "../assets/bridal-party/sashta.jpeg";
import { PageTransition } from "../components/ui/PageTransition";
import { ScrollReveal } from "../components/ui/ScrollReveal";
const bridesSide = [
  {
    id: "darlene",
    name: "Darlene Auguste",
    role: "Maid of Honour",
    relationship: "",
    image: darlene,
  },
  {
    id: "christina",
    name: "Christina Da Silva",
    role: "Maid of Honour",
    relationship: "",
    image: christina,
  },
  {
    id: "anilla",
    name: "Anilla Pustam",
    role: "Bridesmaid",
    relationship: "",
    image: anilla,
  },
  {
    id: "jenna",
    name: "Jenna-Leigh Lutchman",
    role: "Bridesmaid",
    relationship: "",
    image: jenna,
  },
  {
    id: "sashta",
    name: "Sashta Jebodh",
    role: "Bridesmaid",
    relationship: "",
    image: sashta,
  },
];

const groomsSide = [
  {
    id: "adrian",
    name: "Adrian Persad",
    role: "Best Man",
    // relationship: "",
    image: adrian,
  },
  {
    id: "darion",
    name: "Darion Cupid",
    role: "Best Man",
    relationship: "",
    image: darion,
  },
  {
    id: "dejhan",
    name: "Dé Jhan Aaron",
    role: "Groomsman",
    relationship: "Brother from the same mother",
    trivia: "Can solve a Rubik's cube in under 2 minutes",
    image: dejhan,
  },
  {
    id: "freedom",
    name: "Freedom James",
    role: "Groomsman",
    relationship: "",
    image: freedom,
  },
  {
    id: "kefim",
    name: "Kefim Scott",
    role: "Groomsman",
    relationship: "The reason we're all here",
    image: kefim,
  },
  {
    id: "nathaniel",
    name: "Nathaniel Adiah",
    role: "Groomsman",
    relationship: "Friends since Form one",
    trivia: "Can fix your Wi-Fi but not his sleep schedule",
    image: nathaniel,
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
            src={member.image}
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
        {/* <p className="text-sm text-gray-500 italic mb-4">
          {member.relationship}
        </p> */}

        {/* <div className="mt-auto bg-gray-50 rounded-lg p4 border border-gray-100 relative w-full">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-1 border-gray-100">
            <Sparkles size={14} className="text-wedding-gold" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed pt-2">
            {member.trivia}
          </p>
        </div> */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 content-center">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
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
