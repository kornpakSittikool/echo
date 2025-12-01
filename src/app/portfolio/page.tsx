"use client";

import { motion } from "framer-motion";
import { BackgroundDots } from "@/components/background/background-dots.component";
import { Card, formatCardText } from "@/components/card/card.component";
import { CardTextInput } from "@/components/card/text/card.text";
import { Navbar } from "@/components/navbar/navbar.component";

const projects = [
  {
    title: "Neon Storefront",
    image: "/img/mountains-7728691_1280.png",
    blurb:
      "Landing page mockup for a digital collectibles shop with a bold CTA.",
    highlights: [
      "Hero + grid gallery",
      "Neon framing + glow accents",
      "One-click checkout CTA",
    ],
  },
  {
    title: "Echo Studio Blog",
    image: "/navbar/logo.jpg",
    blurb:
      "Article hub layout that keeps the pixel-art frame but modernizes spacing.",
    highlights: [
      "2-column feature + list",
      "Readable line-length",
      "Tag pills for topics",
    ],
  },
  {
    title: "Arcade Dashboard",
    image: "/img/mountains-7728691_1280.png",
    blurb:
      "Analytics console styled like a retro HUD for client campaign stats.",
    highlights: [
      "Carded KPIs",
      "Sparkline placeholders",
      "Filter + quick actions",
    ],
  },
  {
    title: "Showreel Microsite",
    image: "/navbar/logo.jpg",
    blurb:
      "One-page teaser for video work with a looping hero and CTA ribbon.",
    highlights: [
      "Fullscreen hero slot",
      "Edge-to-edge CTA strip",
      "Inline contact buttons",
    ],
  },
  {
    title: "Case Study Deep Dive",
    image: "/img/mountains-7728691_1280.png",
    blurb:
      "Single card layout to tell the problem -> solution -> outcome story.",
    highlights: [
      "Problem framing",
      "Solution steps",
      "Outcome metrics placeholders",
    ],
  },
] satisfies Array<{
  title: string;
  image: string;
  blurb: string;
  highlights: string[];
}>;

const COMPACT_HIGHLIGHT_COUNT = 2;

const pageVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.096, delayChildren: 0.144 },
  },
};

const blockVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.54,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.072, delayChildren: 0.06 },
  },
};

export default function PortfolioPage() {
  return (
    <motion.main
      className="relative flex min-h-screen w-full flex-col items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(16, 18, 28, 0.55), rgba(16, 18, 28, 0.55)), url('/img/mountains-7728691_1280.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(2px)",
      }}
      initial="hidden"
      animate="show"
      variants={pageVariants}
    >
      <BackgroundDots />

      <div className="relative z-10 flex w-full justify-center">
        <Navbar />
      </div>

      <div className="w-full max-w-6xl space-y-6 p-4">
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3"
          variants={blockVariants}
        >
          <h1 className="text-2xl font-bold text-indigo-50">
            Portfolio Mockups
          </h1>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          variants={gridVariants}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={blockVariants}
              className="h-full"
            >
              <Card
                padding={22}
                mediaSrc={project.image}
                mediaAlt={project.title}
                className="card--compact"
              >
                {formatCardText([
                  { type: "h3", text: project.title },
                  { type: "p", text: project.blurb },
                  {
                    type: "list",
                    items: project.highlights.slice(
                      0,
                      COMPACT_HIGHLIGHT_COUNT,
                    ),
                  },
                ] as CardTextInput[])}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.main>
  );
}
