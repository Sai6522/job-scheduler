import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Job Scheduler Dashboard',
  description: 'Manage and track background jobs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
