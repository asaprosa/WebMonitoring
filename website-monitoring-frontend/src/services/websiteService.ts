import axios from 'axios';

export const addWebsite = async (url: string) => {
  const response = await axios.post('/api/websites/monitor', { url });
  return response.data;
};
