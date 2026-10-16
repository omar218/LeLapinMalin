/**
 * Le Lapin Malin - Logique Métier & Interface Utilisateur
 * Système de Gestion Intégrée pour Élevage Cunicole
 */

// Données initiales par défaut réalistes
const DEFAULT_STATE = {
  theme: 'light',
  rabbits: [
    {
      id: 'LPN-001',
      name: 'Titan',
      sex: 'M',
      breed: 'Fauve de Bourgogne',
      cage: 'C-01',
      birthDate: '2025-03-15',
      weight: 4.8,
      status: 'Reproducteur',
      notes: 'Excellent reproducteur, calme et robuste.'
    },
    {
      id: 'LPN-002',
      name: 'Bella',
      sex: 'F',
      breed: 'Fauve de Bourgogne',
      cage: 'C-02',
      birthDate: '2025-04-10',
      weight: 4.5,
      status: 'Gestante',
      notes: 'Très bonne mère, 3 portées précédentes réussies.'
    },
    {
      id: 'LPN-003',
      name: 'Daisy',
      sex: 'F',
      breed: 'Néo-Zélandais',
      cage: 'C-03',
      birthDate: '2025-05-20',
      weight: 4.2,
      status: 'Allaitante',
      notes: 'Allaitante, portée de 8 lapereaux.'
    },
    {
      id: 'LPN-004',
      name: 'Simba',
      sex: 'M',
      breed: 'Californien',
      cage: 'C-04',
      birthDate: '2025-02-18',
      weight: 4.6,
      status: 'Reproducteur',
      notes: 'Lignée pure, excellente conformation.'
    },
    {
      id: 'LPN-005',
      name: 'Luna',
      sex: 'F',
      breed: 'Californien',
      cage: 'C-05',
      birthDate: '2025-06-01',
      weight: 3.9,
      status: 'Repos',
      notes: 'En période de repos post-sevrage.'
    },
    {
      id: 'LPN-006',
      name: 'Lot Engraissement #A',
      sex: 'M',
      breed: 'Fauve de Bourgogne',
      cage: 'E-01',
      birthDate: '2026-08-01',
      weight: 2.3,
      status: 'Engraissement',
      notes: 'Lot de 6 jeunes lapereaux en phase de finition.'
    }
  ],
  breedings: [
    {
      id: 'SAI-101',
      femaleId: 'LPN-002', // Bella
      maleId: 'LPN-001',   // Titan
      date: getOffsetDate(-27), // Saillie il y a 27 jours -> Boîte à nid demain !
      palpationDate: getOffsetDate(-15),
      nestBoxDate: getOffsetDate(1),
      birthDueDate: getOffsetDate(4),
      weaningDueDate: getOffsetDate(39),
      isPregnant: true,
      status: 'Gestante',
      birthDate: null,
      bornAlive: null,
      stillBorn: null,
      weanedCount: null,
      notes: 'Palpation positive. Préparer nid demain.'
    },
    {
      id: 'SAI-102',
      femaleId: 'LPN-003', // Daisy
      maleId: 'LPN-004',   // Simba
      date: getOffsetDate(-42), // Mise bas il y a 11 jours -> En lactation
      palpationDate: getOffsetDate(-30),
      nestBoxDate: getOffsetDate(-14),
      birthDueDate: getOffsetDate(-11),
      weaningDueDate: getOffsetDate(24),
      isPregnant: true,
      status: 'Mise bas effectuée',
      birthDate: getOffsetDate(-11),
      bornAlive: 8,
      stillBorn: 0,
      weanedCount: null,
      notes: 'Mise bas rapide et saine. 8 vigoureux lapereaux.'
    },
    {
      id: 'SAI-103',
      femaleId: 'LPN-005', // Luna
      maleId: 'LPN-001',   // Titan
      date: getOffsetDate(-11), // Palpation à faire demain !
      palpationDate: getOffsetDate(1),
      nestBoxDate: getOffsetDate(17),
      birthDueDate: getOffsetDate(20),
      weaningDueDate: getOffsetDate(55),
      isPregnant: null,
      status: 'En attente palpation',
      birthDate: null,
      bornAlive: null,
      stillBorn: null,
      weanedCount: null,
      notes: 'Saillie naturelle réussie.'
    }
  ],
  healthLogs: [
    {
      id: 'HL-001',
      date: getOffsetDate(-10),
      rabbitId: 'LPN-001',
      type: 'Vaccination',
      treatment: 'Vaccin VHD 1 & 2 (Filavac)',
      nextDueDate: getOffsetDate(355),
      status: 'Effectué',
      notes: 'Rappel annuel effectué sans réaction adverse.'
    },
    {
      id: 'HL-002',
      date: getOffsetDate(-5),
      rabbitId: 'TOUS',
      type: 'Vermifuge',
      treatment: 'Panacur Lapin dans l\'eau',
      nextDueDate: getOffsetDate(85),
      status: 'Effectué',
      notes: 'Cure de 5 jours pour tout le cheptel.'
    },
    {
      id: 'HL-003',
      date: getOffsetDate(2),
      rabbitId: 'LPN-002',
      type: 'Vitamine',
      treatment: 'Complexe Vitamine E + Sélénium',
      nextDueDate: null,
      status: 'Prévu',
      notes: 'Apport pour fin de gestation.'
    }
  ],
  finances: [
    {
      id: 'FIN-001',
      type: 'Vente',
      date: getOffsetDate(-12),
      amount: 75.00,
      category: 'Vente Lapins de Chair',
      description: '3 lapins engraissés prêts pour abattage (2.8kg moy.)'
    },
    {
      id: 'FIN-002',
      type: 'Vente',
      date: getOffsetDate(-6),
      amount: 60.00,
      category: 'Vente Reproducteur',
      description: 'Jeune femelle Fauve de Bourgogne vaccinée'
    },
    {
      id: 'FIN-003',
      type: 'Dépense',
      date: getOffsetDate(-18),
      amount: 45.00,
      category: 'Alimentation',
      description: '2 sacs de granulés élevage 25kg'
    },
    {
      id: 'FIN-004',
      type: 'Dépense',
      date: getOffsetDate(-22),
      amount: 25.00,
      category: 'Litière & Soins',
      description: 'Balle de copeaux dépoussiérés et foin de luzerne'
    }
  ],
  feedStock: {
    pelletsKg: 78,
    hayKg: 45,
    strawKg: 30,
    dailyConsumptionKg: 1.8
  }
};

// Fonction utilitaire pour générer des dates relatives (YYYY-MM-DD)
function getOffsetDate(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

function formatDateFr(dateStr) {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// Classe de gestion principale
class LeLapinMalinApp {
  constructor() {
    this.db = window.dbManager || new LeLapinMalinDB();
    this.state = this.loadState();
    this.currentTab = 'dashboard';
    this.init();
    this.initDatabase();
  }

  loadState() {
    try {
      const stored = localStorage.getItem('lelapinmalin_data_v1') || localStorage.getItem('cunigest_data_v1');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Erreur de chargement des données:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  async initDatabase() {
    try {
      if (this.db) {
        await this.db.init();
        if (this.db.isReady) {
          // Vérifier si la base de données IndexedDB contient déjà des données enregistrées
          const dbRabbits = await this.db.getAll('rabbits');
          if (dbRabbits && dbRabbits.length > 0) {
            // Charger l'état depuis la base de données
            const breedings = await this.db.getAll('breedings');
            const healthLogs = await this.db.getAll('healthLogs');
            const finances = await this.db.getAll('finances');
            const feedStockRecord = await this.db.get('feedStock', 'current');
            const themeRecord = await this.db.get('settings', 'theme');

            this.state = {
              theme: themeRecord ? themeRecord.value : (this.state.theme || 'light'),
              rabbits: dbRabbits,
              breedings: breedings || [],
              healthLogs: healthLogs || [],
              finances: finances || [],
              feedStock: feedStockRecord ? feedStockRecord.data : (this.state.feedStock || DEFAULT_STATE.feedStock)
            };

            // Mirror synchrone
            try {
              localStorage.setItem('lelapinmalin_data_v1', JSON.stringify(this.state));
            } catch (e) {}

            this.applyTheme(this.state.theme);
            this.refreshAll();
          } else {
            // Première initialisation : peupler IndexedDB avec les données existantes ou par défaut
            await this.db.importFullDatabase(this.state);
          }

          const badgeText = document.getElementById('dbStatusText');
          const badgeContainer = document.getElementById('dbStatusBadge');
          if (badgeText) badgeText.textContent = 'BDD Active (IndexedDB)';
          if (badgeContainer) badgeContainer.title = 'Base de données IndexedDB connectée, transactionnelle et permanente';
        }
      }
    } catch (err) {
      console.warn('Initialisation base de données:', err);
      const badgeText = document.getElementById('dbStatusText');
      if (badgeText) badgeText.textContent = 'Stockage Local (Secours)';
    }
  }

  saveState() {
    // 1. Sauvegarde locale synchrone immédiate (miroir)
    try {
      localStorage.setItem('lelapinmalin_data_v1', JSON.stringify(this.state));
    } catch (e) {
      console.warn('Erreur localStorage:', e);
    }

    // 2. Sauvegarde persistante dans la base de données IndexedDB
    if (this.db && this.db.isReady) {
      this.db.importFullDatabase(this.state).catch(err => {
        console.error('Erreur persistance IndexedDB:', err);
      });
    }
  }

  init() {
    // Appliquer le thème
    this.applyTheme(this.state.theme || 'light');

    // Écouteurs d'onglets de navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const tabId = item.getAttribute('data-tab');
        if (tabId) {
          this.switchTab(tabId);
        }
      });
    });

    // Toggle menu mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }

    // Bouton de bascule thème clair / sombre
    const themeBtn = document.getElementById('btnThemeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
      });
    }

    // Gestionnaires de recherche et filtres pour les lapins
    const searchRabbit = document.getElementById('searchRabbitInput');
    const filterSex = document.getElementById('filterSexSelect');
    const filterStatus = document.getElementById('filterStatusSelect');
    if (searchRabbit) searchRabbit.addEventListener('input', () => this.renderRabbitsTable());
    if (filterSex) filterSex.addEventListener('change', () => this.renderRabbitsTable());
    if (filterStatus) filterStatus.addEventListener('change', () => this.renderRabbitsTable());

    // Boutons d'ajouts
    document.getElementById('btnAddRabbit')?.addEventListener('click', () => this.openRabbitModal());
    document.getElementById('btnAddBreeding')?.addEventListener('click', () => this.openBreedingModal());
    document.getElementById('btnAddHealth')?.addEventListener('click', () => this.openHealthModal());
    document.getElementById('btnAddFinance')?.addEventListener('click', () => this.openFinanceModal());

    // Formulaire Lapin
    document.getElementById('rabbitForm')?.addEventListener('submit', (e) => this.handleSaveRabbit(e));
    document.getElementById('breedingForm')?.addEventListener('submit', (e) => this.handleSaveBreeding(e));
    document.getElementById('healthForm')?.addEventListener('submit', (e) => this.handleSaveHealth(e));
    document.getElementById('financeForm')?.addEventListener('submit', (e) => this.handleSaveFinance(e));

    // Fermeture des modales (boutons et clic backdrop)
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    });

    // Fermer avec la touche Echap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
      }
    });

    // Filtres Santé et Finances
    const filterHealth = document.getElementById('filterHealthStatusSelect');
    if (filterHealth) filterHealth.addEventListener('change', () => this.renderHealthTable());

    const filterFinance = document.getElementById('filterFinanceTypeSelect');
    if (filterFinance) filterFinance.addEventListener('change', () => this.renderFinancesTable());

    // Exportation & Réinitialisation
    document.getElementById('btnExportJson')?.addEventListener('click', () => this.exportData());
    document.getElementById('fileImportInput')?.addEventListener('change', (e) => this.importData(e));
    document.getElementById('btnResetDefault')?.addEventListener('click', () => this.resetToDefault());

    // Rendu initial
    this.refreshAll();
  }

  applyTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark'
        ? `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
        : `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
    }
    this.saveState();
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });
    const targetPane = document.getElementById(`tab-${tabId}`);
    if (targetPane) {
      targetPane.classList.add('active');
    }

    // Titres dynamiques de l'en-tête
    const titles = {
      dashboard: { title: 'Tableau de Bord', sub: 'Vue d\'ensemble de votre élevage cunicole' },
      rabbits: { title: 'Gestion du Cheptel', sub: 'Fiches détaillées et suivi individuel de chaque lapin' },
      breedings: { title: 'Reproduction & Mises bas', sub: 'Suivi des saillies, palpations, nids et naissances' },
      health: { title: 'Santé & Soins', sub: 'Journal vétérinaire, vaccins et prophylaxie' },
      finances: { title: 'Finances & Ventes', sub: 'Rentabilité, ventes de lapins et dépenses' },
      stock: { title: 'Alimentation & Stocks', sub: 'Réserves de granulés, foin et prévisions' }
    };

    const header = titles[tabId] || { title: 'Le Lapin Malin', sub: '' };
    document.getElementById('headerPageTitle').textContent = header.title;
    document.getElementById('headerPageSub').textContent = header.sub;

    // Fermer menu mobile sur sélection
    document.getElementById('sidebar')?.classList.remove('open');

    // Rafraîchir l'onglet concerné
    this.refreshCurrentTab();
  }

  refreshCurrentTab() {
    switch (this.currentTab) {
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'rabbits':
        this.renderRabbitsTable();
        break;
      case 'breedings':
        this.renderBreedingsTable();
        break;
      case 'health':
        this.renderHealthTable();
        break;
      case 'finances':
        this.renderFinancesTable();
        break;
      case 'stock':
        this.renderStockView();
        break;
    }
  }

  refreshAll() {
    this.renderDashboard();
    this.renderRabbitsTable();
    this.renderBreedingsTable();
    this.renderHealthTable();
    this.renderFinancesTable();
    this.renderStockView();
    this.updateBadges();
  }

  // ==========================================
  // TABLEAU DE BORD (DASHBOARD)
  // ==========================================
  renderDashboard() {
    const rabbits = this.state.rabbits;
    const totalCount = rabbits.length;
    const maleCount = rabbits.filter(r => r.sex === 'M' && r.status === 'Reproducteur').length;
    const femaleCount = rabbits.filter(r => r.sex === 'F' && ['Reproducteur', 'Gestante', 'Allaitante', 'Repos'].includes(r.status)).length;
    const pregnantCount = rabbits.filter(r => r.status === 'Gestante').length;
    const fatteningCount = rabbits.filter(r => r.status === 'Engraissement').length;

    // Calcul lapereaux nés actifs non encore sevrés
    const activeLitterKits = this.state.breedings
      .filter(b => b.status === 'Mise bas effectuée' && !b.weanedCount)
      .reduce((sum, b) => sum + (Number(b.bornAlive) || 0), 0);

    document.getElementById('kpiTotalRabbits').textContent = totalCount;
    document.getElementById('kpiMales').textContent = maleCount;
    document.getElementById('kpiFemales').textContent = femaleCount;
    document.getElementById('kpiPregnant').textContent = pregnantCount;
    document.getElementById('kpiLitterKits').textContent = activeLitterKits;
    document.getElementById('kpiFattening').textContent = fatteningCount;

    // Alertes du jour & Tâches imminentes
    this.renderDashboardAlerts();
    this.renderCheptelDistributionChart();
  }

  renderDashboardAlerts() {
    const container = document.getElementById('dashboardAlertsList');
    if (!container) return;

    const todayStr = getOffsetDate(0);
    const today = new Date();
    const alerts = [];

    // Vérifier les saillies
    this.state.breedings.forEach(b => {
      const female = this.state.rabbits.find(r => r.id === b.femaleId);
      const femaleName = female ? `${female.name} (${female.cage})` : b.femaleId;

      // 1. Palpation imminente (si statut en attente)
      if (b.status === 'En attente palpation' && b.palpationDate) {
        const diffDays = Math.ceil((new Date(b.palpationDate) - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 2) {
          alerts.push({
            type: 'alert-palpation',
            icon: '🔍',
            title: `Palpation à faire : ${femaleName}`,
            desc: diffDays < 0 ? `En retard de ${Math.abs(diffDays)} jour(s)` : (diffDays === 0 ? `À faire aujourd'hui (J+12)` : `Prévu dans ${diffDays} jour(s)`),
            date: formatDateFr(b.palpationDate),
            priority: 2,
            action: `app.manageBreedingCycle('${b.id}')`
          });
        }
      }

      // 2. Pose de la boîte à nids (J+28)
      if (b.status === 'Gestante' && b.nestBoxDate) {
        const diffDays = Math.ceil((new Date(b.nestBoxDate) - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 2) {
          alerts.push({
            type: 'alert-nid',
            icon: '📦',
            title: `Poser la boîte à nid : ${femaleName}`,
            desc: diffDays <= 0 ? `Préparer le nid avec paille et copeaux maintenant !` : `Dans ${diffDays} jour(s)`,
            date: formatDateFr(b.nestBoxDate),
            priority: 1,
            action: `app.manageBreedingCycle('${b.id}')`
          });
        }
      }

      // 3. Mise bas imminente (J+31)
      if (b.status === 'Gestante' && b.birthDueDate) {
        const diffDays = Math.ceil((new Date(b.birthDueDate) - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 3) {
          alerts.push({
            type: 'alert-mise-bas',
            icon: '👶',
            title: `Mise bas imminente : ${femaleName}`,
            desc: diffDays < 0 ? `Échéance dépassée ! Contrôler le nid.` : (diffDays === 0 ? `Prévue AUJOURD'HUI ! Vérifier au calme.` : `Prévue dans ${diffDays} jour(s)`),
            date: formatDateFr(b.birthDueDate),
            priority: 0,
            action: `app.manageBreedingCycle('${b.id}')`
          });
        }
      }

      // 4. Sevrage (J+35)
      if (b.status === 'Mise bas effectuée' && !b.weanedCount && b.weaningDueDate) {
        const diffDays = Math.ceil((new Date(b.weaningDueDate) - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 4) {
          alerts.push({
            type: 'alert-sevrage',
            icon: '🥛',
            title: `Sevrage de la portée de ${femaleName}`,
            desc: `Portée de ${b.bornAlive} lapereaux prête pour sevrage.`,
            date: formatDateFr(b.weaningDueDate),
            priority: 3,
            action: `app.manageBreedingCycle('${b.id}')`
          });
        }
      }
    });

    // Soins prévus
    this.state.healthLogs.forEach(h => {
      if (h.status === 'Prévu' && h.date) {
        const diffDays = Math.ceil((new Date(h.date) - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 3) {
          alerts.push({
            type: 'alert-sante',
            icon: '💉',
            title: `Soin à administrer : ${h.treatment}`,
            desc: `Cible: ${h.rabbitId === 'TOUS' ? 'Tout le cheptel' : h.rabbitId} (${h.notes || 'Sans note'})`,
            date: formatDateFr(h.date),
            priority: 2,
            action: `app.switchTab('health')`
          });
        }
      }
    });

    // Tri par priorité
    alerts.sort((a, b) => a.priority - b.priority);

    if (alerts.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 20px;">
          <p style="color: var(--primary-600); font-weight: 600;">✨ Tout est à jour ! Aucune alerte critique pour les 48h à venir.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = alerts.map(a => `
      <div class="alert-item ${a.type}" onclick="${a.action || ''}" title="Cliquer pour gérer cette action">
        <div class="alert-icon">${a.icon}</div>
        <div class="alert-content">
          <div class="alert-title">${a.title}</div>
          <div class="alert-desc">${a.desc}</div>
        </div>
        <div class="alert-date">${a.date}</div>
      </div>
    `).join('');
  }

  renderCheptelDistributionChart() {
    const container = document.getElementById('chartCheptelSvg');
    if (!container) return;

    const stats = {
      'Reproducteurs': this.state.rabbits.filter(r => r.status === 'Reproducteur').length,
      'Gestantes': this.state.rabbits.filter(r => r.status === 'Gestante').length,
      'Allaitantes': this.state.rabbits.filter(r => r.status === 'Allaitante').length,
      'Engraissement': this.state.rabbits.filter(r => r.status === 'Engraissement').length,
      'En repos': this.state.rabbits.filter(r => r.status === 'Repos').length,
    };

    const colors = {
      'Reproducteurs': '#3b82f6',
      'Gestantes': '#f59e0b',
      'Allaitantes': '#8b5cf6',
      'Engraissement': '#10b981',
      'En repos': '#94a3b8'
    };

    const total = Object.values(stats).reduce((a, b) => a + b, 0) || 1;

    let barsHtml = '';
    let legendHtml = '';
    let currentX = 0;

    Object.entries(stats).forEach(([label, count]) => {
      const percentage = (count / total) * 100;
      if (percentage > 0) {
        barsHtml += `
          <rect x="${currentX}%" y="0" width="${percentage}%" height="24" fill="${colors[label]}" rx="4" />
        `;
        currentX += percentage;
      }

      legendHtml += `
        <div style="display:flex; align-items:center; gap:6px; font-size:0.78rem;">
          <span style="width:10px; height:10px; border-radius:50%; background:${colors[label]}; display:inline-block;"></span>
          <span style="color:var(--text-muted);">${label}: <strong>${count}</strong></span>
        </div>
      `;
    });

    container.innerHTML = `
      <div style="margin-bottom: 12px;">
        <svg width="100%" height="24" style="border-radius: 8px; overflow: hidden; background: var(--bg-subtle);">
          ${barsHtml}
        </svg>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;">
        ${legendHtml}
      </div>
    `;
  }

  updateBadges() {
    // Calculer les alertes pour le badge de menu
    let pendingActions = 0;
    const today = new Date();
    this.state.breedings.forEach(b => {
      if (b.status === 'En attente palpation' && b.palpationDate) {
        const d = Math.ceil((new Date(b.palpationDate) - today) / (1000 * 60 * 60 * 24));
        if (d <= 2) pendingActions++;
      }
      if (b.status === 'Gestante' && b.nestBoxDate) {
        const d = Math.ceil((new Date(b.nestBoxDate) - today) / (1000 * 60 * 60 * 24));
        if (d <= 2) pendingActions++;
      }
    });

    const badgeBreeding = document.getElementById('navBadgeBreeding');
    if (badgeBreeding) {
      if (pendingActions > 0) {
        badgeBreeding.textContent = pendingActions;
        badgeBreeding.style.display = 'inline-block';
      } else {
        badgeBreeding.style.display = 'none';
      }
    }
  }

  // ==========================================
  // GESTION DU CHEPTEL (RABBITS)
  // ==========================================
  renderRabbitsTable() {
    const tableBody = document.getElementById('rabbitsTableBody');
    if (!tableBody) return;

    const searchTerm = (document.getElementById('searchRabbitInput')?.value || '').toLowerCase();
    const filterSex = document.getElementById('filterSexSelect')?.value || '';
    const filterStatus = document.getElementById('filterStatusSelect')?.value || '';

    const filtered = this.state.rabbits.filter(r => {
      const matchSearch = (r.name || '').toLowerCase().includes(searchTerm) ||
                          (r.id || '').toLowerCase().includes(searchTerm) ||
                          (r.cage || '').toLowerCase().includes(searchTerm) ||
                          (r.breed || '').toLowerCase().includes(searchTerm);
      const matchSex = !filterSex || r.sex === filterSex;
      const matchStatus = !filterStatus || r.status === filterStatus;
      return matchSearch && matchSex && matchStatus;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="9" class="empty-state">
            <h4>Aucun lapin trouvé</h4>
            <p>Modifiez vos critères de recherche ou ajoutez un nouveau lapin.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(r => {
      const sexBadge = r.sex === 'M'
        ? `<span class="badge badge-male">♂ Mâle</span>`
        : `<span class="badge badge-female">♀ Femelle</span>`;

      let statusBadgeClass = 'badge-repos';
      if (r.status === 'Gestante') statusBadgeClass = 'badge-gestante';
      if (r.status === 'Allaitante') statusBadgeClass = 'badge-allaitante';
      if (r.status === 'Engraissement') statusBadgeClass = 'badge-engraissement';
      if (r.status === 'Vendu' || r.status === 'Décédé') statusBadgeClass = 'badge-vendu';

      const statusBadge = `<span class="badge ${statusBadgeClass}">${r.status}</span>`;

      return `
        <tr>
          <td><strong>${r.id}</strong></td>
          <td>
            <div style="font-weight: 600;">${r.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${r.notes ? r.notes.substring(0, 35) + '...' : ''}</div>
          </td>
          <td>${sexBadge}</td>
          <td>${r.breed}</td>
          <td><span style="background:var(--bg-subtle); padding: 3px 8px; border-radius:4px; font-weight:600;">${r.cage}</span></td>
          <td>${formatDateFr(r.birthDate)}</td>
          <td>${r.weight ? r.weight + ' kg' : '-'}</td>
          <td>${statusBadge}</td>
          <td>
            <div class="table-actions">
              <button class="action-btn btn-print" title="Fiche Clapier" onclick="app.printCageCard('${r.id}')">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
              </button>
              <button class="action-btn" title="Modifier" onclick="app.editRabbit('${r.id}')">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button class="action-btn btn-delete" title="Supprimer" onclick="app.deleteRabbit('${r.id}')">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  openRabbitModal(rabbitData = null) {
    const modal = document.getElementById('rabbitModal');
    const form = document.getElementById('rabbitForm');
    if (!modal || !form) return;

    form.reset();

    if (rabbitData) {
      document.getElementById('modalRabbitTitle').textContent = 'Modifier le Lapin ' + rabbitData.id;
      document.getElementById('rabbitEditId').value = rabbitData.id;
      document.getElementById('rabbitIdInput').value = rabbitData.id;
      document.getElementById('rabbitIdInput').disabled = true;
      document.getElementById('rabbitNameInput').value = rabbitData.name;
      document.getElementById('rabbitSexInput').value = rabbitData.sex;
      document.getElementById('rabbitBreedInput').value = rabbitData.breed;
      document.getElementById('rabbitCageInput').value = rabbitData.cage;
      document.getElementById('rabbitBirthInput').value = rabbitData.birthDate;
      document.getElementById('rabbitWeightInput').value = rabbitData.weight || '';
      document.getElementById('rabbitStatusInput').value = rabbitData.status;
      document.getElementById('rabbitNotesInput').value = rabbitData.notes || '';
    } else {
      document.getElementById('modalRabbitTitle').textContent = 'Ajouter un Lapin au Cheptel';
      document.getElementById('rabbitEditId').value = '';
      document.getElementById('rabbitIdInput').disabled = false;
      // Générer matricule suggéré
      const nextNum = (this.state.rabbits.length + 1).toString().padStart(3, '0');
      document.getElementById('rabbitIdInput').value = `LPN-${nextNum}`;
      document.getElementById('rabbitBirthInput').value = getOffsetDate(-180);
    }

    modal.classList.add('open');
  }

  handleSaveRabbit(e) {
    e.preventDefault();
    const editId = document.getElementById('rabbitEditId').value;
    const rabbitId = document.getElementById('rabbitIdInput').value.trim();
    const name = document.getElementById('rabbitNameInput').value.trim();
    const sex = document.getElementById('rabbitSexInput').value;
    const breed = document.getElementById('rabbitBreedInput').value.trim();
    const cage = document.getElementById('rabbitCageInput').value.trim();
    const birthDate = document.getElementById('rabbitBirthInput').value;
    const weight = parseFloat(document.getElementById('rabbitWeightInput').value) || null;
    const status = document.getElementById('rabbitStatusInput').value;
    const notes = document.getElementById('rabbitNotesInput').value.trim();

    if (!rabbitId || !name || !cage) {
      this.showToast('Veuillez remplir les champs obligatoires (Matricule, Nom, Cage).', 'warning');
      return;
    }

    if (editId) {
      // Mise à jour
      const index = this.state.rabbits.findIndex(r => r.id === editId);
      if (index !== -1) {
        this.state.rabbits[index] = {
          ...this.state.rabbits[index],
          name, sex, breed, cage, birthDate, weight, status, notes
        };
        this.showToast(`Lapin ${name} mis à jour avec succès.`);
      }
    } else {
      // Vérifier doublon
      if (this.state.rabbits.some(r => r.id.toLowerCase() === rabbitId.toLowerCase())) {
        this.showToast(`Ce matricule ${rabbitId} existe déjà !`, 'error');
        return;
      }

      this.state.rabbits.push({
        id: rabbitId,
        name, sex, breed, cage, birthDate, weight, status, notes
      });
      this.showToast(`Lapin ${name} (${rabbitId}) enregistré !`);
    }

    this.saveState();
    document.getElementById('rabbitModal')?.classList.remove('open');
    this.refreshAll();
  }

  editRabbit(id) {
    const rabbit = this.state.rabbits.find(r => r.id === id);
    if (rabbit) {
      this.openRabbitModal(rabbit);
    }
  }

  deleteRabbit(id) {
    const rabbit = this.state.rabbits.find(r => r.id === id);
    if (!rabbit) return;

    if (confirm(`Confirmez-vous la suppression du lapin ${rabbit.name} (${rabbit.id}) ?`)) {
      this.state.rabbits = this.state.rabbits.filter(r => r.id !== id);
      this.saveState();
      this.showToast(`Lapin ${rabbit.name} supprimé.`);
      this.refreshAll();
    }
  }

  // ==========================================
  // REPRODUCTION & PORTÉES
  // ==========================================
  renderBreedingsTable() {
    const tableBody = document.getElementById('breedingsTableBody');
    if (!tableBody) return;

    if (this.state.breedings.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" class="empty-state">
            <h4>Aucun accouplement enregistré</h4>
            <p>Cliquez sur "Nouvelle Saillie" pour démarrer un cycle reproductif.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = this.state.breedings.map(b => {
      const female = this.state.rabbits.find(r => r.id === b.femaleId);
      const male = this.state.rabbits.find(r => r.id === b.maleId);

      const femaleLabel = female ? `${female.name} (${female.cage})` : b.femaleId;
      const maleLabel = male ? `${male.name} (${male.cage})` : b.maleId;

      let badgeClass = 'badge-repos';
      if (b.status === 'Gestante') badgeClass = 'badge-gestante';
      if (b.status === 'Mise bas effectuée') badgeClass = 'badge-allaitante';

      let resultsSummary = '-';
      if (b.birthDate) {
        resultsSummary = `<strong>${b.bornAlive || 0}</strong> nés vivants`;
        if (b.stillBorn > 0) resultsSummary += ` <span style="color:var(--accent-rose); font-size:0.75rem;">(+${b.stillBorn} morts)</span>`;
        if (b.weanedCount) resultsSummary += ` • <strong>${b.weanedCount}</strong> sevrés`;
      }

      return `
        <tr>
          <td><strong>${b.id}</strong></td>
          <td><strong>${femaleLabel}</strong></td>
          <td>${maleLabel}</td>
          <td>${formatDateFr(b.date)}</td>
          <td>
            <div style="font-size:0.8rem;">Palpation: <strong>${formatDateFr(b.palpationDate)}</strong></div>
            <div style="font-size:0.8rem; color:var(--primary-600);">Boîte à nid: <strong>${formatDateFr(b.nestBoxDate)}</strong></div>
            <div style="font-size:0.8rem; color:var(--accent-amber);">Prévue: <strong>${formatDateFr(b.birthDueDate)}</strong></div>
          </td>
          <td><span class="badge ${badgeClass}">${b.status}</span></td>
          <td>${resultsSummary}</td>
          <td>
            <div class="table-actions">
              <button class="btn btn-sm btn-secondary" onclick="app.manageBreedingCycle('${b.id}')">
                Mettre à jour
              </button>
              <button class="action-btn btn-delete" onclick="app.deleteBreeding('${b.id}')">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  openBreedingModal() {
    const modal = document.getElementById('breedingModal');
    const form = document.getElementById('breedingForm');
    const selectFemale = document.getElementById('breedingFemaleSelect');
    const selectMale = document.getElementById('breedingMaleSelect');

    if (!modal || !form || !selectFemale || !selectMale) return;

    form.reset();

    // Remplir sélecteurs femelles et mâles
    const females = this.state.rabbits.filter(r => r.sex === 'F' && r.status !== 'Vendu' && r.status !== 'Décédé');
    const males = this.state.rabbits.filter(r => r.sex === 'M' && r.status !== 'Vendu' && r.status !== 'Décédé');

    if (females.length === 0 || males.length === 0) {
      this.showToast('Note: Assurez-vous d\'avoir au moins une femelle et un mâle actifs pour une saillie.', 'warning');
    }

    selectFemale.innerHTML = females.length > 0
      ? females.map(f => `<option value="${f.id}">${f.name} - ${f.breed} (Cage ${f.cage})</option>`).join('')
      : '<option value="" disabled>Aucune femelle disponible</option>';

    selectMale.innerHTML = males.length > 0
      ? males.map(m => `<option value="${m.id}">${m.name} - ${m.breed} (Cage ${m.cage})</option>`).join('')
      : '<option value="" disabled>Aucun mâle disponible</option>';

    const nextId = 'SAI-' + (this.state.breedings.length + 101);
    document.getElementById('breedingIdInput').value = nextId;
    document.getElementById('breedingDateInput').value = getOffsetDate(0);

    modal.classList.add('open');
  }

  handleSaveBreeding(e) {
    e.preventDefault();
    const breedingId = document.getElementById('breedingIdInput').value;
    const femaleId = document.getElementById('breedingFemaleSelect').value;
    const maleId = document.getElementById('breedingMaleSelect').value;
    const date = document.getElementById('breedingDateInput').value;
    const notes = document.getElementById('breedingNotesInput').value.trim();

    if (!femaleId || !maleId || !date) {
      this.showToast('Veuillez sélectionner le couple et la date de saillie.', 'warning');
      return;
    }

    // Calculs cunicoles rigoureux :
    // Palpation : J+12
    // Pose boîte à nid : J+28
    // Mise bas théorique : J+31
    // Sevrage conseillé : J+35
    const saillieDate = new Date(date);
    
    const calcDate = (days) => {
      const d = new Date(saillieDate);
      d.setDate(d.getDate() + days);
      return d.toISOString().split('T')[0];
    };

    const newBreeding = {
      id: breedingId,
      femaleId,
      maleId,
      date,
      palpationDate: calcDate(12),
      nestBoxDate: calcDate(28),
      birthDueDate: calcDate(31),
      weaningDueDate: calcDate(66), // 31 + 35 jours de lactation
      isPregnant: null,
      status: 'En attente palpation',
      birthDate: null,
      bornAlive: null,
      stillBorn: null,
      weanedCount: null,
      notes
    };

    this.state.breedings.unshift(newBreeding);
    this.saveState();
    this.showToast(`Saillie ${breedingId} planifiée avec succès !`);
    document.getElementById('breedingModal')?.classList.remove('open');
    this.refreshAll();
  }

  manageBreedingCycle(id) {
    const breeding = this.state.breedings.find(b => b.id === id);
    if (!breeding) return;

    const modal = document.getElementById('updateBreedingModal');
    if (!modal) return;

    document.getElementById('updateBreedingId').value = breeding.id;
    document.getElementById('updateBreedingTitle').textContent = `Mise à jour du Cycle (${breeding.id})`;
    document.getElementById('updateStatusSelect').value = breeding.status;
    document.getElementById('updateBirthDateInput').value = breeding.birthDate || getOffsetDate(0);
    document.getElementById('updateBornAliveInput').value = breeding.bornAlive || '';
    document.getElementById('updateStillBornInput').value = breeding.stillBorn || '0';
    document.getElementById('updateWeanedInput').value = breeding.weanedCount || '';

    modal.classList.add('open');
  }

  handleSaveCycleUpdate() {
    const id = document.getElementById('updateBreedingId').value;
    const breeding = this.state.breedings.find(b => b.id === id);
    if (!breeding) return;

    const status = document.getElementById('updateStatusSelect').value;
    const birthDate = document.getElementById('updateBirthDateInput').value;
    const bornAlive = parseInt(document.getElementById('updateBornAliveInput').value, 10) || null;
    const stillBorn = parseInt(document.getElementById('updateStillBornInput').value, 10) || 0;
    const weanedCount = parseInt(document.getElementById('updateWeanedInput').value, 10) || null;

    breeding.status = status;
    breeding.birthDate = (status === 'Mise bas effectuée' || bornAlive) ? birthDate : null;
    breeding.bornAlive = bornAlive;
    breeding.stillBorn = stillBorn;
    breeding.weanedCount = weanedCount;

    // Mettre à jour le statut du lapin mère automatiquement
    const female = this.state.rabbits.find(r => r.id === breeding.femaleId);
    if (female) {
      if (status === 'Gestante') {
        female.status = 'Gestante';
      } else if (status === 'Mise bas effectuée' && !weanedCount) {
        female.status = 'Allaitante';
      } else if (weanedCount || status === 'Sevrage terminé') {
        female.status = 'Repos';
      } else if (status === 'Échec / Non gestante') {
        female.status = 'Repos';
      }
    }

    // Si le sevrage est validé et qu'il y a des sevrés, proposer de créer le lot d'engraissement
    if (status === 'Sevrage terminé' && weanedCount > 0) {
      const lotId = `ENG-${breeding.id}`;
      if (!this.state.rabbits.some(r => r.id === lotId)) {
        if (confirm(`Souhaitez-vous ajouter automatiquement ce lot de ${weanedCount} lapereaux sevrés au cheptel dans la section Engraissement ?`)) {
          this.state.rabbits.push({
            id: lotId,
            name: `Lot ${weanedCount} Lapereaux (${female ? female.name : breeding.femaleId})`,
            sex: 'M',
            breed: female ? female.breed : 'Croisé',
            cage: `E-${breeding.id.replace('SAI-', '')}`,
            birthDate: breeding.birthDate || getOffsetDate(-35),
            weight: 0.9,
            status: 'Engraissement',
            notes: `Portée sevrée issue de la saillie ${breeding.id}. Prêts pour la croissance.`
          });
          this.showToast(`Lot de ${weanedCount} lapereaux ajouté au cheptel !`);
        }
      }
    }

    this.saveState();
    this.showToast(`Cycle ${breeding.id} mis à jour.`);
    document.getElementById('updateBreedingModal')?.classList.remove('open');
    this.refreshAll();
  }

  deleteBreeding(id) {
    if (confirm(`Supprimer cet enregistrement d'accouplement ?`)) {
      this.state.breedings = this.state.breedings.filter(b => b.id !== id);
      this.saveState();
      this.showToast('Accouplement supprimé.');
      this.refreshAll();
    }
  }

  // ==========================================
  // SANTÉ & SOINS
  // ==========================================
  renderHealthTable() {
    const tableBody = document.getElementById('healthTableBody');
    if (!tableBody) return;

    const filterStatus = document.getElementById('filterHealthStatusSelect')?.value || '';
    const filtered = this.state.healthLogs.filter(h => {
      return !filterStatus || h.status === filterStatus;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state">
            <h4>Aucun soin vétérinaire répertorié</h4>
            <p>Ajoutez des vaccins, vermifuges ou traitements pour sécuriser l'élevage.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(h => {
      const targetLabel = h.rabbitId === 'TOUS' ? '🌿 Tout le cheptel' : `Lapin ${h.rabbitId}`;
      const statusClass = h.status === 'Effectué' ? 'badge-engraissement' : 'badge-gestante';

      const doneBtn = h.status === 'Prévu'
        ? `<button class="action-btn" title="Marquer comme Effectué" style="color:var(--primary-600);" onclick="app.markHealthDone('${h.id}')">
            <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
           </button>`
        : '';

      return `
        <tr>
          <td>${formatDateFr(h.date)}</td>
          <td><strong>${h.treatment}</strong></td>
          <td><span style="font-weight:600;">${targetLabel}</span></td>
          <td>${h.type}</td>
          <td><span class="badge ${statusClass}">${h.status}</span></td>
          <td>${h.nextDueDate ? formatDateFr(h.nextDueDate) : '-'}</td>
          <td>
            <div class="table-actions">
              ${doneBtn}
              <button class="action-btn btn-delete" title="Supprimer" onclick="app.deleteHealth('${h.id}')">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  markHealthDone(id) {
    const log = this.state.healthLogs.find(h => h.id === id);
    if (!log) return;
    log.status = 'Effectué';
    log.date = getOffsetDate(0);
    this.saveState();
    this.showToast(`Soin "${log.treatment}" marqué comme effectué !`);
    this.refreshAll();
  }

  openHealthModal() {
    const modal = document.getElementById('healthModal');
    const form = document.getElementById('healthForm');
    const selectRabbit = document.getElementById('healthRabbitSelect');
    if (!modal || !form || !selectRabbit) return;

    form.reset();
    selectRabbit.innerHTML = `
      <option value="TOUS">🌿 Tout le cheptel (Général)</option>
      ${this.state.rabbits.map(r => `<option value="${r.id}">${r.name} (${r.id} - ${r.cage})</option>`).join('')}
    `;

    document.getElementById('healthDateInput').value = getOffsetDate(0);
    modal.classList.add('open');
  }

  handleSaveHealth(e) {
    e.preventDefault();
    const rabbitId = document.getElementById('healthRabbitSelect').value;
    const type = document.getElementById('healthTypeSelect').value;
    const treatment = document.getElementById('healthTreatmentInput').value.trim();
    const date = document.getElementById('healthDateInput').value;
    const nextDueDate = document.getElementById('healthNextDateInput').value || null;
    const status = document.getElementById('healthStatusSelect').value;
    const notes = document.getElementById('healthNotesInput').value.trim();

    if (!treatment || !date) {
      this.showToast('Veuillez renseigner le soin et la date.', 'warning');
      return;
    }

    const nextId = 'HL-' + (this.state.healthLogs.length + 1).toString().padStart(3, '0');
    this.state.healthLogs.unshift({
      id: nextId,
      date,
      rabbitId,
      type,
      treatment,
      nextDueDate,
      status,
      notes
    });

    this.saveState();
    this.showToast(`Soin ${treatment} consigné avec succès.`);
    document.getElementById('healthModal')?.classList.remove('open');
    this.refreshAll();
  }

  deleteHealth(id) {
    if (confirm('Supprimer cette entrée vétérinaire ?')) {
      this.state.healthLogs = this.state.healthLogs.filter(h => h.id !== id);
      this.saveState();
      this.showToast('Entrée vétérinaire supprimée.');
      this.refreshAll();
    }
  }

  // ==========================================
  // FINANCES & VENTES
  // ==========================================
  renderFinancesTable() {
    const tableBody = document.getElementById('financesTableBody');
    if (!tableBody) return;

    const totalIncome = this.state.finances
      .filter(f => f.type === 'Vente')
      .reduce((s, f) => s + Number(f.amount), 0);

    const totalExpenses = this.state.finances
      .filter(f => f.type === 'Dépense')
      .reduce((s, f) => s + Number(f.amount), 0);

    const netProfit = totalIncome - totalExpenses;

    document.getElementById('financeTotalIncome').textContent = totalIncome.toFixed(2) + ' FCFA';
    document.getElementById('financeTotalExpenses').textContent = totalExpenses.toFixed(2) + ' FCFA';
    const profitEl = document.getElementById('financeNetProfit');
    profitEl.textContent = (netProfit >= 0 ? '+' : '') + netProfit.toFixed(2) + ' FCFA';
    profitEl.style.color = netProfit >= 0 ? 'var(--primary-600)' : 'var(--accent-rose)';

    const filterType = document.getElementById('filterFinanceTypeSelect')?.value || '';
    const filtered = this.state.finances.filter(f => {
      return !filterType || f.type === filterType;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="empty-state">
            <h4>Aucune opération financière</h4>
            <p>Enregistrez vos ventes de lapins ou dépenses d'aliments.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(f => {
      const isIncome = f.type === 'Vente';
      const badgeType = isIncome ? 'badge-engraissement' : 'badge-gestante';
      const amountColor = isIncome ? 'var(--primary-600)' : 'var(--accent-rose)';
      const amountSign = isIncome ? '+' : '-';

      return `
        <tr>
          <td>${formatDateFr(f.date)}</td>
          <td><span class="badge ${badgeType}">${f.type}</span></td>
          <td><strong>${f.category}</strong></td>
          <td>${f.description || '-'}</td>
          <td style="color:${amountColor}; font-weight:700;">${amountSign}${Number(f.amount).toFixed(2)} FCFA</td>
          <td>
            <button class="action-btn btn-delete" onclick="app.deleteFinance('${f.id}')">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  openFinanceModal() {
    const modal = document.getElementById('financeModal');
    const form = document.getElementById('financeForm');
    if (!modal || !form) return;

    form.reset();
    document.getElementById('financeDateInput').value = getOffsetDate(0);
    modal.classList.add('open');
  }

  handleSaveFinance(e) {
    e.preventDefault();
    const type = document.getElementById('financeTypeSelect').value;
    const category = document.getElementById('financeCategoryInput').value.trim();
    const amount = parseFloat(document.getElementById('financeAmountInput').value);
    const date = document.getElementById('financeDateInput').value;
    const description = document.getElementById('financeDescInput').value.trim();

    if (!amount || amount <= 0 || !category) {
      this.showToast('Veuillez saisir un montant et une catégorie valides.', 'warning');
      return;
    }

    const nextId = 'FIN-' + (this.state.finances.length + 1).toString().padStart(3, '0');
    this.state.finances.unshift({
      id: nextId,
      type,
      category,
      amount,
      date,
      description
    });

    this.saveState();
    this.showToast(`Transaction de ${amount} FCFA ajoutée.`);
    document.getElementById('financeModal')?.classList.remove('open');
    this.refreshAll();
  }

  deleteFinance(id) {
    if (confirm('Supprimer cette transaction ?')) {
      this.state.finances = this.state.finances.filter(f => f.id !== id);
      this.saveState();
      this.showToast('Transaction retirée.');
      this.refreshAll();
    }
  }

  // ==========================================
  // STOCKS & ALIMENTATION
  // ==========================================
  renderStockView() {
    const s = this.state.feedStock || { pelletsKg: 0, hayKg: 0, strawKg: 0, dailyConsumptionKg: 1 };
    
    document.getElementById('stockPelletsDisplay').textContent = `${s.pelletsKg} kg`;
    document.getElementById('stockHayDisplay').textContent = `${s.hayKg} kg`;
    document.getElementById('stockStrawDisplay').textContent = `${s.strawKg} kg`;

    // Estimation de jours d'autonomie
    const daysLeft = s.dailyConsumptionKg > 0 ? Math.floor(s.pelletsKg / s.dailyConsumptionKg) : 0;
    const autonomyEl = document.getElementById('stockAutonomyDays');
    if (autonomyEl) {
      autonomyEl.textContent = `${daysLeft} jours`;
      autonomyEl.style.color = daysLeft < 7 ? 'var(--accent-rose)' : 'var(--primary-600)';
    }

    // Input form
    document.getElementById('inputStockPellets').value = s.pelletsKg;
    document.getElementById('inputStockHay').value = s.hayKg;
    document.getElementById('inputStockStraw').value = s.strawKg;
    document.getElementById('inputDailyConsumption').value = s.dailyConsumptionKg;
  }

  handleSaveStock() {
    const pelletsKg = parseFloat(document.getElementById('inputStockPellets').value) || 0;
    const hayKg = parseFloat(document.getElementById('inputStockHay').value) || 0;
    const strawKg = parseFloat(document.getElementById('inputStockStraw').value) || 0;
    const dailyConsumptionKg = parseFloat(document.getElementById('inputDailyConsumption').value) || 1.5;

    this.state.feedStock = { pelletsKg, hayKg, strawKg, dailyConsumptionKg };
    this.saveState();
    this.showToast('Stocks d\'aliments mis à jour avec succès.');
    this.renderStockView();
  }

  // ==========================================
  // FICHE DE CLAPIER IMPRIMABLE
  // ==========================================
  printCageCard(rabbitId) {
    const rabbit = this.state.rabbits.find(r => r.id === rabbitId);
    if (!rabbit) return;

    const printArea = document.getElementById('printable-card-area');
    if (!printArea) return;

    // Dernier accouplement si présent
    const lastBreeding = this.state.breedings.find(b => b.femaleId === rabbitId || b.maleId === rabbitId);

    printArea.innerHTML = `
      <div class="cage-card-preview">
        <div class="cage-card-header">
          <div style="display:flex; align-items:center; gap:14px;">
            <img src="logo-lapin.jpg" class="cage-card-logo" alt="Logo Le Lapin Malin">
            <div>
              <h2>FICHE DE CLAPIER : CAGE ${rabbit.cage}</h2>
              <div style="font-size:0.9rem; color:#475569;">Le Lapin Malin • Gestion Professionnelle d'Élevage</div>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size: 1.5rem; font-weight: 800; color:#047857;">${rabbit.id}</div>
            <div style="font-size:0.8rem; color:#64748b;">Générée le ${new Date().toLocaleDateString('fr-FR')}</div>
          </div>
        </div>

        <div class="cage-card-grid">
          <div class="cage-card-cell">
            <div class="label">Nom / Nom d'usage</div>
            <div class="val">${rabbit.name}</div>
          </div>
          <div class="cage-card-cell">
            <div class="label">Sexe & Statut</div>
            <div class="val">${rabbit.sex === 'M' ? 'Mâle' : 'Femelle'} (${rabbit.status})</div>
          </div>
          <div class="cage-card-cell">
            <div class="label">Race pure / Type</div>
            <div class="val">${rabbit.breed}</div>
          </div>
          <div class="cage-card-cell">
            <div class="label">Date de Naissance</div>
            <div class="val">${formatDateFr(rabbit.birthDate)}</div>
          </div>
          <div class="cage-card-cell">
            <div class="label">Poids Actuel</div>
            <div class="val">${rabbit.weight ? rabbit.weight + ' kg' : 'Non pesé'}</div>
          </div>
          <div class="cage-card-cell">
            <div class="label">Emplacement Clapier</div>
            <div class="val">${rabbit.cage}</div>
          </div>
        </div>

        ${lastBreeding ? `
          <div style="margin-top: 14px; padding: 12px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px;">
            <div style="font-weight:700; color:#065f46; margin-bottom:4px;">Dernière Reproduction (${lastBreeding.id})</div>
            <div style="font-size: 0.85rem; color:#064e3b; display:flex; gap:16px; flex-wrap:wrap;">
              <span>Saillie: <strong>${formatDateFr(lastBreeding.date)}</strong></span>
              <span>Palpation: <strong>${formatDateFr(lastBreeding.palpationDate)}</strong></span>
              <span>Pose Nid: <strong>${formatDateFr(lastBreeding.nestBoxDate)}</strong></span>
              <span>Mise Bas: <strong>${formatDateFr(lastBreeding.birthDueDate)}</strong></span>
            </div>
          </div>
        ` : ''}

        <div style="margin-top: 14px; font-size: 0.85rem; color: #475569;">
          <strong>Notes & Particularités :</strong> ${rabbit.notes || 'Aucune observation particulière.'}
        </div>

        <div style="margin-top: 24px; border-top: 1px dashed #cbd5e1; padding-top: 8px; display:flex; justify-content:space-between; font-size:0.75rem; color:#94a3b8;">
          <span>Le Lapin Malin • Système d'identification officiel</span>
          <span>À fixer sur le grillage du clapier</span>
        </div>
      </div>
    `;

    // Déclencher l'impression native du navigateur
    window.print();
  }

  // ==========================================
  // SAUVEGARDE & RESTAURATION (BASE DE DONNÉES)
  // ==========================================
  async exportData() {
    let exportObj = this.state;
    if (this.db && this.db.isReady) {
      try {
        exportObj = await this.db.exportFullDatabase();
      } catch (e) {
        console.warn('Export depuis mémoire:', e);
      }
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchor = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `lelapinmalin_bdd_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    this.showToast('Sauvegarde complète de la base de données téléchargée !');
  }

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.rabbits && Array.isArray(imported.rabbits)) {
          this.state = imported;
          if (this.db && this.db.isReady) {
            await this.db.importFullDatabase(imported);
          }
          this.saveState();
          this.applyTheme(this.state.theme || 'light');
          this.refreshAll();
          this.showToast('Base de données restaurée avec succès !');
        } else {
          this.showToast('Format de fichier de base de données non valide.', 'error');
        }
      } catch (err) {
        this.showToast('Erreur lors de la lecture du fichier.', 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  async resetToDefault() {
    if (confirm('Attention : réinitialiser toutes les tables de la base de données aux valeurs de démonstration ?')) {
      this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
      if (this.db && this.db.isReady) {
        await this.db.importFullDatabase(this.state);
      }
      this.saveState();
      this.applyTheme('light');
      this.refreshAll();
      this.showToast('Base de données réinitialisée aux valeurs initiales.');
    }
  }

  // ==========================================
  // TOASTS DE NOTIFICATION
  // ==========================================
  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : (type === 'warning' ? 'toast-warning' : '')}`;
    
    let iconSvg = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`;
    if (type === 'error') {
      iconSvg = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`;
    }

    toast.innerHTML = `
      <div style="flex-shrink:0;">${iconSvg}</div>
      <div style="font-size:0.87rem; font-weight:500;">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

// Initialisation globale
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new LeLapinMalinApp();
  window.app = app;
});
