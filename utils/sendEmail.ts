import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const receiver = process.env.EMAIL_RECEIVER;

// Validate environment variables
if (!user || !pass || !receiver) {
  console.error("❌ Missing email credentials in environment variables.");
  process.exit(1);
}

// Path to the Playwright HTML report
const reportPath = path.resolve('playwright-report', 'index.html');

// Check if report exists
if (!fs.existsSync(reportPath)) {
  console.error("❌ Playwright HTML report not found at:", reportPath);
  process.exit(1);
}

// Create reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass },
});

// Email configuration
const mailOptions = {
  from: `GitHub Actions <${user}>`,
  to: receiver,
  subject: '📊 Playwright HTML Test Report',
  html: `
    <p>Hello,</p>
    <p>The latest <strong>Playwright HTML Report</strong> is attached below.</p>
    <p>Best,<br>GitHub Actions</p>
  `,
  attachments: [
    {
      filename: 'Playwright-Report.html',
      path: reportPath,
      contentType: 'text/html',
    },
  ],
};

// Send the email
transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('❌ Error sending email:', err);
    process.exit(1);
  } else {
    console.log('✅ Email sent successfully to:', receiver);
    console.log('📧 Response:', info.response);
  }
});
