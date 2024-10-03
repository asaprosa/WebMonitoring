🛠️ Website Monitoring App
A web-based application that monitors website availability and sends email alerts when an issue is detected.
Keep your websites online and optimized for performance with automated pings and real-time alerts.
Built with React, TypeScript, Node.js, and Tailwind CSS.

🚀 Demo
You can try out the live version here: Website Monitoring App


✨ Features
Uptime Monitoring: Tracks the availability of websites and triggers an alert when downtime occurs.
Ping Prevention: Periodically pings the website to avoid sleeping in serverless backends.
Email Alerts: Sends automated emails when the monitored website goes down, with customizable error codes (e.g., 404, 500).
User Authentication: Secure user login and sign-up using Clerk authentication.
Customizable Monitoring: Users can set up alerts for specific websites and define custom thresholds.
Real-time Dashboard: View the status of all monitored websites in one place.
Mobile Responsive: Optimized for both desktop and mobile devices.
Modern Tech Stack: Built with React, Next.js, Node.js, Tailwind CSS, and PostgreSQL.
🧑‍💻 Technologies Used
Frontend: React, Next.js, TypeScript, Tailwind CSS
Backend: Node.js, Express
Database: PostgreSQL (via Neon)
Authentication: Clerk
Email Service: Nodemailer for email alerts
File Uploads: UploadThing
Deployment: Heroku, Render
⚙️ Installation & Setup
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or higher)
PostgreSQL for database
Heroku or Render account for deployment
Step-by-Step Guide
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/website-monitoring-app.git
Navigate into the project directory:

bash
Copy code
cd website-monitoring-app
Install the dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and add the following environment variables:

env
Copy code
DATABASE_URL=your_postgresql_database_url
CLERK_API_KEY=your_clerk_api_key
EMAIL_SERVICE_API_KEY=your_email_service_api_key
Run the development server:

bash
Copy code
npm run dev
Open the app in your browser:

arduino
Copy code
http://localhost:3000
🖥️ Usage
Add a Monitor
Navigate to the "Create Monitor" page.
Enter the website URL you wish to monitor.
Set the error types (e.g., 404, 500) and email address for receiving alerts.
Click "Create" to start monitoring!
View Monitoring Dashboard
Go to the dashboard to view the status of all your monitors.
You can edit, delete, or update the monitoring preferences at any time.
📊 API Documentation
Endpoint	Method	Description
/api/monitors	GET	Get all monitors for the authenticated user
/api/monitors	POST	Create a new monitor
/api/monitors/:id	DELETE	Delete a specific monitor
/api/alerts	POST	Trigger an alert based on monitor status
🛠️ Development
Running Locally
To run the project locally for development:

Start the backend server:
Run the following command to start the backend in development mode.

bash
Copy code
npm run server
Start the frontend client:
Run this command to start the client:

bash
Copy code
npm run client
Open the app on http://localhost:3000 and start developing!

Testing
To run unit tests:

bash
Copy code
npm run test
📧 Contact
Author: Aditya Ghodke
Email: adityaaghodke2@gmail.com
LinkedIn: Aditya Ghodke
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

⭐ Acknowledgements
Special thanks to OpenAI for the AI integration.
Thanks to Neon for providing the PostgreSQL database.
Shout out to UploadThing for their smooth file uploading solution
