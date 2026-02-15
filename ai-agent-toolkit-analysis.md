# AI Agent Toolkit 構造分析レポート

> 59ファイル（.git除く）を横断分析し、プロジェクトの構造・テーマ・ギャップを可視化する。

## 基本情報

| 項目                 | 値                                                       |
| -------------------- | -------------------------------------------------------- |
| **総ファイル数**     | 59（.git除く）                                           |
| **日付範囲**         | 2026年1月中旬 〜 2026年2月8日                            |
| **コンテンツ種別**   | Markdown（日英バイリンガル）、テンプレート、設定ファイル |
| **ドキュメント構造** | v2リストラクチャリング済み                               |
| **Gitリポジトリ**    | あり（コミット履歴管理中）                               |

## ドキュメント構成マップ

```mermaid
graph TB
    ROOT["ai-agent-toolkit/"]

    subgraph Concepts["docs/concepts/ — 思想・理論"]
        C1["01-vision<br/>AI駆動開発のビジョン"]
        C2["02-reference-sources<br/>ブレない参照先の体系"]
        C3["03-architecture<br/>MCP/Skills/Agentの構成論"]
    end

    subgraph MCP_Docs["docs/mcp/ — 外部連携"]
        M1["catalog<br/>構築済みMCPカタログ"]
        M2["security<br/>セキュリティ考慮"]
        M3["development<br/>🔴 計画中（未作成）"]
    end

    subgraph Skills_Docs["docs/skills/ — ドメイン知識"]
        S1["overview<br/>Vercel Skills概要"]
        S2["vs-mcp<br/>MCP vs Skills選択判断"]
        S3["anti-patterns<br/>アンチパターン集"]
        S4["creating-skills<br/>🔴 計画中（未作成）"]
    end

    subgraph Workflows_Docs["docs/workflows/ — ワークフロー"]
        W1["patterns<br/>連携パターン8種"]
        W2["development-phases<br/>開発フェーズ × MCP"]
    end

    subgraph Planning["docs/ — 計画・参考"]
        P1["roadmap<br/>優先度・ロードマップ"]
        P2["outputs<br/>実績・アウトプット一覧"]
        P3["glossary<br/>用語集"]
        P4["translation-quality-report<br/>翻訳品質レポート"]
    end

    subgraph Templates["templates/"]
        T1["skill/<br/>Skill定義テンプレート"]
        T2["command/<br/>Commandテンプレート"]
    end

    subgraph References["references/"]
        R1["links.md<br/>参考リンク"]
        R2["skills/links.md<br/>Skills関連リンク"]
    end

    subgraph Other["その他"]
        O1["README.md / README.ja.md"]
        O2["discussion.md<br/>🟡 空ファイル（0バイト）"]
        O3["LICENSE"]
        O4["configuring_everything-claude-code.md<br/>🟡 非標準拡張子"]
    end

    ROOT --> Concepts
    ROOT --> MCP_Docs
    ROOT --> Skills_Docs
    ROOT --> Workflows_Docs
    ROOT --> Planning
    ROOT --> Templates
    ROOT --> References
    ROOT --> Other

    style M3 fill:#ff6b6b,color:#fff
    style S4 fill:#ff6b6b,color:#fff
    style O2 fill:#feca57,color:#333
    style O4 fill:#feca57,color:#333
```

## パターン1: 「ブレない参照先」— プロジェクトの思想的基盤

プロジェクト全体を貫く最も強いテーマ。12ファイル以上で繰り返し言及されている。

```mermaid
mindmap
  root((ブレない参照先<br/>Authoritative<br/>Reference Source))
    5つの特性
      権威性
      不変性・版管理
      構造化
      検証可能性
      アクセス可能性
    4層の階層
      L1 国際標準・法規制
      L2 業界標準・デファクト
      L3 組織・プロジェクト規約
      L4 ベストプラクティス
    MCPによる実現
      rfcxml-mcp
      w3c-mcp
      hourei-mcp
      pdf-spec-mcp
    Skillsによる実現
      ドメイン知識
      ワークフロー定義
      コーディング規約
```

### 具体的な登場箇所

| ドキュメント                 | 文脈                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| `01-vision.ja.md`            | 核心メッセージとして定義：「AIの判断にはブレない参照先が必要」 |
| `02-reference-sources.ja.md` | 680行にわたる体系的解説（5特性・4層モデル・判定基準）          |
| `03-architecture.ja.md`      | MCPとSkillsを「ブレない参照先」を実現する2手段として位置づけ   |
| `README.ja.md`               | リポジトリ冒頭で「MCPだけでは不十分」と宣言                    |
| `catalog.ja.md`              | 各MCPが「ブレない参照先」のどの層に対応するか整理              |
| `security.ja.md`             | OWASP MCP Top 10を「ブレない参照先」として活用                 |

## パターン2: MCP / Skills / Agent 三層アーキテクチャ

プロジェクトの構造的骨格。「何をどのレイヤーで実装するか」の判断基準が一貫して示されている。

```mermaid
block-beta
    columns 2

    block:LAYER:1
        columns 1
        AGENT["🧠 Agent層\nオーケストレーション・判断\n（Claude Code, Cursor）"]
        SKILLS["📚 Skills層\nドメイン知識・ガイドライン\n（Markdown, 静的参照）"]
        MCP_L["🔧 MCP層\n外部ツール・API連携\n（サーバープロセス, JSON-RPC）"]
    end

    block:DECISIONS:1
        columns 1
        D1["外部APIが必要？ → MCP"]
        D2["ドメイン知識？ → Skill"]
        D3["複雑なオーケストレーション？\n→ Agent/サブエージェント"]
        D4["公式CLIがある？\n→ CLI + Skill"]
    end

    AGENT --> SKILLS
    SKILLS --> MCP_L

    style AGENT fill:#87CEEB,color:#333,stroke:#333
    style SKILLS fill:#90EE90,color:#333,stroke:#333
    style MCP_L fill:#FFB6C1,color:#333,stroke:#333
```

### 具体的な登場箇所

| ドキュメント               | 役割                                                 |
| -------------------------- | ---------------------------------------------------- |
| `03-architecture.ja.md`    | 構成論の詳細（MCP/A2A/Skill/サブエージェント比較）   |
| `vs-mcp.ja.md`             | MCP vs Skills の本質的な違いと選択判断フロー         |
| `anti-patterns.ja.md`      | over-MCPization / over-Skillization のアンチパターン |
| `development-phases.ja.md` | 開発フェーズごとにどの層を使うか整理                 |
| `README.ja.md`             | 冒頭の比較表で概要提示                               |

## パターン3: 翻訳ワークフローの確立

DeepL + xCOMET による翻訳品質保証は、最も具体的な成功事例として繰り返し語られている。

```mermaid
flowchart TB
    subgraph Workflow["翻訳ワークフロー（実証済み）"]
        direction LR
        A["原文"] --> B["deepl:translate-text<br/>formality: more"]
        B --> C["xcomet:evaluate<br/>品質スコア算出"]
        C --> D{スコア ≧ 0.85?}
        D -->|Yes| E["xcomet:detect_errors"]
        D -->|No| B
        E --> F["完成"]
    end

    subgraph Results["実績"]
        direction TB
        R1["180ページ / 150万文字"]
        R2["1日で完了"]
        R3["コスト: $12"]
        R4["従来比 1/100以下"]
    end

    Workflow --> Results

    style Results fill:#90EE90,color:#333
```

### 具体的な登場箇所

| ドキュメント      | 文脈                                                           |
| ----------------- | -------------------------------------------------------------- |
| `patterns.ja.md`  | パターン1（技術文書翻訳）・パターン2（大規模バッチ）として定義 |
| `catalog.ja.md`   | xcomet-mcp-server と deepl-mcp の連携として記述                |
| `outputs.ja.md`   | RFC 6455日本語訳・大規模翻訳の成果数値                         |
| `roadmap.ja.md`   | 翻訳ワークフローSkill作成がPhase 1タスク                       |
| `01-vision.ja.md` | AI→人間の知識変換例として言及                                  |

## パターン4: 「知識の民主化」— 社会的ビジョン

技術的手段を超えた社会的価値観として、プロジェクト全体の動機を形成している。

```mermaid
graph LR
    subgraph Before["従来"]
        EXP["専門家"] -->|"高コスト<br/>一方通行<br/>言語障壁"| DEV["一般開発者"]
    end

    subgraph After["MCPが実現する世界"]
        SRC["権威ある情報源<br/>RFC / 法令 / W3C"] -->|"MCP化"| AI["AI"]
        KNOW["ドメイン知識<br/>設計原則 / 規約"] -->|"Skill化"| AI
        AI -->|"誰でも理解可能な形で"| EVERYONE["すべての開発者"]
    end

    Before -->|"MCP/Skills導入"| After

    style Before fill:#ff9999,color:#333
    style After fill:#90EE90,color:#333
```

### 具体的な登場箇所

| ドキュメント                 | 文脈                                                    |
| ---------------------------- | ------------------------------------------------------- |
| `01-vision.ja.md`            | 「知識の民主化」セクションで体系的に解説                |
| `02-reference-sources.ja.md` | 参照先MCPの価値として「知識へのアクセスが民主化される」 |
| `roadmap.ja.md`              | 発信戦略の記事テーマ「知識の民主化 — MCPの本質的価値」  |
| `outputs.ja.md`              | 翻訳成果を「民主化」の具体例として位置づけ              |

## パターン5: 実証ベースの成長サイクル

ドキュメント群全体に「参照→実践→新知見→別リポジトリ化→ポインタ追加」という成長パターンが見られる。

```mermaid
graph TB
    subgraph Cycle["成長サイクル"]
        REF["参照<br/>（RFC/法令/標準）"] --> PRACTICE["実践<br/>（MCP構築・翻訳）"]
        PRACTICE --> INSIGHT["新知見<br/>（パターン・アンチパターン）"]
        INSIGHT --> REPO["別リポジトリ化<br/>（npm公開）"]
        REPO --> POINTER["ポインタ追加<br/>（このリポジトリに記録）"]
        POINTER --> REF
    end

    subgraph Evidence["成果の軌跡"]
        E1["2024<br/>rfcxml-mcp, xcomet-mcp 構築開始"]
        E2["2025 Q1<br/>RFC 6455日本語訳, websocket-guide"]
        E3["2025 Q2-Q4<br/>w3c-mcp, epsg-mcp, rxjs-mcp"]
        E4["2026 Q1<br/>pdf-spec-mcp, pdf-reader-mcp<br/>npm 6パッケージ達成"]
    end

    E1 --> E2 --> E3 --> E4

    style Cycle fill:#f0f0ff,color:#333
    style Evidence fill:#f0fff0,color:#333
```

## ギャップ分析

プロジェクトの構造から特定できる未完了・不整合な部分。

```mermaid
graph TB
    subgraph Critical["🔴 計画中だが未作成"]
        G1["docs/mcp/development.md<br/>MCP開発ガイド"]
        G2["docs/skills/creating-skills.md<br/>Skills作成ガイド"]
    end

    subgraph Warning["🟡 メンテナンス必要"]
        G3["discussion.md<br/>0バイト（空ファイル）"]
        G4["configuring_everything-claude-code.md<br/>非標準拡張子 .imd"]
        G5["roadmap.ja.md の日付<br/>2025年ベースのまま"]
    end

    subgraph Todo["📋 ロードマップ上の未達成"]
        G6["Skill/Agent定義 3個以上<br/>（Phase 1目標・未達成）"]
        G7["Note記事 5本以上<br/>（Phase 2目標・未達成）"]
        G8["GitHub Star 合計 10以上<br/>（Phase 2目標・未達成）"]
        G9["コミュニティからの認知<br/>（Phase 3目標・未達成）"]
    end

    subgraph Structural["🔵 構造的ギャップ"]
        G10["戦略・企画フェーズのMCP<br/>ゼロ（構想のみ）"]
        G11["運用・保守フェーズのMCP<br/>ゼロ（構想のみ）"]
        G12["Skillの実装例<br/>translation-quality のみ<br/>目標3個に未到達"]
    end

    style Critical fill:#ff6b6b,color:#fff
    style Warning fill:#feca57,color:#333
    style Todo fill:#dfe6e9,color:#333
    style Structural fill:#74b9ff,color:#333
```

### ギャップ詳細

| カテゴリ     | 項目                        | 影響度 | 対策案                                                                                             |
| ------------ | --------------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| 未作成       | `mcp/development.md`        | 中     | MCP開発の実践知を蓄積しているので、既存知見からまとめられる                                        |
| 未作成       | `skills/creating-skills.md` | 高     | Skills推進の障壁。テンプレートは存在するので接続が必要                                             |
| 空ファイル   | `discussion.md`             | 低     | 用途を明確化するか、削除して整理                                                                   |
| 非標準       | `.imd` 拡張子               | 低     | `.md` にリネームすべき                                                                             |
| ロードマップ | 日付が2025年ベース          | 中     | 現在2026年。Phase 1/2のタイムラインを更新すべき                                                    |
| 実装不足     | Skill/Agent定義             | 中     | `.claude/skills/translation-quality/` に1つ実装あり。ただしロードマップ目標の「3個以上」には未到達 |
| カバレッジ   | 戦略・運用フェーズ          | 低     | 本プロジェクトのスコープ外と明言されているが、意識はしておく                                       |

## ドキュメント間の関連性マップ

```mermaid
graph TB
    VISION["01-vision<br/>🎯 思想的基盤"]
    REF["02-reference-sources<br/>📖 参照先の体系"]
    ARCH["03-architecture<br/>🏗️ 構成論"]

    CATALOG["catalog<br/>📦 MCPカタログ"]
    SECURITY["security<br/>🔒 セキュリティ"]

    OVERVIEW["overview<br/>📋 Skills概要"]
    VSMCP["vs-mcp<br/>⚖️ 選択判断"]
    ANTI["anti-patterns<br/>⚠️ アンチパターン"]

    PATTERNS["patterns<br/>🔄 連携パターン"]
    PHASES["development-phases<br/>📅 フェーズ対応"]

    ROADMAP["roadmap<br/>🗺️ ロードマップ"]
    OUTPUTS["outputs<br/>📊 実績"]
    GLOSSARY["glossary<br/>📖 用語集"]

    VISION -->|"思想を定義"| REF
    VISION -->|"構造を定義"| ARCH
    REF -->|"参照先をMCP化"| CATALOG
    ARCH -->|"レイヤー判断"| VSMCP
    ARCH -->|"サブエージェント"| PATTERNS

    CATALOG -->|"セキュリティ"| SECURITY
    CATALOG -->|"ワークフロー"| PATTERNS

    OVERVIEW -->|"判断基準"| VSMCP
    VSMCP -->|"失敗例"| ANTI
    VSMCP -->|"フェーズ適用"| PHASES

    PATTERNS -->|"実績"| OUTPUTS
    PHASES -->|"優先度"| ROADMAP
    OUTPUTS -->|"次計画"| ROADMAP

    GLOSSARY -.->|"用語定義"| VISION
    GLOSSARY -.->|"用語定義"| ARCH
    GLOSSARY -.->|"用語定義"| CATALOG

    style VISION fill:#ff6b6b,color:#fff
    style REF fill:#ff6b6b,color:#fff
    style ARCH fill:#ff6b6b,color:#fff
    style CATALOG fill:#FFB6C1,color:#333
    style PATTERNS fill:#87CEEB,color:#333
    style ROADMAP fill:#feca57,color:#333
```

## 日英バイリンガル構成の網羅性

```mermaid
graph LR
    subgraph 完備["✅ 日英両方あり（28ファイル）"]
        direction TB
        B1["README"]
        B2["concepts/ 3ファイル"]
        B3["mcp/ 2ファイル"]
        B4["skills/ 4ファイル"]
        B5["workflows/ 2ファイル"]
        B6["roadmap, outputs, glossary"]
        B7["translation-quality-report"]
    end

    subgraph EnOnly["🔵 英語のみ"]
        E1["docs/README.md<br/>（日本語版あり）"]
        E2["reference-selection-checklist.md"]
    end

    subgraph JaOnly["🟠 日本語のみ"]
        J1["なし（すべて英語版あり）"]
    end

    subgraph Neither["🔴 未翻訳"]
        N1["configuring_everything-claude-code.md"]
    end

    style 完備 fill:#90EE90,color:#333
    style EnOnly fill:#74b9ff,color:#333
    style Neither fill:#ff6b6b,color:#333
```

バイリンガル対応は非常に良好。ほぼ全ファイルが日英両方存在する。

## 総合評価

```mermaid
quadrantChart
    title プロジェクト領域の成熟度
    x-axis "ドキュメント充実度 低" --> "高"
    y-axis "実装/実績 低" --> "高"
    quadrant-1 "強み（理論＋実績あり）"
    quadrant-2 "伸びしろ（実績先行）"
    quadrant-3 "手薄"
    quadrant-4 "理論先行"

    "翻訳ワークフロー": [0.85, 0.90]
    "ブレない参照先の理論": [0.95, 0.70]
    "MCPカタログ": [0.80, 0.85]
    "MCP/Skills選択論": [0.90, 0.60]
    "セキュリティ": [0.75, 0.40]
    "Skill定義の実践": [0.30, 0.15]
    "サブエージェント活用": [0.50, 0.20]
    "発信・コミュニティ": [0.40, 0.25]
    "開発フェーズ整理": [0.70, 0.50]
```

### まとめ

このプロジェクトは「AI駆動開発の基盤となるブレない参照先の構築戦略」というビジョンが極めて明確で、理論（concepts/）→手段（mcp/, skills/）→実践（workflows/）→実績（outputs/）→計画（roadmap/）という流れがきれいに整理されています。

**最大の強み**: 理論と実績の両方が揃っている翻訳ワークフロー、MCPカタログの充実度、MCP/Skills/Agent三層モデルの論理的整合性。

**最大のギャップ**: Skills/サブエージェントの理論は充実しているが、実装は `translation-quality` Skill の1つのみ。テンプレート・アンチパターン・8つの連携パターンが揃っているのに、実際の `.claude/skills/` と `.claude/agents/` がほぼ空。ロードマップ目標の「3個以上」に未到達。

_分析日: 2026年2月11日 | 対象: ai-agent-toolkit リポジトリ全59ファイル_
