/**
 * KRC Labs — CustomThemeModal (Floating Window GUI)
 * Movable, Resizable, and Collapsible Desktop-class Window Studio.
 * Allows developers to craft, preview in real time, and persist custom palettes.
 */

import { CustomPalette, LanguageCode } from '../types';
import { TRANSLATIONS } from '../locales';

export const DEFAULT_CUSTOM_PALETTE: CustomPalette = {
  bg: '#14171f',
  surface: '#1d222d',
  surfaceAlt: '#272e3d',
  border: '#384256',
  accent: '#8b5cf6',
  textPrimary: '#f1f5f9',
};

export const CUSTOM_PRESETS: Array<{ id: string; name: string; palette: CustomPalette }> = [
  {
    id: 'violet',
    name: 'Midnight Violet',
    palette: {
      bg: '#0c0a17',
      surface: '#181329',
      surfaceAlt: '#241c3d',
      border: '#3c2e63',
      accent: '#a855f7',
      textPrimary: '#f1f5f9',
    },
  },
  {
    id: 'nord',
    name: 'Nordic Frost',
    palette: {
      bg: '#1e222a',
      surface: '#282c34',
      surfaceAlt: '#323842',
      border: '#434b57',
      accent: '#61afef',
      textPrimary: '#abb2bf',
    },
  },
  {
    id: 'solar',
    name: 'Solarized Amber',
    palette: {
      bg: '#002b36',
      surface: '#073642',
      surfaceAlt: '#0e4453',
      border: '#195566',
      accent: '#b58900',
      textPrimary: '#93a1a1',
    },
  },
  {
    id: 'oled',
    name: 'OLED Pure Black',
    palette: {
      bg: '#000000',
      surface: '#121212',
      surfaceAlt: '#1f1f1f',
      border: '#2c2c2c',
      accent: '#38bdf8',
      textPrimary: '#ffffff',
    },
  },
];

export class CustomThemeModal {
  private static readonly STORAGE_KEY = 'krc_custom_theme';
  private static readonly WINDOW_POS_KEY = 'krc_custom_win_pos';
  private currentLang: LanguageCode = 'ko';

  private containerEl: HTMLElement | null = null;
  private windowEl: HTMLElement | null = null;
  private titlebarEl: HTMLElement | null = null;
  private collapseBtn: HTMLButtonElement | null = null;
  private resizeHandleEl: HTMLElement | null = null;
  private onApplyCallback: ((palette: CustomPalette) => void) | null = null;

  private currentPalette: CustomPalette = { ...DEFAULT_CUSTOM_PALETTE };
  private isCollapsed: boolean = false;
  private isDragging: boolean = false;
  private isResizing: boolean = false;

  private dragStart: { mouseX: number; mouseY: number; winLeft: number; winTop: number } = {
    mouseX: 0,
    mouseY: 0,
    winLeft: 0,
    winTop: 0,
  };

  private resizeStart: { mouseX: number; mouseY: number; winWidth: number; winHeight: number } = {
    mouseX: 0,
    mouseY: 0,
    winWidth: 440,
    winHeight: 480,
  };

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;
    this.containerEl = document.getElementById('customThemeModal');
    this.windowEl = document.getElementById('customWindowRoot');
    this.titlebarEl = document.getElementById('customWindowTitlebar');
    this.collapseBtn = document.getElementById('customWindowCollapseBtn') as HTMLButtonElement | null;
    this.resizeHandleEl = document.getElementById('customWindowResizeHandle');

    this.loadStoredPalette();
    this.restoreWindowPosition();
    this.bindEvents();
    this.initDragEvents();
    this.initResizeEvents();
    this.updateTexts();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.updateTexts();
  }

  public onApply(callback: (palette: CustomPalette) => void): void {
    this.onApplyCallback = callback;
  }

  public open(): void {
    if (!this.containerEl || !this.windowEl) return;
    this.loadStoredPalette();
    this.syncInputsWithState();
    this.containerEl.classList.add('open');
    this.containerEl.setAttribute('aria-hidden', 'false');

    // Default placement if not yet positioned
    if (!this.windowEl.style.left && !this.windowEl.style.top) {
      this.resetWindowPosition();
    }
  }

  public close(): void {
    if (!this.containerEl) return;
    this.containerEl.classList.remove('open');
    this.containerEl.setAttribute('aria-hidden', 'true');
  }

  public isOpen(): boolean {
    return this.containerEl?.classList.contains('open') || false;
  }

  public toggleCollapse(): void {
    this.setCollapsed(!this.isCollapsed);
  }

  public setCollapsed(collapsed: boolean): void {
    this.isCollapsed = collapsed;
    if (!this.windowEl) return;

    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;
    const badge = document.getElementById('customWindowModeBadge');

    if (this.isCollapsed) {
      this.windowEl.classList.add('is-collapsed');
      if (this.collapseBtn) {
        this.collapseBtn.title = t.customWindowExpand || '펼치기';
        this.collapseBtn.setAttribute('aria-label', t.customWindowExpand || '펼치기');
      }
      if (badge) badge.textContent = t.customWindowCollapse || '접힘';
    } else {
      this.windowEl.classList.remove('is-collapsed');
      if (this.collapseBtn) {
        this.collapseBtn.title = t.customWindowCollapse || '접기';
        this.collapseBtn.setAttribute('aria-label', t.customWindowCollapse || '접기');
      }
      if (badge) badge.textContent = 'Live GUI';
    }
  }

  public getPalette(): CustomPalette {
    return { ...this.currentPalette };
  }

  public applyPaletteToDocument(palette: CustomPalette): void {
    const root = document.documentElement;
    root.style.setProperty('--bg', palette.bg);
    root.style.setProperty('--surface', palette.surface);
    root.style.setProperty('--surface-alt', palette.surfaceAlt);
    root.style.setProperty('--border', palette.border);
    root.style.setProperty('--accent', palette.accent);
    root.style.setProperty('--accent-hover', palette.accent);
    root.style.setProperty('--accent-bg', `${palette.accent}22`);
    root.style.setProperty('--accent-border', `${palette.accent}44`);
    root.style.setProperty('--text-primary', palette.textPrimary);
  }

  public removeCustomOverrides(): void {
    const root = document.documentElement;
    root.style.removeProperty('--bg');
    root.style.removeProperty('--surface');
    root.style.removeProperty('--surface-alt');
    root.style.removeProperty('--border');
    root.style.removeProperty('--accent');
    root.style.removeProperty('--accent-hover');
    root.style.removeProperty('--accent-bg');
    root.style.removeProperty('--accent-border');
    root.style.removeProperty('--text-primary');
  }

  private loadStoredPalette(): void {
    try {
      const raw = localStorage.getItem(CustomThemeModal.STORAGE_KEY);
      if (raw) {
        this.currentPalette = { ...DEFAULT_CUSTOM_PALETTE, ...JSON.parse(raw) };
      }
    } catch {
      this.currentPalette = { ...DEFAULT_CUSTOM_PALETTE };
    }
  }

  private savePalette(palette: CustomPalette): void {
    this.currentPalette = { ...palette };
    localStorage.setItem(CustomThemeModal.STORAGE_KEY, JSON.stringify(palette));
  }

  private resetWindowPosition(): void {
    if (!this.windowEl) return;
    const vpWidth = window.innerWidth;
    const initialWidth = Math.min(440, vpWidth - 32);
    const left = Math.max(16, vpWidth - initialWidth - 24);
    const top = 76;

    this.windowEl.style.left = `${left}px`;
    this.windowEl.style.top = `${top}px`;
    this.windowEl.style.width = `${initialWidth}px`;
  }

  private restoreWindowPosition(): void {
    if (!this.windowEl) return;
    try {
      const raw = localStorage.getItem(CustomThemeModal.WINDOW_POS_KEY);
      if (raw) {
        const { left, top, width, height } = JSON.parse(raw);
        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight;

        // Ensure within viewport
        const clampedLeft = Math.max(10, Math.min(vpWidth - 100, left));
        const clampedTop = Math.max(10, Math.min(vpHeight - 60, top));

        this.windowEl.style.left = `${clampedLeft}px`;
        this.windowEl.style.top = `${clampedTop}px`;
        if (width) this.windowEl.style.width = `${Math.min(width, vpWidth - 20)}px`;
        if (height) this.windowEl.style.height = `${Math.min(height, vpHeight - 20)}px`;
      }
    } catch {
      // Use defaults
    }
  }

  private saveWindowPosition(): void {
    if (!this.windowEl) return;
    try {
      const rect = this.windowEl.getBoundingClientRect();
      const pos = {
        left: Math.round(rect.left),
        top: Math.round(rect.top),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
      localStorage.setItem(CustomThemeModal.WINDOW_POS_KEY, JSON.stringify(pos));
    } catch {
      // Storage unavailable
    }
  }

  private initDragEvents(): void {
    if (!this.titlebarEl || !this.windowEl) return;

    const onStart = (clientX: number, clientY: number) => {
      if (!this.windowEl) return;
      this.isDragging = true;
      this.windowEl.classList.add('is-dragging');

      const rect = this.windowEl.getBoundingClientRect();
      this.dragStart = {
        mouseX: clientX,
        mouseY: clientY,
        winLeft: rect.left,
        winTop: rect.top,
      };
    };

    const onMove = (clientX: number, clientY: number) => {
      if (!this.isDragging || !this.windowEl) return;
      const deltaX = clientX - this.dragStart.mouseX;
      const deltaY = clientY - this.dragStart.mouseY;

      const rect = this.windowEl.getBoundingClientRect();
      const vpWidth = window.innerWidth;
      const vpHeight = window.innerHeight;

      const newLeft = Math.max(8, Math.min(vpWidth - rect.width - 8, this.dragStart.winLeft + deltaX));
      const newTop = Math.max(8, Math.min(vpHeight - 44, this.dragStart.winTop + deltaY));

      this.windowEl.style.left = `${newLeft}px`;
      this.windowEl.style.top = `${newTop}px`;
      this.windowEl.style.right = 'auto';
      this.windowEl.style.bottom = 'auto';
    };

    const onEnd = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.windowEl?.classList.remove('is-dragging');
      this.saveWindowPosition();
    };

    // Mouse drag
    this.titlebarEl.addEventListener('mousedown', (e) => {
      // Don't drag if clicking buttons inside titlebar
      if ((e.target as HTMLElement).closest('button')) return;
      e.preventDefault();
      onStart(e.clientX, e.clientY);

      const moveHandler = (moveEv: MouseEvent) => onMove(moveEv.clientX, moveEv.clientY);
      const upHandler = () => {
        window.removeEventListener('mousemove', moveHandler);
        window.removeEventListener('mouseup', upHandler);
        onEnd();
      };
      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('mouseup', upHandler);
    });

    // Touch drag
    this.titlebarEl.addEventListener(
      'touchstart',
      (e) => {
        if ((e.target as HTMLElement).closest('button')) return;
        const touch = e.touches[0];
        onStart(touch.clientX, touch.clientY);

        const touchMoveHandler = (moveEv: TouchEvent) => {
          if (this.isDragging) {
            moveEv.preventDefault();
            const t = moveEv.touches[0];
            onMove(t.clientX, t.clientY);
          }
        };

        const touchEndHandler = () => {
          window.removeEventListener('touchmove', touchMoveHandler);
          window.removeEventListener('touchend', touchEndHandler);
          onEnd();
        };

        window.addEventListener('touchmove', touchMoveHandler, { passive: false });
        window.addEventListener('touchend', touchEndHandler);
      },
      { passive: true }
    );

    // Double-click titlebar to toggle collapse
    this.titlebarEl.addEventListener('dblclick', (e) => {
      if ((e.target as HTMLElement).closest('button')) return;
      this.toggleCollapse();
    });
  }

  private initResizeEvents(): void {
    if (!this.resizeHandleEl || !this.windowEl) return;

    const onStart = (clientX: number, clientY: number) => {
      if (!this.windowEl || this.isCollapsed) return;
      this.isResizing = true;
      const rect = this.windowEl.getBoundingClientRect();
      this.resizeStart = {
        mouseX: clientX,
        mouseY: clientY,
        winWidth: rect.width,
        winHeight: rect.height,
      };
    };

    const onMove = (clientX: number, clientY: number) => {
      if (!this.isResizing || !this.windowEl) return;
      const deltaX = clientX - this.resizeStart.mouseX;
      const deltaY = clientY - this.resizeStart.mouseY;

      const vpWidth = window.innerWidth;
      const vpHeight = window.innerHeight;

      const newWidth = Math.max(320, Math.min(vpWidth - 32, this.resizeStart.winWidth + deltaX));
      const newHeight = Math.max(220, Math.min(vpHeight - 96, this.resizeStart.winHeight + deltaY));

      this.windowEl.style.width = `${newWidth}px`;
      this.windowEl.style.height = `${newHeight}px`;
    };

    const onEnd = () => {
      if (!this.isResizing) return;
      this.isResizing = false;
      this.saveWindowPosition();
    };

    this.resizeHandleEl.addEventListener('mousedown', (e) => {
      e.preventDefault();
      onStart(e.clientX, e.clientY);

      const moveHandler = (moveEv: MouseEvent) => onMove(moveEv.clientX, moveEv.clientY);
      const upHandler = () => {
        window.removeEventListener('mousemove', moveHandler);
        window.removeEventListener('mouseup', upHandler);
        onEnd();
      };
      window.addEventListener('mousemove', moveHandler);
      window.addEventListener('mouseup', upHandler);
    });

    this.resizeHandleEl.addEventListener(
      'touchstart',
      (e) => {
        const touch = e.touches[0];
        onStart(touch.clientX, touch.clientY);

        const touchMoveHandler = (moveEv: TouchEvent) => {
          if (this.isResizing) {
            moveEv.preventDefault();
            const t = moveEv.touches[0];
            onMove(t.clientX, t.clientY);
          }
        };

        const touchEndHandler = () => {
          window.removeEventListener('touchmove', touchMoveHandler);
          window.removeEventListener('touchend', touchEndHandler);
          onEnd();
        };

        window.addEventListener('touchmove', touchMoveHandler, { passive: false });
        window.addEventListener('touchend', touchEndHandler);
      },
      { passive: true }
    );
  }

  private syncInputsWithState(): void {
    const bgInput = document.getElementById('customBgInput') as HTMLInputElement | null;
    const surfaceInput = document.getElementById('customSurfaceInput') as HTMLInputElement | null;
    const accentInput = document.getElementById('customAccentInput') as HTMLInputElement | null;
    const textInput = document.getElementById('customTextInput') as HTMLInputElement | null;

    if (bgInput) bgInput.value = this.currentPalette.bg;
    if (surfaceInput) surfaceInput.value = this.currentPalette.surface;
    if (accentInput) accentInput.value = this.currentPalette.accent;
    if (textInput) textInput.value = this.currentPalette.textPrimary;

    this.updatePreviewSwatch();
  }

  private updatePreviewSwatch(): void {
    const bgHex = document.getElementById('customBgHex');
    const surfaceHex = document.getElementById('customSurfaceHex');
    const accentHex = document.getElementById('customAccentHex');
    const textHex = document.getElementById('customTextHex');

    if (bgHex) bgHex.textContent = this.currentPalette.bg;
    if (surfaceHex) surfaceHex.textContent = this.currentPalette.surface;
    if (accentHex) accentHex.textContent = this.currentPalette.accent;
    if (textHex) textHex.textContent = this.currentPalette.textPrimary;

    const preview = document.getElementById('customLivePreview');
    if (preview) {
      preview.style.background = this.currentPalette.bg;
      preview.style.borderColor = this.currentPalette.border;
      const textEl = preview.querySelector('.preview-card-text') as HTMLElement | null;
      if (textEl) textEl.style.color = this.currentPalette.textPrimary;
      const accentEl = preview.querySelector('.preview-card-accent') as HTMLElement | null;
      if (accentEl) accentEl.style.background = this.currentPalette.accent;
    }
  }

  private bindEvents(): void {
    // Close button
    const closeBtn = document.getElementById('customModalClose');
    closeBtn?.addEventListener('click', () => this.close());

    // Collapse / Expand button
    this.collapseBtn?.addEventListener('click', () => this.toggleCollapse());

    // Escape closes window
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Real-time Inputs
    const bgInput = document.getElementById('customBgInput') as HTMLInputElement | null;
    const surfaceInput = document.getElementById('customSurfaceInput') as HTMLInputElement | null;
    const accentInput = document.getElementById('customAccentInput') as HTMLInputElement | null;
    const textInput = document.getElementById('customTextInput') as HTMLInputElement | null;

    const onColorChange = () => {
      if (bgInput) this.currentPalette.bg = bgInput.value;
      if (surfaceInput) {
        this.currentPalette.surface = surfaceInput.value;
        this.currentPalette.surfaceAlt = this.adjustBrightness(surfaceInput.value, 15);
        this.currentPalette.border = this.adjustBrightness(surfaceInput.value, 30);
      }
      if (accentInput) this.currentPalette.accent = accentInput.value;
      if (textInput) this.currentPalette.textPrimary = textInput.value;

      this.updatePreviewSwatch();
      // Live-apply to page so user sees instant results while tweaking colors
      this.applyPaletteToDocument(this.currentPalette);
    };

    [bgInput, surfaceInput, accentInput, textInput].forEach((el) => {
      el?.addEventListener('input', onColorChange);
    });

    // Preset buttons
    const presetBtns = document.querySelectorAll<HTMLButtonElement>('.custom-preset-btn');
    presetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const pid = btn.getAttribute('data-preset-id');
        const match = CUSTOM_PRESETS.find((p) => p.id === pid);
        if (match) {
          this.currentPalette = { ...match.palette };
          this.syncInputsWithState();
          this.applyPaletteToDocument(this.currentPalette);
        }
      });
    });

    // Save button
    const saveBtn = document.getElementById('customModalSave');
    saveBtn?.addEventListener('click', () => {
      onColorChange();
      this.savePalette(this.currentPalette);
      this.applyPaletteToDocument(this.currentPalette);
      this.onApplyCallback?.(this.currentPalette);
      this.close();
    });

    // Reset button
    const resetBtn = document.getElementById('customModalReset');
    resetBtn?.addEventListener('click', () => {
      this.currentPalette = { ...DEFAULT_CUSTOM_PALETTE };
      this.syncInputsWithState();
      this.applyPaletteToDocument(this.currentPalette);
    });
  }

  private updateTexts(): void {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    const titleEl = document.getElementById('customThemeTitle');
    if (titleEl) titleEl.textContent = t.customThemeTitle || '커스텀 테마 스튜디오';

    const descEl = document.getElementById('customThemeDesc');
    if (descEl) descEl.textContent = t.customThemeDesc || '화면을 보며 실시간으로 배경·서페이스·악센트 컬러를 맞춤 조합합니다.';

    const bgLabel = document.querySelector('[data-i18n-custom="bg"]');
    if (bgLabel) bgLabel.textContent = t.customBg || '배경색';

    const surfaceLabel = document.querySelector('[data-i18n-custom="surface"]');
    if (surfaceLabel) surfaceLabel.textContent = t.customSurface || '서페이스';

    const accentLabel = document.querySelector('[data-i18n-custom="accent"]');
    if (accentLabel) accentLabel.textContent = t.customAccent || '악센트';

    const textLabel = document.querySelector('[data-i18n-custom="text"]');
    if (textLabel) textLabel.textContent = t.customText || '텍스트';

    const presetsLabel = document.querySelector('[data-i18n-custom="presets"]');
    if (presetsLabel) presetsLabel.textContent = t.customPresets || '프리셋';

    const saveBtn = document.getElementById('customModalSave');
    if (saveBtn) saveBtn.textContent = t.customSave || '적용 및 저장';

    const resetBtn = document.getElementById('customModalReset');
    if (resetBtn) resetBtn.textContent = t.customReset || '초기화';

    if (this.collapseBtn) {
      this.collapseBtn.title = this.isCollapsed ? t.customWindowExpand || '펼치기' : t.customWindowCollapse || '접기';
      this.collapseBtn.setAttribute('aria-label', this.collapseBtn.title);
    }
  }

  private adjustBrightness(hex: string, percent: number): string {
    const clean = hex.replace('#', '');
    if (clean.length !== 6) return hex;
    const num = parseInt(clean, 16);
    let r = (num >> 16) + percent;
    let g = ((num >> 8) & 0x00ff) + percent;
    let b = (num & 0x0000ff) + percent;
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
}
