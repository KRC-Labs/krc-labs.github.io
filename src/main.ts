/**
 * KRC Labs — Main Application Entry Point
 * Vibe Coding Modular Orchestrator
 */

import { I18nManager } from './locales';
import {
  Header,
  ThemeDropdown,
  LanguageDropdown,
  CustomThemeModal,
  Hero,
  TelemetryBar,
  CategoryFilter,
  SystemsGrid,
  InteractiveConsole,
  Footer,
  ScrollTopButton,
  HelpModal,
} from './components';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Core State Managers & Dropdown Controllers
  const i18n = new I18nManager();
  const customModal = new CustomThemeModal();
  const theme = new ThemeDropdown(customModal);
  const language = new LanguageDropdown();
  const scrollTopBtn = new ScrollTopButton();
  const helpModal = new HelpModal();

  // 2. View Components Hierarchy
  const header = new Header(theme, language);
  const hero = new Hero();
  const telemetry = new TelemetryBar();
  const categoryFilter = new CategoryFilter();
  const systemsGrid = new SystemsGrid();
  const interactiveConsole = new InteractiveConsole();
  const footer = new Footer();

  // 3. Initialize I18n State
  i18n.init();
  const initialLang = i18n.getLanguage();

  // 4. Initialize Custom Theme Studio & Components with Current Language
  customModal.init(initialLang);
  theme.setCustomModal(customModal);
  header.init(initialLang);
  hero.init(initialLang);
  telemetry.init(initialLang);
  categoryFilter.init(initialLang);
  systemsGrid.init(initialLang);
  interactiveConsole.init(initialLang);
  footer.init(initialLang);
  scrollTopBtn.init(initialLang);
  helpModal.init(initialLang);

  // Wire Help Triggers
  scrollTopBtn.onHelpClick(() => {
    helpModal.open();
  });

  const headerHelpTrigger = document.getElementById('headerHelpTrigger');
  headerHelpTrigger?.addEventListener('click', () => {
    helpModal.open();
  });

  // Sync initial system count in filter header
  categoryFilter.updateCount(systemsGrid.getTotalCount(), systemsGrid.getTotalCount());

  // 5. Wire Filter Events -> Systems Grid
  categoryFilter.onFilterChange((filterState) => {
    const shownCount = systemsGrid.applyFilter(filterState);
    categoryFilter.updateCount(shownCount, systemsGrid.getTotalCount());
  });

  // 6. Wire Language Selection Event -> I18n State
  language.onLanguageChange((newLang) => {
    i18n.setLanguage(newLang);
  });

  // 7. Wire Custom Modal Save -> Theme update
  customModal.onApply(() => {
    theme.setTheme('custom');
  });

  // 8. Wire Global Language Change Listener -> All Components
  i18n.onChange((newLang) => {
    header.setLanguage(newLang);
    language.setLanguage(newLang);
    theme.setLanguage(newLang);
    customModal.setLanguage(newLang);
    hero.setLanguage(newLang);
    telemetry.setLanguage(newLang);
    categoryFilter.setLanguage(newLang);
    systemsGrid.setLanguage(newLang);
    interactiveConsole.setLanguage(newLang);
    footer.setLanguage(newLang);
    scrollTopBtn.setLanguage(newLang);
    helpModal.setLanguage(newLang);

    // Refresh count after language switch
    const currentFilter = categoryFilter.getState();
    const count = systemsGrid.applyFilter(currentFilter);
    categoryFilter.updateCount(count, systemsGrid.getTotalCount());
  });

  // 9. Headless Automation / Testing Helper via Query Params
  const params = new URLSearchParams(window.location.search);
  if (params.get('open') === 'theme') {
    theme.open();
  } else if (params.get('open') === 'lang') {
    language.open();
  } else if (params.get('open') === 'custom') {
    customModal.open();
  } else if (params.get('open') === 'collapsed') {
    customModal.open();
    customModal.setCollapsed(true);
  } else if (params.get('open') === 'help') {
    helpModal.open();
  }

  // 10. Register Global Diagnostic Handle
  (window as unknown as { __krc__: unknown }).__krc__ = {
    i18n,
    theme,
    language,
    customModal,
    header,
    hero,
    telemetry,
    categoryFilter,
    systemsGrid,
    interactiveConsole,
    footer,
    scrollTopBtn,
    helpModal,
  };

  console.log('[KRC Labs] Modular systems showcase initialized with 10-language 1:1 translation and custom theme studio.');
});
