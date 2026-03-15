# Configuration de l'envoi d'emails

Le formulaire de contact peut fonctionner de plusieurs façons, de la plus simple à la plus avancée.

## ✅ SOLUTION SIMPLE (Recommandée) : Web3Forms

**Avantages** : Gratuit illimité, 2 minutes de configuration, aucun serveur email à configurer

1. Créer un compte gratuit sur <https://web3forms.com>

2. Copier votre "Access Key" (ex: `a1b2c3d4-1234-5678-90ab-cdefghijklmn`)

3. Remplacer tout le contenu de `/src/pages/api/send-email.ts` par :

```typescript
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

    // Envoi via Web3Forms
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
```

4. Créer un fichier `.env.local` à la racine du projet :

```env
WEB3FORMS_ACCESS_KEY=votre_access_key_ici
```

5. C'est tout ! Les emails arriveront directement à cinemarthon@gmail.com

---

## ⚡ SOLUTION ULTRA-SIMPLE : Lien mailto:

Encore plus simple : utilisez un lien qui ouvre directement le client email de l'utilisateur.

Remplacer `/src/pages/contact.tsx` par un simple lien :

```tsx
<a 
  href="mailto:cinemarthon@gmail.com?subject=Contact depuis Le Silverado"
  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
>
  Nous envoyer un email
</a>
```

**Avantages** : Zéro configuration, fonctionne immédiatement
**Inconvénients** : Nécessite que l'utilisateur ait un client email configuré

---

## 📧 OPTIONS AVANCÉES (si besoin de plus de contrôle)

---

## 📧 OPTIONS AVANCÉES (si besoin de plus de contrôle)

### Option A: Nodemailer avec Gmail

1. Installer les dépendances :
```bash
npm install nodemailer @types/nodemailer
```

2. Créer un App Password Gmail :
   - Aller sur https://myaccount.google.com/security
   - Activer la validation en 2 étapes
   - Créer un "App Password" pour "Mail"

3. Ajouter les variables d'environnement dans `.env.local` :
```env
EMAIL_USER=cinemarthon@gmail.com
EMAIL_PASSWORD=votre_app_password
```

4. Remplacer le code dans `/src/pages/api/send-email.ts` :
```typescript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

await transporter.sendMail({
  from: email,
  to: 'cinemarthon@gmail.com',
  subject: `[Contact Silverado] ${subject}`,
  html: `
    <h3>Nouveau message de contact</h3>
    <p><strong>Nom:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Sujet:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `,
  replyTo: email,
});
```

### Option B: SendGrid

1. Créer un compte sur https://sendgrid.com

2. Installer la dépendance :
```bash
npm install @sendgrid/mail
```

3. Ajouter dans `.env.local` :
```env
SENDGRID_API_KEY=votre_api_key
SENDGRID_FROM_EMAIL=email_verifie@votredomaine.com
```

4. Remplacer le code dans `/src/pages/api/send-email.ts` :
```typescript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: 'cinemarthon@gmail.com',
  from: process.env.SENDGRID_FROM_EMAIL,
  replyTo: email,
  subject: `[Contact Silverado] ${subject}`,
  html: `
    <h3>Nouveau message de contact</h3>
    <p><strong>Nom:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Sujet:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `,
});
```

---

## 📊 Comparaison des solutions

| Solution | Difficulté | Gratuit | Configuration |
|----------|-----------|---------|---------------|
| **Web3Forms** | ⭐ Très facile | Oui (illimité) | 2 minutes |
| **Mailto:** | ⭐ Immédiat | Oui | 0 minute |
| **Nodemailer** | ⭐⭐⭐ Complexe | Oui | 15-30 minutes |
| **SendGrid** | ⭐⭐ Moyen | Oui (100/jour) | 10 minutes |

**Recommandation** : Utilisez Web3Forms pour un parfait équilibre entre simplicité et fonctionnalité.
