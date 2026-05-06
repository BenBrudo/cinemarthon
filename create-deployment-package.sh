#!/bin/bash

# Script de création d'un package de déploiement manuel pour cPanel
# Génère un zip avec les fichiers nécessaires pour déployer l'application

set -e

echo "🚀 Création du package de déploiement pour cPanel..."

# Nom du package
PACKAGE_NAME="cinemarthon-deploy-$(date +%Y%m%d-%H%M%S).zip"
TEMP_DIR="deploy-temp"

# Nettoyer le répertoire temporaire s'il existe
if [ -d "$TEMP_DIR" ]; then
    echo "🧹 Nettoyage du répertoire temporaire..."
    rm -rf "$TEMP_DIR"
fi

# Créer le répertoire temporaire
mkdir -p "$TEMP_DIR"

# Vérifier que le build existe
if [ ! -d ".next" ]; then
    echo "❌ Erreur: Le répertoire .next n'existe pas."
    echo "   Veuillez exécuter 'pnpm run build' ou 'npm run build' d'abord."
    exit 1
fi

echo "📦 Copie des fichiers de production..."

# Copier les fichiers essentiels pour Next.js complet
echo "  - Fichiers de configuration"
cp package.json "$TEMP_DIR/"
if [ -f "package-lock.json" ]; then
    cp package-lock.json "$TEMP_DIR/"
fi
if [ -f "pnpm-lock.yaml" ]; then
    cp pnpm-lock.yaml "$TEMP_DIR/"
fi
cp next.config.js "$TEMP_DIR/"

# Copier le répertoire public
echo "  - public/"
cp -r public "$TEMP_DIR/"

# Copier tout le répertoire .next
echo "  - .next/"
cp -r .next "$TEMP_DIR/"

# Copier les fichiers source nécessaires
echo "  - src/, pages/ et autres fichiers sources"
if [ -d "src" ]; then
    cp -r src "$TEMP_DIR/"
fi
if [ -d "pages" ]; then
    cp -r pages "$TEMP_DIR/"
fi
if [ -d "styles" ]; then
    cp -r styles "$TEMP_DIR/"
fi
if [ -f "tsconfig.json" ]; then
    cp tsconfig.json "$TEMP_DIR/"
fi
if [ -f "next-env.d.ts" ]; then
    cp next-env.d.ts "$TEMP_DIR/"
fi

# Créer un script de démarrage pour cPanel
echo "📝 Création du script de démarrage pour cPanel..."
cat > "$TEMP_DIR/start.sh" << 'EOF'
#!/bin/bash

# Script de démarrage pour cPanel
export NODE_ENV=production
export PORT=${PORT:-3000}

echo "🚀 Démarrage de l'application Next.js sur le port $PORT..."
npx next start -p $PORT
EOF

chmod +x "$TEMP_DIR/start.sh"

# Créer aussi un fichier server.js alternatif pour cPanel
cat > "$TEMP_DIR/server.js" << 'EOF'
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = false
const hostname = process.env.HOSTNAME || '0.0.0.0'
const port = parseInt(process.env.PORT || '3000', 10)

// Initialiser Next.js simplement avec le répertoire courant
const app = next({ 
  dev, 
  hostname, 
  port,
  dir: __dirname
})

const handle = app.getRequestHandler()

console.log('Preparing Next.js application...')
console.log('Working directory:', __dirname)
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('PORT:', port)

app.prepare().then(() => {
  console.log('Next.js application ready')
  
  createServer(async (req, res) => {
    try {
      // Parser l'URL
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl
      
      console.log(`${new Date().toISOString()} - ${req.method} ${pathname}`)
      
      // Laisser Next.js gérer toutes les requêtes
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
    .once('error', (err) => {
      console.error('Server error:', err)
      process.exit(1)
    })
    .listen(port, hostname, () => {
      console.log(`✓ Server ready on http://${hostname}:${port}`)
    })
}).catch((err) => {
  console.error('Failed to prepare Next.js application:', err)
  process.exit(1)
})
EOF

# Créer un fichier .htaccess pour Apache (si utilisé avec Passenger sur cPanel)
cat > "$TEMP_DIR/.htaccess" << 'EOF'
# Redirection vers l'application Node.js
# Note: Ce fichier peut ne pas être nécessaire si cPanel gère directement Node.js

# Activer le module de réécriture
RewriteEngine On

# Ne pas rediriger les fichiers statiques existants
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Rediriger toutes les autres requêtes vers l'application Node.js
# (Le port sera géré par la configuration cPanel)
RewriteRule ^(.*)$ http://localhost:PORT/$1 [P,L]
EOF

# Créer un fichier de configuration passenger (si Passenger est utilisé)
cat > "$TEMP_DIR/passenger_wsgi.py.disabled" << 'EOF'
# Ce fichier est pour référence uniquement
# cPanel utilise généralement son propre système pour Node.js
# Renommer en passenger_wsgi.py si nécessaire
EOF

# Créer un fichier README pour le déploiement cPanel
echo "📝 Création du README de déploiement cPanel..."
cat > "$TEMP_DIR/README-DEPLOY.md" << 'EOF'
# Guide de déploiement manuel sur cPanel

## Prérequis
- Node.js 18 ou supérieur configuré dans cPanel
- Accès SSH ou gestionnaire de fichiers cPanel
- Variables d'environnement configurées

## Instructions de déploiement sur cPanel

### Méthode 1 : Via SSH (recommandé)

1. **Téléverser et extraire l'archive**
   ```bash
   cd ~/cinemarthon-app
   unzip cinemarthon-deploy-*.zip
   ```

2. **Installer les dépendances de production**
   ```bash
   npm install --production
   # ou si vous utilisez pnpm
   pnpm install --prod
   ```

3. **Configurer les variables d'environnement**
   Créer un fichier `.env` ou configurer dans cPanel :
   ```
   NODE_ENV=production
   PORT=3000
   ```

4. **Démarrer l'application**
   
   Option A - Avec le script start.sh :
   ```bash
   ./start.sh
   ```
   
   Option B - Avec node directement :
   ```bash
   node server.js
   ```
   
   Option C - Avec PM2 (si installé) :
   ```bash
   pm2 start server.js --name cinemarthon
   pm2 save
   ```

### Méthode 2 : Via le gestionnaire de fichiers cPanel

1. Téléverser le fichier zip via le gestionnaire de fichiers
2. Extraire l'archive dans le dossier de votre application
3. Ouvrir le Terminal dans cPanel
4. Naviguer vers le dossier : `cd ~/cinemarthon-app`
5. Installer les dépendances : `npm install --production`
6. Démarrer : `node server.js`

## Configuration de l'application Node.js dans cPanel

### Créer une application Node.js dans cPanel

1. Aller dans **Setup Node.js App** dans cPanel
2. Créer une nouvelle application avec :
   - **Node.js version** : 18.x ou supérieur
   - **Application mode** : Production
   - **Application root** : /home/votreuser/cinemarthon-app
   - **Application URL** : votre domaine ou sous-domaine
   - **Application startup file** : server.js
   - **PORT** : Utiliser le port assigné par cPanel (variable d'environnement)

3. Cliquer sur "Create"

4. Une fois créée, cPanel vous donnera un script pour entrer dans l'environnement Node.js :
   ```bash
   source /home/votreuser/nodevenv/cinemarthon-app/18/bin/activate
   ```

5. Installer les dépendances :
   ```bash
   npm install --production
   ```

6. Démarrer/Redémarrer l'application depuis l'interface cPanel

## Variables d'environnement importantes

Configurer dans cPanel ou dans un fichier `.env` :
- `NODE_ENV=production`
- `PORT` : Port assigné par cPanel (souvent fourni automatiquement)
- Autres variables spécifiques à votre application (API keys, etc.)

## Gestion avec PM2 (optionnel)

Si PM2 est disponible sur votre hébergement :

```bash
# Installer PM2 globalement (si possible)
npm install -g pm2

# Démarrer l'application
pm2 start server.js --name cinemarthon

# Sauvegarder la configuration
pm2 save

# Configuration du démarrage automatique
pm2 startup
```

## Résolution des problèmes

### L'application ne démarre pas
- Vérifier que Node.js 18+ est installé : `node --version`
- Vérifier que les dépendances sont installées : `ls node_modules`
- Vérifier les logs d'erreur dans cPanel ou avec `pm2 logs`

### Erreurs 404 - Pages non trouvées

**Problème le plus courant sur cPanel** : L'application doit être configurée sur un domaine/sous-domaine.

**Solution 1 : Vérifier la configuration du domaine dans cPanel**
- Dans "Setup Node.js App", assurez-vous que :
  - **Application URL** pointe vers votre domaine ou sous-domaine
  - Le domaine est correctement configuré dans cPanel
  - Pas de conflit avec d'autres applications

**Solution 2 : Vérifier les logs**
```bash
# Voir les logs de l'application
tail -f ~/nodevenv/cinemarthon-app/18/logs/app.log
# ou
pm2 logs cinemarthon
```

**Solution 3 : Tester directement avec le port**
Si vous avez accès SSH, testez directement :
```bash
curl http://localhost:PORT/
```
Remplacez PORT par le port assigné par cPanel.

**Solution 4 : Redémarrer l'application**
- Via cPanel : Cliquer sur "Restart" dans Setup Node.js App
- Via SSH : `pm2 restart cinemarthon` ou relancer `node server.js`

**Solution 5 : Vérifier les permissions**
```bash
# S'assurer que tous les fichiers appartiennent au bon utilisateur
chown -R $(whoami):$(whoami) ~/cinemarthon-app
chmod -R 755 ~/cinemarthon-app
```

### Erreur de port
- Sur cPanel, le port est souvent assigné automatiquement
- Utiliser la variable d'environnement PORT fournie par cPanel
- Ne pas hardcoder le port 3000 si cPanel en assigne un autre

### Assets statiques (CSS, JS, images) ne se chargent pas

**Vérifier que les fichiers .next/static existent :**
```bash
ls -la .next/static/
```

**Vérifier que public/ est bien présent :**
```bash
ls -la public/
```

**Si les assets ne se chargent toujours pas :**
- Vérifier la configuration du domaine dans cPanel
- Redémarrer l'application
- Vérifier les logs pour des erreurs de chemin

### Performance
- Assurez-vous que `NODE_ENV=production` est bien défini
- Vérifier les ressources allouées dans cPanel (RAM, CPU)
- Utiliser PM2 pour la gestion des processus et le redémarrage automatique

### Debug avancé

**Activer les logs détaillés :**
Modifier `server.js` pour ajouter plus de logs, ou lancer avec :
```bash
NODE_ENV=production DEBUG=* node server.js
```

**Vérifier que Next.js trouve bien ses fichiers :**
```bash
ls -la .next/
ls -la .next/static/
ls -la .next/server/
```

## Support
Pour plus d'informations sur la configuration Node.js dans cPanel :
https://docs.cpanel.net/cpanel/software/application-manager/
EOF

# Créer l'archive zip
echo "🗜️  Création de l'archive $PACKAGE_NAME..."
cd "$TEMP_DIR"
zip -r "../$PACKAGE_NAME" . > /dev/null
cd ..

# Nettoyer le répertoire temporaire
echo "🧹 Nettoyage..."
rm -rf "$TEMP_DIR"

# Afficher les informations du package
PACKAGE_SIZE=$(du -h "$PACKAGE_NAME" | cut -f1)
echo ""
echo "✅ Package créé avec succès!"
echo "📦 Fichier: $PACKAGE_NAME"
echo "📏 Taille: $PACKAGE_SIZE"
echo ""
echo "🔧 Déploiement sur cPanel:"
echo "  1. Téléverser $PACKAGE_NAME sur le serveur via FTP/SSH"
echo "  2. Extraire: unzip $PACKAGE_NAME"
echo "  3. Installer les dépendances: npm install --production"
echo "  4. Configurer l'application Node.js dans cPanel:"
echo "     - Application root: chemin vers le dossier"
echo "     - Application startup file: server.js"
echo "     - Variables d'environnement: NODE_ENV=production"
echo "  5. Démarrer l'application depuis cPanel"
echo ""
echo "📖 Consultez README-DEPLOY.md dans le zip pour plus de détails"
