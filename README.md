# Job Scheduler & Automation System

A full-stack web application for managing and executing background jobs with webhook notifications.

## Tech Stack

**Frontend:**
- Next.js 14 with TypeScript
- Tailwind CSS
- Shadcn/ui components

**Backend:**
- Node.js with Express
- TypeScript
- Prisma ORM

**Database:**
- SQLite (for simplicity)

## Project Structure

```
job-scheduler/
├── README.md
├── setup.sh
├── .gitignore
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   ├── .env
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── server.ts
│       └── seed.ts
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── next.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── Dockerfile
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── globals.css
    │   └── components/
    │       ├── JobForm.tsx
    │       ├── JobTable.tsx
    │       └── JobDetail.tsx
```

## Database Schema

```sql
Table: jobs
- id (INTEGER PRIMARY KEY)
- taskName (TEXT)
- payload (TEXT) -- JSON string
- priority (TEXT) -- Low/Medium/High
- status (TEXT) -- pending/running/completed
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

## API Endpoints

- `POST /api/jobs` - Create new job
- `GET /api/jobs` - List all jobs with filters
- `GET /api/jobs/:id` - Get job details
- `POST /api/run-job/:id` - Execute job
- `POST /api/webhook-test` - Test webhook receiver

## Setup Instructions

1. **Clone the repository:**
```bash
git clone <repo-url>
cd job-scheduler
```

2. **Install dependencies:**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. **Setup environment variables:**
```bash
# backend/.env
DATABASE_URL="file:./dev.db"
WEBHOOK_URL="https://webhook.site/your-unique-id"
PORT=3001
```

4. **Initialize database:**
```bash
cd backend
npx prisma generate
npx prisma db push
```

5. **Run the application:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

6. **Seed sample data (optional):**
```bash
cd backend
npm run seed
```

7. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Webhook Integration

When a job completes, the system sends a POST request to the configured webhook URL with:
```json
{
  "jobId": 1,
  "taskName": "Send Email",
  "priority": "High",
  "payload": {...},
  "completedAt": "2026-01-10T12:30:00Z"
}
```

## AI Usage Documentation

**AI Tools Used:**
- Kiro CLI (AWS AI Assistant)
- Model: Claude 3.5 Sonnet

**AI Assistance Areas:**
1. **Project Structure**: Generated initial folder structure and configuration files
2. **Backend Logic**: Helped with Express server setup, Prisma schema, and API endpoints
3. **Frontend Components**: Created React components with Shadcn/ui and Tailwind styling
4. **Database Design**: Designed the jobs table schema and Prisma configuration
5. **Documentation**: Generated this README and setup instructions

**Key Prompts Used:**
- "Create a job scheduler system with Next.js frontend and Express backend"
- "Design a database schema for job management with status tracking"
- "Implement webhook integration for job completion notifications"
- "Create a dashboard UI with job listing, filtering, and execution controls"

**What AI Did NOT Help With:**
- Business logic decisions and architecture choices
- Error handling strategies and implementation details
- Production deployment considerations and security patterns
- Database schema optimization and indexing decisions
- UI/UX design decisions and user flow planning

## Features Implemented

✅ Job creation with taskName, payload, priority
✅ Job status tracking (pending → running → completed)
✅ Dashboard with job listing and filters
✅ Job execution simulation with 3-second delay
✅ Webhook notifications on job completion
✅ Responsive UI with Tailwind CSS
✅ TypeScript for type safety
✅ Clean project structure
✅ Error handling and validation

## Development Notes

- Used minimal dependencies to keep the project lightweight
- Implemented proper error handling for API endpoints
- Added input validation for job creation
- Used Prisma for type-safe database operations
- Followed REST API conventions
- Implemented proper status transitions for jobs
