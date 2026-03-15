import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'node:fs';
import path from 'node:path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { file } = req.query;

  // Liste blanche des fichiers autorisés
  const allowedFiles: { [key: string]: string } = {
    'programme-famille': 'Programmation_famille.pdf',
    'programme-classique': 'Programmation.pdf',
  };

  if (typeof file !== 'string' || !allowedFiles[file]) {
    return res.status(400).json({ error: 'Fichier non valide' });
  }

  const fileName = allowedFiles[file];
  const filePath = path.join(process.cwd(), 'public', fileName);

  // Vérifier si le fichier existe
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Fichier non trouvé' });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);

    // Headers pour forcer le téléchargement sur mobile
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', fileBuffer.length);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache 24h
    
    res.status(200).send(fileBuffer);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
