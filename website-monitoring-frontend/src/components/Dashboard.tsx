import React, { useState, useEffect } from 'react';
import WebsiteList from './WebsiteList';
import WebsiteForm from './WebsiteForm';

const Dashboard: React.FC = () => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    // Fetch websites from backend and set the state
  }, []);

  return (
    <div>
      <h1>Website Monitoring Dashboard</h1>
      <WebsiteForm setWebsites={setWebsites} />
      <WebsiteList websites={websites} />
    </div>
  );
};

export default Dashboard;
