import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const receiver = process.env.EMAIL_RECEIVER;

if (!user || !pass || !receiver) {
  console.error("❌ Missing email credentials in environment variables.");
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
      filename: 'playwright-report.zip',
      path: path.resolve('playwright-report.zip'),
    },
  ],
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('❌ Error sending email:', err);
    process.exit(1); // Mark GitHub Action as failed
  } else {
    console.log('✅ Email sent:', info.response);
  }
});
