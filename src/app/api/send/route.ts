import { EmailTemplate } from '@/lib/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate store: Map<IP, { count: number, resetTime: number }>
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

const RATE_LIMIT_DURATION = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3; // 3 requests per IP per duration

export async function POST(request: Request) {
    try {
        // Rate Limiting Logic
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const now = Date.now();
        const record = rateLimitMap.get(ip);

        if (record) {
            if (now > record.resetTime) {
                // Reset expired
                rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_DURATION });
            } else {
                // Check limit
                if (record.count >= MAX_REQUESTS) {
                    return NextResponse.json(
                        { error: 'Too many requests. Please try again later.' },
                        { status: 429 }
                    );
                }
                record.count++;
            }
        } else {
            // New record
            rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_DURATION });
        }

        // Clean up old entries periodically (optional, but good for memory)
        if (rateLimitMap.size > 1000) {
            for (const [key, val] of rateLimitMap.entries()) {
                if (Date.now() > val.resetTime) rateLimitMap.delete(key);
            }
        }

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
            from: 'Shift2Dynamic Leads <leads@shift2dynamic.com>',
            to: ['shirajulislamparvez@gmail.com'],
            subject: `New Project Inquiry from ${name}`,
            react: await EmailTemplate({ formData: body }),
            replyTo: email,
        });

        if (data.error) {
            console.error("Resend Error:", data.error);
            return NextResponse.json({ error: data.error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Internal API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
