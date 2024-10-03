import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaEllipsisV, FaCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Monitor {
  _id: string;
  url: string;
  errorType: string;
  email: string;
}

const HeroSection: React.FC = () => {
  const initialTimeLeft = 180;
  const [timeLeft, setTimeLeft] = useState<number>(initialTimeLeft);
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [optionsVisible, setOptionsVisible] = useState<string | null>(null);
  const [monitorToDelete, setMonitorToDelete] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch monitors from backend
  const fetchMonitors = async () => {
    try {
      const response = await fetch('http://localhost:5000/monitors');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMonitors(data);
    } catch (error) {
      console.error('Error fetching monitors:', error);
      toast.error('Failed to fetch monitors. Please try again later.');
    }
  };

  // Initial fetch of monitors
  useEffect(() => {
    fetchMonitors();
  }, []);

  // Countdown logic
  useEffect(() => {
    const savedTimeLeft = sessionStorage.getItem('timeLeft');
    const savedLastUpdateTime = sessionStorage.getItem('lastUpdateTime');

    if (savedTimeLeft && savedLastUpdateTime) {
      const elapsedTime = Math.floor((Date.now() - parseInt(savedLastUpdateTime, 10)) / 1000);
      const updatedTime = Math.max(parseInt(savedTimeLeft, 10) - elapsedTime, 0);
      setTimeLeft(updatedTime);
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          const updatedTime = prevTime - 1;
          sessionStorage.setItem('timeLeft', updatedTime.toString());
          sessionStorage.setItem('lastUpdateTime', Date.now().toString());
          return updatedTime;
        } else {
          sessionStorage.setItem('timeLeft', initialTimeLeft.toString());
          sessionStorage.setItem('lastUpdateTime', Date.now().toString());
          return initialTimeLeft;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTimeLeft]);

  // Delete a monitor
  const handleDelete = async (id: string) => {
    console.log("Deleting monitor with ID:", id); // Add this to check the ID
    try {
      toast.info('Deleting monitor...');
      const response = await fetch(`http://localhost:5000/monitors/${id}`, { method: 'DELETE' });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      setMonitors((prevMonitors) => prevMonitors.filter((monitor) => monitor._id !== id));
  
      setMonitorToDelete(null);
      toast.success('Monitor deleted successfully!');
    } catch (error) {
      console.error('Error deleting monitor:', error);
      toast.error('Error deleting monitor');
    }
  };
  

  // Handle clicking outside the options container
  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setOptionsVisible(null);
    }
  };

  // Add and remove event listener for outside clicks
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle visibility of the options dropdown
  const handleOptionsToggle = (id: string) => {
    setOptionsVisible(prev => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 w-full">
      <div className="w-4/5 flex justify-between items-center p-10 bg-white mb-8">
        <h2 className="text-4xl font-bold">Your Monitors</h2>
        <div className="flex items-center space-x-6">
          <div className="text-3xl font-thin">
            Next ping in: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')} mins
          </div>
          <Link to="/create">
            <button className="bg-black text-white py-2 px-6 rounded-lg hover:bg-slate-100 hover:text-black transition-colors">
              Create Monitor
            </button>
          </Link>
        </div>
      </div>

      <div className="w-4/5 bg-white shadow-md rounded-lg p-6" ref={containerRef}>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-3 pr-3">Status</th>
              <th className="py-3">Website URL</th>
              <th className="py-3">Alert Condition</th>
              <th className="py-3">Email Address</th>
              <th className="py-3 text-right">Options</th>
            </tr>
          </thead>
          <tbody>
            {monitors.map((monitor) => (
              <tr key={monitor._id} className="border-b hover:bg-gray-50 relative">
                <td className="py-4">
                  <FaCircle className="text-green-500" />
                </td>
                <td className="py-4">{monitor.url}</td>
                <td className="py-4">{monitor.errorType}</td>
                <td className="py-4">{monitor.email}</td>
                <td className="py-4 text-right relative">
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => handleOptionsToggle(monitor._id)}
                    aria-label="More options"
                  >
                    <FaEllipsisV />
                  </button>
                  {optionsVisible === monitor._id && (
                    <div className="absolute top-0 right-0 mt-8 bg-white border shadow-md rounded-lg w-48 z-10">
                      <button
                        className="block px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left"
                        onClick={() => setMonitorToDelete(monitor._id)}
                      >
                        <MdDelete className="inline mr-2" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {monitorToDelete && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-lg text-gray-700">Are you sure you want to delete this monitor?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                onClick={() => {
                  setMonitorToDelete(null);
                  setOptionsVisible(null);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={() => handleDelete(monitorToDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeButton
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default HeroSection;
