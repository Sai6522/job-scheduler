'use client'

import { Job } from '../page'

interface JobDetailProps {
  job: Job | null
}

export default function JobDetail({ job }: JobDetailProps) {
  if (!job) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Job Details</h2>
        <p className="text-gray-500">Select a job to view details</p>
      </div>
    )
  }

  let parsedPayload
  try {
    parsedPayload = JSON.parse(job.payload)
  } catch {
    parsedPayload = job.payload
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Job Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <p className="text-gray-900">{job.id}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Task Name</label>
          <p className="text-gray-900">{job.taskName}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <p className="text-gray-900">{job.priority}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <p className="text-gray-900">{job.status}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Created At</label>
          <p className="text-gray-900">{new Date(job.createdAt).toLocaleString()}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Updated At</label>
          <p className="text-gray-900">{new Date(job.updatedAt).toLocaleString()}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Payload</label>
          <pre className="mt-1 p-3 bg-gray-100 rounded-md text-sm overflow-auto">
            {JSON.stringify(parsedPayload, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
