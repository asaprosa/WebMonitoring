import React, { useState } from 'react';
import { addWebsite } from '../services/websiteService';

const WebsiteForm: React.FC<{ setWebsites: any }> = ({ setWebsites }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newWebsite = await addWebsite(url);
    setWebsites((prev: any) => [...prev, newWebsite]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit">Add Website</button>
    </form>
  );
};

export default WebsiteForm;
