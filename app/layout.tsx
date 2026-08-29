import type { Metadata } from "next";
import "./globals.css";
import CRTWarp from "@/components/CRTWarp";

export const metadata: Metadata = {
  title: "Anas — Web Developer",
  description: "The portfolio of Anas. Web apps, scripts, and small tools built with PHP, React, Python and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col relative">
        <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
          <CRTWarp
            color="#55f7f6"
            backgroundColor="#05010a"
            speed={0.5}
            curvature={0.25}
            scanlineStrength={0.35}
            scanlineFrequency={200}
            waveAmplitude={0.83}
            waveFrequency={3.6}
            bloom={4}
            bloomRadius={1.2}
            noise={0.05}
            vignette={0.3}
            brightness={0.7}
            pixelation={1}
            rgbShift={0.015}
            mouseReact={true}
            mouseStrength={0.88}
            dpr={1}
            fps={30}
          />
        </div>
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
