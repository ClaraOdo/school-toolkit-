# School Child Protection Toolkit - Frontend

A Vue.js frontend application for the School Child Protection Toolkit system.

## Overview

This is the frontend application that consumes the `school-toolkit-api` backend. It provides a modern, responsive web interface for managing child protection cases, conducting assessments, and tracking interventions in schools.

## Features

### Implemented
- **Authentication System** - Login/logout with role-based access
- **Dashboard** - Overview statistics and recent activities
- **Children Management** - List, search, and filter children records
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Role-based Navigation** - Different menu items based on user role
- **API Integration** - Full integration with the Laravel backend API

### Planned
- **Child Registration** - Multi-step form for registering new children
- **Assessment Forms** - Comprehensive child and household assessment forms
- **Case CasePlan Management** - Schedule and manage case CasePlans
- **Document Generation** - PDF reports and assessments
- **File Uploads** - Document attachments and photos
- **Real-time Notifications** - Updates and alerts
- **Advanced Search** - Complex filtering and search capabilities
- **Data Visualization** - Charts and graphs for reporting

## Technology Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vue Router 4** - Client-side routing
- **Axios** - HTTP client for API communication
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Vite** - Fast build tool and development server

## Prerequisites

- Node.js 18+ and npm
- Running `school-toolkit-api` backend on `http://localhost:8000`

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Configuration

### API Endpoint
The frontend is configured to connect to the backend API at `http://localhost:8000/api`. You can change this in `src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Change this URL as needed
  // ...
})
```

### CORS
Make sure the backend API has CORS configured to allow requests from the frontend URL (typically `http://localhost:5173` for Vite dev server).

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   └── Layout.vue      # Main layout with navigation
├── views/              # Page components
│   ├── Login.vue       # Login page
│   ├── Dashboard.vue   # Dashboard page
│   ├── Children/       # Children management pages
│   ├── Assessments/    # Assessment pages
│   ├── CasePlans/# Case CasePlan pages
│   ├── Schools/        # School management pages
│   └── Users/          # User management pages
├── stores/             # State management
│   └── auth.js         # Authentication store
├── services/           # API services
│   └── api.js          # API client and endpoints
├── router/             # Vue Router configuration
│   └── index.js        # Route definitions
└── assets/             # Static assets
    └── main.css        # Tailwind CSS styles
```

## Authentication

The app uses token-based authentication:

1. **Login** - User credentials are sent to `/api/auth/login`
2. **Token Storage** - JWT token is stored in localStorage
3. **Auto-login** - Token is automatically included in API requests
4. **Route Protection** - Protected routes redirect to login if not authenticated
5. **Role-based Access** - Different features based on user role

### Demo Accounts

- **System Admin:** admin@schoolprotection.ug / password
- **Head Teacher:** sarah@kampalaprimary.ug / password  
- **Social Worker:** david@kampalaprimary.ug / password
- **Nurse:** grace@kampalaprimary.ug / password

## API Integration

The frontend communicates with the backend through organized API services:

```javascript
// Example usage
import { childrenAPI, authAPI } from '@/services/api'

// Login
const result = await authAPI.login({ email, password })

// Fetch children
const children = await childrenAPI.getAll({ search: 'John' })
```

## State Management

Uses Vue 3's Composition API for state management:

- **Authentication State** - User info, token, login status
- **Reactive Updates** - Automatic UI updates when state changes
- **Persistent Storage** - Auth state persisted in localStorage

## Styling

### Tailwind CSS
The app uses Tailwind CSS for styling with custom utility classes:

```css
.btn-primary     /* Primary button styles */
.form-input      /* Form input styles */
.card            /* Card container styles */
.table           /* Table styles */
```

### Responsive Design
- Mobile-first approach
- Responsive navigation
- Adaptive layouts for different screen sizes

## Development

### Adding New Pages
1. Create Vue component in appropriate `views/` subdirectory
2. Add route to `src/router/index.js`
3. Add navigation link to `src/components/Layout.vue`

### Adding API Endpoints
1. Add new API functions to `src/services/api.js`
2. Use in components with proper error handling

### Styling Guidelines
- Use Tailwind utility classes
- Follow existing component patterns
- Ensure responsive design
- Test on different screen sizes

## Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Create `.env.production` for production settings:
```
VITE_API_URL=https://your-api-domain.com/api
```

### Hosting Options
- **Netlify** - Automatic deployments from Git
- **Vercel** - Zero-config deployments
- **AWS S3 + CloudFront** - Scalable static hosting
- **Traditional Web Server** - Apache/Nginx

## Next Steps

1. **Complete Forms** - Implement child registration and assessment forms
2. **File Uploads** - Add document and photo upload functionality
3. **PDF Generation** - Client-side PDF generation for reports
4. **Real-time Features** - WebSocket integration for live updates
5. **Offline Support** - PWA features for offline functionality
6. **Testing** - Unit and integration tests
7. **Accessibility** - WCAG compliance improvements
8. **Internationalization** - Multi-language support

## Contributing

1. Follow Vue.js style guide
2. Use TypeScript for new components (optional)
3. Write tests for new features
4. Ensure responsive design
5. Follow existing code patterns

This frontend provides a solid foundation for building the complete School Child Protection Toolkit user interface according to your detailed specifications.
