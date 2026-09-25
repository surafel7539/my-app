import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/LightRays";
import NavBar from "@/components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevEvents",
  description: "The Hub for Every Dev Event You Mustn't Miss",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${schibstedGrotesk.variable} ${martianMono.variable} antialiased`}
      >
        <body className="flex min-h-dvh flex-col relative overflow-x-hidden">
          
          <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            <LightRays
              raysOrigin="top-center-offset"
              raysColor="#5dfeca"
              raysSpeed={0.5}
              lightSpread={1}
              rayLength={1.9}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0.01}
            />
          </div>

          <NavBar />

          
          <main className="flex flex-1 flex-col">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}