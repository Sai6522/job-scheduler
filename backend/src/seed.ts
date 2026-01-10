import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding database...');

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

  console.log(`Database seeded successfully with ${sampleJobs.length} jobs!`);
}

seed()
  .catch((e: any) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
