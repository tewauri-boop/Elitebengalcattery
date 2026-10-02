import { FORMS, CONTACT } from '@/src/config/site.js';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, message, kitten, phone } = data;

    if (!name || !email) {
      return Response.json(
        { success: false, message: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // In pending mode or Web3Forms proxy mode
    if (FORMS.provider === 'web3forms') {
      if (!FORMS.web3formsKey || FORMS.web3formsKey === 'pending') {
        // Safe pending fallback
        return Response.json({
          success: true,
          mode: 'pending_redirect',
          message: 'Inquiry received. Live delivery and concierge available via WhatsApp.',
        });
      }

      // Forward to Web3Forms if key is provided
      const formData = new FormData();
      formData.append('access_key', FORMS.web3formsKey);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', `Kitten: ${kitten || 'General Inquiry'}\nPhone: ${phone || 'N/A'}\n\n${message || ''}`);
      formData.append('subject', `Kitten Inquiry from ${name}`);
      formData.append('from_name', 'Elite Bengal Cattery Inquiries');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      const result = await res.json();
      return Response.json(result);
    }

    return Response.json({
      success: true,
      message: 'Inquiry received.',
    });
  } catch (err) {
    return Response.json(
      { success: false, message: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}
