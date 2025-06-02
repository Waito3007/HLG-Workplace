
import React, { useState } from 'react';
import { SAMPLE_TASKS, PlusCircleIcon } from '../constants';
import type { Task } from '../types';
import { TaskStatus } from '../types';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer mb-3 border border-slate-200">
      <h4 className="font-semibold text-slate-800">{task.title}</h4>
      {task.description && <p className="text-sm text-slate-600 mt-1 truncate">{task.description}</p>}
      <div className="mt-3 flex justify-between items-center text-xs text-slate-500">
        <span>Due: {task.dueDate || 'N/A'}</span>
        {task.assignee && <span>@{task.assignee}</span>}
      </div>
    </div>
  );
};

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, tasks, status }) => {
  const columnTasks = tasks.filter(task => task.status === status);
  let bgColor = 'bg-slate-200';
  if (status === TaskStatus.IN_PROGRESS) bgColor = 'bg-yellow-200';
  else if (status === TaskStatus.REVIEW) bgColor = 'bg-purple-200';
  else if (status === TaskStatus.DONE) bgColor = 'bg-green-200';
  
  return (
    <div className="flex-1 min-w-[280px] bg-slate-100 p-4 rounded-lg shadow">
      <h3 className={`text-lg font-semibold mb-4 p-2 rounded text-center text-slate-700 ${bgColor}`}>{title} ({columnTasks.length})</h3>
      <div className="space-y-3 h-[calc(100vh-250px)] overflow-y-auto pr-1">
        {columnTasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

const TaskManagementPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);
  // Basic modal state, actual implementation would be more robust
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');


  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: String(Date.now()),
      title: newTaskTitle,
      status: TaskStatus.BACKLOG,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskTitle('');
    setIsModalOpen(false);
  };


  const taskStatuses: TaskStatus[] = [TaskStatus.BACKLOG, TaskStatus.IN_PROGRESS, TaskStatus.REVIEW, TaskStatus.DONE];

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-slate-800">Task Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-accent text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <PlusCircleIcon className="w-5 h-5" />
          <span>New Task</span>
        </button>
      </div>
      <div className="flex-grow flex space-x-4 overflow-x-auto pb-4">
        {taskStatuses.map(status => (
          <KanbanColumn key={status} title={status} tasks={tasks} status={status} />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title"
              className="w-full p-2 border border-slate-300 rounded-md mb-4 focus:ring-accent focus:border-accent"
            />
            {/* Add more fields like description, assignee, due date here */}
            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
              <button onClick={handleAddTask} className="px-4 py-2 bg-accent text-white rounded hover:bg-blue-700">Add Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagementPage;
