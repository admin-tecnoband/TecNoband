"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import devicesData from "@/data/iot-devices.json";

export interface Device {
  id: string;
  name: string;
  type: "sensor" | "actuator" | "gateway";
  status: "online" | "offline" | "warning";
  location: string;
  lastSeen: string;
  battery?: number;
  temperature?: number;
  humidity?: number;
  state?: "on" | "off";
  connectedDevices?: number;
  uptime?: string;
}

interface DeviceContextType {
  devices: Device[];
  addDevice: (device: Omit<Device, "id" | "lastSeen">) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  removeDevice: (id: string) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<Device[]>(devicesData as Device[]);

  const addDevice = useCallback((device: Omit<Device, "id" | "lastSeen">) => {
    const newDevice: Device = {
      ...device,
      id: `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      lastSeen: new Date().toISOString(),
    };
    setDevices((prev) => [newDevice, ...prev]);
  }, []);

  const updateDevice = useCallback((id: string, updates: Partial<Device>) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === id ? { ...device, ...updates } : device
      )
    );
  }, []);

  const removeDevice = useCallback((id: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== id));
  }, []);

  return (
    <DeviceContext.Provider
      value={{ devices, addDevice, updateDevice, removeDevice }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevices() {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDevices must be used within a DeviceProvider");
  }
  return context;
}
