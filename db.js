/**
 * Le Lapin Malin - Gestionnaire de Base de Données IndexedDB
 * Couche de persistance transactionnelle moderne, locale et illimitée
 */

class LeLapinMalinDB {
  constructor(dbName = 'LeLapinMalin_DB', version = 1) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
    this.isReady = false;
  }

  /**
   * Ouvre la connexion IndexedDB et initialise les schémas de tables (ObjectStores)
   */
  async init() {
    // Demander la persistance permanente du stockage (évite les purges automatiques du navigateur)
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
      try {
        await navigator.storage.persist();
      } catch (e) {
        console.warn('Persistance permanente du stockage:', e);
      }
    }

    return new Promise((resolve, reject) => {
      if (typeof indexedDB === 'undefined') {
        console.warn('IndexedDB n\'est pas supporté par ce navigateur. Bascule sur stockage local.');
        this.isReady = false;
        resolve(null);
        return;
      }

      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Table 1 : Lapins / Cheptel
        if (!db.objectStoreNames.contains('rabbits')) {
          const store = db.createObjectStore('rabbits', { keyPath: 'id' });
          store.createIndex('sex', 'sex', { unique: false });
          store.createIndex('status', 'status', { unique: false });
          store.createIndex('cage', 'cage', { unique: false });
        }

        // Table 2 : Reproduction & Saillies
        if (!db.objectStoreNames.contains('breedings')) {
          const store = db.createObjectStore('breedings', { keyPath: 'id' });
          store.createIndex('femaleId', 'femaleId', { unique: false });
          store.createIndex('maleId', 'maleId', { unique: false });
          store.createIndex('status', 'status', { unique: false });
          store.createIndex('date', 'date', { unique: false });
        }

        // Table 3 : Carnet Sanitaire & Soins
        if (!db.objectStoreNames.contains('healthLogs')) {
          const store = db.createObjectStore('healthLogs', { keyPath: 'id' });
          store.createIndex('rabbitId', 'rabbitId', { unique: false });
          store.createIndex('status', 'status', { unique: false });
          store.createIndex('date', 'date', { unique: false });
        }

        // Table 4 : Finances & Comptabilité
        if (!db.objectStoreNames.contains('finances')) {
          const store = db.createObjectStore('finances', { keyPath: 'id' });
          store.createIndex('type', 'type', { unique: false });
          store.createIndex('date', 'date', { unique: false });
          store.createIndex('category', 'category', { unique: false });
        }

        // Table 5 : Stocks & Alimentation
        if (!db.objectStoreNames.contains('feedStock')) {
          db.createObjectStore('feedStock', { keyPath: 'key' });
        }

        // Table 6 : Paramètres généraux (thème, métadonnées)
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.isReady = true;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('Erreur ouverture IndexedDB:', event.target.error);
        this.isReady = false;
        resolve(null);
      };
    });
  }

  /**
   * Récupère tous les enregistrements d'une table
   */
  async getAll(storeName) {
    if (!this.db) await this.init();
    if (!this.db) return [];

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      } catch (err) {
        console.error(`Erreur getAll sur ${storeName}:`, err);
        resolve([]);
      }
    });
  }

  /**
   * Récupère un enregistrement par sa clé primaire
   */
  async get(storeName, key) {
    if (!this.db) await this.init();
    if (!this.db) return null;

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch (err) {
        console.error(`Erreur get sur ${storeName}:`, err);
        resolve(null);
      }
    });
  }

  /**
   * Enregistre ou met à jour un élément (UPSERT)
   */
  async put(storeName, item) {
    if (!this.db) await this.init();
    if (!this.db) return null;

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.put(item);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => resolve(null);
      } catch (err) {
        console.error(`Erreur put sur ${storeName}:`, err);
        resolve(null);
      }
    });
  }

  /**
   * Écrit l'intégralité d'une liste dans une table (remplace le contenu)
   */
  async putAll(storeName, items) {
    if (!this.db) await this.init();
    if (!this.db) return false;

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.clear();
        if (Array.isArray(items)) {
          for (const item of items) {
            store.put(item);
          }
        }
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (err) {
        console.error(`Erreur putAll sur ${storeName}:`, err);
        resolve(false);
      }
    });
  }

  /**
   * Supprime un élément par sa clé
   */
  async delete(storeName, key) {
    if (!this.db) await this.init();
    if (!this.db) return false;

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.delete(key);
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      } catch (err) {
        console.error(`Erreur delete sur ${storeName}:`, err);
        resolve(false);
      }
    });
  }

  /**
   * Vide complètement une table
   */
  async clear(storeName) {
    if (!this.db) await this.init();
    if (!this.db) return false;

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.clear();
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
      } catch (err) {
        console.error(`Erreur clear sur ${storeName}:`, err);
        resolve(false);
      }
    });
  }

  /**
   * Exporte un dump structuré complet de toutes les tables
   */
  async exportFullDatabase() {
    const rabbits = await this.getAll('rabbits');
    const breedings = await this.getAll('breedings');
    const healthLogs = await this.getAll('healthLogs');
    const finances = await this.getAll('finances');
    const feedStockRecord = await this.get('feedStock', 'current');
    const themeRecord = await this.get('settings', 'theme');

    return {
      version: 1,
      database: 'IndexedDB',
      exportedAt: new Date().toISOString(),
      theme: themeRecord ? themeRecord.value : 'light',
      rabbits,
      breedings,
      healthLogs,
      finances,
      feedStock: feedStockRecord ? feedStockRecord.data : null
    };
  }

  /**
   * Importe un dump complet dans toutes les tables de la base de données
   */
  async importFullDatabase(data) {
    if (!data) return false;
    if (data.rabbits) await this.putAll('rabbits', data.rabbits);
    if (data.breedings) await this.putAll('breedings', data.breedings);
    if (data.healthLogs) await this.putAll('healthLogs', data.healthLogs);
    if (data.finances) await this.putAll('finances', data.finances);
    if (data.feedStock) await this.put('feedStock', { key: 'current', data: data.feedStock });
    if (data.theme) await this.put('settings', { key: 'theme', value: data.theme });
    return true;
  }
}

// Instance globale du gestionnaire de base de données
window.dbManager = new LeLapinMalinDB();
