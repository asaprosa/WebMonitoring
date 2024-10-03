import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';

interface Monitor {
  url: string;
  errorType: string;
  email: string;
}

const HeroSection: React.FC = () => {
  const { isSignedIn } = useUser();
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const openSignIn = () => setIsSignInOpen(true);

  const handleCreateMonitorClick = () => {
    if (isSignedIn) {
      navigate('/main'); // Navigate to Create Monitor
    } else {
      openSignIn(); // Open Sign In modal if not signed in
    }
  };

  useEffect(() => {
    const fetchMonitors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/monitors');
        setMonitors(response.data);
      } catch (error) {
        console.error('Error fetching monitors:', error);
      }
    };

    fetchMonitors();
  }, []);

  const handleDelete = async (url: string, email: string) => {
    try {
      await axios.delete(`http://localhost:5000/monitors/${url}`);
      setMonitors((prevMonitors) => prevMonitors.filter((monitor) => monitor.url !== url));
      
      // Send an email alert
      await axios.post('http://localhost:5000/send-alert', {
        to: email,
        subject: 'Monitor Deleted',
        text: `The monitor for URL ${url} has been deleted.`
      });
    } catch (error) {
      console.error('Error deleting monitor:', error);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative py-12 overflow-hidden sm:py-16 lg:py-20 xl:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col">
            <div className="max-w-md mx-auto text-center xl:max-w-lg lg:mx-0 lg:text-left">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:leading-tight xl:text-6xl pt-6">
                Monitor Your Website & Stay Alert 🚨
              </h1>
              <p className="mt-5 text-lg font-medium text-gray-900 lg:mt-8">
                Get instant email alerts when your site goes down or experiences issues. Keep your serverless backends awake with our regular pinging service, reducing load times by over 180 seconds.
              </p>
              <div className="mt-8 lg:mt-10">
                <button
                  onClick={handleCreateMonitorClick}
                  className={`inline-flex items-center justify-center px-8 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-600 ${
                    !isSignedIn ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  disabled={!isSignedIn}
                >
                  Dashboard
                </button>
              </div>
            </div>

            {/* Display Monitors */}
            <div className="mt-12">
              {/* Display monitors here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
