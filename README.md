# TecNoBand - AI-Powered IoT Management Platform

A comprehensive Next.js application for managing IoT devices with AI-powered analytics and real-time monitoring.

## Features

### Marketing Website

- **Home Page**: Hero section with features overview and statistics
- **About Page**: Company story, values, and team information
- **Features Page**: Detailed platform capabilities
- **Contact Page**: Contact form and company information
- **Blog**: Article listing and individual blog posts
- **Legal Pages**: Privacy Policy and Terms & Conditions

### SaaS Dashboard

- **Dashboard Home**: Overview with device statistics and recent activity
- **Devices Management**: Search, filter, and monitor all IoT devices
- **Analytics**: AI-powered insights and predictive maintenance
- **Settings**: Account management and preferences

### Authentication

- Email/password authentication with Supabase
- Email verification
- Password reset flow
- Client-side protected routes (static export friendly)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Authentication**: Supabase Auth
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

1. Install dependencies:

```powershell
pnpm install
```

2. Set up environment variables:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

3. Run the development server:

```powershell
pnpm dev
```

4. Build and export static site:

```powershell
pnpm build
```

Notes:

- This project uses client-side auth gating for static export compatibility. Protected pages redirect on the client.
  \`\`\`bash
  npm run dev
  \`\`\`

4. Open [http://localhost:3000](http://localhost:3000)

## Static Export

This project is configured for static export:

\`\`\`bash
npm run build
\`\`\`

The output will be in the `out` directory.

## Project Structure

\`\`\`
├── app/ # Next.js app directory
│ ├── auth/ # Authentication pages
│ ├── dashboard/ # Protected dashboard pages
│ ├── blog/ # Blog pages
│ └── ... # Marketing pages
├── components/
│ ├── animations/ # Framer Motion components
│ ├── dashboard/ # Dashboard-specific components
│ ├── marketing/ # Marketing site components
│ └── ui/ # Reusable UI components
├── data/ # Static JSON data
├── hooks/ # Custom React hooks
├── lib/ # Utility functions and Supabase clients
└── middleware.ts # Route protection

\`\`\`

## Key Features

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Animations**: Smooth transitions and micro-interactions with Framer Motion
- **Type Safety**: Full TypeScript coverage
- **Authentication**: Secure auth flow with Supabase
- **Static Export**: Can be deployed to any static hosting
- **Dark Mode**: Built-in dark theme support

## License

MIT
