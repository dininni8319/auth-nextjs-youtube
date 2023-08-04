import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrytjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}: any) => 
{
  try {
    // create a hash token
    const hashedToken = await bcrytjs.hash(userId.toString(), 10)
    
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, 
        {
          verifyToken: hashedToken,
          verifyTokenExpire: Date.now() + 3600000 // 1 hour
        },
      )
    } else if (emailType === "RESET") {
       await User.findByIdAndUpdate(userId, 
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpire: Date.now() + 3600000 // 1 hour
        },
      )
    }
   const {
    MAILTRAP_HOST,
    MAILTRAP_PORT,
    MAILTRAP_USER,
    MAILTRAP_PASSWORD,
    MAILTRAP_USER_MAIL,
    DOMAIN
   } = process.env

  const Transport = nodemailer.createTransport({
    host: MAILTRAP_HOST,
    port: MAILTRAP_PORT,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASSWORD,
    }
  });

  const mailOptions = {
    from: MAILTRAP_USER_MAIL,
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `<p>Click <a href="${DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
    or copy and paste the link below in your browser. <br> ${DOMAIN}/verifyemail?token=${hashedToken}
    </p>`
  }

  const mailResponse = await Transport.sendMail(mailOptions)

  return mailResponse
  } catch (error) {
    throw new Error(error.message);
  }
}

