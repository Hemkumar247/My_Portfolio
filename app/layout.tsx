import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";

export const metadata: Metadata = {
  title: "Hemkumar Vitta — AI Engineer & UI/UX Designer",
  description:
    "Portfolio of Hemkumar Vitta — AI builder, UI/UX designer, and creative developer from Chennai, India. Infosys Hackathon Top 10, Government of India Copyright holder.",
  keywords: [
    "Hemkumar Vitta",
    "AI Engineer",
    "UI/UX Designer",
    "Chennai",
    "Portfolio",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Hemkumar Vitta" }],
  openGraph: {
    title: "Hemkumar Vitta — AI Engineer & UI/UX Designer",
    description: "Creative developer and AI builder from Chennai, India.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <LoadingScreen />
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
