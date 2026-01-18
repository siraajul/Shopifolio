import { EmailTemplate } from '@/lib/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, ...rest } = body;

        // Basic validation
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and Email are required' },
                { status: 400 }
            );
        }

        const data = await resend.emails.send({
            from: 'Shopifolio Leads <onboarding@resend.dev>', // Verify domain or use resend.dev for testing
            to: ['hello@shift2dynamic.com'],
            subject: `New Project Inquiry from ${name}`,
            react: EmailTemplate({ formData: body }),
            replyTo: email,
        });

        if (data.error) {
            return NextResponse.json({ error: data.error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
