"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useAuth } from "@/hooks/use-auth";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const pathname = usePathname();
  const { toast } = useToast();

  // Complete OAuth redirect (PKCE) when Supabase redirects back to this page.
  useEffect(() => {
    const completeOAuth = async () => {
      try {
        const url = new URL(window.location.href);
        const hasCode = !!url.searchParams.get("code");
        const hasHashToken =
          !!window.location.hash &&
          window.location.hash.includes("access_token");
        if (!hasCode && !hasHashToken) return;

        type SupabaseAuthWithHelper = {
          getSessionFromUrl?: (opts?: {
            storeSession?: boolean;
          }) => Promise<unknown>;
        };

        const authWithHelper =
          supabase.auth as unknown as SupabaseAuthWithHelper;
        if (
          authWithHelper &&
          typeof authWithHelper.getSessionFromUrl === "function"
        ) {
          const resp = (await authWithHelper.getSessionFromUrl({
            storeSession: true,
          })) as unknown;
          type HelperResp = { error?: { message?: string } } | null;
          const typed = (resp as HelperResp) ?? null;
          const respError = typed?.error ?? null;
          if (!respError) {
            router.replace("/dashboard");
            return;
          }
          console.debug("getSessionFromUrl returned error", respError);
        }
        // Fallback: try to read oauth tokens from the URL hash (implicit flow)
        const hash = window.location.hash;
        if (hash && hash.includes("access_token")) {
          const params = new URLSearchParams(hash.replace("#", ""));
          const access_token = params.get("access_token");
          const refresh_token = params.get("refresh_token");
          if (access_token && refresh_token) {
            // setSession will persist the session client-side
            try {
              type SupabaseAuthSetSession = {
                setSession?: (tokens: {
                  access_token: string;
                  refresh_token: string;
                }) => Promise<unknown>;
              };
              const authWithSet =
                supabase.auth as unknown as SupabaseAuthSetSession;
              if (authWithSet && typeof authWithSet.setSession === "function") {
                const setResp = (await authWithSet.setSession({
                  access_token,
                  refresh_token,
                })) as unknown;
                type SetResp = { error?: unknown } | null;
                const setTyped = (setResp as SetResp) ?? null;
                if (!setTyped?.error) {
                  router.replace("/dashboard");
                  return;
                }
                console.debug("setSession returned error", setTyped.error);
              }
            } catch (e) {
              console.error("setSession failed:", e);
            }
          }
        }

        // If helper and hash fallback failed, show an error and suggest retrying in same tab.
        setError(
          "Authentication completed but could not finalize in this tab. Try signing in again in the same window and ensure cookies/localStorage are enabled."
        );
      } catch (err) {
        console.error("OAuth completion error (login):", err);
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      }
    };

    completeOAuth();
  }, [router, supabase, pathname]);

  // Redirect if already authenticated (client-side, for static export)
  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [authLoading, user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Signed in",
          description: "Welcome back!",
          variant: "default",
          duration: 3000,
        });
        router.push("/dashboard");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to login";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // Redirect back to the login page so we can complete PKCE here
          redirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/auth/login`,
        },
      });

      if (error) throw error;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to sign in with Google";
      setError(message);
      setSubmitting(false);
    }
  };

  // Avoid form flicker during redirect check
  if (!authLoading && user) return null;

  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 blur-3xl' />

      <Card className='w-full max-w-md shadow-glow-lg relative z-10'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <Logo />
          </div>
          <div className='text-center'>
            <Link
              href='/'
              className='text-sm text-muted-foreground hover:underline'
            >
              Back to home
            </Link>
          </div>
          <CardTitle className='text-2xl text-center'>Welcome back</CardTitle>
          <CardDescription className='text-center'>
            Sign in to your TecNoBand account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className='space-y-4'>
            {error && <div className='text-red-500 text-sm'>{error}</div>}

            <Button
              type='button'
              variant='outline'
              className='w-full bg-transparent'
              onClick={handleGoogleLogin}
              disabled={submitting}
            >
              <svg className='mr-2 h-4 w-4' viewBox='0 0 24 24'>
                <path
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  fill='#4285F4'
                />
                <path
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  fill='#34A853'
                />
                <path
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  fill='#FBBC05'
                />
                <path
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  fill='#EA4335'
                />
              </svg>
              Continue with Google
            </Button>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  href='/auth/reset-password'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={submitting}
              />
            </div>

            <Button type='submit' className='w-full' disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
            </Button>

            <div className='text-center text-sm text-muted-foreground'>
              Don&apos;t have an account?{" "}
              <Link
                href='/auth/signup'
                className='text-primary hover:underline'
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
