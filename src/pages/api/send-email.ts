import type { NextApiRequest, NextApiResponse } from 'next';

interface EmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { name, email, subject, message }: EmailRequest = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalide' });
    }

    // Envoi via Web3Forms - Simple et gratuit !
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        from_name: name,
        email: email,
        subject: `[Contact Silverado] ${subject}`,
        message: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return res.status(200).json({ 
        success: true,
        message: 'Message envoyé avec succès' 
      });
    } else {
      throw new Error(data.message || 'Échec de l\'envoi');
    }

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return res.status(500).json({ 
      error: 'Erreur lors de l\'envoi du message' 
    });
  }
}
