
import React from 'react';
import { SAMPLE_TASKS, SAMPLE_KPI_DATA, AcademicCapIcon, ClipboardListIcon, ChatBubbleIcon } from '../constants';
import type { Task, KpiData } from '../types';
import { TaskStatus } from '../types'; // Corrected import for TaskStatus

// Note: Top-level Recharts destructuring has been removed from here.
// It will be accessed via window.Recharts inside the KpiWidget component.

const WelcomeWidget: React.FC = () => (
  <div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-6 rounded-lg shadow-lg text-white">
    <h2 className="text-2xl font-semibold">Welcome back, Employee!</h2>
    <p className="mt-2">Here's a quick overview of your workspace. Let's make today productive!</p>
  </div>
);

const MyTasksWidget: React.FC = () => {
  const pendingTasks = SAMPLE_TASKS.filter(task => task.status !== TaskStatus.DONE).slice(0, 3);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-slate-700 mb-4">My Pending Tasks</h3>
      {pendingTasks.length > 0 ? (
        <ul className="space-y-3">
          {pendingTasks.map((task: Task) => (
            <li key={task.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors">
              <div>
                <p className="font-medium text-slate-800">{task.title}</p>
                <p className="text-sm text-slate-500">Due: {task.dueDate || 'N/A'} | Status: {task.status}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                task.status === TaskStatus.IN_PROGRESS ? 'bg-yellow-100 text-yellow-700' :
                task.status === TaskStatus.REVIEW ? 'bg-purple-100 text-purple-700' :
                'bg-sky-100 text-sky-700' // Backlog
              }`}>
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">No pending tasks. Great job!</p>
      )}
      <button className="mt-4 text-sm text-accent hover:underline">View all tasks</button>
    </div>
  );
};

const KpiWidget: React.FC<{ title: string; data: KpiData[] }> = ({ title, data }) => {
  // Access Recharts from window object when component renders
  // @ts-ignore Recharts is loaded from CDN and might not be available at module load time
  const RechartsLib = window.Recharts;

  if (!RechartsLib) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center" style={{ height: 300 }}>
        <p className="text-slate-500">Loading chart library...</p>
      </div>
    );
  }

  // Destructure necessary components from the RechartsLib
  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } = RechartsLib;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Standard Recharts colors

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-slate-700 mb-4">{title}</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const QuickAccessWidget: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-slate-700 mb-4">Quick Access</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button className="flex items-center space-x-3 p-4 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors">
        <ClipboardListIcon className="w-8 h-8 text-sky-600" />
        <div>
          <p className="font-semibold text-sky-700">New Task</p>
          <p className="text-sm text-slate-500">Quickly add a new task</p>
        </div>
      </button>
      <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
        <ChatBubbleIcon className="w-8 h-8 text-green-600" />
         <div>
          <p className="font-semibold text-green-700">Start Chat</p>
          <p className="text-sm text-slate-500">Open communication channels</p>
        </div>
      </button>
      <button className="flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
        <AcademicCapIcon className="w-8 h-8 text-indigo-600" />
         <div>
          <p className="font-semibold text-indigo-700">Training Portal</p>
          <p className="text-sm text-slate-500">Access learning materials</p>
        </div>
      </button>
    </div>
  </div>
);


const DashboardPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <WelcomeWidget />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MyTasksWidget />
        <KpiWidget title="Quarterly Performance" data={SAMPLE_KPI_DATA} />
      </div>
      <QuickAccessWidget />
      {/* Add more widgets like Calendar, Notifications Summary here */}
    </div>
  );
};

export default DashboardPage;
