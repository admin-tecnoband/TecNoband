import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import {
  SiX,
  SiLinkedin,
  SiYoutube,
  SiFacebook,
  SiPinterest,
} from "react-icons/si";
import siteData from "@/data/site-data.json";

export function Footer() {
  return (
    <footer className='border-t border-border/40 bg-card/50 px-4 md:px-8'>
      <div className='container py-12 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='space-y-4'>
            <Logo />
            <p className='text-sm text-muted-foreground'>
              Take control of your IoT devices with live monitoring, insights,
              and instant alerts to make informed decisions.
            </p>
            <div className='flex items-center gap-3 mt-3'>
              <a
                href={
                  siteData?.social?.twitter ?? "https://twitter.com/yourhandle"
                }
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Twitter'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <SiX className='w-5 h-5' />
              </a>
              <a
                href={
                  siteData?.social?.linkedin ??
                  "https://www.linkedin.com/company/yourcompany"
                }
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <SiLinkedin className='w-5 h-5' />
              </a>
              <a
                href={
                  siteData?.social?.facebook ?? "https://facebook.com/yourorg"
                }
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <SiFacebook className='w-5 h-5' />
              </a>
              <a
                href={
                  siteData?.social?.youtube ??
                  "https://www.youtube.com/@yourchannel"
                }
                target='_blank'
                rel='noopener noreferrer'
                aria-label='YouTube'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <SiYoutube className='w-5 h-5' />
              </a>
              <a
                href={
                  siteData?.social?.pinterest ??
                  "https://www.pinterest.com/yourprofile"
                }
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Pinterest'
                className='text-muted-foreground hover:text-foreground transition-colors'
              >
                <SiPinterest className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Product</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/features'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href='/pricing'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href='/dashboard'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href='/auth/signup'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Company</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/about'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Legal</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/privacy'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-muted-foreground hover:text-foreground transition-colors'
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground'>
          <p>
            &copy; {new Date().getFullYear()} TecNoBand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
