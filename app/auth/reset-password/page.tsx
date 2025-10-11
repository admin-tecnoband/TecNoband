"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const supabase = getSupabaseBrowserClient();
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${window.location.origin}/auth/update-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message || "Failed to send reset email"
          : typeof err === "string"
          ? err
          : "Failed to send reset email";
      setError(message);
      toast({
        title: "Reset failed",
        description: message,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background p-4'>
        <Card className='w-full max-w-md'>
          <CardHeader className='space-y-1'>
            <div className='flex items-center justify-center mb-4'>
              <Logo />
            </div>
            <CardTitle className='text-2xl text-center'>
              Check your email
            </CardTitle>
            <CardDescription className='text-center'>
              We&apos;ve sent a password reset link to {email}. Please check
              your inbox and follow the instructions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className='w-full'>
              <Link href='/auth/login'>Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <Logo />
          </div>
          <CardTitle className='text-2xl text-center'>
            Reset your password
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className='space-y-4'>
            {error && <div className='text-red-500 text-sm'>{error}</div>}

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </Button>

            <Button variant='ghost' asChild className='w-full'>
              <Link href='/auth/login'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Login
              </Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
