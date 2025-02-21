import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const receiver = process.env.EMAIL_RECEIVER;

// ✅ Hardcoded GitHub Username and Repository Name
const githubUsername = 'SumitMandloi123'; // Replace with your GitHub username
const repository = 'PlaywrightDemo-GithubActions-';         // Replace with your repository name

if (!user || !pass || !receiver) {
  console.error("❌ Missing email credentials in environment variables.");
  process.exit(1);
}

const reportUrl = `https://${githubUsername}.github.io/${repository}/index.html`;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass },
});

const mailOptions = {
  from: `GitHub Actions <${user}>`,
  to: receiver,
  subject: '📊 Playwright Allure Test Report',
  text: `Hello,

The latest Playwright Allure Report is available at:
${reportUrl}

Best,
GitHub Actions`,
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('❌ Error sending email:', err);
    process.exit(1); // Mark GitHub Action as failed
  } else {
    console.log('✅ Email sent:', info.response);
  }
});
