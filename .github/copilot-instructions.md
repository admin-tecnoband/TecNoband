# TecNoBand - AI Coding Instructions

## Architecture Overview

This is a **dual-purpose Next.js 15 application** combining a marketing website with a protected SaaS dashboard for IoT device management.

### Key Application Structure

- **Marketing Pages** (`/`, `/about`, `/features`, `/contact`, `/blog`) use `MarketingLayout` with header/footer
- **Dashboard Pages** (`/dashboard/*`) use `DashboardLayout` with sidebar navigation
- **Authentication Flow** handled by Supabase with email verification and password reset

### Route Protection Pattern (Static Export Friendly)

- No `middleware.ts` (fully static export). Auth gating happens client-side.
- Use `useAuth()` in any protected page/layout. Example: in `components/dashboard/dashboard-layout.tsx`:
  - Redirect unauthenticated users via `router.replace("/auth/login")`
  - Hide content until auth state resolves to avoid flicker
  - Redirect authenticated users away from auth pages (see `app/auth/login/page.tsx` and `app/auth/signup/page.tsx`)

## Tech Stack & Configuration

### Styling System

- **Tailwind CSS v4** with custom design tokens in `app/globals.css`
- **shadcn/ui** components configured in `components.json` with "new-york" style
- **Dark theme by default** with OKLCH color system for better color accuracy
- **Custom CSS properties** for consistent theming (see `:root` variables in `app/globals.css`)

### Component Architecture

- **UI Components**: Radix UI primitives wrapped in `components/ui/`
- **Layout Components**: Separate marketing and dashboard layouts
- **Animation Components**: Framer Motion wrappers in `components/animations/`
  - Use `<FadeIn delay={0.1}>` for entrance animations
  - Use `<StaggerContainer>` + `<StaggerItem>` for sequential animations

### Authentication Pattern

```tsx
// Always use the custom hook for auth state
const { user, loading } = useAuth();

// Client-side Supabase usage
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
```

## Data & State Management

### IoT Device Data

- Static device data stored in `data/iot-devices.json`
- Device status filtering pattern: `devices.filter(d => d.status === "online")`
- Device types: `"sensor"`, `"actuator"`, `"gateway"`
- Required properties: `id`, `name`, `type`, `status`, `location`, `lastSeen`, `battery`
- Type-specific properties: sensors have `temperature`/`humidity`, actuators have `state`, gateways have `connectedDevices`/`uptime`

### Blog Content

- Static blog posts in `data/blog-posts.json`
- Dynamic routes using `app/blog/[slug]/page.tsx` pattern

## Development Workflows

### Build Configuration

- Static export enabled (`output: "export"` in `next.config.mjs`)
- Image optimization disabled for static deployment compatibility
- ESLint/TS errors are ignored during builds in `next.config.mjs` (adjust as needed)

### Font Management

Multiple font imports in `app/layout.tsx`:

```tsx
// Primary fonts with CSS variables
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});
```

### Component Development

1. Use shadcn/ui components from `@/components/ui/`
2. Wrap marketing pages in `<MarketingLayout>`
3. Wrap dashboard pages in `<DashboardLayout>` (includes client-side auth gating)
4. Add animations with `<FadeIn>` or `<StaggerContainer>`
5. Use Lucide React icons
6. Apply `shadow-glow` and `hover:shadow-glow-lg` classes for dashboard card effects

### Environment Setup

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Package Management

- Uses **pnpm** as package manager
- Key dependencies: Next.js 15, Supabase, Framer Motion, Radix UI, Tailwind CSS v4

## Common Patterns

### Page Structure

```tsx
// Marketing pages (server component)
import { MarketingLayout } from "@/components/marketing/marketing-layout";
export default function Page() {
  return <MarketingLayout>{content}</MarketingLayout>;
}

// Dashboard pages (client component with auth)
("use client");
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
export default function Page() {
  return <DashboardLayout>{content}</DashboardLayout>;
}
```

### Device Data Filtering

```tsx
// Common filtering patterns from dashboard pages
const onlineDevices = devices.filter((d) => d.status === "online").length;
const offlineDevices = devices.filter((d) => d.status === "offline").length;
const warningDevices = devices.filter((d) => d.status === "warning").length;
```

### Card Components with Glow Effects

Use `shadow-glow` and `hover:shadow-glow-lg` classes for consistent visual effects on dashboard cards.

### Authentication State Handling

```tsx
// In auth pages - redirect authenticated users away
useEffect(() => {
  if (!authLoading && user) {
    router.replace("/dashboard");
  }
}, [authLoading, user, router]);
```
