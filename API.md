# API Documentation

## Base URL
```
http://localhost:3001/api
```

## Endpoints

### 1. Create Job
**POST** `/jobs`

**Request Body:**
```json
{
  "taskName": "Send Email",
  "payload": {
    "email": "user@example.com",
    "template": "welcome"
  },
  "priority": "High"
}
```

**Response:**
```json
{
  "id": 1,
  "taskName": "Send Email",
  "payload": "{\"email\":\"user@example.com\",\"template\":\"welcome\"}",
  "priority": "High",
  "status": "pending",
  "createdAt": "2026-01-10T12:30:00.000Z",
  "updatedAt": "2026-01-10T12:30:00.000Z"
}
```

### 2. List Jobs
**GET** `/jobs`

**Query Parameters:**
- `status` (optional): Filter by status (pending, running, completed)
- `priority` (optional): Filter by priority (Low, Medium, High)

**Response:**
```json
[
  {
    "id": 1,
    "taskName": "Send Email",
    "payload": "{\"email\":\"user@example.com\"}",
    "priority": "High",
    "status": "pending",
    "createdAt": "2026-01-10T12:30:00.000Z",
    "updatedAt": "2026-01-10T12:30:00.000Z"
  }
]
```

### 3. Get Job Details
**GET** `/jobs/:id`

**Response:**
```json
{
  "id": 1,
  "taskName": "Send Email",
  "payload": "{\"email\":\"user@example.com\"}",
  "priority": "High",
  "status": "pending",
  "createdAt": "2026-01-10T12:30:00.000Z",
  "updatedAt": "2026-01-10T12:30:00.000Z"
}
```

### 4. Run Job
**POST** `/run-job/:id`

**Response:**
```json
{
  "message": "Job started"
}
```

**Behavior:**
1. Sets job status to "running"
2. Simulates 3-second processing
3. Sets job status to "completed"
4. Sends webhook notification

### 5. Test Webhook
**POST** `/webhook-test`

**Request Body:** Any JSON payload

**Response:**
```json
{
  "message": "Webhook received",
  "data": { ... }
}
```

## Webhook Payload

When a job completes, the system sends this payload to the configured webhook URL:

```json
{
  "jobId": 1,
  "taskName": "Send Email",
  "priority": "High",
  "payload": {
    "email": "user@example.com",
    "template": "welcome"
  },
  "completedAt": "2026-01-10T12:33:00.000Z"
}
```

## Error Responses

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request (missing fields, invalid JSON)
- `404` - Not Found (job doesn't exist)
- `500` - Internal Server Error
