# Pixel Point CRM

Pixel Point CRM is a modern, full-featured Customer Relationship Management dashboard built with Next.js and TypeScript. It empowers businesses to efficiently manage subscriptions, customers, analytics, support tickets, notifications, and internal messaging—all within a beautiful, intuitive interface.

## Features

- **Dashboard Overview**: Get a real-time summary of business performance, leads, invoices, and growth trends.
- **Business Management**: Filter, search, and manage all your businesses in one place, with detailed views and quick actions.
- **Subscriptions**: Track, filter, and manage business subscriptions, including plan changes, auto-renewal, and payment status.
- **Support Tickets**: Create, track, and resolve support tickets with advanced filtering and comment features.
- **Analytics**: Visualize business metrics with charts and breakdowns for plans, sales, and user activity.
- **Messaging**: Communicate internally with team messaging, announcements, and templates.
- **Notifications & Alerts**: Stay up-to-date with system notifications, alerts, and customizable notification settings.
- **Admin Settings**: Manage users, roles, and audit logs with granular permissions.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **UI**: Shadcn UI / Radix UI / Lucide Icons / Tailwind CSS
- **State Management**: React hooks
- **Styling**: Tailwind CSS

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   # or yarn install / npm install
   ```
2. **Run the development server**
   ```bash
   pnpm dev
   # or yarn dev / npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/dashboard` — Main dashboard pages (businesses, subscriptions, analytics, support, messaging, etc.)
- `src/components` — Modular UI components and layouts
- `src/shared` — Shared data and types

## Customization
- Update branding in `src/components/sidebar.tsx` ("Pixel Point CRM") and `Header.tsx` as needed.
- Add your business logic, API integration, or extend modules as required.

## Deployment
You can deploy Pixel Point CRM easily on [Vercel](https://vercel.com/) or any Next.js-compatible platform.

---

Pixel Point CRM — The modern way to manage your business relationships.
