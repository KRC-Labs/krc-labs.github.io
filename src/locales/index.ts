/**
 * KRC Labs — 10-Language Aggregator & I18n Manager
 */

import { LanguageCode, TranslationSchema } from '../types';
import { ko } from './ko';
import { en } from './en';
import { ja } from './ja';
import { zh } from './zh';
import { de } from './de';
import { fr } from './fr';
import { es } from './es';
import { ru } from './ru';
import { hi } from './hi';
import { pt } from './pt';

export const LANGUAGE_META: Record<LanguageCode, { name: string; nativeName: string; flag: string }> = {
  ko: { name: 'Korean', nativeName: '한국어', flag: 'KR' },
  en: { name: 'English', nativeName: 'English', flag: 'US' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: 'JP' },
  zh: { name: 'Chinese', nativeName: '简体中文', flag: 'CN' },
  de: { name: 'German', nativeName: 'Deutsch', flag: 'DE' },
  fr: { name: 'French', nativeName: 'Français', flag: 'FR' },
  es: { name: 'Spanish', nativeName: 'Español', flag: 'ES' },
  ru: { name: 'Russian', nativeName: 'Русский', flag: 'RU' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: 'IN' },
  pt: { name: 'Portuguese', nativeName: 'Português', flag: 'PT' },
};

export const TRANSLATIONS: Record<LanguageCode, TranslationSchema> = {
  ko,
  en,
  ja,
  zh,
  de,
  fr,
  es,
  ru,
  hi,
  pt,
};

export class I18nManager {
  private static readonly STORAGE_KEY = 'krc_lang_pref';
  private currentLang: LanguageCode = 'ko';
  private listeners: Array<(lang: LanguageCode) => void> = [];

  public init(): void {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang') as LanguageCode | null;
    const stored = localStorage.getItem(I18nManager.STORAGE_KEY) as LanguageCode | null;

    const initial = this.isValid(urlLang)
      ? (urlLang as LanguageCode)
      : this.isValid(stored)
      ? (stored as LanguageCode)
      : this.detectBrowserLang();

    this.setLanguage(initial, false);
  }

  public setLanguage(lang: LanguageCode, triggerListeners = true): void {
    if (!this.isValid(lang)) return;

    this.currentLang = lang;
    localStorage.setItem(I18nManager.STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    this.updateDom();
    this.updateControls();

    if (triggerListeners) {
      this.listeners.forEach((fn) => fn(lang));
    }
  }

  public getLanguage(): LanguageCode {
    return this.currentLang;
  }

  public getTranslation(): TranslationSchema {
    return TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;
  }

  public onChange(listener: (lang: LanguageCode) => void): void {
    this.listeners.push(listener);
  }

  private isValid(lang: string | null): boolean {
    return !!lang && lang in TRANSLATIONS;
  }

  private detectBrowserLang(): LanguageCode {
    const nav = navigator.language?.toLowerCase() || '';
    if (nav.startsWith('ko')) return 'ko';
    if (nav.startsWith('ja')) return 'ja';
    if (nav.startsWith('zh')) return 'zh';
    if (nav.startsWith('de')) return 'de';
    if (nav.startsWith('fr')) return 'fr';
    if (nav.startsWith('es')) return 'es';
    if (nav.startsWith('ru')) return 'ru';
    if (nav.startsWith('hi')) return 'hi';
    if (nav.startsWith('pt')) return 'pt';
    return 'ko';
  }

  private updateDom(): void {
    const t = this.getTranslation();

    const elements = document.querySelectorAll<HTMLElement>('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n') as keyof TranslationSchema;
      const val = t[key];
      if (typeof val === 'string') {
        el.textContent = val;
      }
    });

    const searchInput = document.getElementById('systemSearch') as HTMLInputElement | null;
    if (searchInput) {
      searchInput.placeholder = t.searchPlaceholder;
    }
  }

  private updateControls(): void {
    const triggerLabel = document.getElementById('langTriggerLabel');
    if (triggerLabel) {
      const meta = LANGUAGE_META[this.currentLang];
      triggerLabel.textContent = meta.nativeName;
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
}
