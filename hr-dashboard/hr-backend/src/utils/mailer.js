const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com",      // put your Gmail here
    pass: "your-app-password",        // put your Google App Password here
  },
});

async function sendConfirmationMail(to, name) {
  try {
    await transporter.sendMail({
      from: '"Company HR" <yourgmail@gmail.com>', // shows "Company HR" in inbox
      to,
      subject: "Application Received ✅",
      text: `Hi ${name},\n\nWe’ve received your application and our team will review it soon.\n\nThanks,\nCompany HR`,
    });
    console.log("📩 Confirmation email sent to", to);
  } catch (err) {
    console.error("❌ Email error:", err);
  }
}

module.exports = { sendConfirmationMail };
