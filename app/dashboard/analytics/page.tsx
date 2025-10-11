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
import { TrendingUp, TrendingDown, Activity, Zap } from "lucide-react";
import devices from "@/data/iot-devices.json";
import { AnalyticsAiFeatures } from "@/components/dashboard/analytics-ai-features";

export default function AnalyticsPage() {
  const avgBattery =
    devices
      .filter((d) => d.battery !== undefined)
      .reduce((acc, d) => acc + (d.battery || 0), 0) /
    devices.filter((d) => d.battery !== undefined).length;

  const avgTemp =
    devices
      .filter((d) => d.temperature !== undefined)
      .reduce((acc, d) => acc + (d.temperature || 0), 0) /
    devices.filter((d) => d.temperature !== undefined).length;

  return (
    <DashboardLayout>
      <div className='p-8 space-y-8'>
        {/* Header */}
        <div>
          <h1 className='text-3xl font-bold'>Analytics</h1>
          <p className='text-muted-foreground'>
            Insights and metrics from your IoT infrastructure
          </p>
        </div>

        {/* Key Metrics */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Avg Battery Level
              </CardTitle>
              <Zap className='h-4 w-4 text-primary' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{avgBattery.toFixed(1)}%</div>
              <p className='text-xs text-muted-foreground flex items-center gap-1'>
                <TrendingUp className='h-3 w-3 text-accent' />
                <span className='text-accent'>+2.5%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Avg Temperature
              </CardTitle>
              <Activity className='h-4 w-4 text-secondary' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{avgTemp.toFixed(1)}°C</div>
              <p className='text-xs text-muted-foreground flex items-center gap-1'>
                <TrendingDown className='h-3 w-3 text-primary' />
                <span className='text-primary'>-0.3°C</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Data Points</CardTitle>
              <Activity className='h-4 w-4 text-accent' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>1.2M</div>
              <p className='text-xs text-muted-foreground flex items-center gap-1'>
                <TrendingUp className='h-3 w-3 text-accent' />
                <span className='text-accent'>+12%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Uptime</CardTitle>
              <Activity className='h-4 w-4 text-accent' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>99.8%</div>
              <p className='text-xs text-muted-foreground flex items-center gap-1'>
                <TrendingUp className='h-3 w-3 text-accent' />
                <span className='text-accent'>+0.2%</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Features for Analytics */}
        <AnalyticsAiFeatures />

        {/* Charts Placeholder */}
        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Device Status Over Time</CardTitle>
              <CardDescription>Historical device availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-64 flex items-center justify-center bg-muted/50 rounded-lg'>
                <p className='text-muted-foreground'>
                  Chart visualization would go here
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Battery Levels</CardTitle>
              <CardDescription>Device battery distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-64 flex items-center justify-center bg-muted/50 rounded-lg'>
                <p className='text-muted-foreground'>
                  Chart visualization would go here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Device Performance</CardTitle>
            <CardDescription>
              Top performing and underperforming devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {devices.slice(0, 6).map((device) => (
                <div
                  key={device.id}
                  className='flex items-center justify-between'
                >
                  <div className='flex items-center gap-4'>
                    <div className='w-32 truncate'>
                      <p className='font-medium'>{device.name}</p>
                      <p className='text-sm text-muted-foreground'>
                        {device.type}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='w-48 bg-muted rounded-full h-2'>
                      <div
                        className='bg-primary h-2 rounded-full'
                        style={{
                          width: `${device.battery || Math.random() * 100}%`,
                        }}
                      />
                    </div>
                    <Badge
                      variant={
                        device.status === "online" ? "default" : "secondary"
                      }
                    >
                      {device.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Predictions */}
        <Card>
          <CardHeader>
            <CardTitle>AI Predictions & Alerts</CardTitle>
            <CardDescription>
              Machine learning insights for your devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-start gap-4 p-4 bg-secondary/10 border border-secondary/20 rounded-lg'>
                <Activity className='h-5 w-5 text-secondary mt-0.5' />
                <div>
                  <p className='font-medium'>Battery Warning Predicted</p>
                  <p className='text-sm text-muted-foreground'>
                    Motion Sensor D3 battery expected to drop below 10% within
                    48 hours
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4 p-4 bg-primary/10 border border-primary/20 rounded-lg'>
                <Activity className='h-5 w-5 text-primary mt-0.5' />
                <div>
                  <p className='font-medium'>Maintenance Recommended</p>
                  <p className='text-sm text-muted-foreground'>
                    Gateway Hub C1 showing signs of increased latency, consider
                    inspection
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4 p-4 bg-accent/10 border border-accent/20 rounded-lg'>
                <Activity className='h-5 w-5 text-accent mt-0.5' />
                <div>
                  <p className='font-medium'>Optimal Performance</p>
                  <p className='text-sm text-muted-foreground'>
                    Temperature Sensor A1 operating within ideal parameters
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
