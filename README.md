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

### 7. 🗄️ Base de Données Transactionnelle (IndexedDB) & Sécurité
- **Base de Données Locale Dédiée** : Vos données sont structurées et stockées dans une véritable base de données transactionnelle standardisée W3C (**IndexedDB : `LeLapinMalin_DB`**), avec des tables séparées pour le cheptel (`rabbits`), les saillies (`breedings`), le carnet de santé (`healthLogs`), les finances (`finances`), les stocks (`feedStock`) et la configuration (`settings`).
- **Persistance Garantie** : Demande d'autorisation de persistance permanente au navigateur (`navigator.storage.persist()`) pour prévenir toute suppression automatique par le système d'exploitation.
- **Double Redondance** : Sauvegarde miroir continue dans `localStorage` pour une tolérance totale aux pannes.
- **Sauvegardes & Restauration Complètes** : Exportation d'un dump JSON de la base en 1 clic et réimportation instantanée.

---

## 🚀 Comment Lancer le Logiciel ?

1. Rendez-vous dans le dossier :
   ```
   C:\Users\Fall\.gemini\antigravity-ide\scratch\lelapinmalin
   ```
2. Double-cliquez simplement sur le fichier **`index.html`**.
3. Il s'ouvrira immédiatement dans votre navigateur habituel (Google Chrome, Microsoft Edge, Firefox, Brave...).
4. Des données d'exemples réalistes sont déjà pré-chargées pour vous permettre de découvrir toutes les fonctionnalités immédiatement !

---

## 🎨 Personnalisation & Thèmes
- Cliquez sur l'icône **Soleil / Lune** en bas du menu latéral pour basculer à tout moment entre le **Mode Sombre** et le **Mode Clair**.
