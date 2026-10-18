(() => {
  const screen = document.getElementById('authScreen');
  const form = document.getElementById('authForm');
  const nameField = document.getElementById('authNameField');
  const nameInput = document.getElementById('authName');
  const emailInput = document.getElementById('authEmail');
  const passwordInput = document.getElementById('authPassword');
  const confirmField = document.getElementById('authConfirmField');
  const confirmInput = document.getElementById('authConfirmPassword');
  const message = document.getElementById('authMessage');
  const title = document.getElementById('authTitle');
  const subtitle = document.getElementById('authSubtitle');
  const submit = document.getElementById('authSubmit');
  const logout = document.getElementById('btnSignOut');
  const authThemeToggle = document.getElementById('authThemeToggle');
  const appSections = [document.getElementById('sidebar'), document.getElementById('main-content')];
  const config = window.LELAPINMALIN_SUPABASE_CONFIG || {};
  const projectUrl = typeof config.url === 'string' ? config.url.trim() : '';
  const anonKey = typeof config.anonKey === 'string' ? config.anonKey.trim() : '';
  const hasConfig = Boolean(projectUrl && anonKey);
  let supabaseClient = null;
  let clientConfigError = null;
  if (hasConfig && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(projectUrl, anonKey);
    } catch (error) {
      clientConfigError = error;
      console.error('Configuration Supabase invalide :', error);
    }
  }
  let mode = 'login';
  let appInitializer = null;
  let appStartedForUser = null;
  let isSubmitting = false;

  function updateThemeControls(theme) {
    const isDark = theme === 'dark';
    const nextThemeLabel = isDark ? 'clair' : 'sombre';
    const iconMarkup = isDark
      ? '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
      : '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>';
    const authThemeIcon = document.getElementById('authThemeIcon');
    const appThemeIcon = document.getElementById('themeIcon');

    if (authThemeIcon) authThemeIcon.innerHTML = iconMarkup;
    if (appThemeIcon) appThemeIcon.innerHTML = iconMarkup;
    authThemeToggle?.setAttribute('aria-label', `Activer le thème ${nextThemeLabel}`);
    authThemeToggle?.setAttribute('title', `Activer le thème ${nextThemeLabel}`);

    const appThemeToggle = document.getElementById('btnThemeToggle');
    appThemeToggle?.setAttribute('aria-label', `Activer le thème ${nextThemeLabel}`);
    appThemeToggle?.setAttribute('title', `Activer le thème ${nextThemeLabel}`);
  }

  function setTheme(theme) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
    updateThemeControls(nextTheme);
    try {
      localStorage.setItem('lelapinmalin_theme_preference', nextTheme);
    } catch (error) {
      console.warn('Impossible d’enregistrer la préférence de thème :', error);
    }
  }

  let savedTheme = document.documentElement.dataset.theme;
  try {
    savedTheme = localStorage.getItem('lelapinmalin_theme_preference') || savedTheme;
  } catch (error) {
    console.warn('Impossible de charger la préférence de thème :', error);
  }
  setTheme(savedTheme === 'dark' ? 'dark' : 'light');
  authThemeToggle?.addEventListener('click', () => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  function setAppInert(isInert) {
    appSections.forEach((section) => {
      section.toggleAttribute('inert', isInert);
      section.setAttribute('aria-hidden', String(isInert));
    });
  }

  function showMessage(text, type = 'info') {
    message.textContent = text;
    message.dataset.type = type;
    message.hidden = !text;
  }

  function setMode(nextMode) {
    mode = nextMode;
    const registering = mode === 'register';
    nameField.hidden = !registering;
    nameInput.required = registering;
    confirmField.hidden = !registering;
    confirmInput.required = registering;
    passwordInput.minLength = registering ? 8 : 1;
    passwordInput.autocomplete = registering ? 'new-password' : 'current-password';
    title.textContent = registering ? 'Créez votre espace' : 'Heureux de vous revoir';
    subtitle.textContent = registering
      ? 'Créez votre compte pour gérer votre élevage.'
      : 'Connectez-vous pour retrouver votre espace.';
    submit.textContent = registering ? 'Créer mon compte' : 'Se connecter';
    confirmInput.setCustomValidity('');
    showMessage('');

    document.querySelectorAll('[data-auth-mode]').forEach((tab) => {
      const selected = tab.dataset.authMode === mode;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
  }

  function setSubmitting(value) {
    isSubmitting = value;
    submit.disabled = value;
    document.querySelectorAll('[data-auth-mode]').forEach((tab) => {
      tab.disabled = value;
    });
    submit.textContent = value
      ? (mode === 'register' ? 'Création du compte…' : 'Connexion…')
      : (mode === 'register' ? 'Créer mon compte' : 'Se connecter');
  }

  async function showAuthenticatedApp(user) {
    if (!user || !appInitializer || appStartedForUser === user.id) return;

    appStartedForUser = user.id;
    window.authManager.currentUser = user;
    screen.classList.remove('is-hidden');
    setAppInert(true);
    showMessage('Chargement de votre élevage…');

    try {
      await appInitializer(user);
      const email = document.getElementById('accountSessionEmail');
      if (email) email.textContent = user.email || '';
      screen.classList.add('is-hidden');
      setAppInert(false);
    } catch (error) {
      appStartedForUser = null;
      console.error('Chargement des données du compte impossible :', error);
      showMessage(
        'Votre session est valide, mais les données de la ferme ne peuvent pas être chargées. Vérifiez la configuration Supabase et la table farm_data, puis réessayez.',
        'error'
      );
    }
  }

  function handleAuthState(session) {
    if (session?.user) {
      void showAuthenticatedApp(session.user);
      return;
    }

    appStartedForUser = null;
    window.authManager.currentUser = null;
    screen.classList.remove('is-hidden');
    setAppInert(true);
    showMessage('');
  }

  document.querySelectorAll('[data-auth-mode]').forEach((tab) => {
    tab.addEventListener('click', () => setMode(tab.dataset.authMode));
  });

  confirmInput.addEventListener('input', () => {
    confirmInput.setCustomValidity(
      confirmInput.value && confirmInput.value !== passwordInput.value
        ? 'Les mots de passe ne correspondent pas.'
        : ''
    );
  });
  passwordInput.addEventListener('input', () => {
    confirmInput.setCustomValidity('');
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    confirmInput.setCustomValidity(
      mode === 'register' && confirmInput.value !== passwordInput.value
        ? 'Les mots de passe ne correspondent pas.'
        : ''
    );
    if (!form.reportValidity()) return;

    if (!supabaseClient) {
      showMessage(
        clientConfigError
          ? 'La configuration Supabase est invalide. Vérifiez l’URL et la clé publique dans supabase-config.js.'
          : hasConfig
            ? 'Le client Supabase n’a pas pu être chargé. Vérifiez votre connexion internet puis rechargez la page.'
          : 'Configurez l’URL du projet et la clé anon publique dans supabase-config.js pour activer les comptes.',
        'error'
      );
      return;
    }

    setSubmitting(true);
    showMessage('');

    try {
      if (mode === 'register') {
        const { data, error } = await supabaseClient.auth.signUp({
          email: emailInput.value.trim(),
          password: passwordInput.value,
          options: {
            data: { full_name: nameInput.value.trim() },
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        if (error) throw error;

        if (!data.session) {
          setMode('login');
          emailInput.value = data.user?.email || emailInput.value.trim();
          showMessage('Compte créé. Consultez votre courriel et confirmez votre adresse avant de vous connecter.');
        } else {
          showMessage('Compte créé. Préparation de votre espace…');
        }
      } else {
        const { error } = await supabaseClient.auth.signInWithPassword({
          email: emailInput.value.trim(),
          password: passwordInput.value
        });
        if (error) throw error;
      }
    } catch (error) {
      console.error('Erreur d’authentification Supabase :', error);
      showMessage(error.message || 'L’authentification a échoué. Réessayez.', 'error');
    } finally {
      setSubmitting(false);
    }
  });

  logout?.addEventListener('click', async () => {
    if (!supabaseClient || logout.disabled) return;
    logout.disabled = true;
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      logout.disabled = false;
      console.error('Erreur de déconnexion Supabase :', error);
      if (typeof window.app?.showToast === 'function') {
        window.app.showToast('La déconnexion a échoué. Réessayez.', 'error');
      }
    }
  });

  window.authManager = {
    client: supabaseClient,
    currentUser: null,
    setTheme,
    setAppInitializer(initializer) {
      appInitializer = initializer;
      if (this.currentUser) void showAuthenticatedApp(this.currentUser);
    }
  };

  window.addEventListener('DOMContentLoaded', async () => {
    setAppInert(true);

    if (!hasConfig) {
      showMessage('Configurez supabase-config.js pour activer la connexion et l’inscription.');
      return;
    }
    if (!supabaseClient) {
      showMessage('Le client Supabase est indisponible. Vérifiez votre connexion internet.');
      return;
    }

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => handleAuthState(session), 0);
    });

    try {
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      handleAuthState(data.session);
    } catch (error) {
      showMessage('La session Supabase n’a pas pu être vérifiée. Vérifiez votre connexion puis rechargez la page.', 'error');
      console.error('Vérification de session Supabase impossible :', error);
    }
  });
})();
