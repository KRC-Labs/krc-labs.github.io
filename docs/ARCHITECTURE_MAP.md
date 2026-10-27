# KRC Labs Showcase — 아키텍처 매핑 (docs/ARCHITECTURE_MAP.md)

## 1. 컴포넌트 간 상호작용 및 데이터 흐름

```mermaid
graph TD
    User["사용자 입력 (마우스 / 터치 / 키보드)"] --> DomEvents["DOM 이벤트 리스너"]
    
    subgraph StateManagers["코어 상태 관리자 & 플로팅 윈도우 엔진"]
        I18n["I18nManager (10개국어 동기화)"]
        Theme["ThemeDropdown (6대 테마 제어)"]
        FloatingBase["FloatingWindow (공통 이동·리사이즈·접기 엔진)"]
        CustomModal["CustomThemeModal (커스텀 팔레트 스튜디오 GUI)"]
        Help["HelpModal (독립 플로팅 시스템 가이드 GUI)"]
        ScrollTop["ScrollTopButton (드래그 & 핀 고정 FAB)"]
    end
    
    FloatingBase -->|상속 extends| CustomModal
    FloatingBase -->|상속 extends| Help
    
    subgraph UIComponents["독립 UI 뷰 컴포넌트"]
        HeaderComp["Header"]
        FilterComp["CategoryFilter"]
        GridComp["SystemsGrid (10대 시스템)"]
        FooterComp["Footer"]
    end
    
    DomEvents --> StateManagers
    I18n -->|setLanguage| UIComponents
    I18n -->|setLanguage| CustomModal
    I18n -->|setLanguage| Help
    Theme -->|setTheme| DocumentElement["document.documentElement (data-theme)"]
    CustomModal -->|applyPalette| DocumentElement
    FilterComp -->|onFilterChange| GridComp
```

## 2. 상태 저장소 영속성 매핑 (localStorage)

| 키(Key) | 기본값 | 설명 및 영속성 보장 정책 |
| :--- | :--- | :--- |
| `krc_lang` | `ko` | 선택된 언어 코드 (ko, en, ja, zh, de, fr, es, ru, hi, pt) |
| `krc_theme_pref` | `system` | 사용자 선호 테마 (dark, forest, sage, paper, custom, system) |
| `krc_custom_theme` | `{}` | 커스텀 테마 색상 팔레트 JSON (bg, surface, accent, textPrimary 등) |
| `krc_custom_win_pos`| `{}` | 커스텀 테마 플로팅 윈도우 좌표 및 크기 (left, top, width, height, collapsed) |
| `krc_help_win_pos`  | `{}` | 도움말 플로팅 윈도우 좌표 및 크기 (left, top, width, height, collapsed) |
| `krc_scroll_btn_pos`| `{}` | 맨 위로 FAB 플로팅 버튼의 화면 좌표 (left, top) |
| `krc_scroll_btn_pinned`| `false`| 맨 위로 FAB 버튼의 위치 고정 여부 (우클릭 / 롱프레스) |

## 3. 스타일 시스템 계층 구조

```mermaid
graph LR
    Main["styles/main.css"] --> ThemeCSS["theme.css (컬러 변수, 트랜지션)"]
    Main --> TypoCSS["typography.css (폰트 스택, 타이포그래피)"]
    Main --> LayoutCSS["layout.css (컨테이너, 그리드, 반응형 브레이크포인트)"]
    Main --> CompCSS["components.css (헤더, 모달, GUI창, FAB)"]
```
