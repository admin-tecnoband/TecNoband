"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect } from "react";
import type { UserMeta } from "@/types/user-meta";
import { updateProfile } from "@/lib/supabase/profile";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Profile fields
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toast = useToast().toast;

  useEffect(() => {
    const meta = (user as unknown as { user_metadata?: UserMeta })
      ?.user_metadata;
    setFullName(meta?.full_name ?? meta?.name ?? "");
    setCompany(meta?.company ?? "");
  }, [user]);

  return (
    <DashboardLayout>
      <div className='p-8 space-y-8'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold'>Settings</h1>
          <p className='text-muted-foreground'>
            Manage your account and preferences
          </p>
        </div>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your account details</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={user?.email || ""}
                disabled
              />
            </div>

            {error && <div className='text-red-500 text-sm'>{error}</div>}

            <div className='space-y-2'>
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                placeholder='John Doe'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='company'>Company</Label>
              <Input
                id='company'
                placeholder='Acme Inc.'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <Button
              onClick={async () => {
                setSaving(true);
                setError("");
                try {
                  await updateProfile({ full_name: fullName, company });
                  // updateProfile will throw if there's an auth error
                  toast({
                    title: "Profile updated",
                    description: "Your profile was saved.",
                  });
                } catch (err: unknown) {
                  const msg =
                    err instanceof Error
                      ? err.message || String(err)
                      : String(err);
                  setError(msg);
                  toast({ title: "Update failed", description: msg });
                } finally {
                  setSaving(false);
                }
              }}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Configure how you receive alerts</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Email Notifications</Label>
                <p className='text-sm text-muted-foreground'>
                  Receive alerts via email
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Push Notifications</Label>
                <p className='text-sm text-muted-foreground'>
                  Receive push notifications in browser
                </p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Device Alerts</Label>
                <p className='text-sm text-muted-foreground'>
                  Get notified when devices go offline
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Dark Mode</Label>
                <p className='text-sm text-muted-foreground'>Use dark theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>

        {/* AI Features */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Features</CardTitle>
            <CardDescription>
              Configure machine learning capabilities for your IoT
              infrastructure
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Anomaly Detection</Label>
                <p className='text-sm text-muted-foreground'>
                  Automatically detect unusual device behavior
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Predictive Maintenance</Label>
                <p className='text-sm text-muted-foreground'>
                  Get maintenance recommendations based on device data
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label>Smart Alert Summarization</Label>
                <p className='text-sm text-muted-foreground'>
                  Group and summarize related alerts intelligently
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className='pt-4 border-t'>
              <Button variant='outline' className='w-full'>
                View AI Feature Documentation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your security settings</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Button variant='outline'>Change Password</Button>
            <Button variant='outline'>Enable Two-Factor Authentication</Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className='border-destructive'>
          <CardHeader>
            <CardTitle className='text-destructive'>Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <Button variant='destructive'>Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
