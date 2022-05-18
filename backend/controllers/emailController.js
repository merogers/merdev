// const nodemailer = require("nodemailer");
const mail = require("@sendgrid/mail");

mail.setApiKey(process.env.SENDGRID_API_KEY);

const sendGrid = async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log(req.body);

  const output = `
    Name: ${name}\r\n
    Email: ${email}\r\n
    Phone: ${phone}\r\n
    Message: ${message}
  `;

  const data = {
    to: "michelle@merogers.dev",
    from: "mailer@merogers.dev",
    subject: "merogers.dev Contact Form Message",
    text: output,
    html: output.replace(/\r\n/g, "<br>"),
  };

  mail.send(data);

  res.status(200).json({ status: "Ok" });
};

module.exports = { sendGrid };
