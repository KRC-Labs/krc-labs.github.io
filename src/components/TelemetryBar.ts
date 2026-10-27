/**
 * KRC Labs ??TelemetryBar Component
 * Displays live node cluster telemetry (Node 1, Node 2, and Hardware DPAPI Enclave Security).
 */

import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../locales';

export class TelemetryBar {
  private currentLang: LanguageCode = 'ko';
  private containerEl: HTMLElement | null = null;

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;
    this.containerEl = document.getElementById('cluster');
    this.updateTexts();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.updateTexts();
  }

  private updateTexts(): void {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    const node1Title = document.querySelector<HTMLElement>('[data-i18n="node1Title"]');
    if (node1Title) node1Title.textContent = t.node1Title;

    const node1Value = document.querySelector<HTMLElement>('[data-i18n="node1Value"]');
    if (node1Value) node1Value.textContent = t.node1Value;

    const node2Title = document.querySelector<HTMLElement>('[data-i18n="node2Title"]');
    if (node2Title) node2Title.textContent = t.node2Title;

    const node2Value = document.querySelector<HTMLElement>('[data-i18n="node2Value"]');
    if (node2Value) node2Value.textContent = t.node2Value;

    const hwSecTitle = document.querySelector<HTMLElement>('[data-i18n="hwSecTitle"]');
    if (hwSecTitle) hwSecTitle.textContent = t.hwSecTitle;

    const hwSecValue = document.querySelector<HTMLElement>('[data-i18n="hwSecValue"]');
    if (hwSecValue) hwSecValue.textContent = t.hwSecValue;
  }
}
