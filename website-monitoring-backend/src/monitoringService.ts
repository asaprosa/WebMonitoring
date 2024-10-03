import { sendAlertEmail } from './emailService';
import MonitorModel from './models/Monitor';
import EmailLog from './models/EmailLog';
import axios from 'axios';

// Check the number of emails sent today for the user
const checkEmailQuota = async (email: string): Promise<number> => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // Count the number of emails sent to the user today
  const sentCount = await EmailLog.countDocuments({
    email,
    sentAt: { $gte: startOfDay, $lte: endOfDay }
  });

  return sentCount;
};

// Check the status of the website
const checkWebsiteStatus = async (monitor: any) => {
  const { url, email, errorType } = monitor;
  let status: number | string;
  const detectedAt = new Date();

  try {
    // Perform a request to check the website status
    const response = await axios.get(url);
    status = response.status;
  } catch (error: any) {  // Type assertion to handle 'unknown' type
    if (error.response) {
      status = error.response.status; // HTTP error status code
    } else {
      status = 'unavailable'; // For network or other issues
    }
  }

  // Check if the status matches the errorType
  const isDowntime = (errorType === 'unavailable' && status === 'unavailable') ||
                     (errorType === '404' && status === 404) ||
                     (errorType === '500' && status === 500) ||
                     (errorType === '501' && status === 501) ||
                     (errorType === '200' && status === 200);

  if (isDowntime) {
    const sentCount = await checkEmailQuota(email);

    if (sentCount < 2) { // Limit to 2 emails per day
      await sendAlertEmail(email, url, status, detectedAt);

      // Log the email sent
      await EmailLog.create({
        email,
        url,
        status,
        sentAt: detectedAt
      });
    }
  }
};

// Monitor all websites
const monitorWebsites = async () => {
  try {
    const monitors = await MonitorModel.find();  // Fetch all monitors from the database
    for (const monitor of monitors) {
      await checkWebsiteStatus(monitor);
    }
  } catch (error) {
    console.error('Error monitoring websites:', error);
  }
};

export default monitorWebsites;
