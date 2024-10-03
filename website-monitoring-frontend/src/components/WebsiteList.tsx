import React from 'react';

const WebsiteList: React.FC<{ websites: any[] }> = ({ websites }) => {
  return (
    <ul>
      {websites.map((website, index) => (
        <li key={index}>{website.url} - {website.status}</li>
      ))}
    </ul>
  );
};

export default WebsiteList;
