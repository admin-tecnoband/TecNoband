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
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Devices", href: "/dashboard/devices", icon: Cpu },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Sidebar({ open, onOpenChange }: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleSignOutMobile = async () => {
    onOpenChange(false);
    await signOut();
    router.push("/");
  };

  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <div className='flex h-full w-64 flex-col border-r border-border bg-card'>
      {/* Logo */}
      <div className='flex h-16 items-center gap-2 border-b border-border px-6'>
        <div className='h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent' />
        <span className='font-display text-xl font-bold'>TecNoBand</span>
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-1 p-4'>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md font-semibold"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
              )}
            >
              <item.icon
                className={cn("h-5 w-5", isActive && "drop-shadow-sm")}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className='border-t border-border p-4'>
        <Button
          variant='ghost'
          className='w-full justify-start'
          onClick={onNavigate ? handleSignOutMobile : handleSignOut}
        >
          <LogOut className='mr-3 h-5 w-5' />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay + panel */}
      <div className={cn("md:hidden", open ? "" : "pointer-events-none")}>
        {/* backdrop */}
        <div
          className={cn(
            "fixed inset-0 bg-black/40 z-40 transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => onOpenChange(false)}
        />

        {/* panel */}
        <div
          className={cn(
            "fixed top-0 left-0 bottom-0 z-50 h-full w-64 transform bg-card transition-transform duration-300",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <SidebarContent onNavigate={() => onOpenChange(false)} />
        </div>
      </div>

      {/* Desktop sidebar (hidden on mobile) */}
      <div className='hidden md:flex'>
        <SidebarContent />
      </div>
    </>
  );
}
