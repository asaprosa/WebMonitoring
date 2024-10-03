"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = require("./emailService");
const Monitor_1 = __importDefault(require("./models/Monitor"));
const EmailLog_1 = __importDefault(require("./models/EmailLog"));
const axios_1 = __importDefault(require("axios"));
// Check the number of emails sent today for the user
const checkEmailQuota = async (email) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    // Count the number of emails sent to the user today
    const sentCount = await EmailLog_1.default.countDocuments({
        email,
        sentAt: { $gte: startOfDay, $lte: endOfDay }
    });
    return sentCount;
};
// Check the status of the website
const checkWebsiteStatus = async (monitor) => {
    const { url, email, errorType } = monitor;
    let status;
    const detectedAt = new Date();
    try {
        // Perform a request to check the website status
        const response = await axios_1.default.get(url);
        status = response.status;
    }
    catch (error) { // Type assertion to handle 'unknown' type
        if (error.response) {
            status = error.response.status; // HTTP error status code
        }
        else {
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
            await (0, emailService_1.sendAlertEmail)(email, url, status, detectedAt);
            // Log the email sent
            await EmailLog_1.default.create({
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
        const monitors = await Monitor_1.default.find(); // Fetch all monitors from the database
        for (const monitor of monitors) {
            await checkWebsiteStatus(monitor);
        }
    }
    catch (error) {
        console.error('Error monitoring websites:', error);
    }
};
exports.default = monitorWebsites;
