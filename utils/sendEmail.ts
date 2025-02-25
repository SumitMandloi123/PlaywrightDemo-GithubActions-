import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const receiver = process.env.EMAIL_RECEIVER;

if (!user || !pass || !receiver) {
  console.error("❌ Missing email credentials in environment variables.");
  process.exit(1);
}

// Path to the Playwright HTML report
const reportPath = path.resolve('playwright-report', 'index.html');

if (!fs.existsSync(reportPath)) {
  console.error("❌ Report not found at:", reportPath);
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass },
});

const mailOptions = {
  from: `GitHub Actions <${user}>`,
  to: receiver,
  subject: '📊 Playwright HTML Test Report',
  text: `Hello,

Please find the attached Playwright HTML Test Report.

Best,
GitHub Actions`,
  attachments: [
    {
      filename: 'Playwright-Report.html',
      path: reportPath,
      contentType: 'text/html',
    },
  ],
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('❌ Error sending email:', err);
    process.exit(1);
  } else {
    console.log('✅ Email sent:', info.response);
  }
});
