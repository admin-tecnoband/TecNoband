# Device Management System

## Overview

A context-based device management system for the TecNoBand IoT dashboard. Devices are managed in-memory and persist during the session.

## Architecture

### 1. Device Context (`contexts/device-context.tsx`)

- **Purpose**: Centralized state management for devices across all dashboard pages
- **Initial State**: Loads devices from `data/iot-devices.json`
- **Actions**:
  - `addDevice()`: Add a new device with auto-generated ID and timestamp
  - `updateDevice()`: Update device properties by ID
  - `removeDevice()`: Remove a device by ID
- **Hook**: `useDevices()` - Access devices and actions from any component

### 2. Add Device Modal (`components/dashboard/add-device-modal.tsx`)

- **Features**:
  - Form with validation for device properties
  - Type-specific fields (sensor, actuator, gateway)
  - Real-time form state management
  - Auto-close on submit
- **Fields**:
  - **Common**: name, type, location, status
  - **Sensor**: temperature, humidity, battery
  - **Actuator**: state, battery
  - **Gateway**: connectedDevices, uptime

### 3. Dashboard Layout Integration (`components/dashboard-layout.tsx`)

- Wraps all dashboard pages with `DeviceProvider`
- Makes device context available to:
  - `/dashboard`
  - `/dashboard/devices`
  - `/dashboard/analytics`
  - `/dashboard/settings`

### 4. Devices Page (`app/dashboard/devices/page.tsx`)

- Consumes `useDevices()` hook
- Displays devices from context (not static JSON)
- Includes AddDeviceModal trigger button
- Real-time filtering and search

## Usage

### Adding a Device

```tsx
import { useDevices } from "@/contexts/device-context";

const { addDevice } = useDevices();

addDevice({
  name: "Temperature Sensor 1",
  type: "sensor",
  status: "online",
  location: "Building A - Floor 2",
  temperature: 23.5,
  humidity: 45,
  battery: 85,
});
```

### Accessing Devices

```tsx
import { useDevices } from "@/contexts/device-context";

function MyComponent() {
  const { devices } = useDevices();

  return (
    <div>
      {devices.map((device) => (
        <div key={device.id}>{device.name}</div>
      ))}
    </div>
  );
}
```

### Updating a Device

```tsx
const { updateDevice } = useDevices();

updateDevice("device-123", {
  status: "offline",
  battery: 10,
});
```

### Removing a Device

```tsx
const { removeDevice } = useDevices();

removeDevice("device-123");
```

## Device Type Schema

```typescript
interface Device {
  id: string; // Auto-generated
  name: string; // User input
  type: "sensor" | "actuator" | "gateway";
  status: "online" | "offline" | "warning";
  location: string;
  lastSeen: string; // Auto-generated ISO timestamp

  // Type-specific (optional)
  battery?: number; // Sensor, Actuator
  temperature?: number; // Sensor
  humidity?: number; // Sensor
  state?: "on" | "off"; // Actuator
  connectedDevices?: number; // Gateway
  uptime?: string; // Gateway
}
```

## State Persistence

- **In-Memory**: Devices persist during the session
- **Reset**: Refreshing the page reloads from `data/iot-devices.json`
- **Future Enhancement**: Add localStorage or database persistence

## Files Modified/Created

- ✅ `contexts/device-context.tsx` (new)
- ✅ `components/dashboard/add-device-modal.tsx` (new)
- ✅ `components/dashboard-layout.tsx` (modified - added DeviceProvider)
- ✅ `app/dashboard/devices/page.tsx` (modified - uses context)

## Testing

1. Navigate to `/dashboard/devices`
2. Click "Add Device" button
3. Fill out the form (type changes available fields)
4. Submit and see new device appear at top of list
5. Search/filter still works with new devices
6. Newly added devices persist across dashboard page navigation
