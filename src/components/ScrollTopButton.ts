/**
 * KRC Labs — ScrollTopButton Component
 * Floating Action Button for Smooth Scroll-to-Top.
 * Features:
 *  - Appears on scroll (> 200px)
 *  - Draggable across viewport (mouse & touch)
 *  - Position persistence in localStorage
 *  - Right-click (PC) / Long-press (Mobile, 500ms) toggles Position Pin/Lock
 *  - Toast notification feedback
 *  - Integrated Quick Help launcher
 */

import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../locales';

export class ScrollTopButton {
  private static readonly STORAGE_POS_KEY = 'krc_scroll_btn_pos';
  private static readonly STORAGE_PIN_KEY = 'krc_scroll_btn_pinned';

  private currentLang: LanguageCode = 'ko';
  private containerEl: HTMLElement | null = null;
  private scrollBtn: HTMLButtonElement | null = null;
  private helpBtn: HTMLButtonElement | null = null;
  private pinBadge: HTMLElement | null = null;
  private toastEl: HTMLElement | null = null;

  private isPinned: boolean = false;
  private isDragging: boolean = false;
  private movedDistance: number = 0;
  private dragStart: { mouseX: number; mouseY: number; btnLeft: number; btnTop: number } = {
    mouseX: 0,
    mouseY: 0,
    btnLeft: 0,
    btnTop: 0,
  };

  private longPressTimer: number | null = null;
  private toastTimer: number | null = null;
  private onHelpClickCallback: (() => void) | null = null;

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;
    this.containerEl = document.getElementById('floatingQuickBar');
    this.scrollBtn = document.getElementById('scrollTopBtn') as HTMLButtonElement | null;
    this.helpBtn = document.getElementById('quickHelpBtn') as HTMLButtonElement | null;
    this.pinBadge = document.getElementById('scrollBtnPinBadge');
    this.toastEl = document.getElementById('krcToast');

    this.loadState();
    this.bindScrollVisibility();
    this.bindEvents();
    this.updateTexts();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.updateTexts();
  }

  public onHelpClick(callback: () => void): void {
    this.onHelpClickCallback = callback;
  }

  public setPinned(pinned: boolean, showToast: boolean = true): void {
    this.isPinned = pinned;
    localStorage.setItem(ScrollTopButton.STORAGE_PIN_KEY, String(pinned));

    if (this.containerEl) {
      if (this.isPinned) {
        this.containerEl.classList.add('is-pinned');
      } else {
        this.containerEl.classList.remove('is-pinned');
      }
    }

    if (showToast) {
      const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;
      const msg = this.isPinned ? t.btnPinnedToast : t.btnUnpinnedToast;
      this.showToast(msg);
    }
  }

  public getPinned(): boolean {
    return this.isPinned;
  }

  private loadState(): void {
    // Restore pin state
    const pinnedStored = localStorage.getItem(ScrollTopButton.STORAGE_PIN_KEY);
    this.isPinned = pinnedStored === 'true';
    if (this.isPinned && this.containerEl) {
      this.containerEl.classList.add('is-pinned');
    }

    // Restore position
    try {
      const posStored = localStorage.getItem(ScrollTopButton.STORAGE_POS_KEY);
      if (posStored && this.containerEl) {
        const { left, top } = JSON.parse(posStored);
        const vpW = window.innerWidth;
        const vpH = window.innerHeight;

        const clampedLeft = Math.max(12, Math.min(vpW - 60, left));
        const clampedTop = Math.max(60, Math.min(vpH - 80, top));

        this.containerEl.style.left = `${clampedLeft}px`;
        this.containerEl.style.top = `${clampedTop}px`;
        this.containerEl.style.right = 'auto';
        this.containerEl.style.bottom = 'auto';
      }
    } catch {
      // Use CSS default
    }
  }

  private savePosition(): void {
    if (!this.containerEl) return;
    const rect = this.containerEl.getBoundingClientRect();
    const pos = { left: Math.round(rect.left), top: Math.round(rect.top) };
    localStorage.setItem(ScrollTopButton.STORAGE_POS_KEY, JSON.stringify(pos));
  }

  private bindScrollVisibility(): void {
    const handleScroll = () => {
      if (!this.containerEl) return;
      const shouldShow = window.scrollY > 80;
      if (shouldShow) {
        this.containerEl.classList.add('visible');
      } else {
        this.containerEl.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  private bindEvents(): void {
    if (!this.containerEl || !this.scrollBtn) return;

    // 1. Right Click (PC) -> Toggle Pin
    this.containerEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.setPinned(!this.isPinned, true);
    });

    // 2. Drag Start (Mouse)
    this.containerEl.addEventListener('mousedown', (e) => {
      // Don't drag if pinned or clicking help button
      if (this.isPinned || (e.target as HTMLElement).closest('#quickHelpBtn')) return;
      if (e.button !== 0) return; // Left click only

      e.preventDefault();
      this.startDrag(e.clientX, e.clientY);

      const onMouseMove = (moveEv: MouseEvent) => {
        this.doDrag(moveEv.clientX, moveEv.clientY);
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        this.endDrag();
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });

    // 3. Touch Drag & Long-Press (Mobile)
    this.containerEl.addEventListener(
      'touchstart',
      (e) => {
        if ((e.target as HTMLElement).closest('#quickHelpBtn')) return;
        const touch = e.touches[0];
        this.startDrag(touch.clientX, touch.clientY);

        // Start long press timer (500ms for mobile pin toggle)
        this.longPressTimer = window.setTimeout(() => {
          if (this.movedDistance < 8) {
            if (navigator.vibrate) navigator.vibrate(50);
            this.setPinned(!this.isPinned, true);
          }
        }, 500);

        const onTouchMove = (moveEv: TouchEvent) => {
          if (this.isPinned) return;
          const t = moveEv.touches[0];
          this.doDrag(t.clientX, t.clientY);
          if (this.movedDistance > 10 && this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
          }
        };

        const onTouchEnd = () => {
          if (this.longPressTimer) {
            clearTimeout(this.longPressTimer);
            this.longPressTimer = null;
          }
          window.removeEventListener('touchmove', onTouchMove);
          window.removeEventListener('touchend', onTouchEnd);
          this.endDrag();
        };

        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);
      },
      { passive: true }
    );

    // 4. Click Scroll-to-Top (Only when not dragging)
    this.scrollBtn.addEventListener('click', (e) => {
      if (this.movedDistance > 6) {
        e.stopPropagation();
        return;
      }
      if (document.hidden) {
        window.scrollTo(0, 0);
      } else {
        try {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch {
          window.scrollTo(0, 0);
        }
      }
    });

    // 5. Help Button Click
    this.helpBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.onHelpClickCallback?.();
    });
  }

  private startDrag(clientX: number, clientY: number): void {
    if (!this.containerEl) return;
    this.isDragging = true;
    this.movedDistance = 0;
    const rect = this.containerEl.getBoundingClientRect();

    this.dragStart = {
      mouseX: clientX,
      mouseY: clientY,
      btnLeft: rect.left,
      btnTop: rect.top,
    };
    this.containerEl.classList.add('is-dragging');
  }

  private doDrag(clientX: number, clientY: number): void {
    if (!this.isDragging || !this.containerEl || this.isPinned) return;
    const deltaX = clientX - this.dragStart.mouseX;
    const deltaY = clientY - this.dragStart.mouseY;
    this.movedDistance = Math.hypot(deltaX, deltaY);

    const vpW = window.innerWidth;
    const vpH = window.innerHeight;
    const rect = this.containerEl.getBoundingClientRect();

    const newLeft = Math.max(10, Math.min(vpW - rect.width - 10, this.dragStart.btnLeft + deltaX));
    const newTop = Math.max(60, Math.min(vpH - rect.height - 10, this.dragStart.btnTop + deltaY));

    this.containerEl.style.left = `${newLeft}px`;
    this.containerEl.style.top = `${newTop}px`;
    this.containerEl.style.right = 'auto';
    this.containerEl.style.bottom = 'auto';
  }

  private endDrag(): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.containerEl?.classList.remove('is-dragging');
    if (this.movedDistance > 6) {
      this.savePosition();
    }
  }

  public showToast(message: string): void {
    if (!this.toastEl) return;
    this.toastEl.textContent = message;
    this.toastEl.classList.add('show');

    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => {
      this.toastEl?.classList.remove('show');
    }, 2400);
  }

  private updateTexts(): void {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    if (this.scrollBtn) {
      this.scrollBtn.title = `${t.scrollTopLabel} (우클릭: 고정/해제)`;
      this.scrollBtn.setAttribute('aria-label', t.scrollTopLabel);
    }

    if (this.helpBtn) {
      this.helpBtn.title = t.helpTitle || '도움말';
      this.helpBtn.setAttribute('aria-label', t.helpTitle || '도움말');
    }
  }
}
