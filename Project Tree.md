```bash

eyra/
|
├── backend/              # Server-side app (API, database, business logic)
│   ├── config/           # Configuration (DB connection, env setup)
│   ├── controllers/      # Request handlers (API logic)
│   ├── models/           # Database schemas and data models
│   ├── routes/           # API endpoints
│   ├── middleware/       # Custom middleware (auth, validation)
│   ├── utils/            # Helper functions (tokens, analytics)
│   └── services/         # Core logic & external integrations (AI, APIs)
|
│____________________________________________________________________________________
|____________________________________________________________________________________
|
|
├── frontend/             # Client-side app (React UI)
│   ├── public/           # Static public assets (icons, favicon)
│   └── src/              # Main frontend source code
│       ├── components/   # Reusable UI and feature components
│       │   ├── ui/       # Base UI components (design system)
│       │   ├── Account/  # User account/profile components
│       │   ├── Chat/     # Chat and conversation components
│       │   ├── Layout/   # Shared layout (navbar, footer)
│       │   └── Feedback/ # Loading, error, and fallback UI
│       │
│       ├── pages/        # Route-based pages (mapped to URLs)
│       │   └── tests/    # Assessment/test-related pages
│       │
│       ├── hooks/        # Custom React hooks
│       ├── lib/          # Core utility/helper functions
│       ├── contexts/     # Global state (React Context)
│       ├── utils/        # App utilities (i18n, storage)
│       ├── assets/       # Images and static assets
│       └── types/        # Type definitions (future TS support)
│
├── docs/                 # Project documentation and guides
│
├── scripts/              # Setup, run, or automation scripts
│
└── config/               # Root-level configuration (shared settings)

```