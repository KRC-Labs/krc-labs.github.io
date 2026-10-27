/**
 * KRC Labs — ThemeDropdown Component
 * Manages theme popover, smooth 400ms transitions, F5 persistence, and Custom Theme Studio integration.
 * Order: 다크 (Dark) -> 포레스트 (Forest) -> 연초록 (Sage) -> 페이퍼 (Paper) -> 커스텀 (Custom) -> 시스템 (System)
 */

import { ThemeId, EffectiveTheme, LanguageCode, CustomPalette } from '../types';
import { TRANSLATIONS } from '../locales';
import { CustomThemeModal } from './CustomThemeModal';

export const THEME_META: Record<ThemeId, { nameKey: string; color: string; iconSvg: string }> = {
  dark: {
    nameKey: 'dark',
    color: '#0d1117',
    iconSvg: `<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  },
  forest: {
    nameKey: 'forest',
    color: '#1f3b27',
    iconSvg: `<svg viewBox="0 0 24 24"><polygon points="12 2 2 19 22 19 12 2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>`,
  },
  sage: {
    nameKey: 'sage',
    color: '#23683f',
    iconSvg: `<svg viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7z"/><path d="M11 3v17"/></svg>`,
  },
  paper: {
    nameKey: 'paper',
    color: '#8c5620',
    iconSvg: `<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  },
  custom: {
    nameKey: 'custom',
    color: '#8b5cf6',
    iconSvg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/></svg>`,
  },
  system: {
    nameKey: 'system',
    color: '#8b949e',
    iconSvg: `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  },
};

export class ThemeDropdown {
  public static readonly STORAGE_KEY = 'krc_theme_pref';
  private static readonly DEFAULT_THEME: ThemeId = 'system'; // System is base reference
  private currentTheme: ThemeId = ThemeDropdown.DEFAULT_THEME;
  private currentLang: LanguageCode = 'ko';
  private mediaQuery: MediaQueryList;
  private listeners: Array<(theme: ThemeId) => void> = [];
  private customModal: CustomThemeModal | null = null;

  private triggerBtn: HTMLButtonElement | null = null;
  private menuEl: HTMLElement | null = null;
  private iconEl: HTMLElement | null = null;
  private labelEl: HTMLElement | null = null;

  constructor(customModal?: CustomThemeModal) {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.customModal = customModal || null;
  }

  public setCustomModal(modal: CustomThemeModal): void {
    this.customModal = modal;
  }

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;

    this.triggerBtn = document.getElementById('themeTrigger') as HTMLButtonElement | null;
    this.menuEl = document.getElementById('themeMenu');
    this.iconEl = document.getElementById('themeTriggerIcon');
    this.labelEl = document.getElementById('themeTriggerLabel');

    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get('theme') as ThemeId | null;
    const stored = localStorage.getItem(ThemeDropdown.STORAGE_KEY) as ThemeId | null;

    // System theme is base reference if not specified
    const initial = this.isValidTheme(urlTheme)
      ? (urlTheme as ThemeId)
      : this.isValidTheme(stored)
      ? (stored as ThemeId)
      : ThemeDropdown.DEFAULT_THEME;

    this.applyTheme(initial, false);
    this.bindEvents();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.updateControls(this.currentTheme);
  }

  public setTheme(theme: ThemeId): void {
    if (!this.isValidTheme(theme)) return;

    // View Transitions API or smooth 400ms transition guard
    const doc = document as unknown as { startViewTransition?: (cb: () => void) => { ready?: Promise<void> } };
    let transitionStarted = false;

    if (typeof doc.startViewTransition === 'function' && !document.hidden) {
      try {
        const t = doc.startViewTransition(() => {
          this.applyTheme(theme, true);
        });
        if (t && t.ready) {
          t.ready.catch(() => {});
        }
        transitionStarted = true;
      } catch {
        transitionStarted = false;
      }
    }

    if (!transitionStarted) {
      this.enableTransitionGuard();
      this.applyTheme(theme, true);
    }

    this.listeners.forEach((fn) => fn(theme));
  }

  public getTheme(): ThemeId {
    return this.currentTheme;
  }

  public onThemeChange(listener: (theme: ThemeId) => void): void {
    this.listeners.push(listener);
  }

  public open(): void {
    this.closeAllMenus();
    this.menuEl?.classList.add('open');
    this.triggerBtn?.setAttribute('aria-expanded', 'true');
  }

  public close(): void {
    this.menuEl?.classList.remove('open');
    this.triggerBtn?.setAttribute('aria-expanded', 'false');
  }

  public isOpen(): boolean {
    return this.menuEl?.classList.contains('open') || false;
  }

  private isValidTheme(val: string | null): boolean {
    return val === 'dark' || val === 'forest' || val === 'sage' || val === 'paper' || val === 'custom' || val === 'system';
  }

  private resolveEffectiveTheme(theme: ThemeId): EffectiveTheme {
    if (theme === 'system') {
      // Baseline: Syncs with system OS dark/light mode
      return this.mediaQuery.matches ? 'dark' : 'sage';
    }
    return theme;
  }

  private applyTheme(theme: ThemeId, saveStorage: boolean): void {
    this.currentTheme = theme;
    const effective = this.resolveEffectiveTheme(theme);

    document.documentElement.setAttribute('data-theme', effective);
    document.documentElement.setAttribute('data-theme-pref', theme);

    if (theme === 'custom') {
      // Apply custom palette from modal or storage
      if (this.customModal) {
        this.customModal.applyPaletteToDocument(this.customModal.getPalette());
      }
    } else {
      // Remove any custom CSS property overrides
      this.customModal?.removeCustomOverrides();
    }

    if (saveStorage) {
      localStorage.setItem(ThemeDropdown.STORAGE_KEY, theme);
    }

    this.updateControls(theme);
  }

  private enableTransitionGuard(): void {
    document.documentElement.classList.add('theme-transitioning');
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 420);
  }

  private updateControls(activeTheme: ThemeId): void {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    if (this.iconEl && this.labelEl) {
      const meta = THEME_META[activeTheme];
      this.iconEl.innerHTML = meta.iconSvg;
      this.labelEl.textContent = t.themes[activeTheme] || activeTheme;
    }

    // Update section group headers
    const hdrDark = document.querySelector<HTMLElement>('[data-theme-group="dark"]');
    if (hdrDark) hdrDark.textContent = t.themeGroupDark;

    const hdrLight = document.querySelector<HTMLElement>('[data-theme-group="light"]');
    if (hdrLight) hdrLight.textContent = t.themeGroupLight;

    const hdrSpecial = document.querySelector<HTMLElement>('[data-theme-group="special"]');
    if (hdrSpecial) hdrSpecial.textContent = t.themeGroupSpecial;

    const items = document.querySelectorAll<HTMLButtonElement>('.theme-item');
    items.forEach((item) => {
      const val = item.getAttribute('data-theme-val') as ThemeId;
      const isMatch = val === activeTheme;
      if (isMatch) {
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      }

      // Update item text localized
      const textSpan = item.querySelector('.theme-item-text');
      if (textSpan && val) {
        textSpan.textContent = t.themes[val] || val;
      }
    });
  }

  private bindEvents(): void {
    if (this.triggerBtn && this.menuEl) {
      this.triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.isOpen()) {
          this.close();
        } else {
          this.open();
        }
      });
    }

    const items = document.querySelectorAll<HTMLButtonElement>('.theme-item');
    items.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = btn.getAttribute('data-theme-val') as ThemeId;
        if (val) {
          if (val === 'custom') {
            this.setTheme('custom');
            this.close();
            // Also open custom palette studio modal for live editing
            this.customModal?.open();
          } else {
            this.setTheme(val);
            this.close();
          }
        }
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      const target = e.target as Node;
      if (this.isOpen() && !this.menuEl?.contains(target) && !this.triggerBtn?.contains(target)) {
        this.close();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
        this.triggerBtn?.focus();
      }
    });

    // System theme baseline dynamic listener: responds when OS changes dark/light
    this.mediaQuery.addEventListener('change', () => {
      if (this.currentTheme === 'system') {
        this.applyTheme('system', false);
      }
    });
  }

  private closeAllMenus(): void {
    document.querySelectorAll('.dropdown-menu').forEach((el) => el.classList.remove('open'));
    document.querySelectorAll('.dropdown-trigger').forEach((el) => el.setAttribute('aria-expanded', 'false'));
  }
}
