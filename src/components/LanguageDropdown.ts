/**
 * KRC Labs ??LanguageDropdown Component
 * Manages 10-language selector popover and triggers language change events.
 */

import { LanguageCode } from '../types';
import { LANGUAGE_META } from '../locales';

export class LanguageDropdown {
  private currentLang: LanguageCode = 'ko';
  private triggerBtn: HTMLButtonElement | null = null;
  private menuEl: HTMLElement | null = null;
  private labelEl: HTMLElement | null = null;
  private listeners: Array<(lang: LanguageCode) => void> = [];

  public init(currentLang: LanguageCode = 'ko'): void {
    this.currentLang = currentLang;

    this.triggerBtn = document.getElementById('langTrigger') as HTMLButtonElement | null;
    this.menuEl = document.getElementById('langMenu');
    this.labelEl = document.getElementById('langTriggerLabel');

    this.updateControls();
    this.bindEvents();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.updateControls();
  }

  public getLanguage(): LanguageCode {
    return this.currentLang;
  }

  public onLanguageChange(listener: (lang: LanguageCode) => void): void {
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

  private updateControls(): void {
    if (this.labelEl) {
      const meta = LANGUAGE_META[this.currentLang];
      if (meta) {
        this.labelEl.textContent = meta.nativeName;
      }
    }

    const items = document.querySelectorAll<HTMLButtonElement>('.lang-item');
    items.forEach((item) => {
      const code = item.getAttribute('data-lang-val') as LanguageCode;
      if (code === this.currentLang) {
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
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

    const items = document.querySelectorAll<HTMLButtonElement>('.lang-item');
    items.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = btn.getAttribute('data-lang-val') as LanguageCode;
        if (lang) {
          this.currentLang = lang;
          this.updateControls();
          this.close();
          this.listeners.forEach((fn) => fn(lang));
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

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
        this.triggerBtn?.focus();
      }
    });
  }

  private closeAllMenus(): void {
    document.querySelectorAll('.dropdown-menu').forEach((el) => el.classList.remove('open'));
    document.querySelectorAll('.dropdown-trigger').forEach((el) => el.setAttribute('aria-expanded', 'false'));
  }
}
