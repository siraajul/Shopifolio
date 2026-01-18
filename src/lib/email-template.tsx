import * as React from 'react';

interface EmailTemplateProps {
  formData: any;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  formData,
}) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
    <h1 style={{ color: '#000', borderBottom: '2px solid #000', paddingBottom: '10px' }}>New Project Inquiry</h1>
    <p><strong>Name:</strong> {formData.name}</p>
    <p><strong>Email:</strong> {formData.email}</p>
    <p><strong>Company:</strong> {formData.company || 'N/A'}</p>
    <p><strong>Role:</strong> {formData.profession}</p>
    <p><strong>Industry:</strong> {formData.industry}</p>
    
    <h2 style={{ marginTop: '20px', borderBottom: '1px solid #ddd' }}>Project Details</h2>
    <p><strong>Goal:</strong> {formData.primaryGoal}</p>
    <p><strong>Audience:</strong> {formData.targetAudience}</p>
    <p><strong>Style:</strong> {formData.stylePreference}</p>
    <p><strong>Inspirations:</strong> {formData.inspirations}</p>
    
    <h2 style={{ marginTop: '20px', borderBottom: '1px solid #ddd' }}>Logistics</h2>
    <p><strong>Budget:</strong> {formData.budget}</p>
    <p><strong>Timeline:</strong> {formData.timeline}</p>
    <p><strong>Features:</strong> {formData.features.join(', ')}</p>
    
    <h2 style={{ marginTop: '20px', borderBottom: '1px solid #ddd' }}>Extra Info</h2>
    <p>{formData.additionalInfo || 'No additional info provided.'}</p>
  </div>
);
