
export interface NavItem {
  path: string;
  name: string;
  icon: React.ReactNode;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  assignee?: string;
}

export enum TaskStatus {
  BACKLOG = 'Backlog',
  IN_PROGRESS = 'In Progress',
  REVIEW = 'Review',
  DONE = 'Done',
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: string;
  lastModified?: string;
  icon?: React.ReactNode;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | string; // string for general chat, user/bot for chatbot
  text: string;
  timestamp: Date;
  avatar?: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  imageUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Recharts types - these are often available from @types/recharts if installed via npm
// For CDN usage, we might need to define them or use `any` carefully.
// This is a basic example.
export interface KpiData {
  name: string;
  value: number;
}
