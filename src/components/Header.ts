/**
 * KRC Labs ??Header Component
 * Renders navigation bar, brand avatar, title, version tag, and mounts ThemeDropdown and LanguageDropdown.
 */

import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../locales';
import { ThemeDropdown } from './ThemeDropdown';
import { LanguageDropdown } from './LanguageDropdown';

export class Header {
  private currentLang: LanguageCode = 'ko';
  private themeDropdown: ThemeDropdown;
  private langDropdown: LanguageDropdown;
  private headerEl: HTMLElement | null = null;

  constructor(themeDropdown?: ThemeDropdown, langDropdown?: LanguageDropdown) {
    this.themeDropdown = themeDropdown || new ThemeDropdown();
    this.langDropdown = langDropdown || new LanguageDropdown();
  }

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;
    this.headerEl = document.querySelector('header');

    // Mount / initialize child dropdowns
    this.themeDropdown.init(lang);
    this.langDropdown.init(lang);

    this.updateTexts();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.themeDropdown.setLanguage(lang);
    this.langDropdown.setLanguage(lang);
    this.updateTexts();
  }

  public getThemeDropdown(): ThemeDropdown {
    return this.themeDropdown;
  }

  public getLanguageDropdown(): LanguageDropdown {
    return this.langDropdown;
  }

  private updateTexts(): void {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    const navSystems = document.querySelector<HTMLAnchorElement>('[data-i18n="navSystems"]');
    if (navSystems) navSystems.textContent = t.navSystems;

    const navCluster = document.querySelector<HTMLAnchorElement>('[data-i18n="navCluster"]');
    if (navCluster) navCluster.textContent = t.navCluster;

    const navConsole = document.querySelector<HTMLAnchorElement>('[data-i18n="navConsole"]');
    if (navConsole) navConsole.textContent = t.navConsole;
  }
}
