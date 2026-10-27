/**
 * KRC Labs ??SystemCard Component
 * Single-card rendering module with subsystem badge, tech pills, maintainer persona, and description.
 */

import { SystemRepository, LanguageCode } from '../types';
import { TRANSLATIONS } from '../locales';

export class SystemCard {
  private item: SystemRepository;
  private currentLang: LanguageCode;

  constructor(item: SystemRepository, lang: LanguageCode = 'ko') {
    this.item = item;
    this.currentLang = lang;
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
  }

  public render(): string {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;
    const repoI18n = t.repos[this.item.id] || { label: this.item.subsystem, summary: '' };

    // Resolve UI display name (Re-brand remote-auto-ai-worker in UI to Distributed Task Dispatcher & Event Stream Engine)
    const displayName = this.item.displayName || (this.item.id === 'remote-auto-ai-worker'
      ? 'Distributed Task Dispatcher & Event Stream Engine'
      : this.item.name);

    const techPills = this.item.tech
      .map((tag) => `<span class="tech-tag">${this.escape(tag)}</span>`)
      .join('');

    return `
      <div class="system-card" data-subsystem="${this.item.subsystem}" id="card-${this.item.id}">
        <div>
          <div class="card-header">
            <span class="card-name">
              ${this.escape(displayName)}
            </span>
            <span class="badge ${this.item.nodeClass}">${this.escape(repoI18n.label)}</span>
          </div>
          <p class="card-summary">${this.escape(repoI18n.summary)}</p>
        </div>
        <div class="card-footer">
          <div class="tech-tags">${techPills}</div>
          <span class="author-id">${this.escape(this.item.lead)}</span>
        </div>
      </div>
    `;
  }

  public createElement(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.render().trim();
    return wrapper.firstElementChild as HTMLElement;
  }

  private escape(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

export function renderSystemCard(item: SystemRepository, lang: LanguageCode = 'ko'): string {
  return new SystemCard(item, lang).render();
}
