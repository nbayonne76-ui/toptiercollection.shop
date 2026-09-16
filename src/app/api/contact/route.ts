import { NextRequest, NextResponse } from 'next/server'

const MAX_LENGTH = { name: 200, email: 320, subject: 200, message: 5000 } as const

// Visitor input is interpolated into the email HTML: escape it so it cannot inject markup or links.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Header values (subject, reply-to) must stay on a single line.
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const fields = (body ?? {}) as Record<string, unknown>
  const { name, email, subject, message } = fields

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.trim() ||
    typeof subject !== 'string' || !subject.trim() ||
    typeof message !== 'string' || !message.trim()
  ) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  if (
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    subject.length > MAX_LENGTH.subject ||
    message.length > MAX_LENGTH.message
  ) {
    return NextResponse.json({ error: 'Field too long' }, { status: 400 })
  }

  const replyTo = singleLine(email)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'Top Tier Collection <onboarding@resend.dev>',
      to: 'support@toptier-collection.com',
      replyTo,
      subject: `[${singleLine(subject)}] New message from ${singleLine(name)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #eee;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(replyTo)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-line; color: #444;">${escapeHtml(message)}</p>
          </div>
          <p style="font-size: 11px; color: #999; margin-top: 16px; text-align: center;">
            Top Tier Collection — support@toptier-collection.com
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
