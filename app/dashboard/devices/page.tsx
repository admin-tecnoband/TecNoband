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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Cpu,
  Search,
  Battery,
  Thermometer,
  Droplets,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";
import { DeviceAiFeatures } from "@/components/dashboard/device-ai-features";
import { useDevices } from "@/contexts/device-context";
import { AddDeviceModal } from "@/components/dashboard/add-device-modal";

function DevicesContent() {
  const { devices } = useDevices();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className='p-8 space-y-8'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='flex items-center justify-between'
      >
        <div>
          <h1 className='text-3xl font-bold'>Devices</h1>
          <p className='text-muted-foreground'>
            Manage and monitor all your IoT devices
          </p>
        </div>
        <AddDeviceModal />
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className='flex flex-col md:flex-row flex-wrap gap-4'
      >
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='Search devices...'
            className='pl-10'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='flex flex-warp gap-2'>
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "online" ? "default" : "outline"}
            onClick={() => setFilterStatus("online")}
          >
            Online
          </Button>
          <Button
            variant={filterStatus === "warning" ? "default" : "outline"}
            onClick={() => setFilterStatus("warning")}
          >
            Warning
          </Button>
          <Button
            variant={filterStatus === "offline" ? "default" : "outline"}
            onClick={() => setFilterStatus("offline")}
          >
            Offline
          </Button>
        </div>
      </motion.div>

      {/* AI Features for Device Management */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <DeviceAiFeatures />
      </motion.div>

      {/* Devices Grid */}
      <StaggerContainer
        staggerDelay={0.05}
        className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'
      >
        {filteredDevices.map((device) => (
          <StaggerItem key={device.id}>
            <Card className='h-full hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='space-y-1'>
                    <CardTitle className='text-lg'>{device.name}</CardTitle>
                    <CardDescription>{device.location}</CardDescription>
                  </div>
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
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Type</span>
                  <span className='font-medium capitalize'>{device.type}</span>
                </div>

                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Device ID</span>
                  <span className='font-mono text-xs'>{device.id}</span>
                </div>

                {device.battery !== undefined && (
                  <div className='flex items-center justify-between text-sm'>
                    <span className='flex items-center gap-2 text-muted-foreground'>
                      <Battery className='h-4 w-4' />
                      Battery
                    </span>
                    <span className='font-medium'>{device.battery}%</span>
                  </div>
                )}

                {device.temperature !== undefined && (
                  <div className='flex items-center justify-between text-sm'>
                    <span className='flex items-center gap-2 text-muted-foreground'>
                      <Thermometer className='h-4 w-4' />
                      Temperature
                    </span>
                    <span className='font-medium'>{device.temperature}°C</span>
                  </div>
                )}

                {device.humidity !== undefined && (
                  <div className='flex items-center justify-between text-sm'>
                    <span className='flex items-center gap-2 text-muted-foreground'>
                      <Droplets className='h-4 w-4' />
                      Humidity
                    </span>
                    <span className='font-medium'>{device.humidity}%</span>
                  </div>
                )}

                {device.connectedDevices !== undefined && (
                  <div className='flex items-center justify-between text-sm'>
                    <span className='flex items-center gap-2 text-muted-foreground'>
                      <Activity className='h-4 w-4' />
                      Connected
                    </span>
                    <span className='font-medium'>
                      {device.connectedDevices} devices
                    </span>
                  </div>
                )}

                <div className='pt-2 border-t border-border'>
                  <span className='text-xs text-muted-foreground'>
                    Last seen: {new Date(device.lastSeen).toLocaleString()}
                  </span>
                </div>

                <Button variant='outline' className='w-full bg-transparent'>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filteredDevices.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='text-center py-12'
        >
          <p className='text-muted-foreground'>
            No devices found matching your criteria
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function DevicesPage() {
  return (
    <DashboardLayout>
      <DevicesContent />
    </DashboardLayout>
  );
}
