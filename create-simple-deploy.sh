#!/bin/bash

# Script ultra-simplifié pour déploiement cPanel
set -e

echo "🚀 Création du package simplifié pour cPanel..."

PACKAGE_NAME="cinemarthon-simple-$(date +%Y%m%d-%H%M%S).zip"
TEMP_DIR="deploy-simple"

# Nettoyer
if [ -d "$TEMP_DIR" ]; then
    rm -rf "$TEMP_DIR"
fi

mkdir -p "$TEMP_DIR"

# Vérifier le build
if [ ! -d ".next" ]; then
    echo "❌ Erreur: Exécutez 'pnpm run build' d'abord."
    exit 1
fi

echo "📦 Copie des fichiers essentiels..."

# Package.json et config
cp package.json "$TEMP_DIR/"
cp next.config.js "$TEMP_DIR/"
[ -f "pnpm-lock.yaml" ] && cp pnpm-lock.yaml "$TEMP_DIR/"
[ -f "package-lock.json" ] && cp package-lock.json "$TEMP_DIR/"

# Répertoires obligatoires
cp -r public "$TEMP_DIR/"
cp -r .next "$TEMP_DIR/"

# Sources (Next.js en a besoin même en production)
[ -d "src" ] && cp -r src "$TEMP_DIR/"
[ -d "pages" ] && cp -r pages "$TEMP_DIR/"

# TypeScript config si présent
[ -f "tsconfig.json" ] && cp tsconfig.json "$TEMP_DIR/"
[ -f "next-env.d.ts" ] && cp next-env.d.ts "$TEMP_DIR/"

# Script de démarrage ultra-simple
cat > "$TEMP_DIR/start.sh" << 'STARTSCRIPT'
#!/bin/bash
export NODE_ENV=production
npx next start -p ${PORT:-3000}
STARTSCRIPT

chmod +x "$TEMP_DIR/start.sh"

# Instructions simples
cat > "$TEMP_DIR/DEPLOY.txt" << 'INSTRUCTIONS'
DÉPLOIEMENT SUR cPANEL - Instructions rapides
=============================================

1. SETUP Node.js App dans cPanel :
   - Node.js version : 18.x
   - Application mode : Production
   - Application root : /home/votreuser/cinemarthon-app
   - Application startup file : start.sh
   - Application URL : votre-domaine.com

2. Uploader et extraire le zip dans le dossier configuré

3. Via Terminal cPanel :
   cd ~/cinemarthon-app
   
   # Activer l'environnement Node.js (commande fournie par cPanel)
   source /home/votreuser/nodevenv/cinemarthon-app/18/bin/activate
   
   # Installer les dépendances
   npm install --production
   
4. Démarrer depuis l'interface "Setup Node.js App" dans cPanel
   OU via terminal : ./start.sh

5. Si problème, vérifier les logs :
   tail -f ~/logs/nodejs_app_error.log

IMPORTANT : Le PORT est automatiquement assigné par cPanel
INSTRUCTIONS

# Créer l'archive
echo "🗜️  Création de l'archive..."
cd "$TEMP_DIR"
zip -r "../$PACKAGE_NAME" . -q
cd ..

rm -rf "$TEMP_DIR"

SIZE=$(du -h "$PACKAGE_NAME" | cut -f1)

echo ""
echo "✅ Package créé : $PACKAGE_NAME ($SIZE)"
echo ""
echo "📤 Étapes rapides :"
echo "   1. Uploader $PACKAGE_NAME sur cPanel"
echo "   2. Extraire dans le dossier de l'application"
echo "   3. npm install --production"
echo "   4. Configurer et démarrer via 'Setup Node.js App'"
