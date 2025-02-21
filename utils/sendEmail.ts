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

// ✅ Change extension to avoid Gmail block
const zipName = 'allure-report.allurezip'; 

const output = fs.createWriteStream(zipName);
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
    text: `Attached is the Allure report. 📁\n\n👉 Rename the file from .allurezip to .zip before extracting.`,
    attachments: [
      {
        filename: zipName,
        path: path.resolve(zipName),
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
