
import * as React from 'react';

interface JobApplicationTemplateProps {
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  coverLetter: string;
}

export const JobApplicationTemplate: React.FC<Readonly<JobApplicationTemplateProps>> = ({
  name,
  email,
  phone,
  jobTitle,
  coverLetter,
}) => (
  <div style={{ 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', 
    backgroundColor: '#09090b', // zinc-950
    color: '#e4e4e7', // zinc-200
    padding: '40px 20px',
    minHeight: '100%'
  }}>
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      backgroundColor: '#18181b', // zinc-900 
      borderRadius: '16px', 
      overflow: 'hidden',
      border: '1px solid #27272a' // zinc-800
    }}>
      {/* Header */}
      <div style={{ 
        padding: '32px 40px',
        borderBottom: '1px solid #27272a',
        background: 'linear-gradient(to right, #18181b, #27272a)'
      }}>
        <h1 style={{ 
          color: '#ffffff', 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: '700',
          letterSpacing: '-0.5px'
        }}>
          Shift2<span style={{ color: '#10b981' }}>Dynamic</span>
        </h1>
        <p style={{
            color: '#71717a', // zinc-500
            fontSize: '13px',
            margin: '8px 0 0 0',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: '600'
        }}>New Job Application</p>
      </div>

      {/* Content */}
      <div style={{ padding: '40px' }}>
        
        {/* Job & Candidate Grid */}
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '16px',
            marginBottom: '32px'
        }}>
            <div style={{ backgroundColor: '#27272a', padding: '16px', borderRadius: '8px' }}>
               <div style={{ color: '#71717a', fontSize: '12px', marginBottom: '4px' }}>CANDIDATE</div>
               <div style={{ color: '#fff', fontWeight: '600' }}>{name}</div>
            </div>
             <div style={{ backgroundColor: '#27272a', padding: '16px', borderRadius: '8px' }}>
               <div style={{ color: '#71717a', fontSize: '12px', marginBottom: '4px' }}>POSITION</div>
               <div style={{ color: '#10b981', fontWeight: '600' }}>{jobTitle}</div>
            </div>
        </div>

        {/* Contact Details */}
        <div style={{ marginBottom: '32px' }}>
            <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#a1a1aa', 
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '1px solid #27272a',
            paddingBottom: '10px',
            marginBottom: '16px'
            }}>
            Contact Information
            </h2>

            <div style={{ marginBottom: '16px' }}>
                <div style={{ color: '#71717a', fontSize: '13px', marginBottom: '4px' }}>EMAIL</div>
                <div style={{ color: '#e4e4e7', fontSize: '15px' }}>
                    <a href={`mailto:${email}`} style={{ color: '#e4e4e7', textDecoration: 'none' }}>{email}</a>
                </div>
            </div>

            {phone && (
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#71717a', fontSize: '13px', marginBottom: '4px' }}>PHONE</div>
                    <div style={{ color: '#e4e4e7', fontSize: '15px' }}>{phone}</div>
                </div>
            )}
        </div>

        {/* Cover Letter */}
        <div style={{ backgroundColor: '#27272a', padding: '24px', borderRadius: '12px' }}>
            <div style={{ color: '#71717a', fontSize: '12px', marginBottom: '12px', fontWeight: 'bold' }}>COVER LETTER</div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#d4d4d8', whiteSpace: 'pre-wrap' }}>
                {coverLetter || 'No cover letter provided.'}
            </p>
        </div>

      </div>

      {/* Footer CTA */}
      <div style={{ 
          padding: '24px 40px',
          textAlign: 'center',
          borderTop: '1px solid #27272a',
          backgroundColor: '#09090b'
      }}>
         <a 
            href={`mailto:${email}`}
            style={{ 
                display: 'inline-block', 
                backgroundColor: '#fff', 
                color: '#000', 
                textDecoration: 'none', 
                padding: '12px 32px', 
                borderRadius: '8px', 
                fontSize: '14px', 
                fontWeight: '600',
                boxShadow: '0 0 20px rgba(255,255,255,0.1)'
            }}
         >
            Reply to Candidate
         </a>
         <div style={{ marginTop: '16px', fontSize: '12px', color: '#52525b' }}>
            Resume attached to this email
         </div>
      </div>
    </div>
  </div>
);
