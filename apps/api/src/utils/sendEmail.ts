import * as nodemailer from 'nodemailer'
import { logger } from './logger'

interface EmailOptions {
  email: string
  subject: string
  message: string
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  // Define email options
  const mailOptions = {
    from: `${process.env.EMAIL_FROM} <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: `
      <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">FullStack Learning Hub</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">פלטפורמה ללמידת Full Stack Development</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0; font-size: 22px;">${options.subject}</h2>
            <div style="color: #555; line-height: 1.6; font-size: 16px; white-space: pre-line;">${options.message}</div>
          </div>
          
          <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e9ecef;">
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              FullStack Learning Hub - פלטפורמה ללמידת פיתוח Full Stack
            </p>
            <p style="color: #6c757d; font-size: 12px; margin: 5px 0 0 0;">
              אם יש לך שאלות, אנא צור איתנו קשר ב-support@fullstackhub.com
            </p>
          </div>
        </div>
      </div>
    `
  }

  // Send email
  try {
    await transporter.sendMail(mailOptions)
    logger.info(`Email sent successfully to ${options.email}`)
  } catch (error) {
    logger.error('Error sending email:', error)
    throw new Error('שגיאה בשליחת אימייל')
  }
}
