# Food Ordering Application

## Overview

This is a full-stack food ordering application built with React on the frontend and Express.js on the backend. The application features a mobile-first design with a Thai restaurant theme, allowing users to browse food items, add them to a cart, and place orders with email notifications and Google Sheets integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Framework**: Tailwind CSS with custom Thai-themed color scheme
- **Component Library**: Radix UI components via shadcn/ui
- **State Management**: React Query for server state, React Context for cart management
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Email Service**: Nodemailer with Gmail OAuth integration
- **External Integration**: Google Sheets API for order logging

### Development Setup
- **Development Server**: Vite dev server with Express middleware
- **Type Safety**: Shared TypeScript schemas between frontend and backend
- **Hot Module Replacement**: Full HMR support in development
- **Error Handling**: Runtime error overlay for development

## Key Components

### Database Schema
- **Users**: Basic user authentication (id, username, password)
- **Food Items**: Menu items with categories, pricing, ratings, and images
- **Orders**: Customer orders with contact info, items, and status tracking

### Frontend Components
- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Cart System**: Context-based cart management with persistent state
- **Food Display**: Grid layout with category filtering and search
- **Order Flow**: Multi-step checkout process with form validation

### Backend Services
- **Storage Layer**: Abstracted storage interface with in-memory fallback
- **Email Notifications**: Automated order confirmation emails
- **Google Sheets Integration**: Real-time order logging for business tracking
- **API Routes**: RESTful endpoints for food items and order management

## Data Flow

1. **Menu Loading**: Frontend fetches food items from `/api/food-items`
2. **Cart Management**: Local state management with React Context
3. **Order Placement**: Form submission to `/api/orders` with validation
4. **Order Processing**: Backend creates order, sends email, logs to Google Sheets
5. **Real-time Updates**: React Query handles cache invalidation and updates

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Email Service**: Gmail SMTP via Nodemailer
- **Google Services**: Google Sheets API and OAuth
- **UI Components**: Radix UI primitives
- **Validation**: Zod schemas for type-safe validation

### Development Tools
- **Replit Integration**: Cartographer plugin for development environment
- **Build Process**: ESBuild for server bundling, Vite for client bundling
- **Database Management**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React app to `dist/public`
2. **Server Build**: ESBuild bundles Express server to `dist/index.js`
3. **Database Setup**: Drizzle migrations run via `db:push` command

### Environment Configuration
- **Development**: Hot reload with Vite dev server
- **Production**: Compiled assets served by Express static middleware
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Production Considerations
- Static asset serving through Express
- Database connection pooling via Neon serverless
- Error handling and logging middleware
- Session management with PostgreSQL storage