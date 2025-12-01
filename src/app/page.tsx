 "use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundDots } from "@/components/background/background-dots.component";
import { Button } from "@/components/button/button.component";
import { Card, formatCardText } from "@/components/card/card.component";
import { CardTextInput } from "@/components/card/text/card.text";
import { Navbar } from "@/components/navbar/navbar.component";
import echoStudioContent from "@/jsons/echo-studio.json";

export default function Home() {
  const { h1, tagline, description, highlights } = echoStudioContent;

  const cardContent: CardTextInput[] = [
    { type: "h1", text: h1 },
    { type: "p", text: tagline },
    { type: "p", text: description },
    { type: "h3", text: "จุดเด่น" },
    { type: "list", items: highlights },
  ];

  const pageVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.main
      className="relative flex h-screen w-full flex-col items-center"
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

      <div className="mt-2 w-full max-w-4xl space-y-3 p-4">
        <motion.div variants={blockVariants}>
          <Card padding={30}>{formatCardText(cardContent)}</Card>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-3 py-4"
          variants={blockVariants}
        >
          <motion.div variants={blockVariants}>
            <Link
              href="/portfolio"
              className="inline-block"
            >
              <Button
                variant="primary"
                size="md"
              >
                สำรวจผลงาน
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={blockVariants}>
            <Button
              variant="secondary"
              size="md"
            >
              ติดต่อเรา
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}
