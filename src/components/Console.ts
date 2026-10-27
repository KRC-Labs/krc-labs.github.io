/**
 * KRC Labs ??Console Component
 * Interactive terminal console with real commands (help, status, nodes, list, clear).
 */

import { LanguageCode } from '../types';
import { SYSTEMS_DATA } from '../data';
import { TRANSLATIONS } from '../locales';

export class Console {
  private outputElement: HTMLElement | null = null;
  private inputElement: HTMLInputElement | null = null;
  private currentLang: LanguageCode = 'ko';

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;
    this.outputElement = document.getElementById('consoleBody');
    this.inputElement = document.getElementById('consoleInput') as HTMLInputElement | null;

    this.updateTexts();
    this.renderDefaultStatus();
    this.bindConsole();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.updateTexts();
    this.renderDefaultStatus();
  }

  private updateTexts(): void {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    const consoleTitle = document.querySelector<HTMLElement>('[data-i18n="consoleTitle"]');
    if (consoleTitle) consoleTitle.textContent = t.consoleTitle;

    const consoleSubtitle = document.querySelector<HTMLElement>('[data-i18n="consoleSubtitle"]');
    if (consoleSubtitle) consoleSubtitle.textContent = t.consoleSubtitle;

    if (this.inputElement) {
      const placeholders: Record<LanguageCode, string> = {
        ko: '명령???�력 (?? nodes, list, help)...',
        en: 'Type command (e.g. nodes, list, help)...',
        ja: '?�マ?�ド?�力 (�? nodes, list, help)...',
        zh: '输入?�令 (例如: nodes, list, help)...',
        de: 'Befehl eingeben (z. B. nodes, list, help)...',
        fr: 'Entrer une commande (ex. nodes, list, help)...',
        es: 'Escribir comando (ej. nodes, list, help)...',
        ru: '?веди?е команд? (нап?име?: nodes, list, help)...',
        hi: 'कमां�?दर्ज करें (उद�? nodes, list, help)...',
        pt: 'Digite o comando (ex. nodes, list, help)...',
      };
      this.inputElement.placeholder = placeholders[this.currentLang] || placeholders.en;
    }
  }

  private renderDefaultStatus(): void {
    if (!this.outputElement) return;
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    this.outputElement.innerHTML = `
      <div class="console-row">
        <span class="console-prompt">&gt;</span> <span class="console-cmd">status</span>
      </div>
      <div class="console-output">
        ${t.consoleStatusOnline}<br>
        ${t.consoleStatusRuntimes}<br>
        ${t.consoleStatusSecurity}
      </div>
    `;
  }

  private bindConsole(): void {
    if (!this.inputElement) return;

    this.inputElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.inputElement?.value.trim() || '';
        if (cmd) {
          this.execute(cmd);
          if (this.inputElement) this.inputElement.value = '';
        }
      }
    });
  }

  public execute(cmd: string): void {
    if (!this.outputElement) return;

    const row = document.createElement('div');
    row.className = 'console-row';
    row.innerHTML = `<span class="console-prompt">&gt;</span> <span class="console-cmd">${this.escape(cmd)}</span>`;
    this.outputElement.appendChild(row);

    const out = document.createElement('div');
    out.className = 'console-output';

    const normalized = cmd.toLowerCase().trim();
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    switch (normalized) {
      case 'help':
        out.innerHTML = `
          <strong>${t.consoleHelpHeader}</strong><br>
          &nbsp;&nbsp;<strong>status</strong>&nbsp;&nbsp;- ${t.consoleTitle}<br>
          &nbsp;&nbsp;<strong>nodes</strong>&nbsp;&nbsp;&nbsp;- ${t.consoleStatusNodes}<br>
          &nbsp;&nbsp;<strong>list</strong>&nbsp;&nbsp;&nbsp;&nbsp;- ${t.verifiedRuntimes}<br>
          &nbsp;&nbsp;<strong>clear</strong>&nbsp;&nbsp;&nbsp;- Clear console terminal buffer
        `;
        break;

      case 'status':
        out.innerHTML = `
          ${t.consoleStatusOnline}<br>
          ${t.consoleStatusRuntimes}<br>
          ${t.consoleStatusNodes}<br>
          ${t.consoleStatusSecurity}
        `;
        break;

      case 'nodes':
        out.innerHTML = `
          ${t.consoleNodesNode1}<br>
          ${t.consoleNodesNode2}
        `;
        break;

      case 'list': {
        const lines = SYSTEMS_DATA.map((s) => {
          const displayName = s.displayName || (s.id === 'remote-auto-ai-worker'
            ? 'Distributed Task Dispatcher & Event Stream Engine'
            : s.name);
          return `&nbsp;&nbsp;??<strong>${s.id}</strong> (${displayName}) [${s.subsystem.toUpperCase()}] - ${s.lead}`;
        });
        out.innerHTML = lines.join('<br>');
        break;
      }

      case 'clear':
        this.outputElement.innerHTML = '';
        return;

      default:
        out.innerHTML = `Command not recognized: <code>${this.escape(cmd)}</code>. Type <strong>help</strong> for available commands.`;
    }

    this.outputElement.appendChild(out);
    this.outputElement.scrollTop = this.outputElement.scrollHeight;
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
