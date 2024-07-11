const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.json());

app.post("/referral", async (req, res) => {
  const { yourName, yourEmail, friendName, friendEmail } = req.body;

  if (!yourName || !yourEmail || !friendName || !friendEmail) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const referral = await prisma.referral.create({
      data: {
        yourName,
        yourEmail,
        friendName,
        friendEmail,
      },
    });

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: friendEmail,
      subject: "You have been referred!",
      text: `${yourName} has referred you to our course. Check it out!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: "Failed to send email." });
      } else {
        return res
          .status(200)
          .json({ message: "Referral submitted successfully!" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to save referral." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
