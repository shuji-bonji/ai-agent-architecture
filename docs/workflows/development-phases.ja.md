# 開発フェーズ × MCP対応

> システム・アプリケーション開発の各フェーズで活用できるMCPを整理する。

## このドキュメントについて

ソフトウェア開発は「戦略・企画 → 要件定義 → 設計 → 実装 → テスト → 運用」というフェーズで進む。AI駆動開発では、各フェーズで適切なMCPを活用することで、品質と効率の両方を向上させることができる。

このドキュメントでは、各開発フェーズで利用可能なMCP、まだ構築されていない領域、今後の優先構築候補を整理する。「このフェーズでAIを活用したいが、何を使えばいいか」という問いに対する実践的な回答を提供する。

## 開発フェーズ全体像

```mermaid
flowchart LR
    P1[戦略・企画] --> P2[要件定義]
    P2 --> P3[設計]
    P3 --> P4[実装]
    P4 --> P5[テスト]
    P5 --> P6[運用]

    P6 -.->|フィードバック| P1
```

## フェーズ1: 戦略・企画

### 概要

ビジネス目標の設定、実現可能性調査、プロダクト戦略の策定。

### MCP活用

| タスク   | MCP                     | 機能               | 状況    |
| -------- | ----------------------- | ------------------ | ------- |
| 市場調査 | Market Research MCP     | 市場規模データ取得 | 📋 構想 |
| 競合分析 | Competitor Analysis MCP | 競合製品比較       | 📋 構想 |
| ROI計算  | Financial Modeling MCP  | TCO算出            | 📋 構想 |

### 現状

このフェーズのMCPは未構築。Web検索やClaude自体の分析能力で代替。

## フェーズ2: 要件定義

### 概要

機能要件・非機能要件の収集と整理。

### MCP活用

| タスク       | MCP            | 機能                  | 状況      |
| ------------ | -------------- | --------------------- | --------- |
| RFC要件確認  | **rfcxml-mcp** | MUST/SHOULD/MAY抽出   | ✅ 構築済 |
| Web標準確認  | **w3c-mcp**    | WebIDL、CSS、HTML仕様 | ✅ 構築済 |
| 法令要件確認 | **hourei-mcp** | 法令条文取得          | ✅ 利用可 |
| API仕様確認  | OpenAPI MCP    | 仕様検証              | 📋 構想   |

### 具体例

```mermaid
sequenceDiagram
    participant PM as プロダクトマネージャー
    participant Claude as Claude + MCPs
    participant RFC as rfcxml-mcp
    participant Law as hourei-mcp

    PM->>Claude: WebSocket機能の要件をまとめて
    Claude->>RFC: get_requirements(6455)
    RFC-->>Claude: 75 MUST, 23 SHOULD
    Claude->>Law: 通信に関する法的要件は？
    Law-->>Claude: 電気通信事業法の関連条文
    Claude-->>PM: 技術要件 + 法的考慮事項
```

## フェーズ3: 設計

### 概要

アーキテクチャ設計、詳細設計、API設計。

### MCP活用

| タスク       | MCP                 | 機能                | 状況      |
| ------------ | ------------------- | ------------------- | --------- |
| 設計パターン | Design Pattern MCP  | パターン提案        | 📋 構想   |
| ADR生成      | ADR Generator MCP   | 決定記録生成        | 📋 構想   |
| DB設計       | Schema Designer MCP | ER図生成            | 📋 構想   |
| 図表生成     | **mermaid-mcp**     | Mermaidダイアグラム | ✅ 利用可 |
| API設計検証  | OpenAPI MCP         | 仕様検証            | 📋 構想   |

### 現状

設計パターン系MCPは未構築。Skillとして「設計パターン集」を定義する方が適切かもしれない。

### Skill代替例

```markdown
<!-- .claude/skills/design-patterns/SKILL.md -->

# 設計パターン集

## アーキテクチャパターン

- Clean Architecture
- Hexagonal Architecture
- CQRS + Event Sourcing

## GoFパターン（抜粋）

- Factory Method
- Observer
- Strategy
  ...
```

## フェーズ4: 実装

### 概要

コーディング、API実装、フロントエンド/バックエンド開発。

### MCP活用

| タスク           | MCP                   | 機能                   | 状況      |
| ---------------- | --------------------- | ---------------------- | --------- |
| ドキュメント検索 | Context7              | ライブラリドキュメント | ✅ 利用可 |
| Svelte開発       | **svelte-mcp**        | Svelte/SvelteKit支援   | ✅ 利用可 |
| UIコンポーネント | **shadcn-svelte-mcp** | UIコンポーネント       | ✅ 利用可 |
| RxJS開発         | **rxjs-mcp-server**   | ストリーム実行・分析   | ✅ 構築済 |
| 座標系参照       | **epsg-mcp**          | EPSG座標系             | ✅ 構築済 |
| Angular開発      | Angular MCP           | Angular支援            | 📋 構想   |

### 具体例：RxJS実装フロー

```mermaid
sequenceDiagram
    participant Dev as 開発者
    participant Claude as Claude
    participant RxJS as rxjs-mcp

    Dev->>Claude: このRxJSコードの動作を確認して
    Claude->>RxJS: execute_stream(code)
    RxJS-->>Claude: 実行結果 + タイムライン
    Claude->>RxJS: analyze_operators(code)
    RxJS-->>Claude: パフォーマンス分析
    Claude->>RxJS: detect_memory_leak(code)
    RxJS-->>Claude: リーク検出結果
    Claude-->>Dev: 動作確認 + 改善提案
```

## フェーズ5: テスト・品質保証

### 概要

単体テスト、統合テスト、品質評価。

### MCP活用

| タスク       | MCP                   | 機能                   | 状況      |
| ------------ | --------------------- | ---------------------- | --------- |
| 翻訳品質評価 | **xcomet-mcp-server** | 品質スコア、エラー検出 | ✅ 構築済 |
| テスト生成   | Test Generator MCP    | テストコード生成       | 📋 構想   |
| セキュリティ | OWASP MCP             | 脆弱性チェック         | 📋 構想   |
| RFC準拠確認  | **rfcxml-mcp**        | validate_statement     | ✅ 構築済 |

### 具体例：翻訳品質テスト

```mermaid
flowchart TB
    SOURCE[原文] --> TRANSLATE[翻訳]
    TRANSLATE --> EVAL[xcomet:xcomet_evaluate]
    EVAL --> CHECK{スコア >= 0.85?}
    CHECK -->|Yes| PASS[✅ 合格]
    CHECK -->|No| FAIL[❌ 要修正]
    FAIL --> ERRORS[xcomet:xcomet_detect_errors]
    ERRORS --> FIX[修正箇所特定]
```

## フェーズ6: 運用・保守

### 概要

デプロイ、監視、インシデント対応、継続改善。

### MCP活用

| タスク       | MCP                    | 機能          | 状況    |
| ------------ | ---------------------- | ------------- | ------- |
| IaC生成      | IaC Generator MCP      | Terraform生成 | 📋 構想 |
| パイプライン | Pipeline Generator MCP | CI/CD設定     | 📋 構想 |
| 監視設定     | Monitoring Config MCP  | 監視設定生成  | 📋 構想 |

### 現状

運用系MCPは未構築。クラウドプロバイダー固有のMCPが存在する場合はそちらを利用。

## 横断的活動

### ドキュメンテーション

| タスク   | MCP             | 状況      |
| -------- | --------------- | --------- |
| 図表生成 | **mermaid-mcp** | ✅ 利用可 |
| 翻訳     | **deepl-mcp**   | ✅ 利用可 |
| 品質確認 | **xcomet-mcp**  | ✅ 構築済 |

### セキュリティ

| タスク    | MCP         | 状況    |
| --------- | ----------- | ------- |
| OWASP確認 | OWASP MCP   | 📋 構想 |
| CVE検索   | CVE/NVD MCP | 📋 構想 |

### 法令遵守

| タスク   | MCP            | 状況      |
| -------- | -------------- | --------- |
| 法令検索 | **hourei-mcp** | ✅ 利用可 |
| GDPR確認 | GDPR MCP       | 📋 構想   |

## フェーズ × MCP マトリックス

| フェーズ   | 構築済MCP                  | 構想中MCP                           |
| ---------- | -------------------------- | ----------------------------------- |
| 戦略・企画 | -                          | Market Research, Financial Modeling |
| 要件定義   | rfcxml, w3c, hourei        | OpenAPI                             |
| 設計       | mermaid                    | Design Pattern, ADR Generator       |
| 実装       | rxjs, svelte, shadcn, epsg | Angular, Context7連携強化           |
| テスト     | xcomet, rfcxml             | Test Generator, OWASP               |
| 運用       | -                          | IaC Generator, Pipeline Generator   |

## 優先的に構築すべきMCP

### 現在の強みを活かす

1. **OpenAPI MCP** - API設計・検証（要件定義〜設計〜テスト横断）
2. **OWASP MCP** - セキュリティ（設計〜テスト横断）
3. **Angular MCP** - 専門領域の実装支援

### ギャップを埋める

1. 設計フェーズのパターン系 → **Skillで代替可能**
2. 運用フェーズのIaC系 → 優先度低（既存ツールで代替）

## 推奨アプローチ

```mermaid
graph TB
    subgraph 構築済み活用
        RFC[rfcxml-mcp]
        W3C[w3c-mcp]
        XCOMET[xcomet-mcp]
        RXJS[rxjs-mcp]
    end

    subgraph Skill補完
        PATTERN[設計パターンSkill]
        WORKFLOW[ワークフローSkill]
    end

    subgraph 次に構築
        OPENAPI[OpenAPI MCP]
        OWASP[OWASP MCP]
    end

    RFC --> 要件定義
    W3C --> 要件定義
    XCOMET --> テスト
    RXJS --> 実装

    PATTERN --> 設計
    WORKFLOW --> 全フェーズ

    OPENAPI --> 設計
    OWASP --> テスト
```

### 原則

1. **構築済みMCPを最大限活用**
2. **静的知識はSkillで補完**
3. **ギャップは優先度を見て順次構築**
