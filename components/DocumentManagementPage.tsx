
import React, { useState } from 'react';
import { SAMPLE_DOCUMENTS, PlusCircleIcon, ArrowPathIcon } from '../constants';
import type { DocumentItem } from '../types';


const DocumentRow: React.FC<{ item: DocumentItem }> = ({ item }) => (
  <tr className="hover:bg-slate-50 transition-colors border-b border-slate-200">
    <td className="p-3 whitespace-nowrap">
      <div className="flex items-center space-x-2">
        {item.icon}
        <span className={`font-medium ${item.type === 'folder' ? 'text-slate-700' : 'text-accent'}`}>{item.name}</span>
      </div>
    </td>
    <td className="p-3 text-sm text-slate-600 whitespace-nowrap">{item.type === 'file' ? item.size : '--'}</td>
    <td className="p-3 text-sm text-slate-600 whitespace-nowrap">{item.lastModified || '--'}</td>
    <td className="p-3 text-sm text-slate-600 whitespace-nowrap">
      <button className="text-accent hover:underline mr-2">View</button>
      <button className="text-red-500 hover:underline">Delete</button>
    </td>
  </tr>
);

const DocumentManagementPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>(SAMPLE_DOCUMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [path, setPath] = useState<string[]>(['Root']); // Breadcrumb path

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Placeholder for upload functionality
  const handleUpload = () => {
    alert("Upload functionality to be implemented.");
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-slate-800">Document Management</h1>
        <div className="flex space-x-2">
          <button 
            onClick={handleUpload}
            className="bg-accent text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <PlusCircleIcon className="w-5 h-5" />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        {/* Breadcrumbs */}
        <div className="text-sm text-slate-500">
          {path.map((p, index) => (
            <span key={p}>
              <button className="hover:underline hover:text-accent">{p}</button>
              {index < path.length - 1 && <span className="mx-1">/</span>}
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search documents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-slate-300 rounded-md w-full max-w-xs text-sm focus:ring-accent focus:border-accent"
        />
      </div>

      <div className="flex-grow bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="p-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="p-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Size</th>
                <th className="p-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Modified</th>
                <th className="p-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map(item => <DocumentRow key={item.id} item={item} />)
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-slate-500">No documents found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-slate-500 mt-4">Simulated file system. Click on folders or files would navigate/open them in a real app.</p>
    </div>
  );
};

export default DocumentManagementPage;
