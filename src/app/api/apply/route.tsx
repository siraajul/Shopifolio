
import { JobApplicationTemplate } from '@/lib/job-application-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate store: Map<IP, { count: number, resetTime: number }>
// Note: In a serverless environment (Vercel), this memory is not shared across lambda instances
// but provides basic protection against spam bursts from a single instance.
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

        const formData = await request.formData();
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const coverLetter = formData.get('coverLetter') as string;
        const jobTitle = formData.get('jobTitle') as string;
        const file = formData.get('resume') as File | null;

        if (!name || !email || !file) {
            return NextResponse.json(
                { error: 'Name, Email, and Resume are required' },
                { status: 400 }
            );
        }

        // Convert file to Buffer for Resend
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const data = await resend.emails.send({
            from: 'Shift2Dynamic Careers <careers@leads.shift2dynamic.com>',
            to: ['business@shift2dynamic.com'],
            subject: `Job Application: ${jobTitle} - ${name}`,
            react: <JobApplicationTemplate
                name={name}
                email={email}
                phone={phone || 'N/A'}
                jobTitle={jobTitle}
                coverLetter={coverLetter}
            />,
            replyTo: email,
            attachments: [
                {
                    filename: file.name,
                    content: buffer,
                },
            ],
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
