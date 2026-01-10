'use client'

import { useState } from 'react'
import axios from 'axios'

interface JobFormProps {
  onJobCreated: () => void
}

export default function JobForm({ onJobCreated }: JobFormProps) {
  const [formData, setFormData] = useState({
    taskName: '',
    payload: '{}',
    priority: 'Medium'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const payload = JSON.parse(formData.payload)
      
      await axios.post('/api/jobs', {
        taskName: formData.taskName,
        payload,
        priority: formData.priority
      })
      
      setFormData({ taskName: '', payload: '{}', priority: 'Medium' })
      onJobCreated()
    } catch (error) {
      console.error('Failed to create job:', error)
      alert('Failed to create job. Please check your JSON payload.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Create New Job</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Name
          </label>
          <input
            type="text"
            value={formData.taskName}
            onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payload (JSON)
          </label>
          <textarea
            value={formData.payload}
            onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder='{"key": "value"}'
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Job'}
        </button>
      </form>
    </div>
  )
}
