"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Logo } from "@/components/ui/logo";

export default function VerifyPage() {
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session) {
          router.push("/dashboard");
        } else {
          setError("Verification failed. Please try again.");
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Verification failed";
        setError(message);
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [router, supabase]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <Logo />
          </div>
          <CardTitle className='text-2xl text-center'>
            {verifying
              ? "Verifying your email..."
              : error
              ? "Verification failed"
              : "Email verified!"}
          </CardTitle>
          <CardDescription className='text-center'>
            {verifying
              ? "Please wait while we verify your email address"
              : error
              ? error
              : "Your email has been successfully verified"}
          </CardDescription>
        </CardHeader>
        {!verifying && (
          <CardContent>
            <Button asChild className='w-full'>
              <Link href={error ? "/auth/login" : "/dashboard"}>
                {error ? "Back to Login" : "Go to Dashboard"}
              </Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
