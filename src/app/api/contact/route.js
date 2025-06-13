export const runtime = 'nodejs';

import nodemailer from 'nodemailer'

export async function POST(req) {
  const { name, email, message } = await req.json()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
      pass: process.env.NEXT_PUBLIC_CONTACT_EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    to: 'manas.raj.8271@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  }

  try {
    console.log('Attempting to send email:', mailOptions)
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info)
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    console.error('Nodemailer error:', error)
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })
  }
}