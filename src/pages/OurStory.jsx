import { Calendar, Coffee, Diamond } from "lucide-react";
import { PageTransition } from "../components/ui/PageTransition";
import { ScrollReveal } from "../components/ui/ScrollReveal";

const milestones = [
  // {
  //   id: 1,
  //   title: "First Met",
  //   date: "Summer 2018",
  //   description:
  //     "It started with a chance encounter at a mutual friend's gallery opening. A conversation about abstract art turned into hours of talking about everything under the sun.",
  //   icon: <Heart className="w-6 h-6 text-white" />,
  // },
  {
    id: 2,
    title: "First Date",
    date: "September 2020",
    description:
      "We started dating in the midst of the COVID-19 pandemic and began to share our love for movies over Skype calls. Our first date was at a pizza place called Bacco, we ate pizza in the car, listened to music and looked at the stars.",
    icon: <Coffee className="w-6 h-6 text-white" />,
    image: "/first-date.jpeg",
  },
  {
    id: 3,
    title: "The Proposal",
    date: "August 2024",
    description:
      "Under a canopy of photos from the previous 5 years, surrounded by friends and family, Rashaad went down on bended knee. It was the easiest 'Yes' of Rhiannon's life.",
    icon: <Diamond className="w-6 h-6 text-white" />,
    image: "/proposal.jpeg",
  },
  {
    id: 4,
    title: "The Big Day",
    date: "June 2026",
    description:
      "We can't wait to celebrate the beginning of our forever with all of our favorite people. The best is yet to come.",
    icon: <Calendar className="w-6 h-6 text-white" />,
    image: "/big-day.jpeg",
  },
];

export function OurStory() {
  return (
    <PageTransition className="bg-white text-wedding-black">
      {/* Hero Banner */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/our-story.jpeg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-6">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-serif mb-4">Our Story</h1>
            <div className="w-24 h-0.5 bg-wedding-gold mx-auto"></div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline Content */}
      <div className="pt-24 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200 hidden md:block"></div>

            <div className="space-y-24">
              {milestones.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""} gap-8 md:gap-0`}
                >
                  {/* Content Side */}
                  <div className="flex-1 w-full md:w-1/2 p-0 md:px-12 text-center md:text-left">
                    <ScrollReveal delay={0.2}>
                      <div
                        className={`flex flex-col ${index % 2 === 0 ? "md:items-start md:pl-8" : "md:items-end md:pr-8"}`}
                      >
                        <span className="text-wedding-gold font-medium tracking-widest uppercase text-sm mb-2 block">
                          {item.date}
                        </span>
                        <h3 className="text-3xl font-serif mb-4">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed font-light text-lg">
                          {item.description}
                        </p>
                      </div>
                    </ScrollReveal>
                  </div>

                  {/* Center Icon (Desktop only) */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-wedding-black rounded-full items-center justify-center z-10 border-4 border-white shadow-lg">
                    {item.icon}
                  </div>

                  {/* Image Side */}
                  <div className="flex-1 w-full md:w-1/2 flex justify-center">
                    <ScrollReveal delay={0.4}>
                      <div className="relative group overflow-hidden rounded-sm shadow-xl">
                        {/* <div className="w-full md:w-[400px] h-[400px] bg-gray-100 relative overflow-hidden"> */}
                        <div className="w-full md:w-[400px] h-[400px] bg-gray-100 relative overflow-hidden">
                          {/* Placeholder for actual images with black & white filter */}
                          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400 filter-bw">
                            {/* <span className="font-serif italic">
                              Photo: {item.title}
                            </span> */}
                            <img
                              className="w-full h-[400px]"
                              src={item.image}
                              alt=""
                            />
                          </div>

                          {/* Overlay effect */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                        </div>

                        {/* Decorative border */}
                        <div className="absolute inset-4 border border-white/30 pointer-events-none"></div>
                      </div>
                    </ScrollReveal>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
