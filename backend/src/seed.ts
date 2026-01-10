import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding database...');

  const sampleJobs = [
    {
      taskName: 'Send Welcome Email',
      payload: JSON.stringify({
        email: 'user@example.com',
        template: 'welcome',
        variables: { name: 'John Doe' }
      }),
      priority: 'High',
      status: 'pending'
    },
    {
      taskName: 'Generate Monthly Report',
      payload: JSON.stringify({
        reportType: 'monthly',
        department: 'sales',
        format: 'pdf'
      }),
      priority: 'Medium',
      status: 'completed'
    },
    {
      taskName: 'Sync User Data',
      payload: JSON.stringify({
        source: 'external_api',
        batchSize: 100,
        lastSync: '2026-01-09T00:00:00Z'
      }),
      priority: 'Low',
      status: 'pending'
    }
  ];

  for (const job of sampleJobs) {
    await prisma.job.create({ data: job });
  }

  console.log('Database seeded successfully!');
}

seed()
  .catch((e: any) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
