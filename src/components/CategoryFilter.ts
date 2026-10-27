/**
 * KRC Labs ??CategoryFilter Component
 * Manages category tab selection and search input debouncing for systems catalog.
 */

import { Subsystem, LanguageCode } from '../types';
import { TRANSLATIONS } from '../locales';

export interface FilterState {
  category: Subsystem;
  searchQuery: string;
}

export class CategoryFilter {
  private currentLang: LanguageCode = 'ko';
  private activeCategory: Subsystem = 'all';
  private searchQuery: string = '';
  private listeners: Array<(state: FilterState) => void> = [];

  private searchInput: HTMLInputElement | null = null;
  private tabButtons: NodeListOf<HTMLButtonElement> | null = null;
  private countElement: HTMLElement | null = null;

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;
    this.searchInput = document.getElementById('systemSearch') as HTMLInputElement | null;
    this.tabButtons = document.querySelectorAll<HTMLButtonElement>('.tab-pill');
    this.countElement = document.getElementById('systemsCount');

    this.bindEvents();
    this.updateTexts();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.updateTexts();
  }

  public onFilterChange(listener: (state: FilterState) => void): void {
    this.listeners.push(listener);
  }

  public updateCount(shown: number, total: number): void {
    if (!this.countElement) return;
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;
    this.countElement.textContent = t.showingCount(shown, total);
  }

  public getState(): FilterState {
    return {
      category: this.activeCategory,
      searchQuery: this.searchQuery,
    };
  }

  private updateTexts(): void {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    const catalogTitle = document.querySelector<HTMLElement>('[data-i18n="catalogTitle"]');
    if (catalogTitle) catalogTitle.textContent = t.catalogTitle;

    const catalogSubtitle = document.querySelector<HTMLElement>('[data-i18n="catalogSubtitle"]');
    if (catalogSubtitle) catalogSubtitle.textContent = t.catalogSubtitle;

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

  private bindEvents(): void {
    if (this.tabButtons) {
      this.tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          this.tabButtons?.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          const cat = (btn.getAttribute('data-category') as Subsystem) || 'all';
          this.activeCategory = cat;
          this.notify();
        });
      });
    }

    if (this.searchInput) {
      this.searchInput.addEventListener('input', () => {
        this.searchQuery = this.searchInput?.value.trim().toLowerCase() || '';
        this.notify();
      });
    }
  }

  private notify(): void {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }
}
