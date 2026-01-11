# Job Scheduler & Automation System

A full-stack web application for managing and executing background jobs with webhook notifications.

![Job Scheduler Dashboard](https://via.placeholder.com/800x400/1f2937/ffffff?text=Job+Scheduler+Dashboard)

## 🚀 Tech Stack

**Frontend:**
- Next.js 14 with TypeScript
- Tailwind CSS for styling
- Shadcn/ui components
- Axios for API calls
- Lucide React for icons

**Backend:**
- Node.js with Express
- TypeScript
- Prisma ORM
- SQLite database
- Axios for webhook calls
- CORS for cross-origin requests

**Development Tools:**
- TSX for TypeScript execution
- Docker for containerization
- Git for version control

## 📁 Repository Structure

```
job-scheduler/
├── README.md
├── setup.sh
├── .gitignore
├── docker-compose.yml
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
    └── app/
        ├── layout.tsx
        ├── page.tsx
        ├── globals.css
        └── components/
            ├── JobForm.tsx
            ├── JobTable.tsx
            └── JobDetail.tsx
```

## 🗄️ Database Schema & ER Diagram

```sql
Table: jobs
┌─────────────┬──────────────┬─────────────────────────────────┐
│ Field       │ Type         │ Description                     │
├─────────────┼──────────────┼─────────────────────────────────┤
│ id          │ INTEGER      │ Primary Key (Auto-increment)    │
│ taskName    │ TEXT         │ Name of the job task            │
│ payload     │ TEXT         │ JSON string with job data       │
│ priority    │ TEXT         │ Low/Medium/High                 │
│ status      │ TEXT         │ pending/running/completed       │
│ createdAt   │ DATETIME     │ Job creation timestamp          │
│ updatedAt   │ DATETIME     │ Last update timestamp           │
└─────────────┴──────────────┴─────────────────────────────────┘
```

**Entity Relationship:**
- Single entity system with job lifecycle management
- Status transitions: `pending` → `running` → `completed`
- Timestamps for audit trail and sorting

## 🏗️ Architecture Explanation

### **Frontend Architecture**
- **Next.js App Router**: Modern React framework with server-side rendering
- **Component Structure**: Modular components (JobForm, JobTable, JobDetail)
- **State Management**: React hooks for local state management
- **API Integration**: Axios for HTTP requests to backend
- **Styling**: Tailwind CSS with Shadcn/ui for consistent design system

### **Backend Architecture**
- **Express Server**: RESTful API with TypeScript
- **Prisma ORM**: Type-safe database operations
- **Middleware Stack**: CORS, JSON parsing, request logging
- **Error Handling**: Centralized error responses
- **Async Processing**: Job execution simulation with status updates

### **Data Flow**
1. User creates job via frontend form
2. Frontend sends POST request to backend API
3. Backend validates and stores job in SQLite database
4. User triggers job execution from dashboard
5. Backend updates job status and simulates processing
6. Upon completion, webhook notification is sent
7. Frontend polls for status updates and displays results

## 📡 API Documentation

### **Base URL**: `http://localhost:3001/api`

#### **Create Job**
```http
POST /api/jobs
Content-Type: application/json

{
  "taskName": "Send Email",
  "payload": "{\"email\": \"user@example.com\", \"subject\": \"Hello\"}",
  "priority": "High"
}

Response: 201 Created
{
  "id": 1,
  "taskName": "Send Email",
  "payload": "{\"email\": \"user@example.com\", \"subject\": \"Hello\"}",
  "priority": "High",
  "status": "pending",
  "createdAt": "2026-01-11T05:00:00.000Z",
  "updatedAt": "2026-01-11T05:00:00.000Z"
}
```

#### **List Jobs**
```http
GET /api/jobs?status=pending&priority=High

Response: 200 OK
[
  {
    "id": 1,
    "taskName": "Send Email",
    "priority": "High",
    "status": "pending",
    "createdAt": "2026-01-11T05:00:00.000Z"
  }
]
```

#### **Get Job Details**
```http
GET /api/jobs/1

Response: 200 OK
{
  "id": 1,
  "taskName": "Send Email",
  "payload": "{\"email\": \"user@example.com\"}",
  "priority": "High",
  "status": "completed",
  "createdAt": "2026-01-11T05:00:00.000Z",
  "updatedAt": "2026-01-11T05:03:00.000Z"
}
```

#### **Execute Job**
```http
POST /api/run-job/1

Response: 200 OK
{
  "message": "Job started successfully",
  "jobId": 1,
  "status": "running"
}
```

#### **Webhook Test**
```http
POST /api/webhook-test
Content-Type: application/json

{
  "jobId": 1,
  "taskName": "Send Email",
  "status": "completed"
}

Response: 200 OK
{
  "message": "Webhook received successfully"
}
```

## 🔗 Webhook Integration

### **How Webhooks Work**

1. **Configuration**: Set `WEBHOOK_URL` in backend environment variables
2. **Trigger**: Webhook fires automatically when job status changes to "completed"
3. **Payload**: POST request sent with job completion data
4. **Retry Logic**: Basic error handling for failed webhook calls

### **Webhook Payload Structure**
```json
{
  "jobId": 1,
  "taskName": "Send Email Notification",
  "priority": "High",
  "payload": {
    "email": "user@example.com",
    "subject": "Task Completed"
  },
  "completedAt": "2026-01-11T05:03:15.234Z",
  "status": "completed"
}
```

### **Testing Webhooks**
- Use [webhook.site](https://webhook.site) to generate test URLs
- Configure the URL in your `.env` file
- Execute jobs and monitor webhook deliveries
- Built-in `/api/webhook-test` endpoint for testing

## 🛠️ Setup Instructions

### **Prerequisites**
- Node.js 18+ installed
- Git installed
- Code editor (VS Code recommended)

### **Local Development Setup**

1. **Clone Repository**
```bash
git clone https://github.com/Sai6522/job-scheduler.git
cd job-scheduler
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npx prisma generate
npx prisma db push
npm run seed  # Optional: Add sample data
npm run dev
```

3. **Frontend Setup** (New Terminal)
```bash
cd frontend
npm install
npm run dev
```

4. **Environment Configuration**
```bash
# backend/.env
DATABASE_URL="file:./dev.db"
WEBHOOK_URL="https://webhook.site/your-unique-id"
PORT=3001
NODE_ENV=development
```

5. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Health Check: http://localhost:3001/

### **Docker Setup** (Alternative)
```bash
docker-compose up --build
```

## 🤖 AI Usage Documentation

### **AI Tools Used**
- **Primary Tool**: Kiro CLI (AWS AI Assistant)
- **Model**: Claude 3.5 Sonnet
- **Usage Period**: January 10-11, 2026
- **Total Sessions**: 15+ interactions

### **Exact Prompts Used**

#### **Initial Project Setup**
```
"Create a job scheduler system with Next.js frontend and Express backend. 
Include TypeScript, Tailwind CSS, and Prisma ORM. The system should manage 
background jobs with status tracking and webhook notifications."
```

#### **Database Design**
```
"Design a database schema for job management with status tracking. 
Include fields for task name, payload, priority levels, and timestamps. 
Use Prisma with SQLite for simplicity."
```

#### **Frontend Components**
```
"Create React components for job management dashboard: JobForm for creating 
jobs, JobTable for listing with filters, and JobDetail for viewing individual 
jobs. Use Shadcn/ui components and Tailwind CSS."
```

#### **API Implementation**
```
"Implement REST API endpoints for job CRUD operations, job execution, and 
webhook integration. Include proper error handling and CORS configuration."
```

#### **Webhook Integration**
```
"Add webhook functionality that sends POST requests when jobs complete. 
Include job details in the payload and handle webhook failures gracefully."
```

### **AI Assistance Areas**

#### **✅ What AI Helped With:**
1. **Project Structure**: Generated complete folder structure and configuration files
2. **Backend Logic**: Express server setup, API endpoints, Prisma schema design
3. **Frontend Components**: React components with TypeScript interfaces
4. **Database Design**: Schema definition and Prisma configuration
5. **Documentation**: README structure and API documentation
6. **Configuration**: Docker files, package.json scripts, environment setup
7. **Error Handling**: Basic error responses and validation logic

#### **❌ What AI Did NOT Help With:**
1. **Architecture Decisions**: Chose SQLite over PostgreSQL for simplicity
2. **UI/UX Design**: Color scheme, layout decisions, user flow planning
3. **Business Logic**: Job priority handling, status transition rules
4. **Security Patterns**: Input validation strategies, authentication decisions
5. **Performance Optimization**: Database indexing, query optimization
6. **Testing Strategy**: Unit test structure and testing approach
7. **Deployment Strategy**: Chose Render over other platforms

### **AI Effectiveness Assessment**
- **Strengths**: Rapid prototyping, boilerplate generation, documentation
- **Limitations**: Required manual refinement for production readiness
- **Time Saved**: Approximately 60% faster initial development
- **Quality**: Good starting point, required human oversight for best practices

## ✨ Features Implemented

### **Core Features**
- ✅ Job creation with custom task names and JSON payloads
- ✅ Priority levels (Low, Medium, High) with visual indicators
- ✅ Status tracking (pending → running → completed)
- ✅ Real-time dashboard with job listing and filtering
- ✅ Job execution simulation with 3-second processing delay
- ✅ Webhook notifications on job completion
- ✅ Responsive design for desktop and mobile devices

### **Technical Features**
- ✅ TypeScript for type safety across frontend and backend
- ✅ Prisma ORM for type-safe database operations
- ✅ RESTful API design with proper HTTP status codes
- ✅ CORS configuration for cross-origin requests
- ✅ Environment variable management
- ✅ Error handling and validation
- ✅ Request logging and debugging support
- ✅ Docker containerization support

### **UI/UX Features**
- ✅ Clean, modern interface with Tailwind CSS
- ✅ Shadcn/ui components for consistent design
- ✅ Loading states and user feedback
- ✅ Form validation with error messages
- ✅ Responsive tables with sorting and filtering
- ✅ Modal dialogs for job details
- ✅ Status badges with color coding

## 🔧 Production Readiness

### **Environment Management**
- Separate development and production configurations
- Environment variable validation
- Database URL handling for different environments
- Port configuration for deployment platforms

### **Security Measures**
- Input validation on API endpoints
- CORS configuration for allowed origins
- SQL injection prevention through Prisma ORM
- Environment variable protection

### **Error Handling**
- Centralized error responses
- Request logging for debugging
- Database connection error handling
- Webhook failure handling

### **Code Quality**
- TypeScript for compile-time error checking
- Consistent naming conventions
- Modular component structure
- Clean separation of concerns
- Comprehensive error messages

## 🚀 Deployment

This application is configured for deployment on Render with automatic database setup and environment variable management. See deployment documentation for detailed instructions.

**Live Demo**: [Coming Soon]

## 📝 Development Notes

- **Database**: SQLite chosen for simplicity and portability
- **State Management**: React hooks sufficient for current scope
- **API Design**: RESTful conventions with proper HTTP methods
- **Component Structure**: Modular design for maintainability
- **Styling**: Utility-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript coverage for better DX

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
