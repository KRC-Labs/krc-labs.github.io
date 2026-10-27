/**
 * KRC Labs ??Footer Component
 * Manages footer copyright, organization link, security contact, and location metadata.
 */

import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../locales';

export class Footer {
  private currentLang: LanguageCode = 'ko';

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;
    this.updateTexts();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.updateTexts();
  }

  private updateTexts(): void {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    const tagline = document.querySelector<HTMLElement>('[data-i18n="footerTagline"]');
    if (tagline) tagline.textContent = t.footerTagline;

    const orgLink = document.querySelector<HTMLAnchorElement>('[data-i18n="footerOrg"]');
    if (orgLink) orgLink.textContent = t.footerOrg;

    const secLink = document.querySelector<HTMLAnchorElement>('[data-i18n="footerSecurity"]');
    if (secLink) secLink.textContent = t.footerSecurity;

    const locSpan = document.querySelector<HTMLElement>('[data-i18n="footerLocation"]');
    if (locSpan) locSpan.textContent = t.footerLocation;
  }
}
