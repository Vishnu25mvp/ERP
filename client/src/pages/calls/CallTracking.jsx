import React, { useState } from 'react';
import {
  Phone,
  PhoneOff,
  Clock,
  TrendingUp,
  Users,
  Calendar,
  Search,
  Filter,
  Download,
  Play,
  MoreVertical,
} from 'lucide-react';

const CallTracking = () => {
  const [calls] = useState([
    {
      id: 1,
      type: 'inbound',
      callerNumber: '+91 9876543210',
      receiverNumber: '+91 9999999999',
      agent: 'Amit Singh',
      status: 'answered',
      duration: '12:45',
      timestamp: '2024-01-25 14:30',
      leadName: 'Rajesh Kumar',
      recordingUrl: 'https://example.com/recording/1.wav',
    },
    {
      id: 2,
      type: 'outbound',
      callerNumber: '+91 9999999999',
      receiverNumber: '+91 9876543211',
      agent: 'Neha Gupta',
      status: 'missed',
      duration: '0:00',
      timestamp: '2024-01-25 13:15',
      leadName: 'Priya Sharma',
      recordingUrl: null,
    },
    {
      id: 3,
      type: 'inbound',
      callerNumber: '+91 9876543212',
      receiverNumber: '+91 9999999999',
      agent: 'Rahul Singh',
      status: 'answered',
      duration: '5:30',
      timestamp: '2024-01-25 12:00',
      leadName: 'Vikram Patel',
      recordingUrl: 'https://example.com/recording/3.wav',
    },
  ]);

  const [selectedCall, setSelectedCall] = useState(null);
  const [callsView, setCallsView] = useState('all');

  const statusColors = {
    answered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    missed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    busy: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    rejected: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };

  const typeColors = {
    inbound: 'text-green-600',
    outbound: 'text-blue-600',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Call Tracking</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor all inbound and outbound calls</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Calls</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">247</p>
            </div>
            <Phone size={32} className="text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Answered</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">198</p>
            </div>
            <Phone size={32} className="text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Missed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">32</p>
            </div>
            <PhoneOff size={32} className="text-red-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">8:42</p>
            </div>
            <Clock size={32} className="text-yellow-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* View Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setCallsView('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                callsView === 'all'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              All Calls
            </button>
            <button
              onClick={() => setCallsView('inbound')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                callsView === 'inbound'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              Inbound
            </button>
            <button
              onClick={() => setCallsView('outbound')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                callsView === 'outbound'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              Outbound
            </button>
          </div>
        </div>
      </div>

      {/* Calls Table */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Caller</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Receiver</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Agent</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((call) => (
                <tr key={call.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4">
                    <span className={`text-lg ${typeColors[call.type]}`}>
                      {call.type === 'inbound' ? '📞' : '📤'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{call.callerNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{call.receiverNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{call.agent}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[call.status]}`}>
                      {call.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-semibold">{call.duration}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{call.timestamp}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedCall(call)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call Detail Modal */}
      {selectedCall && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Call Details</h2>
              <button onClick={() => setSelectedCall(null)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Call Type</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">{selectedCall.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">{selectedCall.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedCall.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Agent</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{selectedCall.agent}</p>
                </div>
              </div>

              {selectedCall.recordingUrl && (
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Recording</p>
                  <audio controls className="w-full">
                    <source src={selectedCall.recordingUrl} type="audio/wav" />
                  </audio>
                </div>
              )}

              <div className="flex gap-3">
                <button className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition">
                  Link to Lead
                </button>
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition">
                  View Transcription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallTracking;
