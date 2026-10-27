/**
 * KRC Labs ??SystemsGrid Component
 * Renders the 10 systems cards with technology badges, lead IDs, card hover effects, and 1:1 translations.
 */

import { Subsystem, SystemRepository, LanguageCode } from '../types';
import { SYSTEMS_DATA } from '../data/systems';
import { TRANSLATIONS } from '../locales';
import { FilterState } from './CategoryFilter';

export class SystemsGrid {
  private currentLang: LanguageCode = 'ko';
  private gridElement: HTMLElement | null = null;
  private currentFilter: FilterState = { category: 'all', searchQuery: '' };

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;
    this.gridElement = document.getElementById('systemsGrid');
    this.render();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.render();
  }

  public applyFilter(filter: FilterState): number {
    this.currentFilter = filter;
    return this.render();
  }

  public getTotalCount(): number {
    return SYSTEMS_DATA.length;
  }

  private render(): number {
    if (!this.gridElement) return 0;

    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;
    const filtered = this.getFilteredData();

    this.gridElement.innerHTML = filtered
      .map((item) => this.renderCard(item, t))
      .join('');

    return filtered.length;
  }

  private renderCard(item: SystemRepository, t: typeof TRANSLATIONS.ko): string {
    const repoI18n = t.repos[item.id] || { label: item.subsystem, summary: '' };
    const techPills = item.tech
      .map((tag) => `<span class="tech-tag">${this.escape(tag)}</span>`)
      .join('');

    return `
      <div class="system-card" data-subsystem="${item.subsystem}" id="card-${item.id}">
        <div>
          <div class="card-header">
            <span class="card-name">
              ${this.escape(item.name)}
            </span>
            <span class="badge ${item.nodeClass}">${this.escape(repoI18n.label)}</span>
          </div>
          <p class="card-summary">${this.escape(repoI18n.summary)}</p>
        </div>
        <div class="card-footer">
          <div class="tech-tags">${techPills}</div>
          <span class="author-id">${this.escape(item.lead)}</span>
        </div>
      </div>
    `;
  }

  private getFilteredData(): SystemRepository[] {
    const q = this.currentFilter.searchQuery;
    const cat = this.currentFilter.category;
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    return SYSTEMS_DATA.filter((item) => {
      const matchCat = cat === 'all' || item.subsystem === cat;
      if (!matchCat) return false;

      if (!q) return true;

      const repoI18n = t.repos[item.id] || { label: '', summary: '' };
      const inName = item.name.toLowerCase().includes(q);
      const inSummary = repoI18n.summary.toLowerCase().includes(q);
      const inLabel = repoI18n.label.toLowerCase().includes(q);
      const inTech = item.tech.some((tag) => tag.toLowerCase().includes(q));
      const inLead = item.lead.toLowerCase().includes(q);
      const inNode = item.node.toLowerCase().includes(q);

      return inName || inSummary || inLabel || inTech || inLead || inNode;
    });
  }

  private escape(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
