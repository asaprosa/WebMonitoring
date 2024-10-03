"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAlertEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// Ensure status is a string for the message
const statusToString = (status) => {
    if (typeof status === 'number') {
        switch (status) {
            case 200:
                return 'URL is available';
            case 404:
                return 'URL returned 404 Not Found';
            case 500:
                return 'URL returned 500 Internal Server Error';
            default:
                return 'Unknown status';
        }
    }
    return 'Unknown status';
};
const sendAlertEmail = async (to, url, status, detectedAt) => {
    const statusMessage = statusToString(status);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Alert: Your Website is Down',
        text: `Dear user,

We wanted to let you know that your website ${url} is currently experiencing downtime. Our monitoring system detected the issue on ${detectedAt.toUTCString()}.

Here are the details:
- URL: ${url}
- Status: ${statusMessage}
- Detected At: ${detectedAt.toUTCString()}

Check more details at the dashboard.

We recommend you to check your server and resolve the issue as soon as possible to minimize the impact on your users.

If you need further assistance, please do not hesitate to contact our support team.

Best regards,
Team`
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending alert email:', error);
    }
};
exports.sendAlertEmail = sendAlertEmail;
