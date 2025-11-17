/* eslint-disable import/no-default-export */
import { Card, formatCardText } from "@/components/card/card.component";
import { Navbar } from "@/components/navbar/navbar.component";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 px-4 py-10">
      <div className="flex w-full justify-center">
        <Navbar />
      </div>

      <div className="w-full max-w-4xl space-y-6">
        <Card padding={32}>
          {formatCardText([
            { type: "h1", text: "Echo Studio" },
            {
              type: "p",
              text: "สร้างประสบการณ์เว็บที่ดูสะอาด เรียบหรู และสบายตา",
            },
            { type: "h3", text: "จุดเด่น" },
            {
              type: "list",
              items: [
                "gradients ที่นุ่มนวล",
                "glass cards ที่โปร่งใส",
                "motion ที่ไหลลื่น",
              ],
            },
          ])}
        </Card>

        <Card
          padding="1rem 1.5rem"
          className="border-white/40 bg-white/60 shadow-none"
        >
          {formatCardText([
            { type: "h2", text: "Tip" },
            {
              type: "p",
              text: "ตั้งค่า padding เป็นตัวเลขหรือ string เพื่อควบคุมพื้นที่ได้ละเอียด",
            },
            "- numeric => px",
            "- string => เช่น 1rem 2rem หรือ clamp(...)",
          ])}
        </Card>
      </div>
    </main>
  );
}
