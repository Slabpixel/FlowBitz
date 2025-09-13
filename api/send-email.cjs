const { google } = require('googleapis');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, type, subject, message } = req.body;

    console.log('Received request:', { name, email, type, subject, message: message?.substring(0, 50) + '...' });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if environment variables are available
    if (!process.env.GOOGLE_PROJECT_ID || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_CLIENT_EMAIL) {
      console.error('Missing environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Set up Gmail API with environment variables
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
        universe_domain: "googleapis.com"
      },
      scopes: ['https://www.googleapis.com/auth/gmail.send'],
    });

    const gmail = google.gmail({ version: 'v1', auth });

    // Create email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #007bff;">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Type:</strong> <span style="background-color: #007bff; color: white; padding: 2px 8px; border-radius: 3px; font-size: 12px;">${type.toUpperCase()}</span></p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #007bff; border-radius: 0 5px 5px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px; font-size: 12px; color: #666;">
            <p style="margin: 0;">Sent from <strong>FlowBitz Contact Form</strong></p>
            <p style="margin: 5px 0 0 0;">Time: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;

    // Send email
    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(
          `To: hello@slabpixel.com\r\n` +
          `From: hello@slabpixel.com\r\n` +
          `Subject: [${type.toUpperCase()}] ${subject}\r\n` +
          `Content-Type: text/html; charset=utf-8\r\n\r\n` +
          `${emailContent}`
        ).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
      },
    });

    console.log('Email sent successfully:', result.data.id);

    res.json({ 
      success: true, 
      messageId: result.data.id,
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}