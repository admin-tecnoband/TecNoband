"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Cpu, AlertTriangle, CheckCircle2 } from "lucide-react";
import devices from "@/data/iot-devices.json";
import { Button } from "@/components/ui/button";
import { AddDeviceModal } from "@/components/dashboard/add-device-modal";
import { useState } from "react";
import { OverviewAiFeatures } from "@/components/dashboard/overview-ai-features";

export default function DashboardPage() {
  const onlineDevices = devices.filter((d) => d.status === "online").length;
  const offlineDevices = devices.filter((d) => d.status === "offline").length;
  const warningDevices = devices.filter((d) => d.status === "warning").length;
  const totalDevices = devices.length;

  const [refetch, setRefetch] = useState<number>(0);

  return (
    <DashboardLayout>
      <div className='p-8 space-y-8'>
        {/* Header */}
        <div className='flex items-center flex-wrap justify-between gap-6'>
          <div className='flex items-center gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Dashboard</h1>
              <p className='text-muted-foreground'>
                Welcome back! Here&apos;s an overview of your IoT
                infrastructure.
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <span className='text-xs text-muted-foreground'>
              Last updated: {new Date().toLocaleTimeString()}
            </span>
            <Button variant='ghost' onClick={() => setRefetch((s) => s + 1)}>
              Refresh
            </Button>
            <AddDeviceModal />
          </div>
        </div>

        {/* Stats Grid */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='shadow-glow hover:shadow-glow-lg transition-all'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Devices
              </CardTitle>
              <div className='h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center'>
                <Cpu className='h-4 w-4 text-primary' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{totalDevices}</div>
              <p className='text-xs text-muted-foreground'>
                Across all locations
              </p>
            </CardContent>
          </Card>

          <Card className='shadow-glow hover:shadow-glow-lg transition-all'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Online</CardTitle>
              <div className='h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center'>
                <CheckCircle2 className='h-4 w-4 text-accent' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{onlineDevices}</div>
              <p className='text-xs text-muted-foreground'>
                {((onlineDevices / totalDevices) * 100).toFixed(0)}% uptime
              </p>
            </CardContent>
          </Card>

          <Card className='shadow-glow hover:shadow-glow-lg transition-all'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Warnings</CardTitle>
              <div className='h-8 w-8 rounded-lg bg-secondary/10 flex items-center justify-center'>
                <AlertTriangle className='h-4 w-4 text-secondary' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{warningDevices}</div>
              <p className='text-xs text-muted-foreground'>Require attention</p>
            </CardContent>
          </Card>

          <Card className='shadow-glow hover:shadow-glow-lg transition-all'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Offline</CardTitle>
              <div className='h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center'>
                <Activity className='h-4 w-4 text-destructive' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{offlineDevices}</div>
              <p className='text-xs text-muted-foreground'>Need reconnection</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className='shadow-glow'>
          <CardHeader>
            <CardTitle>Recent Device Activity</CardTitle>
            <CardDescription>
              Latest updates from your connected devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {devices.length === 0 ? (
                <div className='text-center text-sm text-muted-foreground py-8'>
                  No recent device activity. Add devices to get started.
                </div>
              ) : (
                devices.slice(0, 5).map((device) => (
                  <div
                    key={`${device.id}-${refetch}`}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center gap-4'>
                      <div
                        className={cn(
                          "h-2 w-2 rounded-full",
                          device.status === "online"
                            ? "bg-accent"
                            : device.status === "warning"
                            ? "bg-secondary"
                            : "bg-destructive"
                        )}
                      />
                      <div>
                        <p className='font-medium'>{device.name}</p>
                        <p className='text-sm text-muted-foreground'>
                          {device.location}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-4'>
                      <Badge
                        variant={
                          device.status === "online"
                            ? "default"
                            : device.status === "warning"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {device.status}
                      </Badge>
                      <span className='text-sm text-muted-foreground'>
                        {new Date(device.lastSeen).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Device Types Distribution */}
        <div className='grid gap-4 md:grid-cols-3'>
          <Card className='shadow-glow hover:shadow-glow-lg transition-all'>
            <CardHeader>
              <CardTitle>Sensors</CardTitle>
              <CardDescription>Environmental monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold'>
                {devices.filter((d) => d.type === "sensor").length}
              </div>
              <div className='mt-2 h-2 w-full bg-border/30 rounded-full'>
                <div
                  className='h-2 bg-accent rounded-full'
                  style={{
                    width: `${
                      (devices.filter((d) => d.type === "sensor").length /
                        totalDevices) *
                        100 || 0
                    }%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-glow hover:shadow-glow-lg transition-all'>
            <CardHeader>
              <CardTitle>Actuators</CardTitle>
              <CardDescription>Control devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold'>
                {devices.filter((d) => d.type === "actuator").length}
              </div>
              <div className='mt-2 h-2 w-full bg-border/30 rounded-full'>
                <div
                  className='h-2 bg-primary rounded-full'
                  style={{
                    width: `${
                      (devices.filter((d) => d.type === "actuator").length /
                        totalDevices) *
                        100 || 0
                    }%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-glow hover:shadow-glow-lg transition-all'>
            <CardHeader>
              <CardTitle>Gateways</CardTitle>
              <CardDescription>Network hubs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='text-3xl font-bold'>
                {devices.filter((d) => d.type === "gateway").length}
              </div>
              <div className='mt-2 h-2 w-full bg-border/30 rounded-full'>
                <div
                  className='h-2 bg-secondary rounded-full'
                  style={{
                    width: `${
                      (devices.filter((d) => d.type === "gateway").length /
                        totalDevices) *
                        100 || 0
                    }%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Features Showcase */}
        <OverviewAiFeatures />
      </div>
    </DashboardLayout>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
