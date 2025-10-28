"use client";

import type React from "react";
import { Sidebar } from "./sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { DeviceProvider } from "@/contexts/device-context";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    );
  }

  return (
    <DeviceProvider>
      <div className='flex h-screen overflow-hidden relative'>
        {/* Mobile hamburger button */}
        <button
          className='md:hidden fixed top-4 left-4 z-50 inline-flex items-center justify-center rounded-md bg-background/80 backdrop-blur-sm border border-border p-2 shadow-lg hover:bg-accent transition-colors'
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          onClick={() => setSidebarOpen((v) => !v)}
        >
          {sidebarOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>

        <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
        <main className='flex-1 overflow-y-auto bg-background'>{children}</main>
      </div>
    </DeviceProvider>
  );
}
