import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const receiver = process.env.EMAIL_RECEIVER;
const runId = process.env.GITHUB_RUN_ID;
const repository = process.env.GITHUB_REPOSITORY;

if (!user || !pass || !receiver) {
  console.error("❌ Missing email credentials in environment variables.");
  process.exit(1);
}

// Build GitHub Run URL
const githubRunUrl = `https://github.com/${repository}/actions/runs/${runId}`;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass },
});

const mailOptions = {
  from: user,
  to: receiver,
  subject: '📊 Playwright Allure Report',
  text: `✅ Playwright Allure Report is ready!\n\nView the report and download artifacts here:\n${githubRunUrl}\n\nNo attachments to avoid email blocks.`,
};

transporter.sendMail((mailOptions), (err, info) => {
  if (err) {
    console.error('❌ Error sending email:', err);
    process.exit(1); // Mark GitHub Action as failed
  } else {
    console.log('✅ Email sent:', info.response);
  }
});
