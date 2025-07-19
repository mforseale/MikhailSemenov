# Personal Portfolio Website - Mikhail Semenov

## Overview

This is a modern personal portfolio website for Mikhail Semenov, Deputy General Director for Information Technology at NPP TEK. The application is built as a full-stack web application with a React frontend and Express backend, featuring a personal brand showcase, articles, projects, and contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **Validation**: Zod schemas shared between client and server
- **Session Management**: Express sessions with PostgreSQL store

## Key Components

### Database Schema
The application uses three main entities:
- **Contacts**: Stores contact form submissions with name, email, subject, and message
- **Articles**: Contains blog posts/articles with content, categories, and metadata
- **Projects**: Showcases professional projects with descriptions and technologies

### Frontend Components
- **Navigation**: Responsive navigation with smooth scrolling
- **Hero Section**: Personal introduction with photo and quote
- **About Approach**: Three-card layout showcasing work philosophy
- **Company Section**: Information about NPP TEK with company images
- **Projects Section**: Grid display of professional projects
- **Articles Section**: Blog-style article listings with search and filtering
- **Certificates**: Professional certifications showcase
- **Contact Form**: Validated contact form with toast notifications

### API Endpoints
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Retrieve all contacts (admin)
- `GET /api/articles` - Get articles with optional search/filter
- `GET /api/articles/:id` - Get specific article
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project

## Data Flow

1. **Static Content**: Company information, personal details, and approach philosophy are embedded in components
2. **Dynamic Content**: Articles and projects are fetched from the backend API using React Query
3. **Contact Form**: Form submissions are validated client-side with Zod, then sent to the backend API
4. **Search/Filter**: Real-time filtering of articles by category and search terms

## External Dependencies

### Core Libraries
- **UI Framework**: shadcn/ui component library built on Radix UI primitives
- **Database**: @neondatabase/serverless for PostgreSQL connectivity
- **Styling**: Tailwind CSS for utility-first styling
- **Validation**: Zod for schema validation
- **Animations**: Framer Motion for smooth page transitions

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Strict type checking enabled
- **Database Migrations**: Drizzle Kit for schema management
- **Development**: Hot module replacement and error overlay

## Deployment Strategy

### Build Process
- Frontend builds to `dist/public` directory
- Backend compiles to `dist/index.js` using esbuild
- Static assets are served by Express in production

### Environment Configuration
- Development: Uses Vite dev server with Express API proxy
- Production: Single Express server serves both API and static files
- Database: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Key Features
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **SEO Optimized**: Russian language meta tags and structured content
- **Performance**: Code splitting, lazy loading, and optimized images
- **Accessibility**: Semantic HTML and ARIA labels throughout
- **Internationalization**: Russian language content with proper locale settings

The application prioritizes a professional presentation while maintaining modern web standards and performance best practices. The modular component architecture allows for easy maintenance and future enhancements.