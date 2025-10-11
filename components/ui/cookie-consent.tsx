"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, X } from "lucide-react";
import { cn } from "@/lib/utils";

const COOKIE_CONSENT_KEY = "technoband_cookie_consent";
const COOKIE_EXPIRY_DAYS = 365;

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = getCookie(COOKIE_CONSENT_KEY);
    if (!hasConsented) {
      // Small delay to avoid showing immediately on page load
      const timer = setTimeout(() => {
        setShowBanner(true);
        setIsAnimating(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    setCookie(COOKIE_CONSENT_KEY, "accepted", COOKIE_EXPIRY_DAYS);
    setIsAnimating(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const dismissBanner = () => {
    setIsAnimating(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  };

  const setCookie = (name: string, value: string, days: number) => {
    if (typeof document === "undefined") return;
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };

  if (!showBanner) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-40 p-4'>
      <div
        className={cn(
          "mx-auto max-w-4xl transition-all duration-300 ease-out",
          isAnimating
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-full"
        )}
      >
        <Card className='shadow-lg border bg-card/95 backdrop-blur-md py-2'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between gap-4'>
              <div className='flex items-center gap-3 flex-1 min-w-0'>
                <Cookie className='w-5 h-5 text-primary flex-shrink-0' />
                <div className='min-w-0'>
                  <p className='text-sm font-medium'>
                    We use cookies to enhance your experience and analyze site
                    traffic.
                  </p>
                  <p className='text-xs text-muted-foreground mt-1'>
                    By continuing to use our site, you agree to our{" "}
                    <a href='/privacy' className='text-primary hover:underline'>
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href='/terms' className='text-primary hover:underline'>
                      Terms of Service
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-2 flex-shrink-0'>
                <Button
                  onClick={acceptCookies}
                  size='sm'
                  className='bg-primary hover:bg-primary/90'
                >
                  Accept
                </Button>
                <Button
                  onClick={dismissBanner}
                  variant='ghost'
                  size='sm'
                  className='text-muted-foreground hover:text-foreground'
                >
                  <X className='w-4 h-4' />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
