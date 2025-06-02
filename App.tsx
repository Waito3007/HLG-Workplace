
import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS, HomeIcon, USER_AVATAR_URL } from './constants';
import DashboardPage from './components/DashboardPage';
import TaskManagementPage from './components/TaskManagementPage';
import CommunicationPage from './components/CommunicationPage';
import DocumentManagementPage from './components/DocumentManagementPage';
import TrainingSupportPage from './components/TrainingSupportPage';
import type { NavItem } from './types';

// Placeholder for Settings Page content
const SettingsPage: React.FC = () => (
  <div className="p-6">
    <h1 className="text-3xl font-semibold text-slate-800">Settings</h1>
    <p className="mt-4 text-slate-600">Manage your application settings here. This page is a placeholder.</p>
     <div className="mt-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-slate-700">Profile Settings</h2>
      <p className="text-slate-600 mt-2">Update your profile information.</p>
    </div>
    <div className="mt-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold text-slate-700">Notification Preferences</h2>
      <p className="text-slate-600 mt-2">Customize how you receive notifications.</p>
    </div>
  </div>
);

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <div className="w-64 bg-sidebar-bg text-sidebar-text flex flex-col min-h-screen">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-700">
        <div className="w-10 h-10 bg-hlg-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
          HLG
        </div>
        <h1 className="text-xl font-semibold text-white">HLG Workplace</h1>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {NAV_ITEMS.map((item: NavItem) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ease-in-out hover:bg-sidebar-active-bg hover:text-sidebar-hover-text ${
                isActive || (item.path === '/' && location.pathname === '/') ? 'bg-sidebar-active-bg text-sidebar-hover-text font-semibold' : 'text-sidebar-text'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <img src={USER_AVATAR_URL} alt="User Avatar" className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold text-white">Employee Name</p>
            <p className="text-sm text-slate-400">employee.role@hlg.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen antialiased">
      <Sidebar />
      <main className="flex-1 bg-slate-100 overflow-y-auto">
        {/* Optional Header if needed */}
        {/* <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-slate-700">Page Title (dynamic)</h2>
        </header> */}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/communication" element={<CommunicationPage />} />
          <Route path="/tasks" element={<TaskManagementPage />} />
          <Route path="/documents" element={<DocumentManagementPage />} />
          <Route path="/training" element={<TrainingSupportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
