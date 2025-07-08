import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/store/provider";
import { Toaster } from "@/components/ui/sonner";
import Particles from "@/components/particles";
import Lightning from "@/components/lightning";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metavault",
  description:
    "Metavault is a sleek and powerful Web3 wallet generator for creating secure Solana and Ethereum wallets from a seed phrase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 -z-10">
            <div className=" fixed inset-0 -z-12">
              <Lightning
                hue={220}
                xOffset={0.8}
                speed={1}
                intensity={1}
                size={1}
              />
            </div>
            <Particles
              particleColors={["#ffffff", "#ffffff"]}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>
          <ReduxProvider>
            <Toaster richColors />
            {children}
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
