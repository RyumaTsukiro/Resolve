// File: src/App.jsx

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

// Icon Components
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
  </div>
);

// Report Card Component
function ReportCard({ report }) {
  const getStatusColor = (status) => {
    // CHANGED: Status values are now in English
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-800 break-words">{report.title}</h3>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
            {report.status}
          </span>
        </div>
        <p className="text-gray-600 mt-2 text-sm">{report.description}</p>
        <div className="text-right text-xs text-gray-400 mt-4">
          <p>Reported by: {report.author || 'Anonymous'}</p>
          <p>{new Date(report.created_at).toLocaleString('en-US')}</p>
        </div>
      </div>
    </div>
  );
}

// New Report Modal Component
function NewReportModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Report title cannot be empty.');
      return;
    }
    
    setIsSubmitting(true);
    // CHANGED: Default status is 'New'
    const { error } = await supabase
      .from('laporan')
      .insert([{ title, description, author, status: 'New' }]);

    if (error) {
      alert('Failed to submit report: ' + error.message);
    } else {
      setTitle('');
      setDescription('');
      setAuthor('');
      onClose();
    }
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Report</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">Your Name</label>
              <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Optional"/>
            </div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Report Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Streetlight out on Block C" required/>
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Describe the issue in detail..."></textarea>
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 flex items-center">
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('laporan')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reports:', error);
      } else {
        setReports(data);
      }
      setIsLoading(false);
    };

    fetchReports();
    
    const channel = supabase
      .channel('public:laporan')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'laporan' }, 
        (payload) => {
          console.log('Change received!', payload);
          fetchReports();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold tracking-tight">Resolve</h1>
          <p className="text-sm text-blue-200">Community Issue Tracking, Resolved.</p>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : reports.length > 0 ? (
          <div className="space-y-4">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-700">No Reports Yet</h2>
            <p className="text-gray-500 mt-2">Be the first to create one!</p>
          </div>
        )}
      </main>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform duration-200 hover:scale-110"
        aria-label="Create New Report"
      >
        <PlusIcon />
      </button>

      <NewReportModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
