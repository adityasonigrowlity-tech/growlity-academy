import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./responsive.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { siteConfig } from "@/config/site";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/Assets/icons/growlity-logo.png",
  },
};

import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import AuthWrapper from "@/components/layout/AuthWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
          <AuthProvider>
            <AuthWrapper>
              {children}
            </AuthWrapper>
            <Toaster position="top-center" richColors duration={10000} />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
