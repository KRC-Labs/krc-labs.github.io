/**
 * KRC Labs — HelpModal Component
 * Interactive System Guide & Help Dialog.
 * Explains Theme Families, Custom Window GUI manipulation, Floating Scroll Button Pinning, and Shortcuts.
 */

import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../locales';

export class HelpModal {
  private currentLang: LanguageCode = 'ko';
  private modalEl: HTMLElement | null = null;
  private closeBtn: HTMLButtonElement | null = null;

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;
    this.modalEl = document.getElementById('helpModal');
    this.closeBtn = document.getElementById('helpModalClose') as HTMLButtonElement | null;

    this.bindEvents();
    this.updateTexts();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.updateTexts();
  }

  public open(): void {
    if (!this.modalEl) return;
    this.modalEl.classList.add('open');
    this.modalEl.setAttribute('aria-hidden', 'false');
  }

  public close(): void {
    if (!this.modalEl) return;
    this.modalEl.classList.remove('open');
    this.modalEl.setAttribute('aria-hidden', 'true');
  }

  public isOpen(): boolean {
    return this.modalEl?.classList.contains('open') || false;
  }

  private bindEvents(): void {
    this.closeBtn?.addEventListener('click', () => this.close());

    // Close on backdrop click
    this.modalEl?.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.close();
      }
    });

    // Keyboard shortcuts: '?' opens help, 'Escape' closes
    document.addEventListener('keydown', (e) => {
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        if (this.isOpen()) this.close();
        else this.open();
      } else if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  private updateTexts(): void {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    const titleEl = document.getElementById('helpModalTitle');
    if (titleEl) titleEl.textContent = t.helpTitle;

    const descEl = document.getElementById('helpModalDesc');
    if (descEl) descEl.textContent = t.helpDesc;

    const themeItem = document.querySelector('[data-help-item="theme"]');
    if (themeItem) themeItem.textContent = t.helpThemeGuide;

    const windowItem = document.querySelector('[data-help-item="window"]');
    if (windowItem) windowItem.textContent = t.helpWindowGuide;

    const scrollItem = document.querySelector('[data-help-item="scroll"]');
    if (scrollItem) scrollItem.textContent = t.helpScrollGuide;

    const shortcutsItem = document.querySelector('[data-help-item="shortcuts"]');
    if (shortcutsItem) shortcutsItem.textContent = t.helpShortcutsGuide;

    const closeBtnText = document.getElementById('helpModalCloseBtnText');
    if (closeBtnText) closeBtnText.textContent = t.helpClose;
  }
}
