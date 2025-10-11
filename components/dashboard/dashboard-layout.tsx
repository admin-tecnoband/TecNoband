"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { useAuth } from "@/hooks/use-auth";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Client-side route protection for static export
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    );
  }

  // While redirecting unauthenticated users, render nothing to avoid flicker
  if (!user) return null;

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar />
      <main className='flex-1 overflow-y-auto bg-background'>{children}</main>
    </div>
  );
}
