import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrendPilot AI — Ideas shaping tomorrow",
  description: "Useful perspectives on technology, business, lifestyle and the trends shaping tomorrow.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
