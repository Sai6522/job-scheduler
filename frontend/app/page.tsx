'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import JobForm from './components/JobForm'
import JobTable from './components/JobTable'
import JobDetail from './components/JobDetail'

export interface Job {
  id: number
  taskName: string
  payload: string
  priority: string
  status: string
  createdAt: string
  updatedAt: string
}

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [filters, setFilters] = useState({ status: '', priority: '' })
  const [loading, setLoading] = useState(false)

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.priority) params.append('priority', filters.priority)
      
      const response = await axios.get(`/api/jobs?${params}`)
      setJobs(response.data)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const runJob = async (id: number) => {
    try {
      await axios.post(`/api/run-job/${id}`)
      fetchJobs() // Refresh jobs
    } catch (error) {
      console.error('Failed to run job:', error)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [filters])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Scheduler Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <JobForm onJobCreated={fetchJobs} />
            <JobTable 
              jobs={jobs} 
              loading={loading}
              filters={filters}
              onFiltersChange={setFilters}
              onRunJob={runJob}
              onSelectJob={setSelectedJob}
            />
          </div>
          
          <div>
            <JobDetail job={selectedJob} />
          </div>
        </div>
      </div>
    </div>
  )
}
