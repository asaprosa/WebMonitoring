# Website Monitoring App

A powerful, real-time website monitoring app that tracks website uptime, sends email alerts during downtime, prevents serverless backends from sleeping, and provides a customizable dashboard for easy management.

## 🚀 Features

- **Uptime Monitoring**: Keep an eye on your website's uptime and receive instant alerts if it goes down.
- **Email Alerts**: Get notified via email when your website is down or returns specific HTTP status codes (e.g., 500 or 404).
- **Ping Service**: Prevent your website from sleeping by regularly pinging it, optimizing response times.
- **Customizable Alerts**: Set specific alert conditions based on status codes or availability.
- **Real-time Dashboard**: Visualize uptime statistics and manage your monitored websites in one place.
- **Authentication**: Secure access via Clerk authentication.
- **Responsive Design**: Mobile-friendly interface for monitoring on the go.

## 🛠️ Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Heroku, Render
- **Database**: Neon PostgreSQL
- **Email Service**: Nodemailer
- **Authentication**: Clerk
- **File Uploads**: UploadThing

## 📄 API Documentation

### Create a Monitor
- **URL**: `/api/monitor/create`
- **Method**: `POST`
- **Description**: Adds a new monitor for a website.
- **Request Body**:
  ```json
  {
    "url": "https://example.com",
    "alertEmail": "user@example.com",
    "errorType": "500"
  }
