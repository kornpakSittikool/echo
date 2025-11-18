/* eslint-disable import/no-default-export */
import { Card, formatCardText } from "@/components/card/card.component";
import { CardTextInput } from "@/components/card/text/card.text";
import { Navbar } from "@/components/navbar/navbar.component";
import echoStudioContent from "@/jsons/echo-studio.json";

export default function Home() {
  const { h1, tagline, description, highlights } = echoStudioContent;

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 px-4 py-10">
      <div className="flex w-full justify-center">
        <Navbar />
      </div>

      <div className="w-full max-w-4xl space-y-6">
        <Card padding={30}>
          {formatCardText([
            { type: "h1", text: h1 },
            { type: "p", text: tagline },
            { type: "p", text: description },
            { type: "h3", text: "จุดเด่น" },
            { type: "list", items: highlights },
          ] as CardTextInput[])}
        </Card>
      </div>
    </main>
  );
}
