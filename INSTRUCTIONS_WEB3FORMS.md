# 🚀 Configuration Web3Forms - 2 minutes chrono !

Le code est déjà en place, il ne reste que 3 étapes simples :

## Étape 1 : Créer un compte gratuit (30 secondes)

1. Allez sur <https://web3forms.com>
2. Cliquez sur "Get Started" ou "Sign Up"
3. Créez un compte (vous pouvez utiliser Google)

## Étape 2 : Obtenir votre Access Key (30 secondes)

1. Une fois connecté, allez dans "Access Keys"
2. Configurez votre email de destination : **cinemarthon@gmail.com**
3. Copiez votre "Access Key" (format : `a1b2c3d4-1234-5678-90ab-cdefghijklmn`)

## Étape 3 : Ajouter la clé dans votre projet (1 minute)

1. Ouvrez le fichier `.env` à la racine du projet
2. Remplacez `votre_access_key_ici` par votre vraie clé :

```env
WEB3FORMS_ACCESS_KEY=a1b2c3d4-1234-5678-90ab-cdefghijklmn
```

3. Sauvegardez le fichier
4. Redémarrez votre serveur Next.js

## ✅ C'est terminé !

Testez en allant sur `/contact` et en envoyant un message de test.

Les emails arriveront directement à **cinemarthon@gmail.com** !

---

## 📧 Personnalisation (optionnel)

Vous pouvez personnaliser les emails reçus depuis le tableau de bord Web3Forms :
- Changer l'adresse email de réception
- Ajouter plusieurs destinataires
- Personnaliser le format des emails
- Activer les notifications

## ❓ Besoin d'aide ?

- Documentation Web3Forms : <https://docs.web3forms.com>
- En cas de problème, vérifiez que :
  - Votre Access Key est correcte (pas d'espaces avant/après)
  - Le fichier `.env` est bien à la racine du projet
  - Vous avez redémarré le serveur Next.js après modification
