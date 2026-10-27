/**
 * KRC Labs — 10-Language 1:1 Translation Engine
 * Complete 1:1 mappings for KO, EN, JA, ZH, DE, FR, ES, RU, HI, PT.
 */

import { LanguageCode, TranslationSchema } from './types';

export const LANGUAGE_META: Record<LanguageCode, { name: string; nativeName: string; flag: string }> = {
  ko: { name: 'Korean', nativeName: '한국어', flag: 'KR' },
  en: { name: 'English', nativeName: 'English', flag: 'US' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: 'JP' },
  zh: { name: 'Chinese', nativeName: '简体中文', flag: 'CN' },
  de: { name: 'German', nativeName: 'Deutsch', flag: 'DE' },
  fr: { name: 'French', nativeName: 'Français', flag: 'FR' },
  es: { name: 'Spanish', nativeName: 'Español', flag: 'ES' },
  ru: { name: 'Russian', nativeName: 'Русский', flag: 'RU' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: 'IN' },
  pt: { name: 'Portuguese', nativeName: 'Português', flag: 'PT' },
};

export const TRANSLATIONS: Record<LanguageCode, TranslationSchema> = {
  ko: {
    navSystems: '시스템',
    navCluster: '클러스터',
    navConsole: '콘솔',
    clusterOperational: '클러스터 상태 · 정상 운영중',
    verifiedRuntimes: '10개 검증된 런타임',
    heroTitle: '시스템 아키텍처 & 고신뢰 런타임 엔지니어링.',
    heroLead: 'KRC Labs는 고속 제로 카피 패킷 엔진, 바이너리 디스어셈블러, Windows DPAPI 기반 보안 금고, 그리고 실시간 MCP 런타임을 연구·구현하는 분산 시스템 연구소입니다.',
    cloneCopy: '복사',
    cloneCopied: '복사됨',
    exploreBtn: '10개 시스템 둘러보기',
    node1Title: '노드 1 (10.0.1.30)',
    node1Value: '5개 페르소나 활성 · 커널 및 역공학 엔진',
    node2Title: '노드 2 (10.0.1.31)',
    node2Value: '5개 페르소나 활성 · 원격 디스패치 및 크로미움 브리지',
    hwSecTitle: '하드웨어 보안',
    hwSecValue: 'DPAPI 격리 · 평문 유출 0% 보증',
    catalogTitle: '핵심 시스템 & 마이크로 런타임',
    catalogSubtitle: '독립적으로 유지보수되는 10개의 프라이빗 핵심 연구소 프로젝트 카탈로그입니다.',
    tabAll: '전체 시스템 (10)',
    tabKernel: '커널 & 네트워크',
    tabReverse: '역공학 & 포렌식',
    tabMcp: '보안 & MCP',
    tabCluster: '분산 노드 & 웹',
    showingCount: (shown, total) => `${total}개 중 ${shown}개 시스템 표시 중`,
    searchPlaceholder: '이름, 기술 스택, 리드 개발자 검색...',
    consoleTitle: '클러스터 대화형 콘솔',
    consoleSubtitle: '클러스터 상태 확인 및 저장소 조회를 위한 실시간 대화형 콘솔입니다. (명령어: help, status, nodes, list, clear)',
    consoleHelpHeader: '사용 가능한 명령어:',
    consoleStatusOnline: '클러스터: 온라인 (정상)',
    consoleStatusRuntimes: '런타임: 10개 결정론적 활성 시스템',
    consoleStatusNodes: '노드: 2개 고립 가상화 VM (노드 1 & 2)',
    consoleStatusSecurity: '보안: Windows DPAPI 하드웨어 격리',
    consoleNodesNode1: '[노드 1] 10.0.1.30: 5개 페르소나 (netvibe, binvibe, vulnforge, vibeside, webarcheology)',
    consoleNodesNode2: '[노드 2] 10.0.1.31: 5개 페르소나 (remote-worker, vidcompact, omni-audio, omnibrowse, omni-control)',
    footerTagline: 'KRC Labs — 분산 시스템 & 커널 아키텍처 연구소',
    footerOrg: '깃허브 기관',
    footerSecurity: '보안 문의',
    footerLocation: '대한민국 서울',
    themes: {
      system: '시스템',
      dark: '다크',
      sage: '연초록',
      forest: '포레스트',
      paper: '페이퍼',
    },
    repos: {
      netvibe: {
        label: '커널 & 네트워크',
        summary: 'QUIC RFC 9000 커넥션 마이그레이션, 제로 카피 mmap 패킷 텔레메트리 및 커널 eBPF 스트림 검사 엔진.',
      },
      binvibe: {
        label: '바이너리 디스어셈블러',
        summary: 'Rust 네이티브 바이너리 디스어셈블러. 정적/동적 PE/ELF 인터페이스 역공학 및 제어 흐름 그래프(CFG) 복원.',
      },
      'vulnforge-mcp': {
        label: '마이크로 VM 보안 검증',
        summary: 'Firecracker 및 gVisor 마이크로 VM 격리 환경과 SLSA Level 3 공급망 증명을 탑재한 보안 검증 MCP 런타임.',
      },
      'vibeside-mcp': {
        label: '힙 프로파일러 & 보안 금고',
        summary: '메모리 누수 힙 스냅샷 프로파일러 및 참조 트리 시각화기. Windows DPAPI 하드웨어 보안 기반 0% 평문 자격증명 금고.',
      },
      'webarcheology-mcp': {
        label: '웹 포렌식 & 시간축 추적',
        summary: '웹 아티팩트 포렌식, DOM 변이 시계열 타임슬라이스 추적 및 브라우저 핑거프린팅 회피 분석 엔진.',
      },
      'remote-auto-ai-worker': {
        label: '분산 태스크 디스패처',
        summary: 'AsyncIO, ZeroMQ 및 고성능 웹훅 기반 분산 태스크 디스패처 및 실시간 이벤트 스트림 처리 엔진.',
      },
      'vidcompact-mcp': {
        label: '하드웨어 미디어 파이프라인',
        summary: '무손실 NVENC 및 FFmpeg 하드웨어 가속 비디오 트랜스코딩 엔진. 시각적 아티팩트 억제 및 프레임 최적화.',
      },
      'omni-audio-mcp': {
        label: '칩튠 디코더 & 저지연 오디오',
        summary: '칩튠 트래커 디코더(.xm/.mod), 초저지연 양방향 오디오 스트림 및 무한 루프 와치독 안전 제어 어댑터.',
      },
      omnibrowse: {
        label: '스텔스 브라우징 런타임',
        summary: '탐지 우회 스텔스 브라우징 및 크로미움 CDP 프로토콜 하이재킹 제어 브리지.',
      },
      'omni-control-mcp': {
        label: '클러스터 프로세스 라이프사이클',
        summary: '클러스터 프로세스 라이프사이클 및 헬스 관리. 분산 상태 동기화 및 제로 좀비 프로세스 보증.',
      },
    },
  },

  en: {
    navSystems: 'Systems',
    navCluster: 'Cluster',
    navConsole: 'Console',
    clusterOperational: 'CLUSTER STATUS · OPERATIONAL',
    verifiedRuntimes: '10 VERIFIED RUNTIMES',
    heroTitle: 'Systems architecture & high-assurance runtimes.',
    heroLead: 'KRC Labs is a high-assurance distributed systems research laboratory building zero-copy packet engines, native disassemblers, DPAPI hardware-isolated vaults, and real-time MCP runtimes.',
    cloneCopy: 'Copy',
    cloneCopied: 'Copied',
    exploreBtn: 'Explore 10 Systems',
    node1Title: 'Node 1 (10.0.1.30)',
    node1Value: '5 Personas Active · Kernel & Reverse Engine',
    node2Title: 'Node 2 (10.0.1.31)',
    node2Value: '5 Personas Active · Remote Dispatch & Chromium Bridge',
    hwSecTitle: 'Hardware Security',
    hwSecValue: 'DPAPI Isolated · Zero Plaintext Storage',
    catalogTitle: 'Core Systems & Micro-Runtimes',
    catalogSubtitle: 'Independently maintained catalog of 10 private core research laboratory projects.',
    tabAll: 'All Systems (10)',
    tabKernel: 'Kernel & Network',
    tabReverse: 'Reverse Engineering',
    tabMcp: 'Security & MCP',
    tabCluster: 'Distributed Nodes',
    showingCount: (shown, total) => `Showing ${shown} of ${total} systems`,
    searchPlaceholder: 'Filter by name, tech, lead...',
    consoleTitle: 'Cluster Interactive Console',
    consoleSubtitle: 'Real-time interactive console for cluster status and repository inspection. (Commands: help, status, nodes, list, clear)',
    consoleHelpHeader: 'Available commands:',
    consoleStatusOnline: 'Cluster: ONLINE (Operational)',
    consoleStatusRuntimes: 'Runtimes: 10 Active Deterministic Systems',
    consoleStatusNodes: 'Nodes: 2 Virtualized Isolates (Win VM 1 & 2)',
    consoleStatusSecurity: 'Security: Windows DPAPI Hardware Isolated',
    consoleNodesNode1: '[NODE-1] 10.0.1.30: 5 Personas (netvibe, binvibe, vulnforge, vibeside, webarcheology)',
    consoleNodesNode2: '[NODE-2] 10.0.1.31: 5 Personas (remote-worker, vidcompact, omni-audio, omnibrowse, omni-control)',
    footerTagline: 'KRC Labs — Distributed Systems & Kernel Architecture Research Lab',
    footerOrg: 'GitHub Organization',
    footerSecurity: 'Security Contact',
    footerLocation: 'Seoul, South Korea',
    themes: {
      system: 'System',
      dark: 'Dark',
      sage: 'Sage',
      forest: 'Forest',
      paper: 'Paper',
    },
    repos: {
      netvibe: {
        label: 'KERNEL & NETWORK',
        summary: 'QUIC RFC 9000 connection migration, zero-copy packet telemetry, and kernel eBPF stream inspection engine.',
      },
      binvibe: {
        label: 'BINARY DISASSEMBLER',
        summary: 'Rust-native binary disassembler. Static/dynamic PE/ELF interface reverse engineering and control flow graph (CFG) recovery.',
      },
      'vulnforge-mcp': {
        label: 'MICRO-VM HARNESS',
        summary: 'Micro-VM isolation runtime (Firecracker & gVisor) with SLSA Level 3 supply chain attestation and security verification.',
      },
      'vibeside-mcp': {
        label: 'HEAP PROFILER & VAULT',
        summary: 'Memory leak heap snapshot profiler and retainers tree visualizer with Windows DPAPI hardware-isolated credential vault.',
      },
      'webarcheology-mcp': {
        label: 'WEB FORENSICS',
        summary: 'Web forensics, DOM mutation time-series tracking, and browser anti-fingerprinting evasion engine.',
      },
      'remote-auto-ai-worker': {
        label: 'TASK DISPATCHER',
        summary: 'Distributed task dispatcher and real-time event stream engine powered by AsyncIO, ZeroMQ, and high-throughput webhooks.',
      },
      'vidcompact-mcp': {
        label: 'HARDWARE MEDIA',
        summary: 'Lossless NVENC and FFmpeg hardware video transcoding engine with visual artifact suppression and frame optimization.',
      },
      'omni-audio-mcp': {
        label: 'CHIPTUNE & AUDIO',
        summary: 'Chiptune tracker decoder (.xm/.mod), low-latency audio streaming, and infinite loop watchdog safety adapter.',
      },
      omnibrowse: {
        label: 'STEALTH RUNTIME',
        summary: 'Anti-detect stealth browsing runtime and Chromium CDP protocol hijacking bridge.',
      },
      'omni-control-mcp': {
        label: 'PROCESS LIFECYCLE',
        summary: 'Cluster process lifecycle & health management, distributed state synchronization, and zero-zombie process guarantee.',
      },
    },
  },

  ja: {
    navSystems: 'システム',
    navCluster: 'クラスター',
    navConsole: 'コンソール',
    clusterOperational: 'クラスター状態 · 正常稼働中',
    verifiedRuntimes: '10件の検証済みランタイム',
    heroTitle: 'システムアーキテクチャ & 高信頼性ランタイム。',
    heroLead: 'KRC Labsは、ゼロコピーパケットエンジン、ネイティブ逆アセンブラ、DPAPIハードウェア隔離保管庫、およびリアルタイムMCPランタイムを研究・実装する分散システム研究所です。',
    cloneCopy: 'コピー',
    cloneCopied: 'コピー完了',
    exploreBtn: '10個のシステムを探索',
    node1Title: 'ノード 1 (10.0.1.30)',
    node1Value: '5ペルソナ稼働中 · カーネル & リバースエンジニアリング',
    node2Title: 'ノード 2 (10.0.1.31)',
    node2Value: '5ペルソナ稼働中 · リモートディスパッチ & Chromiumブリッジ',
    hwSecTitle: 'ハードウェアセキュリティ',
    hwSecValue: 'DPAPI完全分離 · 平文漏洩ゼロ保証',
    catalogTitle: 'コアシステム & マイクロランタイム',
    catalogSubtitle: '独立して管理されている10件のプライベートコア研究プロジェクトカタログです。',
    tabAll: '全システム (10)',
    tabKernel: 'カーネル & ネットワーク',
    tabReverse: 'リバースエンジニアリング',
    tabMcp: 'セキュリティ & MCP',
    tabCluster: '分散ノード & Web',
    showingCount: (shown, total) => `${total}件中 ${shown}件を表示中`,
    searchPlaceholder: '名前、技術スタック、リード開発者で検索...',
    consoleTitle: 'クラスター対話型コンソール',
    consoleSubtitle: 'クラスター状態の監視およびリポジトリ照会のための対話型コンソールです。（コマンド: help, status, nodes, list, clear）',
    consoleHelpHeader: '使用可能なコマンド:',
    consoleStatusOnline: 'クラスター: オンライン (正常)',
    consoleStatusRuntimes: 'ランタイム: 10個の決定論的稼働システム',
    consoleStatusNodes: 'ノード: 2台の仮想化分離VM (ノード1 & 2)',
    consoleStatusSecurity: 'セキュリティ: Windows DPAPIハードウェア分離',
    consoleNodesNode1: '[ノード1] 10.0.1.30: 5ペルソナ (netvibe, binvibe, vulnforge, vibeside, webarcheology)',
    consoleNodesNode2: '[ノード2] 10.0.1.31: 5ペルソナ (remote-worker, vidcompact, omni-audio, omnibrowse, omni-control)',
    footerTagline: 'KRC Labs — 分散システム & カーネルアーキテクチャ研究室',
    footerOrg: 'GitHub Organization',
    footerSecurity: 'セキュリティ窓口',
    footerLocation: '韓国ソウル',
    themes: {
      system: 'システム',
      dark: 'ダーク',
      sage: 'セージグリーン',
      forest: 'フォレスト',
      paper: 'ペーパー',
    },
    repos: {
      netvibe: {
        label: 'カーネル & ネットワーク',
        summary: 'QUIC RFC 9000接続マイグレーション、ゼロコピーパケットテレメトリ、およびカーネルeBPFストリーム検査エンジン。',
      },
      binvibe: {
        label: 'バイナリ逆アセンブラ',
        summary: 'Rustネイティブバイナリ逆アセンブラ。静的/動的PE/ELFリバースエンジニアリングおよび制御フローグラフ(CFG)復元。',
      },
      'vulnforge-mcp': {
        label: 'マイクロVM検証',
        summary: 'Firecracker & gVisorマイクロVM隔離環境とSLSA Level 3サプライチェーン検証を備えたセキュリティ検証MCP。',
      },
      'vibeside-mcp': {
        label: 'ヒーププロファイラ & 保管庫',
        summary: 'メモリリークヒープスナップショットプロファイラおよび参照ツリー可視化。Windows DPAPIハードウェア資格情報保管庫。',
      },
      'webarcheology-mcp': {
        label: 'Webフォレンジック',
        summary: 'Webアーティファクト保存、DOM変更時系列トラッキング、およびフィンガープリント回避分析エンジン。',
      },
      'remote-auto-ai-worker': {
        label: '分散タスクディスパッチャ',
        summary: 'AsyncIO、ZeroMQ、および高速Webhookによる分散タスクディスパッチャおよびリアルタイムイベントストリームエンジン。',
      },
      'vidcompact-mcp': {
        label: 'ハードウェアメディア',
        summary: '可逆NVENCおよびFFmpegハードウェア高速化動画トランスコーディングと視覚アーティファクト抑制。',
      },
      'omni-audio-mcp': {
        label: 'チップチューン & 低遅延音響',
        summary: 'チップチューントラッカーデコーダ(.xm/.mod)、超低遅延オーディオストリーム、および無限ループ監視安全制御。',
      },
      omnibrowse: {
        label: 'ステルスランタイム',
        summary: '検知回避ステルスブラウジングおよびChromium CDPプロトコルハイジャック制御ブリッジ。',
      },
      'omni-control-mcp': {
        label: 'クラスタライフサイクル',
        summary: 'クラスタプロセスのライフサイクルと健全性管理。分散状態同期およびゼロゾンビプロセス保証。',
      },
    },
  },

  zh: {
    navSystems: '系统',
    navCluster: '集群',
    navConsole: '终端',
    clusterOperational: '集群状态 · 正常运行',
    verifiedRuntimes: '10 个已验证运行时',
    heroTitle: '系统架构与高可靠运行时工程。',
    heroLead: 'KRC Labs是一家高可靠分布式系统研究实验室，专注于零拷贝数据包引擎、原生反汇编器、DPAPI硬件隔离金库和实时MCP运行时。',
    cloneCopy: '复制',
    cloneCopied: '已复制',
    exploreBtn: '探索 10 大系统',
    node1Title: '节点 1 (10.0.1.30)',
    node1Value: '5 个角色运行中 · 内核与逆向工程',
    node2Title: '节点 2 (10.0.1.31)',
    node2Value: '5 个角色运行中 · 远程调度与 Chromium 桥接',
    hwSecTitle: '硬件安全',
    hwSecValue: 'DPAPI 隔离 · 保证零明文泄露',
    catalogTitle: '核心系统与微运行时',
    catalogSubtitle: '独立维护的 10 个私有核心实验室项目目录。',
    tabAll: '全部系统 (10)',
    tabKernel: '内核与网络',
    tabReverse: '逆向工程',
    tabMcp: '安全与 MCP',
    tabCluster: '分布式节点',
    showingCount: (shown, total) => `显示 ${total} 个系统中的 ${shown} 个`,
    searchPlaceholder: '按名称、技术栈、主管筛选...',
    consoleTitle: '集群交互式控制台',
    consoleSubtitle: '用于检查集群状态和查看代码库的实时控制台。（命令：help、status、nodes、list、clear）',
    consoleHelpHeader: '可用命令：',
    consoleStatusOnline: '集群：在线（正常）',
    consoleStatusRuntimes: '运行时：10 个活跃确定性系统',
    consoleStatusNodes: '节点：2 个虚拟化隔离节点（Win VM 1 和 2）',
    consoleStatusSecurity: '安全：Windows DPAPI 硬件隔离',
    consoleNodesNode1: '[节点 1] 10.0.1.30: 5 个角色 (netvibe, binvibe, vulnforge, vibeside, webarcheology)',
    consoleNodesNode2: '[节点 2] 10.0.1.31: 5 个角色 (remote-worker, vidcompact, omni-audio, omnibrowse, omni-control)',
    footerTagline: 'KRC Labs — 分布式系统与内核架构实验室',
    footerOrg: 'GitHub 组织',
    footerSecurity: '安全联系',
    footerLocation: '韩国首尔',
    themes: {
      system: '系统',
      dark: '暗黑',
      sage: '浅绿',
      forest: '森林',
      paper: '纸张',
    },
    repos: {
      netvibe: {
        label: '内核与网络',
        summary: 'QUIC RFC 9000连接迁移、零拷贝数据包遥测和内核eBPF流检查引擎。',
      },
      binvibe: {
        label: '二进制反汇编器',
        summary: 'Rust原生二进制反汇编器。PE/ELF接口逆向工程与控制流图(CFG)恢复框架。',
      },
      'vulnforge-mcp': {
        label: '微虚拟机安全治理',
        summary: '集成Firecracker与gVisor微虚拟机隔离以及SLSA Level 3供应链认证的安全验证MCP运行时。',
      },
      'vibeside-mcp': {
        label: '堆内存分析与凭据金库',
        summary: '内存泄漏堆快照分析器与引用树可视化。基于Windows DPAPI硬件隔离的零明文凭据金库。',
      },
      'webarcheology-mcp': {
        label: 'Web取证与时序追踪',
        summary: 'Web工件取证、DOM变异时序追踪和浏览器指纹规避分析引擎。',
      },
      'remote-auto-ai-worker': {
        label: '分布式任务分发器',
        summary: '基于AsyncIO、ZeroMQ和高速Webhook的分布式任务分发与实时事件流处理引擎。',
      },
      'vidcompact-mcp': {
        label: '硬件媒体管线',
        summary: '无损NVENC与FFmpeg硬件视频转码引擎，具备视觉瑕疵抑制与帧优化功能。',
      },
      'omni-audio-mcp': {
        label: 'Chiptune解码与低延迟音频',
        summary: 'Chiptune跟踪器解码器(.xm/.mod)、超低延迟音频流与无限循环看门狗守护适配器。',
      },
      omnibrowse: {
        label: '隐身浏览运行时',
        summary: '反检测隐身浏览环境和Chromium CDP协议拦截控制桥梁。',
      },
      'omni-control-mcp': {
        label: '集群生命周期控制',
        summary: '集群进程生命周期与健康管理。分布式状态同步和零僵尸进程保障。',
      },
    },
  },

  de: {
    navSystems: 'Systeme',
    navCluster: 'Cluster',
    navConsole: 'Konsole',
    clusterOperational: 'CLUSTER-STATUS · BETRIEBSBEREIT',
    verifiedRuntimes: '10 VERIFIZIERTE LAUFZEITEN',
    heroTitle: 'Systemarchitektur & Hochsicherheits-Laufzeiten.',
    heroLead: 'KRC Labs ist ein Forschungslabor für hochzuverlässige verteilte Systeme, das Zero-Copy-Paket-Engines, native Disassembler, DPAPI-isolierte Tresore und deterministische MCP-Laufzeiten entwickelt.',
    cloneCopy: 'Kopieren',
    cloneCopied: 'Kopiert',
    exploreBtn: '10 Systeme erkunden',
    node1Title: 'Knoten 1 (10.0.1.30)',
    node1Value: '5 aktive Personas · Kernel & Reverse-Engineering',
    node2Title: 'Knoten 2 (10.0.1.31)',
    node2Value: '5 aktive Personas · Remote Dispatch & Chromium Bridge',
    hwSecTitle: 'Hardware-Sicherheit',
    hwSecValue: 'DPAPI-isoliert · 0 % Klartext-Garantie',
    catalogTitle: 'Kernsysteme & Mikro-Laufzeiten',
    catalogSubtitle: 'Unabhängig gepflegter Katalog von 10 privaten Forschungsprojekten.',
    tabAll: 'Alle Systeme (10)',
    tabKernel: 'Kernel & Netzwerk',
    tabReverse: 'Reverse-Engineering',
    tabMcp: 'Sicherheit & MCP',
    tabCluster: 'Verteilte Knoten',
    showingCount: (shown, total) => `${shown} von ${total} Systemen angezeigt`,
    searchPlaceholder: 'Nach Name, Tech, Lead filtern...',
    consoleTitle: 'Interaktive Cluster-Konsole',
    consoleSubtitle: 'Echtzeit-Konsole zur Überprüfung von Cluster-Status und Repositories. (Befehle: help, status, nodes, list, clear)',
    consoleHelpHeader: 'Verfügbare Befehle:',
    consoleStatusOnline: 'Cluster: ONLINE (Betriebsbereit)',
    consoleStatusRuntimes: 'Laufzeiten: 10 aktive deterministische Systeme',
    consoleStatusNodes: 'Knoten: 2 isolierte VMs (Win VM 1 & 2)',
    consoleStatusSecurity: 'Sicherheit: Windows DPAPI Hardware-Isolation',
    consoleNodesNode1: '[Knoten 1] 10.0.1.30: 5 Personas (netvibe, binvibe, vulnforge, vibeside, webarcheology)',
    consoleNodesNode2: '[Knoten 2] 10.0.1.31: 5 Personas (remote-worker, vidcompact, omni-audio, omnibrowse, omni-control)',
    footerTagline: 'KRC Labs — Verteilte Systeme & Kernel-Architektur-Forschungslabor',
    footerOrg: 'GitHub-Organisation',
    footerSecurity: 'Sicherheitskontakt',
    footerLocation: 'Seoul, Südkorea',
    themes: {
      system: 'System',
      dark: 'Dunkel',
      sage: 'Salbeigrün',
      forest: 'Wald',
      paper: 'Papier',
    },
    repos: {
      netvibe: {
        label: 'KERNEL & NETZWERK',
        summary: 'QUIC RFC 9000 Verbindungsmigration, Zero-Copy-Pakettelemetrie und Kernel-eBPF-Stream-Inspektions-Engine.',
      },
      binvibe: {
        label: 'BINÄRER DISASSEMBLER',
        summary: 'Rust-nativer Binär-Disassembler. PE/ELF-Schnittstellen-Reverse-Engineering und Kontrollflussgraph(CFG)-Rekonstruktion.',
      },
      'vulnforge-mcp': {
        label: 'MICRO-VM-SICHERHEIT',
        summary: 'Micro-VM-Isolierung (Firecracker & gVisor) mit SLSA Level 3 Lieferketten-Attestierung und Sicherheitsvalidierung.',
      },
      'vibeside-mcp': {
        label: 'HEAP-PROFILER & TRESOR',
        summary: 'Speicherleck-Heap-Snapshot-Profiler und Referenzbaum-Visualisierer mit Windows DPAPI Hardware-Sicherheitstresor.',
      },
      'webarcheology-mcp': {
        label: 'WEB-FORENSIK',
        summary: 'Web-Artefakt-Forensik, DOM-Mutations-Zeitserien-Tracking und Browser-Fingerprinting-Evasions-Engine.',
      },
      'remote-auto-ai-worker': {
        label: 'VERTEILTER TASK-DISPATCHER',
        summary: 'Verteilter Task-Dispatcher und Echtzeit-Ereignisstrom-Engine basierend auf AsyncIO, ZeroMQ und Webhooks.',
      },
      'vidcompact-mcp': {
        label: 'HARDWARE-MEDIEN',
        summary: 'Verlustfreie NVENC- und FFmpeg-Hardware-Videotranskodierung mit visueller Artefaktunterdrückung.',
      },
      'omni-audio-mcp': {
        label: 'CHIPTUNE & AUDIO',
        summary: 'Chiptune-Tracker-Decoder (.xm/.mod), extrem latenzarmer Audiostream und Endlosschleifen-Watchdog.',
      },
      omnibrowse: {
        label: 'STEALTH-LAUFZEIT',
        summary: 'Anti-Erkennungs-Stealth-Browsing und native Chromium CDP-Protokoll-Hijacking-Brücke.',
      },
      'omni-control-mcp': {
        label: 'CLUSTER-LEBENSZYKLUS',
        summary: 'Cluster-Prozess-Lebenszyklus und Gesundheitsüberwachung mit verteilter Zustandssynchronisation und Zero-Zombie-Garantie.',
      },
    },
  },

  fr: {
    navSystems: 'Systèmes',
    navCluster: 'Cluster',
    navConsole: 'Console',
    clusterOperational: 'ÉTAT DU CLUSTER · OPÉRATIONNEL',
    verifiedRuntimes: '10 RUNTIMES VÉRIFIÉS',
    heroTitle: 'Architecture système & runtimes haute assurance.',
    heroLead: 'KRC Labs est un laboratoire de recherche en systèmes distribués concevant des moteurs de paquets zéro-copie, des désassembleurs natifs, des coffres-forts DPAPI et des environnements MCP temps réel.',
    cloneCopy: 'Copier',
    cloneCopied: 'Copié',
    exploreBtn: 'Explorer les 10 systèmes',
    node1Title: 'Nœud 1 (10.0.1.30)',
    node1Value: '5 personas actifs · Moteur noyau et rétro-ingénierie',
    node2Title: 'Nœud 2 (10.0.1.31)',
    node2Value: '5 personas actifs · Dispatch distant et pont Chromium',
    hwSecTitle: 'Sécurité matérielle',
    hwSecValue: 'Isolation DPAPI · Zéro fuite en texte clair',
    catalogTitle: 'Systèmes de base & Micro-Runtimes',
    catalogSubtitle: 'Catalogue de 10 projets de recherche privés maintenus indépendamment.',
    tabAll: 'Tous les systèmes (10)',
    tabKernel: 'Noyau & Réseau',
    tabReverse: 'Rétro-ingénierie',
    tabMcp: 'Sécurité & MCP',
    tabCluster: 'Nœuds distribués',
    showingCount: (shown, total) => `Affichage de ${shown} sur ${total} systèmes`,
    searchPlaceholder: 'Filtrer par nom, techno, responsable...',
    consoleTitle: 'Console interactive de cluster',
    consoleSubtitle: 'Console en temps réel pour inspecter le cluster et les dépôts. (Commandes : help, status, nodes, list, clear)',
    consoleHelpHeader: 'Commandes disponibles :',
    consoleStatusOnline: 'Cluster : EN LIGNE (Opérationnel)',
    consoleStatusRuntimes: 'Runtimes : 10 systèmes déterministes actifs',
    consoleStatusNodes: 'Nœuds : 2 VM isolées (Win VM 1 & 2)',
    consoleStatusSecurity: 'Sécurité : Isolation matérielle Windows DPAPI',
    consoleNodesNode1: '[Nœud 1] 10.0.1.30 : 5 personas (netvibe, binvibe, vulnforge, vibeside, webarcheology)',
    consoleNodesNode2: '[Nœud 2] 10.0.1.31 : 5 personas (remote-worker, vidcompact, omni-audio, omnibrowse, omni-control)',
    footerTagline: 'KRC Labs — Laboratoire de recherche en systèmes distribués et architecture de noyau',
    footerOrg: 'Organisation GitHub',
    footerSecurity: 'Contact sécurité',
    footerLocation: 'Séoul, Corée du Sud',
    themes: {
      system: 'Système',
      dark: 'Sombre',
      sage: 'Sauge',
      forest: 'Forêt',
      paper: 'Papier',
    },
    repos: {
      netvibe: {
        label: 'NOYAU & RÉSEAU',
        summary: 'Migration de connexion QUIC RFC 9000, télémétrie de paquets zéro-copie et moteur d\'inspection de flux eBPF.',
      },
      binvibe: {
        label: 'DÉSASSEMBLEUR BINAIRE',
        summary: 'Désassembleur binaire natif Rust. Rétro-ingénierie d\'interfaces PE/ELF et reconstruction du graphe de flux de contrôle (CFG).',
      },
      'vulnforge-mcp': {
        label: 'SÉCURITÉ MICRO-VM',
        summary: 'Isolation Micro-VM (Firecracker & gVisor) avec attestation de chaîne logistique SLSA Niveau 3.',
      },
      'vibeside-mcp': {
        label: 'PROFILEUR & COFFRE DPAPI',
        summary: 'Profileur d\'instantanés de tas pour fuites de mémoire et visualiseur d\'arbre de rétention avec coffre matériel Windows DPAPI.',
      },
      'webarcheology-mcp': {
        label: 'FORENSIQUE WEB',
        summary: 'Forensique d\'artefacts Web, suivi chronologique des mutations DOM et évasion des empreintes de navigateur.',
      },
      'remote-auto-ai-worker': {
        label: 'RÉPARTITEUR DE TÂCHES',
        summary: 'Répartiteur de tâches distribué et moteur de flux d\'événements temps réel propulsé par AsyncIO, ZeroMQ et webhooks.',
      },
      'vidcompact-mcp': {
        label: 'MÉDIA MATÉRIEL',
        summary: 'Transcodage vidéo matériel sans perte NVENC/FFmpeg avec suppression des artefacts visuels.',
      },
      'omni-audio-mcp': {
        label: 'DÉCODEUR CHIPTUNE & AUDIO',
        summary: 'Décodeur de trackers chiptune (.xm/.mod), flux audio à très faible latence et chien de garde pour boucles infinies.',
      },
      omnibrowse: {
        label: 'RUNTIME FURTIF',
        summary: 'Navigation furtive anti-détection et pont de détournement de protocole Chromium CDP.',
      },
      'omni-control-mcp': {
        label: 'CYCLE DE VIE DU CLUSTER',
        summary: 'Gestion du cycle de vie des processus du cluster, synchronisation d\'état distribué et garantie zéro zombie.',
      },
    },
  },

  es: {
    navSystems: 'Sistemas',
    navCluster: 'Clúster',
    navConsole: 'Consola',
    clusterOperational: 'ESTADO DEL CLÚSTER · OPERATIVO',
    verifiedRuntimes: '10 RUNTIMES VERIFICADOS',
    heroTitle: 'Arquitectura de sistemas y runtimes de alta confianza.',
    heroLead: 'KRC Labs es un laboratorio de investigación de sistemas distribuidos que desarrolla motores de paquetes de copia cero, desensambladores nativos, bóvedas DPAPI y entornos de ejecución MCP en tiempo real.',
    cloneCopy: 'Copiar',
    cloneCopied: 'Copiado',
    exploreBtn: 'Explorar 10 sistemas',
    node1Title: 'Nodo 1 (10.0.1.30)',
    node1Value: '5 personas activas · Núcleo e ingeniería inversa',
    node2Title: 'Nodo 2 (10.0.1.31)',
    node2Value: '5 personas activas · Despacho remoto y puente Chromium',
    hwSecTitle: 'Seguridad por hardware',
    hwSecValue: 'Aislamiento DPAPI · Cero fuga de texto plano',
    catalogTitle: 'Sistemas centrales y micro-runtimes',
    catalogSubtitle: 'Catálogo mantenido de forma independiente de 10 proyectos de laboratorio de investigación privados.',
    tabAll: 'Todos los sistemas (10)',
    tabKernel: 'Núcleo y red',
    tabReverse: 'Ingeniería inversa',
    tabMcp: 'Seguridad y MCP',
    tabCluster: 'Nodos distribuidos',
    showingCount: (shown, total) => `Mostrando ${shown} de ${total} sistemas`,
    searchPlaceholder: 'Filtrar por nombre, tecnología, líder...',
    consoleTitle: 'Consola interactiva del clúster',
    consoleSubtitle: 'Consola en tiempo real para verificar el clúster y los repositorios. (Comandos: help, status, nodes, list, clear)',
    consoleHelpHeader: 'Comandos disponibles:',
    consoleStatusOnline: 'Clúster: EN LÍNEA (Operativo)',
    consoleStatusRuntimes: 'Runtimes: 10 sistemas deterministas activos',
    consoleStatusNodes: 'Nodos: 2 VM aisladas (Win VM 1 y 2)',
    consoleStatusSecurity: 'Seguridad: Aislamiento por hardware Windows DPAPI',
    consoleNodesNode1: '[Nodo 1] 10.0.1.30: 5 personas (netvibe, binvibe, vulnforge, vibeside, webarcheology)',
    consoleNodesNode2: '[Nodo 2] 10.0.1.31: 5 personas (remote-worker, vidcompact, omni-audio, omnibrowse, omni-control)',
    footerTagline: 'KRC Labs — Laboratorio de investigación de sistemas distribuidos y arquitectura de kernel',
    footerOrg: 'Organización GitHub',
    footerSecurity: 'Contacto de seguridad',
    footerLocation: 'Seúl, Corea del Sur',
    themes: {
      system: 'Sistema',
      dark: 'Oscuro',
      sage: 'Verde salvia',
      forest: 'Bosque',
      paper: 'Papel',
    },
    repos: {
      netvibe: {
        label: 'KERNEL Y RED',
        summary: 'Migración de conexiones QUIC RFC 9000, telemetría de paquetes de copia cero y motor de inspección de flujos eBPF.',
      },
      binvibe: {
        label: 'DESENSAMBLADOR BINARIO',
        summary: 'Desensamblador nativo en Rust. Ingeniería inversa de interfaces PE/ELF y reconstrucción del grafo de control de flujo (CFG).',
      },
      'vulnforge-mcp': {
        label: 'SEGURIDAD MICRO-VM',
        summary: 'Aislamiento Micro-VM (Firecracker y gVisor) con certificación de cadena de suministro SLSA Nivel 3.',
      },
      'vibeside-mcp': {
        label: 'PERFILADOR Y BÓVEDA DPAPI',
        summary: 'Perfilador de fugas de memoria con capturas de heap y visualizador de árbol con bóveda aislada Windows DPAPI.',
      },
      'webarcheology-mcp': {
        label: 'FORENSE WEB',
        summary: 'Forense de artefactos web, seguimiento temporal de mutaciones del DOM y evasión de huellas digitales de navegadores.',
      },
      'remote-auto-ai-worker': {
        label: 'DISTRIBUIDOR DE TAREAS',
        summary: 'Distribuidor de tareas y motor de flujo de eventos en tiempo real basado en AsyncIO, ZeroMQ y webhooks de alto rendimiento.',
      },
      'vidcompact-mcp': {
        label: 'MEDIOS POR HARDWARE',
        summary: 'Transcodificación de video acelerada por hardware NVENC/FFmpeg sin pérdidas con supresión de artefactos visuales.',
      },
      'omni-audio-mcp': {
        label: 'DECODIFICADOR CHIPTUNE',
        summary: 'Decodificador de módulos chiptune (.xm/.mod), flujo de audio de ultrabaja latencia y watchdog contra bucles infinitos.',
      },
      omnibrowse: {
        label: 'ENTORNO SIGILOSO',
        summary: 'Navegación sigilosa contra detección y puente de interceptación del protocolo Chromium CDP.',
      },
      'omni-control-mcp': {
        label: 'CICLO DE VIDA DEL CLUSTER',
        summary: 'Gestión del cycle de vida de procesos del clúster, sincronización de estado distribuido y garantía de cero procesos zombi.',
      },
    },
  },

  ru: {
    navSystems: 'Системы',
    navCluster: 'Кластер',
    navConsole: 'Консоль',
    clusterOperational: 'СТАТУС КЛАСТЕРА · РАБОТАЕТ',
    verifiedRuntimes: '10 ПРОВЕРЕННЫХ СИСТЕМ',
    heroTitle: 'Архитектура систем и надежные среды исполнения.',
    heroLead: 'KRC Labs — исследовательская лаборатория распределенных систем, создающая пакетные движки с нулевым копированием, дизассемблеры, аппаратные хранилища DPAPI и детерминированные среды MCP.',
    cloneCopy: 'Копировать',
    cloneCopied: 'Скопировано',
    exploreBtn: 'Изучить 10 систем',
    node1Title: 'Узел 1 (10.0.1.30)',
    node1Value: '5 активных персон · Ядро и реверс-инжиниринг',
    node2Title: 'Узел 2 (10.0.1.31)',
    node2Value: '5 активных персон · Удаленная диспетчеризация и Chromium',
    hwSecTitle: 'Аппаратная безопасность',
    hwSecValue: 'Изоляция DPAPI · 0% утечки открытого текста',
    catalogTitle: 'Основные системы и микрорантаймы',
    catalogSubtitle: 'Каталог из 10 изолированных частных исследовательских проектов лаборатории.',
    tabAll: 'Все системы (10)',
    tabKernel: 'Ядро и сеть',
    tabReverse: 'Реверс-инжиниринг',
    tabMcp: 'Безопасность и MCP',
    tabCluster: 'Распределенные узлы',
    showingCount: (shown, total) => `Показано ${shown} из ${total} систем`,
    searchPlaceholder: 'Поиск по имени, стеку, разработчику...',
    consoleTitle: 'Интерактивная консоль кластера',
    consoleSubtitle: 'Интерактивная консоль для проверки состояния узлов и репозиториев. (Команды: help, status, nodes, list, clear)',
    consoleHelpHeader: 'Доступные команды:',
    consoleStatusOnline: 'Кластер: В СЕТИ (Штатно)',
    consoleStatusRuntimes: 'Рантаймы: 10 активных детерминированных систем',
    consoleStatusNodes: 'Узлы: 2 изолированные ВМ (Win VM 1 и 2)',
    consoleStatusSecurity: 'Безопасность: Аппаратная изоляция Windows DPAPI',
    consoleNodesNode1: '[Узел 1] 10.0.1.30: 5 персон (netvibe, binvibe, vulnforge, vibeside, webarcheology)',
    consoleNodesNode2: '[Узел 2] 10.0.1.31: 5 персон (remote-worker, vidcompact, omni-audio, omnibrowse, omni-control)',
    footerTagline: 'KRC Labs — Исследовательская лаборатория распределенных систем и архитектуры ядра',
    footerOrg: 'Организация GitHub',
    footerSecurity: 'Служба безопасности',
    footerLocation: 'Сеул, Южная Корея',
    themes: {
      system: 'Система',
      dark: 'Тёмная',
      sage: 'Шалфейная',
      forest: 'Лесная',
      paper: 'Бумажная',
    },
    repos: {
      netvibe: {
        label: 'ЯДРО И СЕТЬ',
        summary: 'Миграция соединений QUIC RFC 9000, телеметрия пакетов с нулевым копированием и инспекция потоков eBPF в ядре.',
      },
      binvibe: {
        label: 'ДИЗАССЕМБЛЕР',
        summary: 'Дизассемблер на Rust. Реверс-инжиниринг интерфейсов PE/ELF и восстановление графа потока управления (CFG).',
      },
      'vulnforge-mcp': {
        label: 'ИЗОЛЯЦИЯ MICRO-VM',
        summary: 'Изоляция в среде Micro-VM (Firecracker и gVisor) с аттестацией цепочки поставок SLSA Уровень 3.',
      },
      'vibeside-mcp': {
        label: 'ПРОФИЛИРОВАНИЕ И ХРАНИЛИЩЕ',
        summary: 'Профайлер снимков кучи для утечек памяти и визуализатор связей с аппаратным хранилищем Windows DPAPI.',
      },
      'webarcheology-mcp': {
        label: 'ВЕБ-ФОРЕНЗИКА',
        summary: 'Форензика веб-артефактов, временные ряды мутаций DOM и движок обхода фингерпринтинга браузера.',
      },
      'remote-auto-ai-worker': {
        label: 'ДИСПЕТЧЕР ЗАДАЧ',
        summary: 'Распределенный диспетчер задач и обработчик событий реального времени на AsyncIO, ZeroMQ и вебхуках.',
      },
      'vidcompact-mcp': {
        label: 'АППАРАТНОЕ ВИДЕО',
        summary: 'Аппаратное транскодирование видео без потерь на NVENC/FFmpeg с подавлением визуальных артефактов.',
      },
      'omni-audio-mcp': {
        label: 'ДЕКОДЕР CHIPTUNE & АУДИО',
        summary: 'Декодер трекерных модулей (.xm/.mod), аудиопоток сверхнизкой задержки и сторожевой таймер от зацикливания.',
      },
      omnibrowse: {
        label: 'СТЕЛС-РАНТАЙМ',
        summary: 'Стелс-браузинг с обходом обнаружения и мост перехвата протокола Chromium CDP.',
      },
      'omni-control-mcp': {
        label: 'ЖИЗНЕННЫЙ ЦИКЛ КЛАСТЕРА',
        summary: 'Управление жизненным циклом процессов кластера, распределенная синхронизация и гарантия отсутствия процессов-зомби.',
      },
    },
  },

  hi: {
    navSystems: 'प्रणालियाँ',
    navCluster: 'क्लस्टर',
    navConsole: 'कंसोल',
    clusterOperational: 'क्लस्टर स्थिति · सक्रिय',
    verifiedRuntimes: '10 सत्यापित रनटाइम',
    heroTitle: 'सिस्टम आर्किटेक्चर और उच्च-आश्वासन रनटाइम।',
    heroLead: 'KRC Labs शून्य-प्रतिलिपि पैकेट इंजन, नेटिव डिसेम्बलर, DPAPI हार्डवेयर-पृथक वॉल्ट और रीयल-टाइम MCP रनटाइम बनाने वाली उच्च-आश्वासन वितरित सिस्टम अनुसंधान प्रयोगशाला है।',
    cloneCopy: 'कॉपी करें',
    cloneCopied: 'कॉपी किया गया',
    exploreBtn: '10 प्रणालियों का अन्वेषण करें',
    node1Title: 'नोड 1 (10.0.1.30)',
    node1Value: '5 सक्रिय पर्सोना · कर्नेल और रिवर्स इंजीनियरिंग',
    node2Title: 'नोड 2 (10.0.1.31)',
    node2Value: '5 सक्रिय पर्सोना · रिमोट डिस्पैच और क्रोमियम ब्रिज',
    hwSecTitle: 'हार्डवेयर सुरक्षा',
    hwSecValue: 'DPAPI पृथक · शून्य प्लेनटेक्स्ट गारंटी',
    catalogTitle: 'कोर सिस्टम और माइक्रो-रनटाइम',
    catalogSubtitle: '10 स्वतंत्र निजी मुख्य अनुसंधान प्रयोगशाला परियोजनाओं की सूची।',
    tabAll: 'सभी प्रणालियाँ (10)',
    tabKernel: 'कर्नेल और नेटवर्क',
    tabReverse: 'रिवर्स इंजीनियरिंग',
    tabMcp: 'सुरक्षा और MCP',
    tabCluster: 'वितरित नोड्स',
    showingCount: (shown, total) => `${total} में से ${shown} प्रणालियाँ प्रदर्शित`,
    searchPlaceholder: 'नाम, तकनीक, लीड द्वारा खोजें...',
    consoleTitle: 'क्लस्टर इंटरैक्टिव कंसोल',
    consoleSubtitle: 'क्लस्टर स्थिति और रिपॉजिटरी जांच के लिए वास्तविक समय कंसोल। (कमांड: help, status, nodes, list, clear)',
    consoleHelpHeader: 'उपलब्ध कमांड:',
    consoleStatusOnline: 'क्लस्टर: ऑनलाइन (सामान्य)',
    consoleStatusRuntimes: 'रनटाइम: 10 सक्रिय निश्चित प्रणालियाँ',
    consoleStatusNodes: 'नोड्स: 2 पृथक वर्चुअल मशीनें (Win VM 1 और 2)',
    consoleStatusSecurity: 'सुरक्षा: Windows DPAPI हार्डवेयर पृथक',
    consoleNodesNode1: '[नोड 1] 10.0.1.30: 5 पर्सोना (netvibe, binvibe, vulnforge, vibeside, webarcheology)',
    consoleNodesNode2: '[नोड 2] 10.0.1.31: 5 पर्सोना (remote-worker, vidcompact, omni-audio, omnibrowse, omni-control)',
    footerTagline: 'KRC Labs — वितरित सिस्टम और कर्नेल आर्किटेक्चर अनुसंधान प्रयोगशाला',
    footerOrg: 'GitHub संगठन',
    footerSecurity: 'सुरक्षा संपर्क',
    footerLocation: 'सियोल, दक्षिण कोरिया',
    themes: {
      system: 'सिस्टम',
      dark: 'डार्क',
      sage: 'सेज़ हरा',
      forest: 'वन',
      paper: 'कागज़',
    },
    repos: {
      netvibe: {
        label: 'कर्नेल और नेटवर्क',
        summary: 'QUIC RFC 9000 कनेक्शन माइग्रेशन, जीरो-कॉपी पैकेट टेलीमेट्री और कर्नेल eBPF स्ट्रीम निरीक्षण इंजन।',
      },
      binvibe: {
        label: 'बाइनरी डिसेम्बलर',
        summary: 'रस्ट-आधारित बाइनरी डिसेम्बलर। स्थैतिक/गतिशील PE/ELF रिवर्स इंजीनियरिंग और कंट्रोल फ्लो ग्राफ (CFG) पुनर्प्राप्ति।',
      },
      'vulnforge-mcp': {
        label: 'माइक्रो-VM सुरक्षा',
        summary: 'Firecracker और gVisor माइक्रो-VM पृथक्करण के साथ SLSA स्तर 3 आपूर्ति श्रृंखला सुरक्षा सत्यापन रनटाइम।',
      },
      'vibeside-mcp': {
        label: 'मेमोरी प्रोफ़ाइलर और वॉल्ट',
        summary: 'मेमोरी लीक हीप स्नैपशॉट प्रोफ़ाइलर और विंडोज DPAPI हार्डवेयर-पृथक क्रेडेंशियल वॉल्ट।',
      },
      'webarcheology-mcp': {
        label: 'वेब फोरेंसिक',
        summary: 'वेब आर्टिफ़ैक्ट फोरेंसिक, DOM म्यूटेशन टाइम-सीरीज़ ट्रैकिंग और ब्राउज़र फ़िंगरप्रिंटिंग चोरी रोकथाम इंजन।',
      },
      'remote-auto-ai-worker': {
        label: 'वितरित कार्य डिस्पैचर',
        summary: 'AsyncIO, ZeroMQ और उच्च-थ्रूपुट वेबहुक द्वारा संचालित वितरित टास्क डिस्पैचर और रीयल-टाइम इवेंट स्ट्रीम इंजन।',
      },
      'vidcompact-mcp': {
        label: 'हार्डवेयर मीडिया',
        summary: 'हानिरहित NVENC और FFmpeg हार्डवेयर वीडियो ट्रांसकोडिंग इंजन, दृश्य कलाकृतियों के दमन के साथ।',
      },
      'omni-audio-mcp': {
        label: 'चिपट्यून डिकोडर और ऑडियो',
        summary: 'चिपट्यून ट्रैकर डिकोडर (.xm/.mod), अति-निम्न विलंबता ऑडियो स्ट्रीमिंग और अनंत लूप वॉचडॉग।',
      },
      omnibrowse: {
        label: 'स्टेल्थ रनटाइम',
        summary: 'पहचान-रोधी स्टेल्थ ब्राउज़िंग और क्रोमियम CDP प्रोटोकॉल हाईजैकिंग ब्रिज।',
      },
      'omni-control-mcp': {
        label: 'क्लस्टर लाइफसाइकिल',
        summary: 'क्लस्टर प्रक्रिया जीवनचक्र और स्वास्थ्य प्रबंधन, वितरित स्थिति तुल्यकालन और शून्य-ज़ोंबी प्रक्रिया आश्वासन।',
      },
    },
  },

  pt: {
    navSystems: 'Sistemas',
    navCluster: 'Cluster',
    navConsole: 'Console',
    clusterOperational: 'STATUS DO CLUSTER · OPERACIONAL',
    verifiedRuntimes: '10 RUNTIMES VERIFICADOS',
    heroTitle: 'Arquitetura de sistemas e runtimes de alta confiabilidade.',
    heroLead: 'O KRC Labs é um laboratório de pesquisa em sistemas distribuídos de alta confiabilidade, desenvolvendo motores de pacotes de cópia zero, descompiladores nativos, cofres DPAPI e ambientes MCP em tempo real.',
    cloneCopy: 'Copiar',
    cloneCopied: 'Copiado',
    exploreBtn: 'Explorar 10 sistemas',
    node1Title: 'Nó 1 (10.0.1.30)',
    node1Value: '5 personas ativas · Núcleo e engenharia reversa',
    node2Title: 'Nó 2 (10.0.1.31)',
    node2Value: '5 personas ativas · Despacho remoto e ponte Chromium',
    hwSecTitle: 'Segurança por hardware',
    hwSecValue: 'Isolamento DPAPI · 0% vazamento de texto simples',
    catalogTitle: 'Sistemas principais e microrruntimes',
    catalogSubtitle: 'Catálogo mantido de forma independente de 10 projetos de pesquisa privados.',
    tabAll: 'Todos os sistemas (10)',
    tabKernel: 'Kernel e rede',
    tabReverse: 'Engenharia reversa',
    tabMcp: 'Segurança e MCP',
    tabCluster: 'Nós distribuídos',
    showingCount: (shown, total) => `Mostrando ${shown} de ${total} sistemas`,
    searchPlaceholder: 'Filtrar por nome, tecnologia, líder...',
    consoleTitle: 'Console interativo do cluster',
    consoleSubtitle: 'Console em tempo real para verificar o cluster e os repositórios. (Comandos: help, status, nodes, list, clear)',
    consoleHelpHeader: 'Comandos disponíveis:',
    consoleStatusOnline: 'Cluster: ONLINE (Operacional)',
    consoleStatusRuntimes: 'Runtimes: 10 sistemas determinísticos ativos',
    consoleStatusNodes: 'Nós: 2 VMs isoladas (Win VM 1 e 2)',
    consoleStatusSecurity: 'Segurança: Isolamento por hardware Windows DPAPI',
    consoleNodesNode1: '[Nó 1] 10.0.1.30: 5 personas (netvibe, binvibe, vulnforge, vibeside, webarcheology)',
    consoleNodesNode2: '[Nó 2] 10.0.1.31: 5 personas (remote-worker, vidcompact, omni-audio, omnibrowse, omni-control)',
    footerTagline: 'KRC Labs — Laboratório de pesquisa em sistemas distribuídos e arquitetura de kernel',
    footerOrg: 'Organização GitHub',
    footerSecurity: 'Contato de segurança',
    footerLocation: 'Seul, Coreia do Sul',
    themes: {
      system: 'Sistema',
      dark: 'Escuro',
      sage: 'Verde Sálvia',
      forest: 'Floresta',
      paper: 'Papel',
    },
    repos: {
      netvibe: {
        label: 'KERNEL E REDE',
        summary: 'Migração de conexão QUIC RFC 9000, telemetria de pacotes de cópia zero e motor de inspeção de fluxo eBPF.',
      },
      binvibe: {
        label: 'DESCOMPILADOR BINÁRIO',
        summary: 'Descompilador nativo em Rust. Engenharia reversa de interfaces PE/ELF e reconstrução de grafo de fluxo de controle (CFG).',
      },
      'vulnforge-mcp': {
        label: 'SEGURANÇA MICRO-VM',
        summary: 'Isolamento em Micro-VM (Firecracker e gVisor) com atestação de cadeia de suprimentos SLSA Nível 3.',
      },
      'vibeside-mcp': {
        label: 'PERFILADOR E COFRE DPAPI',
        summary: 'Perfilador de vazamento de memória em heap e visualizador de árvore com cofre isolado por hardware Windows DPAPI.',
      },
      'webarcheology-mcp': {
        label: 'FORENSE WEB',
        summary: 'Forense de artefatos web, rastreamento temporal de mutações DOM e evasão de fingerprinting de navegadores.',
      },
      'remote-auto-ai-worker': {
        label: 'DISTRIBUIDOR DE TAREFAS',
        summary: 'Distribuidor de tarefas distribuído e motor de fluxo de eventos em tempo real com AsyncIO, ZeroMQ e webhooks.',
      },
      'vidcompact-mcp': {
        label: 'MÍDIA POR HARDWARE',
        summary: 'Transcodificação de vídeo acelerada por hardware NVENC/FFmpeg sem perdas com supressão de artefatos visuais.',
      },
      'omni-audio-mcp': {
        label: 'DECODIFICADOR CHIPTUNE',
        summary: 'Decodificador de módulos chiptune (.xm/.mod), transmissão de áudio de ultrabaixa latência e watchdog contra loops infinitos.',
      },
      omnibrowse: {
        label: 'RUNTIME STEALTH',
        summary: 'Navegação stealth contra detecção e ponte de sequestro de protocolo Chromium CDP.',
      },
      'omni-control-mcp': {
        label: 'CICLO DE VIDA DO CLUSTER',
        summary: 'Gerenciamento do ciclo de vida e integridade dos processos do cluster, sincronização de estado distribuído e garantia de zero zumbi.',
      },
    },
  },
};

export class I18nManager {
  private static readonly STORAGE_KEY = 'krc_lang_pref';
  private currentLang: LanguageCode = 'ko';
  private listeners: Array<(lang: LanguageCode) => void> = [];

  public init(): void {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang') as LanguageCode | null;
    const stored = localStorage.getItem(I18nManager.STORAGE_KEY) as LanguageCode | null;

    const initial = this.isValid(urlLang)
      ? (urlLang as LanguageCode)
      : this.isValid(stored)
      ? (stored as LanguageCode)
      : this.detectBrowserLang();

    this.setLanguage(initial, false);
    this.bindEvents();
  }

  public setLanguage(lang: LanguageCode, triggerListeners = true): void {
    if (!this.isValid(lang)) return;

    this.currentLang = lang;
    localStorage.setItem(I18nManager.STORAGE_KEY, lang);
    document.documentElement.lang = lang;

    this.updateDom();
    this.updateControls();

    if (triggerListeners) {
      this.listeners.forEach((fn) => fn(lang));
    }
  }

  public getLanguage(): LanguageCode {
    return this.currentLang;
  }

  public getTranslation(): TranslationSchema {
    return TRANSLATIONS[this.currentLang] || TRANSLATIONS.ko;
  }

  public onChange(listener: (lang: LanguageCode) => void): void {
    this.listeners.push(listener);
  }

  private isValid(lang: string | null): boolean {
    return !!lang && lang in TRANSLATIONS;
  }

  private detectBrowserLang(): LanguageCode {
    const nav = navigator.language?.toLowerCase() || '';
    if (nav.startsWith('ko')) return 'ko';
    if (nav.startsWith('ja')) return 'ja';
    if (nav.startsWith('zh')) return 'zh';
    if (nav.startsWith('de')) return 'de';
    if (nav.startsWith('fr')) return 'fr';
    if (nav.startsWith('es')) return 'es';
    if (nav.startsWith('ru')) return 'ru';
    if (nav.startsWith('hi')) return 'hi';
    if (nav.startsWith('pt')) return 'pt';
    return 'ko'; // Default Korean per user rules
  }

  private updateDom(): void {
    const t = this.getTranslation();

    const elements = document.querySelectorAll<HTMLElement>('[data-i18n]');
    elements.forEach((el) => {
      const key = el.getAttribute('data-i18n') as keyof TranslationSchema;
      const val = t[key];
      if (typeof val === 'string') {
        el.textContent = val;
      }
    });

    const searchInput = document.getElementById('systemSearch') as HTMLInputElement | null;
    if (searchInput) {
      searchInput.placeholder = t.searchPlaceholder;
    }
  }

  private updateControls(): void {
    const triggerLabel = document.getElementById('langTriggerLabel');
    if (triggerLabel) {
      const meta = LANGUAGE_META[this.currentLang];
      triggerLabel.textContent = meta.nativeName;
    }

    const items = document.querySelectorAll<HTMLButtonElement>('.lang-item');
    items.forEach((item) => {
      const code = item.getAttribute('data-lang-val') as LanguageCode;
      if (code === this.currentLang) {
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      }
    });
  }

  private bindEvents(): void {
    const trigger = document.getElementById('langTrigger');
    const menu = document.getElementById('langMenu');

    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        this.closeAllMenus();
        if (!isOpen) {
          menu.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }

    const items = document.querySelectorAll<HTMLButtonElement>('.lang-item');
    items.forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang-val') as LanguageCode;
        if (lang) {
          this.setLanguage(lang);
          menu?.classList.remove('open');
          trigger?.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('click', () => {
      this.closeAllMenus();
    });
  }

  private closeAllMenus(): void {
    const langMenu = document.getElementById('langMenu');
    const langTrigger = document.getElementById('langTrigger');
    if (langMenu) langMenu.classList.remove('open');
    if (langTrigger) langTrigger.setAttribute('aria-expanded', 'false');
  }
}
