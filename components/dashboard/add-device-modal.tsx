"use client";

import { useState } from "react";
import { useDevices, type Device } from "@/contexts/device-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cpu, Plus } from "lucide-react";

interface AddDeviceModalProps {
  trigger?: React.ReactNode;
}

export function AddDeviceModal({ trigger }: AddDeviceModalProps) {
  const { addDevice } = useDevices();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "sensor" as Device["type"],
    status: "online" as Device["status"],
    location: "",
    battery: 100,
    temperature: 0,
    humidity: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const deviceData: Omit<Device, "id" | "lastSeen"> = {
      name: formData.name,
      type: formData.type,
      status: formData.status,
      location: formData.location,
    };

    // Add type-specific properties
    if (formData.type === "sensor") {
      deviceData.temperature = formData.temperature;
      deviceData.humidity = formData.humidity;
      deviceData.battery = formData.battery;
    } else if (formData.type === "actuator") {
      deviceData.state = "off";
      deviceData.battery = formData.battery;
    } else if (formData.type === "gateway") {
      deviceData.connectedDevices = 0;
      deviceData.uptime = "0h";
    }

    addDevice(deviceData);

    // Reset form and close modal
    setFormData({
      name: "",
      type: "sensor",
      status: "online",
      location: "",
      battery: 100,
      temperature: 0,
      humidity: 0,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Add Device
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
            <DialogDescription>
              Add a new IoT device to your dashboard. Fill in the device details
              below.
            </DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            {/* Device Name */}
            <div className='grid gap-2'>
              <Label htmlFor='name'>Device Name</Label>
              <Input
                id='name'
                placeholder='e.g., Temperature Sensor 1'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Device Type */}
            <div className='grid gap-2'>
              <Label htmlFor='type'>Device Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: Device["type"]) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger id='type'>
                  <SelectValue placeholder='Select device type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='sensor'>Sensor</SelectItem>
                  <SelectItem value='actuator'>Actuator</SelectItem>
                  <SelectItem value='gateway'>Gateway</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className='grid gap-2'>
              <Label htmlFor='location'>Location</Label>
              <Input
                id='location'
                placeholder='e.g., Building A - Floor 2'
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </div>

            {/* Status */}
            <div className='grid gap-2'>
              <Label htmlFor='status'>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Device["status"]) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger id='status'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='online'>Online</SelectItem>
                  <SelectItem value='offline'>Offline</SelectItem>
                  <SelectItem value='warning'>Warning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type-specific fields */}
            {(formData.type === "sensor" || formData.type === "actuator") && (
              <div className='grid gap-2'>
                <Label htmlFor='battery'>Battery Level (%)</Label>
                <Input
                  id='battery'
                  type='number'
                  min='0'
                  max='100'
                  value={formData.battery}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      battery: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            )}

            {formData.type === "sensor" && (
              <>
                <div className='grid gap-2'>
                  <Label htmlFor='temperature'>Temperature (°C)</Label>
                  <Input
                    id='temperature'
                    type='number'
                    step='0.1'
                    value={formData.temperature}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        temperature: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='humidity'>Humidity (%)</Label>
                  <Input
                    id='humidity'
                    type='number'
                    step='0.1'
                    min='0'
                    max='100'
                    value={formData.humidity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        humidity: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>
              <Cpu className='mr-2 h-4 w-4' />
              Add Device
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
