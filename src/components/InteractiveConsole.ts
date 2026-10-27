/**
 * KRC Labs — InteractiveConsole Component
 * Provides a live interactive terminal shell for cluster status, node introspection, and repository inspection.
 */

import { LanguageCode } from '../types';
import { SYSTEMS_DATA } from '../data/systems';
import { TRANSLATIONS } from '../locales';

export class InteractiveConsole {
  private currentLang: LanguageCode = 'ko';
  private outputElement: HTMLElement | null = null;
  private inputElement: HTMLInputElement | null = null;

  public init(lang: LanguageCode = 'ko'): void {
    this.currentLang = lang;
    this.outputElement = document.getElementById('consoleBody');
    this.inputElement = document.getElementById('consoleInput') as HTMLInputElement | null;

    this.renderDefaultStatus();
    this.bindConsole();
    this.updateTexts();
  }

  public setLanguage(lang: LanguageCode): void {
    this.currentLang = lang;
    this.renderDefaultStatus();
    this.updateTexts();
  }

  private updateTexts(): void {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    const titleEl = document.querySelector<HTMLElement>('[data-i18n="consoleTitle"]');
    if (titleEl) titleEl.textContent = t.consoleTitle;

    const subEl = document.querySelector<HTMLElement>('[data-i18n="consoleSubtitle"]');
    if (subEl) subEl.textContent = t.consoleSubtitle;

    if (this.inputElement) {
      const placeholders: Record<LanguageCode, string> = {
        ko: '명령어 입력 (예: nodes, list, help)...',
        en: 'Type command (e.g. nodes, list, help)...',
        ja: 'コマンド入力 (例: nodes, list, help)...',
        zh: '输入命令 (例如: nodes, list, help)...',
        de: 'Befehl eingeben (z. B. nodes, list, help)...',
        fr: 'Entrer une commande (ex. nodes, list, help)...',
        es: 'Escribir comando (ej. nodes, list, help)...',
        ru: 'Введите команду (например: nodes, list, help)...',
        hi: 'कमांड दर्ज करें (उदा. nodes, list, help)...',
        pt: 'Digite o comando (ex. nodes, list, help)...',
      };
      this.inputElement.placeholder = placeholders[this.currentLang] || placeholders.en;
    }
  }

  public renderDefaultStatus(): void {
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

    const clean = cmd.toLowerCase().trim();
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;

    if (clean === 'help') {
      out.innerHTML = `
        ${t.consoleHelpHeader}<br>
        &nbsp;&nbsp;<strong>status</strong>&nbsp;&nbsp;&nbsp;&nbsp;- ${t.consoleStatusOnline}<br>
        &nbsp;&nbsp;<strong>nodes</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ${this.getNodeHelpDesc()}<br>
        &nbsp;&nbsp;<strong>list</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ${this.getListHelpDesc()}<br>
        &nbsp;&nbsp;<strong>system &lt;id&gt;</strong> - ${this.getSystemHelpDesc()}<br>
        &nbsp;&nbsp;<strong>clear</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ${this.getClearHelpDesc()}
      `;
    } else if (clean === 'status') {
      out.innerHTML = `
        ${t.consoleStatusOnline}<br>
        ${t.consoleStatusRuntimes}<br>
        ${t.consoleStatusNodes}<br>
        ${t.consoleStatusSecurity}
      `;
    } else if (clean === 'nodes') {
      out.innerHTML = `
        ${t.consoleNodesNode1}<br>
        ${t.consoleNodesNode2}
      `;
    } else if (clean === 'list') {
      const listHtml = SYSTEMS_DATA.map((s, idx) => {
        const repoI18n = t.repos[s.id] || { label: s.subsystem, summary: '' };
        return `[${(idx + 1).toString().padStart(2, '0')}] ${s.name} (${s.tech.join(', ')}) [${repoI18n.label}]`;
      }).join('<br>');
      out.innerHTML = listHtml;
    } else if (clean.startsWith('system ')) {
      const targetId = clean.replace('system ', '').trim();
      const target = SYSTEMS_DATA.find((s) => s.id === targetId || s.name.toLowerCase() === targetId);
      if (target) {
        const repoI18n = t.repos[target.id] || { label: target.subsystem, summary: '' };
        out.innerHTML = `
          <strong>[${target.name}]</strong><br>
          - Subsystem: ${target.subsystem}<br>
          - Node: ${target.node}<br>
          - Lead: ${target.lead}<br>
          - Stack: ${target.tech.join(', ')}<br>
          - Specification: ${repoI18n.summary}
        `;
      } else {
        out.innerHTML = `Error: System '${this.escape(targetId)}' not found. Available: ${SYSTEMS_DATA.map((s) => s.id).join(', ')}`;
      }
    } else if (clean === 'clear') {
      this.outputElement.innerHTML = '';
      return;
    } else {
      out.innerHTML = `command not recognized: '${this.escape(cmd)}'. Type 'help' for available commands.`;
    }

    this.outputElement.appendChild(out);
    this.outputElement.scrollTop = this.outputElement.scrollHeight;
  }

  private getNodeHelpDesc(): string {
    const desc: Record<LanguageCode, string> = {
      ko: '2개 가상화 클러스터 노드 세부 상태 확인',
      en: 'Inspect state of the 2 virtualized cluster nodes',
      ja: '2つの仮想化クラスターノードの詳細状態を確認',
      zh: '查看2个虚拟化集群节点的详细状态',
      de: 'Detaillierten Status der 2 virtualisierten Cluster-Knoten prüfen',
      fr: 'Inspecter l\'état des 2 nœuds du cluster virtualisé',
      es: 'Inspeccionar el estado de los 2 nodos del clúster virtualizado',
      ru: 'Проверить состояние 2 узлов виртуализированного кластера',
      hi: '2 वर्चुअलाइज्ड क्लस्टर नोड्स की स्थिति की जांच करें',
      pt: 'Inspecionar o status dos 2 nós do cluster virtualizado',
    };
    return desc[this.currentLang] || desc.en;
  }

  private getListHelpDesc(): string {
    const desc: Record<LanguageCode, string> = {
      ko: '10개 핵심 시스템 전체 목록 조회',
      en: 'Display all 10 core systems',
      ja: '10のコアシステム一覧を表示',
      zh: '显示所有10个核心系统',
      de: 'Alle 10 Kernsysteme anzeigen',
      fr: 'Afficher les 10 systèmes centraux',
      es: 'Mostrar los 10 sistemas principales',
      ru: 'Отобразить все 10 основных систем',
      hi: 'सभी 10 मुख्य सिस्टम प्रदर्शित करें',
      pt: 'Exibir todos os 10 sistemas principais',
    };
    return desc[this.currentLang] || desc.en;
  }

  private getSystemHelpDesc(): string {
    const desc: Record<LanguageCode, string> = {
      ko: '특정 시스템 상세 스펙 조회 (예: system netvibe)',
      en: 'Inspect specific system specs (e.g. system netvibe)',
      ja: '特定のシステム仕様を確認 (例: system netvibe)',
      zh: '查看特定系统详细规范 (例如: system netvibe)',
      de: 'Spezifische Systemspezifikationen prüfen (z. B. system netvibe)',
      fr: 'Inspecter les spécifications d\'un système (ex. system netvibe)',
      es: 'Inspeccionar especificaciones del sistema (ej. system netvibe)',
      ru: 'Посмотреть спецификацию системы (например: system netvibe)',
      hi: 'विशिष्ट सिस्टम विवरण देखें (उदा. system netvibe)',
      pt: 'Inspecionar especificações de um sistema (ex. system netvibe)',
    };
    return desc[this.currentLang] || desc.en;
  }

  private getClearHelpDesc(): string {
    const desc: Record<LanguageCode, string> = {
      ko: '콘솔 화면 초기화',
      en: 'Clear console display buffer',
      ja: 'コンソール表示をクリア',
      zh: '清除控制台显示',
      de: 'Konsolenanzeige löschen',
      fr: 'Effacer l\'affichage de la console',
      es: 'Limpiar la pantalla de la consola',
      ru: 'Очистить экран консоли',
      hi: 'कंसोल साफ़ करें',
      pt: 'Limpar a tela do console',
    };
    return desc[this.currentLang] || desc.en;
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
