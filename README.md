# 🐰 Le Lapin Malin - Logiciel de Gestion d'Élevage Cunicole

**Le Lapin Malin** est une application web moderne, légère, autonome et prête à l'emploi, spécialement conçue pour gérer efficacement et simplement une ferme d'élevage de lapins (cuniculiculture familiale ou professionnelle).

---

## 🌟 Fonctionnalités Principales

### 1. 📊 Tableau de Bord Intelligent
- **Indicateurs Clés (KPIs) en temps réel** : Total reproducteurs mâles/femelles, femelles gestantes, portées en cours au nid, effectif en engraissement.
- **Alertes automatiques du jour** :
  - 🔍 **Palpation** (J+12 après la saillie)
  - 📦 **Pose de la boîte à nid** (J+28)
  - 👶 **Mises bas imminentes** (J+31)
  - 🥛 **Sevrages à effectuer** (J+35)
  - 💉 **Soins & rappels de vaccins**
- Graphique interactif de répartition du cheptel.

### 2. 📋 Gestion du Cheptel (Annuaire des Lapins)
- Fiches complètes : Matricule/Boucle, Nom, Race, Clapier/Cage, Sexe, Date de naissance, Poids (kg), Statut sanitaire/reproduction.
- Filtres instantanés (par sexe, statut) et barre de recherche rapide.
- **Fiches de Clapier Imprimables** : Bouton d'impression direct pour générer des étiquettes de cage officielles avec toutes les informations requises prêtes à accrocher aux clapiers.

### 3. 💕 Reproduction & Suivi des Mises Bas
- Déclaration des accouplements (sélection du mâle et de la femelle).
- Calcul automatique des jalons cunicoles clés (Palpation, Nid, Mise bas, Sevrage).
- Déclaration des naissances : nés vivants, morts-nés, et comptage au sevrage.
- Mise à jour automatique du statut des mères (Gestante ➔ Allaitante ➔ En repos).

### 4. 💉 Carnet Sanitaire & Soins Vétérinaires
- Enregistrement des vaccinations (Myxomatose, VHD 1 & 2), vermifugations, anticoccidiens et traitements.
- Suivi individuel ou pour tout le cheptel.
- Alertes pour les dates de rappel.

### 5. 💰 Comptabilité Simple (Ventes & Dépenses)
- Enregistrement des rentrées (ventes de reproducteurs, lapins de chair, engrais) et sorties (aliments granulés, foin, litière, matériel).
- Calcul instantané du bénéfice net et des marges.

### 6. 🌽 Stocks d'Alimentation
- Réserves en kg : granulés, foin, paille pour les nids.
- Calcul automatique des **jours d'autonomie** restants selon la consommation journalière de votre cheptel.

### 7. 🔐 Comptes et synchronisation
- Connexion et inscription par courriel avec **Supabase Auth**.
- Données de chaque compte synchronisées dans Supabase et isolées par utilisateur grâce aux règles Row Level Security.
- Cache local IndexedDB séparé par compte, en complément de la copie synchronisée en ligne.
- Exportation des données en JSON depuis l'application.

---

## 🚀 Configuration et lancement

### Configurer Supabase

1. Créez un projet Supabase et activez le fournisseur d'authentification par courriel.
2. Dans l'éditeur SQL Supabase, exécutez le contenu de [`supabase-schema.sql`](./supabase-schema.sql). Cette table stocke les données de ferme et ses politiques RLS limitent chaque compte à ses propres données.
3. Dans [`supabase-config.js`](./supabase-config.js), renseignez l'URL du projet et sa clé publique `anon` (ou `publishable`). **N'utilisez jamais la clé `service_role` dans le navigateur.**
4. Dans les paramètres Auth de Supabase, configurez l'URL du site et les URL de redirection autorisées pour l'adresse locale et le domaine de production.

### Démarrer l'application

L'authentification nécessite une origine HTTP ; l'ouverture directe de `index.html` avec `file://` ne suffit pas. Depuis le dossier du projet, lancez un serveur local :

```powershell
py -m http.server 8000
```

Ouvrez ensuite `http://localhost:8000` dans votre navigateur. Pour un déploiement, publiez les fichiers statiques sur un hébergeur HTTPS et ajoutez son URL aux redirections autorisées Supabase.

Les données déjà présentes dans l'ancienne base locale ne sont pas automatiquement transférées dans les nouveaux comptes.

---

## 🎨 Personnalisation & Thèmes
- Cliquez sur l'icône **Soleil / Lune** sur l'écran de connexion ou en bas du menu latéral pour basculer entre le **Mode Sombre** et le **Mode Clair**. Votre préférence est mémorisée sur cet appareil.
