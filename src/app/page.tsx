import Link from "next/link";
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

  return (
    <main
      className="relative flex h-screen w-full flex-col items-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(16, 18, 28, 0.55), rgba(16, 18, 28, 0.55)), url('/img/mountains-7728691_1280.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(2px)",
      }}
    >
      <BackgroundDots />

      <div className="relative z-10 flex w-full justify-center">
        <Navbar />
      </div>

      <div className="mt-2 w-full max-w-4xl space-y-3 p-4">
        <Card padding={30}>{formatCardText(cardContent)}</Card>

        <div className="flex flex-wrap gap-3 py-4">
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
          <Button
            variant="secondary"
            size="md"
          >
            ติดต่อเรา
          </Button>
        </div>
      </div>
    </main>
  );
}
