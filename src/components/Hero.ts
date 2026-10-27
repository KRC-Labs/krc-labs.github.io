/**
 * KRC Labs ??Hero Component
 * Manages hero headline, cluster operational badge, lead text, and interactive CLI copy pill.
 */

import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../locales';

export class Hero {
  private currentLang: LanguageCode = 'ko';
  private copyBtn: HTMLButtonElement | null = null;
  private copyTimeout: number | null = null;

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;
    this.copyBtn = document.querySelector<HTMLButtonElement>('.cli-copy-btn');

    this.bindEvents();
    this.updateTexts();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.updateTexts();
  }

  private updateTexts(): void {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    const opBadge = document.querySelector<HTMLElement>('[data-i18n="clusterOperational"]');
    if (opBadge) opBadge.textContent = t.clusterOperational;

    const runtimeBadge = document.querySelector<HTMLElement>('[data-i18n="verifiedRuntimes"]');
    if (runtimeBadge) runtimeBadge.textContent = t.verifiedRuntimes;

    const titleEl = document.querySelector<HTMLElement>('[data-i18n="heroTitle"]');
    if (titleEl) titleEl.textContent = t.heroTitle;

    const leadEl = document.querySelector<HTMLElement>('[data-i18n="heroLead"]');
    if (leadEl) leadEl.textContent = t.heroLead;

    const exploreBtn = document.querySelector<HTMLElement>('[data-i18n="exploreBtn"]');
    if (exploreBtn) exploreBtn.textContent = t.exploreBtn;

    if (this.copyBtn && !this.copyBtn.classList.contains('copied')) {
      this.copyBtn.textContent = t.cloneCopy;
    }
  }

  private bindEvents(): void {
    if (!this.copyBtn) return;

    this.copyBtn.addEventListener('click', async () => {
      const text = this.copyBtn?.getAttribute('data-copy-val') || 'gh repo clone KRC-Labs/krc-labs.github.io';
      const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

      try {
        await navigator.clipboard.writeText(text);
        if (this.copyBtn) {
          this.copyBtn.textContent = t.cloneCopied;
          this.copyBtn.classList.add('copied');

          if (this.copyTimeout) clearTimeout(this.copyTimeout);
          this.copyTimeout = window.setTimeout(() => {
            if (this.copyBtn) {
              this.copyBtn.textContent = t.cloneCopy;
              this.copyBtn.classList.remove('copied');
            }
          }, 2000);
        }
      } catch {
        // Fallback for non-secure contexts
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        if (this.copyBtn) {
          this.copyBtn.textContent = t.cloneCopied;
          this.copyBtn.classList.add('copied');
        }
      }
    });
  }
}
