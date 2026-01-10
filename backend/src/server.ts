import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://sai6522.github.io'
      ].concat(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Create job
app.post('/api/jobs', async (req: Request, res: Response) => {
  try {
    const { taskName, payload, priority } = req.body;
    
    if (!taskName || !payload || !priority) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const job = await prisma.job.create({
      data: {
        taskName,
        payload: JSON.stringify(payload),
        priority,
        status: 'pending'
      }
    });

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// List jobs with filters
app.get('/api/jobs', async (req: Request, res: Response) => {
  try {
    const { status, priority } = req.query;
    
    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;

    const jobs = await prisma.job.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get job details
app.get('/api/jobs/:id', async (req: Request, res: Response) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Run job
app.post('/api/run-job/:id', async (req: Request, res: Response) => {
  try {
    const jobId = parseInt(req.params.id);
    
    // Validate job exists and is pending
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (!existingJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    if (existingJob.status !== 'pending') {
      return res.status(400).json({ error: 'Job is not in pending status' });
    }
    
    // Set status to running
    await prisma.job.update({
      where: { id: jobId },
      data: { status: 'running' }
    });

    res.json({ message: 'Job started' });

    // Simulate processing in background
    setTimeout(async () => {
      try {
        // Complete the job
        const completedJob = await prisma.job.update({
          where: { id: jobId },
          data: { status: 'completed' }
        });

        // Trigger webhook
        const webhookPayload = {
          jobId: completedJob.id,
          taskName: completedJob.taskName,
          priority: completedJob.priority,
          payload: JSON.parse(completedJob.payload),
          completedAt: new Date().toISOString()
        };

        if (process.env.WEBHOOK_URL) {
          try {
            await axios.post(process.env.WEBHOOK_URL, webhookPayload);
            console.log('Webhook sent successfully for job:', jobId);
          } catch (webhookError: any) {
            console.error('Webhook failed for job:', jobId, webhookError.message);
          }
        }
      } catch (error) {
        console.error('Failed to complete job:', jobId, error);
        // Set job status to failed on error
        await prisma.job.update({
          where: { id: jobId },
          data: { status: 'failed' }
        }).catch(() => {});
      }
    }, 3000);

  } catch (error) {
    res.status(500).json({ error: 'Failed to run job' });
  }
});

// Test webhook receiver
app.post('/api/webhook-test', (req: Request, res: Response) => {
  console.log('Webhook received:', req.body);
  res.json({ message: 'Webhook received', data: req.body });
});

// Seed database endpoint (for production)
app.post('/api/seed', async (req: Request, res: Response) => {
  try {
    console.log('Seeding production database...');
    
    // Clear existing data
    await prisma.job.deleteMany();

    const sampleJobs = [
      {
        taskName: 'Send Welcome Email',
        payload: JSON.stringify({
          email: 'john.doe@example.com',
          template: 'welcome',
          variables: { name: 'John Doe', company: 'Dotix Technologies' }
        }),
        priority: 'High',
        status: 'pending'
      },
      {
        taskName: 'Generate Monthly Report',
        payload: JSON.stringify({
          reportType: 'monthly',
          department: 'sales',
          format: 'pdf',
          month: 'January 2026'
        }),
        priority: 'Medium',
        status: 'completed'
      },
      {
        taskName: 'Sync User Data',
        payload: JSON.stringify({
          source: 'external_api',
          batchSize: 100,
          lastSync: '2026-01-09T00:00:00Z',
          endpoint: 'https://api.example.com/users'
        }),
        priority: 'Low',
        status: 'pending'
      },
      {
        taskName: 'Process Payment',
        payload: JSON.stringify({
          amount: 299.99,
          currency: 'USD',
          userId: 12345,
          paymentMethod: 'credit_card'
        }),
        priority: 'High',
        status: 'running'
      },
      {
        taskName: 'Backup Database',
        payload: JSON.stringify({
          database: 'production',
          destination: 's3://backups/db',
          compression: true,
          retention: '30 days'
        }),
        priority: 'Medium',
        status: 'pending'
      },
      {
        taskName: 'Send Newsletter',
        payload: JSON.stringify({
          template: 'weekly_newsletter',
          subscribers: 15420,
          subject: 'Weekly Tech Updates',
          scheduledFor: '2026-01-12T09:00:00Z'
        }),
        priority: 'Low',
        status: 'completed'
      }
    ];

    for (const job of sampleJobs) {
      await prisma.job.create({ data: job });
    }

    res.json({ 
      message: 'Database seeded successfully', 
      count: sampleJobs.length 
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
