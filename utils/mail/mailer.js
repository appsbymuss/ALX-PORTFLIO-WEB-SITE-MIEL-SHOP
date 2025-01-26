const transporter = require("./conf");
const verificationLayout = require('./layouts/email-verification');
const orderConfirmationLayout = require('./layouts/order-confirmation');

async function sendEmailVerification(to, token){
  const link = `${process.env.HOST}:${process.env.PORT}/auth/sign-up/verify?token=${token}`;
  const sendingStatus = await sendMail(to, "Vérifiez votre adresse e-mail", verificationLayout(link));
  return sendingStatus;
}

// TODO: Send Forget Password
async function sendForgetPassword(to, token){
  const link = `${process.env.HOST}:${process.env.PORT}/auth/sign-in/forgot-password?token=${token}`;
  const sendingStatus = await sendMail(to, "Concernant votre mot de passe oublié", link)
}

// TODO: Send Commande Confirmation Email
async function sendOrderConfirmation(to, data, factureID) {
  const sendingStatus = await sendMail(to, "concernant la commande que vous avez récemment passée", orderConfirmationLayout(data), factureID);
}

async function sendMail(to, subject, bodyLayout, pdfName){

  const options = {
    from: process.env.PRIMARY_EMAIL,
    to: to,
    subject: subject,
    html: bodyLayout,
    ...((pdfName) ? {
      attachments: [
        {
          filename: `Facturation #${pdfName}.pdf`,
          // TODO: Fix Facturation Path
          path: `${__dirname}/../facturation/generated/pdfInvoices/${pdfName}.pdf`
        }
      ]
    } : {})
  };

  try {
    let info = await transporter.sendMail(options);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}



module.exports = {
  sendEmailVerification,
  sendOrderConfirmation
}