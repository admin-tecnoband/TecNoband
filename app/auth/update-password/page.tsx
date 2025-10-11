"use client";

import type React from "react";

import { useState } from "react";
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
import { Logo } from "@/components/ui/logo";
import { useToast } from "@/hooks/use-toast";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();
  const { toast } = useToast();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      router.push("/dashboard");
      toast({
        title: "Password updated",
        description: "Your password was updated successfully.",
        variant: "default",
        duration: 4000,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message || "Failed to update password"
          : String(err) || "Failed to update password";
      setError(message);
      toast({
        title: "Update failed",
        description: message,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <Logo />
          </div>
          <CardTitle className='text-2xl text-center'>
            Update your password
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword} className='space-y-4'>
            {error && <div className='text-red-500 text-sm'>{error}</div>}

            <div className='space-y-2'>
              <Label htmlFor='password'>New Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirm New Password</Label>
              <Input
                id='confirmPassword'
                type='password'
                placeholder='••••••••'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? "Updating..." : "Update password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
