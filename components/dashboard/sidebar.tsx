"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Cpu,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Home } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import { Logo } from "@/components/ui/logo";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Devices", href: "/dashboard/devices", icon: Cpu },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Sidebar({ open = false, onOpenChange }: SidebarProps = {}) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleLinkClick = () => {
    // Close mobile menu when a link is clicked
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const SidebarContent = () => (
    <div className='flex h-full w-64 flex-col border-r border-border bg-card'>
      {/* Logo */}
      <div className='flex flex-col border-b border-border px-4 py-3'>
        <Logo />
        <div className='flex h-14 items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <div className='hidden md:block'>
              <div className='text-sm font-medium'>Dashboard</div>
              <div className='text-xs text-muted-foreground'>Overview</div>
            </div>
          </div>
          <ThemeToggle />
        </div>
        {/* 
        <div className='py-2'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm bg-muted-foreground/6 hover:bg-muted-foreground/12 text-foreground transition-colors shadow-sm'
            aria-label='Back to home'
          >
            <Home className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm'>Back to home</span>
          </Link>
        </div> */}
      </div>

      {/* User profile (when authenticated) */}
      {user && (
        <div className='flex items-center gap-3 px-4 py-4 border-b border-border'>
          {(() => {
            type UserMeta =
              | {
                  avatar_url?: string;
                  avatar?: string;
                  full_name?: string;
                  name?: string;
                }
              | null
              | undefined;
            const meta = user.user_metadata as unknown as UserMeta;
            const avatarSrc = meta?.avatar_url || meta?.avatar || null;
            const displayName =
              meta?.full_name || meta?.name || user.email || "User";

            // initials fallback
            const initials = displayName
              .split(" ")
              .map((s) => s[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <div className='flex items-center gap-3'>
                <div className='h-10 w-10 rounded-full overflow-hidden bg-muted-foreground/10 flex items-center justify-center text-sm font-semibold text-muted-foreground'>
                  {avatarSrc ? (
                    typeof avatarSrc === "string" &&
                    avatarSrc.startsWith("/") ? (
                      <Image
                        src={avatarSrc}
                        alt={displayName}
                        width={40}
                        height={40}
                        className='h-full w-full object-cover'
                      />
                    ) : (
                      <img
                        src={String(avatarSrc)}
                        alt={displayName}
                        className='h-full w-full object-cover'
                        loading='lazy'
                      />
                    )
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
              </div>
            );
          })()}
          <div className='flex flex-col'>
            <span className='text-sm font-medium text-foreground'>
              {(() => {
                type UserMeta =
                  | { full_name?: string; name?: string }
                  | null
                  | undefined;
                const meta = user.user_metadata as unknown as UserMeta;
                return meta?.full_name || meta?.name || user.email;
              })()}
            </span>
            <span className='text-xs text-muted-foreground'>{user.email}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className='flex-1 space-y-1 p-4'>
        {/*
          Determine the single best (longest) matching nav item for the current
          pathname. This prevents the top-level `/dashboard` from always being
          active when a more specific child route (e.g. `/dashboard/devices`) is active.
        */}
        {(() => {
          const matches = navigation.filter((item) => {
            if (!pathname) return false;
            if (item.href === "/") return pathname === "/";
            return (
              pathname === item.href || pathname.startsWith(item.href + "/")
            );
          });

          // pick the longest href (most specific) if there are multiple matches
          const bestMatch = matches.sort(
            (a, b) => b.href.length - a.href.length
          )[0];
          const bestHref = bestMatch?.href;

          return navigation.map((item) => {
            const isActive = item.href === bestHref;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                />
                {item.name}
              </Link>
            );
          });
        })()}
      </nav>

      {/* Sign Out */}
      <div className='border-t border-border p-4'>
        <Button
          variant='ghost'
          className='w-full justify-start cursor-pointer'
          onClick={handleSignOut}
        >
          <LogOut className='mr-3 h-5 w-5' />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar - always visible on md+ screens */}
      <div className='hidden md:block'>
        <SidebarContent />
      </div>

      {/* Mobile sidebar - drawer with backdrop */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden'
            onClick={() => onOpenChange?.(false)}
            aria-hidden='true'
          />

          {/* Sliding drawer */}
          <div className='fixed inset-y-0 left-0 z-50 md:hidden'>
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
}
