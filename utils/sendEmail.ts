import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;
const receiver = process.env.EMAIL_RECEIVER;

if (!user || !pass || !receiver) {
  console.error("❌ Missing email credentials in environment variables.");
  process.exit(1);
}

const output = fs.createWriteStream('allure-report.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);
archive.directory('allure-report/', false);
archive.finalize();

output.on('close', () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  const mailOptions = {
    from: user,
    to: receiver,
    subject: '📊 Playwright Allure Report',
    text: 'Attached is the Allure report from the latest GitHub Actions run.',
    attachments: [
      {
        filename: 'allure-report.txt', // ✅ Change extension to .txt
        path: path.resolve('allure-report.zip'),
        encoding: 'base64', // ✅ Base64 encoding helps bypass Gmail filters
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
});
