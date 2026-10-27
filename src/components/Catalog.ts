/**
 * KRC Labs ??Catalog Component
 * Renders systems catalog with category tabs, search input, and dynamic system cards.
 */

import { Subsystem, SystemRepository, LanguageCode } from '../types';
import { SYSTEMS_DATA } from '../data';
import { TRANSLATIONS } from '../locales';
import { SystemCard } from './SystemCard';

export class Catalog {
  private activeCategory: Subsystem = 'all';
  private searchQuery: string = '';
  private currentLang: LanguageCode = 'ko';

  private gridElement: HTMLElement | null = null;
  private countElement: HTMLElement | null = null;
  private searchInput: HTMLInputElement | null = null;

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;
    this.gridElement = document.getElementById('systemsGrid');
    this.countElement = document.getElementById('systemsCount');
    this.searchInput = document.getElementById('systemSearch') as HTMLInputElement | null;

    this.updateTexts();
    this.render();
    this.bindEvents();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.updateTexts();
    this.render();
  }

  public setCategory(cat: Subsystem): void {
    this.activeCategory = cat;
    const tabButtons = document.querySelectorAll<HTMLButtonElement>('.tab-pill');
    tabButtons.forEach((b) => {
      if (b.getAttribute('data-category') === cat) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    this.render();
  }

  public search(query: string): void {
    this.searchQuery = query;
    this.render();
  }

  public render(): void {
    if (!this.gridElement) return;

    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;
    const filtered = this.getFilteredData();

    // Render using SystemCard component
    this.gridElement.innerHTML = filtered
      .map((item) => new SystemCard(item, this.currentLang).render())
      .join('');

    if (this.countElement) {
      this.countElement.textContent = t.showingCount(filtered.length, SYSTEMS_DATA.length);
    }
  }

  private updateTexts(): void {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    const catTitle = document.querySelector<HTMLElement>('[data-i18n="catalogTitle"]');
    if (catTitle) catTitle.textContent = t.catalogTitle;

    const catSub = document.querySelector<HTMLElement>('[data-i18n="catalogSubtitle"]');
    if (catSub) catSub.textContent = t.catalogSubtitle;

    const tabAll = document.querySelector<HTMLElement>('[data-i18n="tabAll"]');
    if (tabAll) tabAll.textContent = t.tabAll;

    const tabKernel = document.querySelector<HTMLElement>('[data-i18n="tabKernel"]');
    if (tabKernel) tabKernel.textContent = t.tabKernel;

    const tabReverse = document.querySelector<HTMLElement>('[data-i18n="tabReverse"]');
    if (tabReverse) tabReverse.textContent = t.tabReverse;

    const tabMcp = document.querySelector<HTMLElement>('[data-i18n="tabMcp"]');
    if (tabMcp) tabMcp.textContent = t.tabMcp;

    const tabCluster = document.querySelector<HTMLElement>('[data-i18n="tabCluster"]');
    if (tabCluster) tabCluster.textContent = t.tabCluster;

    if (this.searchInput) {
      this.searchInput.placeholder = t.searchPlaceholder;
    }
  }

  private getFilteredData(): SystemRepository[] {
    const q = this.searchQuery.toLowerCase().trim();
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    return SYSTEMS_DATA.filter((item) => {
      const matchCat = this.activeCategory === 'all' || item.subsystem === this.activeCategory;
      if (!matchCat) return false;

      if (!q) return true;

      const repoI18n = t.repos[item.id] || { label: '', summary: '' };
      const displayName = item.displayName || item.name;

      const inName = item.name.toLowerCase().includes(q) || displayName.toLowerCase().includes(q);
      const inSummary = repoI18n.summary.toLowerCase().includes(q);
      const inLabel = repoI18n.label.toLowerCase().includes(q);
      const inTech = item.tech.some((tag) => tag.toLowerCase().includes(q));
      const inLead = item.lead.toLowerCase().includes(q);
      const inNode = item.node.toLowerCase().includes(q);

      return inName || inSummary || inLabel || inTech || inLead || inNode;
    });
  }

  private bindEvents(): void {
    const tabButtons = document.querySelectorAll<HTMLButtonElement>('.tab-pill');
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = (btn.getAttribute('data-category') as Subsystem) || 'all';
        this.activeCategory = cat;
        this.render();
      });
    });

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = (e.target as HTMLInputElement).value;
        this.render();
      });
    }
  }
}
