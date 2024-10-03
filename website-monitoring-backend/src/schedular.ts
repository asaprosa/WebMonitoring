import cron from 'node-cron';
import monitorWebsites from './monitoringService';

// Schedule the monitoring job to run every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running website monitoring job...');
  await monitorWebsites();
});
