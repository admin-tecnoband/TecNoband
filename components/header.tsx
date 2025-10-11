"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <nav className='container flex h-16 items-center justify-between mx-auto'>
        <Logo />

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6'>
          <Link
            href='/features'
            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
          >
            Features
          </Link>
          <Link
            href='/about'
            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
          >
            About
          </Link>
          <Link
            href='/blog'
            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
          >
            Blog
          </Link>
          <Link
            href='/contact'
            className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
          >
            Contact
          </Link>
        </div>

        <div className='hidden md:flex items-center gap-4'>
          <ThemeToggle />
          {!loading && !user && (
            <>
              <Button variant='ghost' asChild>
                <Link href='/auth/login'>Login</Link>
              </Button>
              <Button asChild>
                <Link href='/auth/signup'>Get Started</Link>
              </Button>
            </>
          )}
          {!loading && user && (
            <>
              <Button variant='ghost' asChild>
                <Link href='/dashboard'>Dashboard</Link>
              </Button>
              <Button
                variant='ghost'
                onClick={async () => {
                  await signOut();
                  window.location.href = "/";
                }}
              >
                Sign out
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label='Toggle menu'
        >
          {mobileMenuOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className='md:hidden border-t border-border/40 bg-background/95 backdrop-blur overflow-hidden'
          >
            <div className='container py-4 flex flex-col gap-4'>
              <Link
                href='/features'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href='/about'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href='/blog'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href='/contact'
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className='flex flex-col gap-2 pt-2'>
                <ThemeToggle />
                {!loading && !user && (
                  <>
                    <Button variant='ghost' asChild className='w-full'>
                      <Link
                        href='/auth/login'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                    </Button>
                    <Button asChild className='w-full'>
                      <Link
                        href='/auth/signup'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
                {!loading && user && (
                  <>
                    <Button variant='ghost' asChild className='w-full'>
                      <Link
                        href='/dashboard'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      variant='ghost'
                      className='w-full'
                      onClick={async () => {
                        await signOut();
                        window.location.href = "/";
                      }}
                    >
                      Sign out
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
