import type React from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Chatbot } from "@/components/ui/chatbot";
import { CookieConsent } from "@/components/ui/cookie-consent";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex flex-col justify-center items-center px-4 md:px-8'>
        {children}
      </main>
      {/* Client-side chatbot widget for marketing pages */}
      <Chatbot />
      {/* Cookie consent modal */}
      <CookieConsent />
      <Footer />
    </div>
  );
}
