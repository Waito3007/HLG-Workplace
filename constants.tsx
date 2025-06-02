
import React from 'react';
import { NavItem, Task, DocumentItem, ChatMessage, TrainingCourse, FaqItem, KpiData, TaskStatus } from './types'; // Added TaskStatus here
// Explicitly export TaskStatus from types.ts
export { TaskStatus } from './types';

// Heroicons (sourced from heroicons.com, MIT License)
// Using them as inline SVG components

export const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.543-3.091A9.117 9.117 0 0112.25 12.75H8.25A2.25 2.25 0 016 10.5V8.25a2.25 2.25 0 012.25-2.25h2.25m8.25 2.25-2.25 2.25m0 0l-2.25 2.25M13.5 11.25V15.75m3.75-4.5V15.75m-3.75-4.5H18m-4.5 4.5h.008v.008H13.5v-.008zm0 0H9.75m0 0h3.75" />
  </svg>
);

export const ClipboardListIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const DocumentTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const AcademicCapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path d="M12 14.25L12 18.75M12 14.25A2.231 2.231 0 0114.25 12A2.231 2.231 0 0116.5 14.25M12 14.25A2.231 2.231 0 009.75 12A2.231 2.231 0 007.5 14.25M12 14.25L12 18.75M12 18.75C12 18.75 11.115 21 8.25 21C5.385 21 4.5 18.75 4.5 18.75M12 18.75C12 18.75 12.885 21 15.75 21C18.615 21 19.5 18.75 19.5 18.75M12 2.25L4.5 6L12 9.75L19.5 6L12 2.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25L4.5 6L12 9.75L19.5 6L12 2.25Z" />
  </svg>
);

export const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9m-9 6h9m-9 6h9M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 00-3 0M3.75 6H7.5m3 12h9m-9-6h9m-9-6h9M3.75 12H7.5m3 6h9M3.75 18H7.5M12 3v18" />
  </svg>
);

export const FolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

export const FileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const PaperAirplaneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const PlusCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);


export const NAV_ITEMS: NavItem[] = [
  { path: '/', name: 'Dashboard', icon: <HomeIcon className="w-5 h-5" /> },
  { path: '/communication', name: 'Communication', icon: <ChatBubbleIcon className="w-5 h-5" /> },
  { path: '/tasks', name: 'Task Management', icon: <ClipboardListIcon className="w-5 h-5" /> },
  { path: '/documents', name: 'Documents', icon: <DocumentTextIcon className="w-5 h-5" /> },
  { path: '/training', name: 'Training & Support', icon: <AcademicCapIcon className="w-5 h-5" /> },
  { path: '/settings', name: 'Settings', icon: <CogIcon className="w-5 h-5" /> },
];

export const SAMPLE_TASKS: Task[] = [
  { id: '1', title: 'Draft Q3 Report', status: TaskStatus.IN_PROGRESS, dueDate: '2024-08-15', assignee: 'Alice' },
  { id: '2', title: 'Review Marketing Proposal', status: TaskStatus.BACKLOG, dueDate: '2024-08-10', assignee: 'Bob' },
  { id: '3', title: 'Finalize Budget', status: TaskStatus.REVIEW, dueDate: '2024-08-05', assignee: 'Charlie' },
  { id: '4', title: 'Client Follow-up Call', status: TaskStatus.DONE, assignee: 'Alice' },
  { id: '5', title: 'Onboard New Intern', status: TaskStatus.IN_PROGRESS, dueDate: '2024-08-20', assignee: 'David' },
];

export const SAMPLE_DOCUMENTS: DocumentItem[] = [
  { id: '1', name: 'Project Alpha', type: 'folder', icon: <FolderIcon className="w-5 h-5 text-yellow-500" /> },
  { id: '2', name: 'Q2 Financials.xlsx', type: 'file', size: '2.3MB', lastModified: '2024-07-28', icon: <FileIcon className="w-5 h-5 text-green-500" /> },
  { id: '3', name: 'Marketing Strategy.docx', type: 'file', size: '1.1MB', lastModified: '2024-07-25', icon: <FileIcon className="w-5 h-5 text-blue-500" /> },
  { id: '4', name: 'Archived Projects', type: 'folder', icon: <FolderIcon className="w-5 h-5 text-yellow-500" /> },
  { id: '5', name: 'Employee Handbook.pdf', type: 'file', size: '500KB', lastModified: '2024-06-10', icon: <FileIcon className="w-5 h-5 text-red-500" /> },
];

export const SAMPLE_CHAT_MESSAGES: ChatMessage[] = [
  { id: '1', sender: 'Alice', text: 'Hi team, meeting at 2 PM today.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: '2', sender: 'Bob', text: 'Got it, thanks!', timestamp: new Date(Date.now() - 1000 * 60 * 58) },
  { id: '3', sender: 'You', text: 'Will be there.', timestamp: new Date(Date.now() - 1000 * 60 * 55) },
];

export const SAMPLE_TRAINING_COURSES: TrainingCourse[] = [
  { id: '1', title: 'Introduction to HLG Systems', description: 'Learn the basics of our internal tools.', duration: '1 hour', imageUrl: 'https://picsum.photos/seed/course1/300/200' },
  { id: '2', title: 'Advanced Task Management', description: 'Master project tracking and collaboration.', duration: '2 hours', imageUrl: 'https://picsum.photos/seed/course2/300/200' },
  { id: '3', title: 'Effective Communication Strategies', description: 'Improve your internal and external comms.', duration: '1.5 hours', imageUrl: 'https://picsum.photos/seed/course3/300/200' },
];

export const SAMPLE_FAQ: FaqItem[] = [
  { id: '1', question: 'How do I reset my password?', answer: 'You can reset your password by clicking the "Forgot Password" link on the login page or contacting IT support.' },
  { id: '2', question: 'Where can I find company holidays?', answer: 'Company holidays are listed in the HR portal and on the shared company calendar.' },
  { id: '3', question: 'How to request IT support?', answer: 'Submit a ticket through the IT support portal or use the support chatbot for common issues.' },
];

export const SAMPLE_KPI_DATA: KpiData[] = [
  { name: 'Q1', value: 300 },
  { name: 'Q2', value: 500 },
  { name: 'Q3', value: 450 },
  { name: 'Q4', value: 600 },
];

export const USER_AVATAR_URL = "https://picsum.photos/seed/useravatar/40/40";
export const BOT_AVATAR_URL = "https://picsum.photos/seed/botavatar/40/40";
