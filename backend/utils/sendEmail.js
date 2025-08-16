import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  console.log("📧 Sending to:", options.to);

  if (!options.to) {
    throw new Error("Recipient email (to) is missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    text: options.text || undefined, // fallback if text provided
    html: options.html || undefined, // fallback if HTML provided
  });

  console.log("✅ Email sent successfully");
};

export default sendEmail;
