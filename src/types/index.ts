/**
 * KRC Labs — Core Type System
 */

export type ThemeId = 'dark' | 'forest' | 'sage' | 'paper' | 'custom' | 'system';
export type EffectiveTheme = 'dark' | 'forest' | 'sage' | 'paper' | 'custom';

export interface CustomPalette {
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  accent: string;
  textPrimary: string;
}

export type LanguageCode = 'ko' | 'en' | 'ja' | 'zh' | 'de' | 'fr' | 'es' | 'ru' | 'hi' | 'pt';

export type Subsystem = 'all' | 'kernel' | 'reverse' | 'mcp' | 'cluster';

export interface SystemRepository {
  id: string;
  name: string;
  displayName?: string;
  subsystem: Subsystem;
  node: 'Node 1 (10.0.1.30)' | 'Node 2 (10.0.1.31)';
  nodeClass: 'badge-node1' | 'badge-node2';
  lead: string;
  tech: string[];
  status: 'active' | 'hardened';
}

export interface RepoI18n {
  label: string;
  summary: string;
}

export interface TranslationSchema {
  navSystems: string;
  navCluster: string;
  navConsole: string;
  clusterOperational: string;
  verifiedRuntimes: string;
  heroTitle: string;
  heroLead: string;
  cloneCopy: string;
  cloneCopied: string;
  exploreBtn: string;
  node1Title: string;
  node1Value: string;
  node2Title: string;
  node2Value: string;
  hwSecTitle: string;
  hwSecValue: string;
  catalogTitle: string;
  catalogSubtitle: string;
  tabAll: string;
  tabKernel: string;
  tabReverse: string;
  tabMcp: string;
  tabCluster: string;
  showingCount: (shown: number, total: number) => string;
  searchPlaceholder: string;
  consoleTitle: string;
  consoleSubtitle: string;
  consoleHelpHeader: string;
  consoleStatusOnline: string;
  consoleStatusRuntimes: string;
  consoleStatusNodes: string;
  consoleStatusSecurity: string;
  consoleNodesNode1: string;
  consoleNodesNode2: string;
  footerTagline: string;
  footerOrg: string;
  footerSecurity: string;
  footerLocation: string;
  themes: Record<ThemeId, string>;
  repos: Record<string, RepoI18n>;
  // Custom Theme Studio & Floating Window GUI
  themeGroupDark: string;
  themeGroupLight: string;
  themeGroupSpecial: string;
  customThemeTitle: string;
  customThemeDesc: string;
  customBg: string;
  customSurface: string;
  customAccent: string;
  customText: string;
  customPresets: string;
  customSave: string;
  customReset: string;
  customClose: string;
  customWindowCollapse: string;
  customWindowExpand: string;
  // Floating Controls & Help Guide
  scrollTopLabel: string;
  btnPinnedToast: string;
  btnUnpinnedToast: string;
  helpTitle: string;
  helpDesc: string;
  helpThemeGuide: string;
  helpWindowGuide: string;
  helpScrollGuide: string;
  helpShortcutsGuide: string;
  helpClose: string;
}
