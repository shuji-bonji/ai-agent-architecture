# 複合構成パターン

> MCP × Skill × Agent の組み合わせパターンと設計指針を整理する。

[English](./composition-patterns.md)

## このドキュメントについて

MCP単体、Skill単体でも価値はあるが、**組み合わせることで初めて発揮される価値**がある。本ドキュメントでは、4つの複合構成パターンを定義し、それぞれの設計指針・発動コンテキスト・活用事例を整理する。

MCP構築戦略は [mcp-roadmap.md](./mcp-roadmap)、Skill構築戦略は [skill-roadmap.md](./skill-roadmap) を参照。

## 4つの複合構成パターン

```mermaid
flowchart TB
    subgraph PATTERNS["複合構成の4パターン"]
        direction TB
        subgraph P1["パターン1: MCP + Skill"]
            P1_D["MCPが取得したデータを<br>Skillの判断基準で評価する"]
        end
        subgraph P2["パターン2: MCPs（複数MCP連携）"]
            P2_D["複数MCPの出力を<br>統合・比較・検証する"]
        end
        subgraph P3["パターン3: Skills（複数Skill組み合わせ）"]
            P3_D["コンテキスト別に<br>複数Skillを同時発動する"]
        end
        subgraph P4["パターン4: MCPs + Skills（完全統合）"]
            P4_D["複数MCPと複数Skillが<br>協調するワークフロー"]
        end
    end

    style P1 fill:#FFD700,stroke:#F9A825,color:#333
    style P2 fill:#FFB6C1,stroke:#C62828,color:#333
    style P3 fill:#90EE90,stroke:#2E7D32,color:#333
    style P4 fill:#E3F2FD,stroke:#1565C0,color:#333
```

| パターン          | 構成                  | 核心                  | 難易度 |
| ----------------- | --------------------- | --------------------- | ------ |
| **MCP + Skill**   | 1 MCP + 1 Skill       | データ取得 + 判断基準 | ★★☆    |
| **MCPs**          | 複数 MCP              | データの統合・比較    | ★★☆    |
| **Skills**        | 複数 Skill            | 知識の重ね合わせ      | ★☆☆    |
| **MCPs + Skills** | 複数 MCP + 複数 Skill | 完全なワークフロー    | ★★★    |

## パターン1: MCP + Skill

MCPが外部から取得した「生データ」を、Skillが持つ「判断基準」で評価する構成。**ハイブリッド構成**の基本形。

### 設計原則

```mermaid
flowchart LR
    MCP["MCP<br>（データ取得）"]
    SKILL["Skill<br>（判断基準）"]
    RESULT["評価結果"]

    MCP -->|"構造化データ"| SKILL
    SKILL -->|"基準を適用"| RESULT

    style MCP fill:#FFB6C1,color:#333
    style SKILL fill:#90EE90,color:#333
```

MCPは「何が書いてあるか」を返し、Skillは「それが良いか悪いか」を判断する。この分離が重要。

### 具体例

#### 電子署名法コンプライアンスチェック

```mermaid
sequenceDiagram
    actor U as ユーザー
    participant A as Agent
    participant H as hourei-mcp
    participant R as rfcxml-mcp
    participant S as 電子署名法 Skill

    U->>A: タイムスタンプ実装は法令準拠？
    A->>H: find_law_article(電子署名法, 2)
    H-->>A: 第2条の条文
    A->>R: get_requirements(3161)
    R-->>A: RFC 3161の技術要件
    A->>S: 法的要件 + 技術要件を参照
    S-->>A: マッピング基準・判断ガイドライン
    A-->>U: 準拠性レポート
```

| 要素             | 役割                                         |
| ---------------- | -------------------------------------------- |
| `hourei-mcp`     | 電子署名法の条文テキスト取得（MCP）          |
| `rfcxml-mcp`     | RFC 3161の技術要件取得（MCP）                |
| 電子署名法 Skill | 法的要件 ↔ 技術要件のマッピング基準（Skill） |

#### OAuth/JWT 実装レビュー

| 要素            | 役割                                             |
| --------------- | ------------------------------------------------ |
| `rfcxml-mcp`    | RFC 6749（OAuth 2.0）/ RFC 7519（JWT）の仕様取得 |
| OAuth/JWT Skill | トークン管理のベストプラクティス、実装パターン   |

### 設計上のポイント

- **Skillは MCPの出力に依存しない形で書く**: 「hourei-mcpが返す JSON の `article_text` フィールドを見る」のような実装依存は避け、「法令条文に以下の要件が含まれるか確認する」のような抽象的な記述にする
- **Skillの判断基準は検証可能にする**: 「準拠している」「準拠していない」「判断できない（追加情報が必要）」の3状態を明確にする

### 候補一覧

| テーマ         | MCP                       | Skill                    | 状態                   |
| -------------- | ------------------------- | ------------------------ | ---------------------- |
| 電子署名法     | hourei-mcp + rfcxml-mcp   | 実装ガイドライン         | ⚡ MCP側は既存で対応可 |
| 個人情報保護法 | hourei-mcp                | 対応チェックリスト       | ⚡ MCP側は既存で対応可 |
| 電子帳簿保存法 | hourei-mcp                | 保存要件チェック         | ⚡ MCP側は既存で対応可 |
| GDPR           | 規制テキストMCP（構想中） | DPIAチェックリスト       | 🔲 未着手              |
| OWASP          | 脆弱性DB MCP（構想中）    | セキュリティレビュー基準 | 🔲 未着手              |
| OAuth/JWT      | rfcxml-mcp                | 実装パターン             | ⚡ MCP側は既存で対応可 |

## パターン2: MCPs（複数MCP連携）

複数のMCPから取得したデータを統合・比較・検証する構成。すでに [workflows/patterns.md](../workflows/patterns) に実績がある。

### 設計原則

```mermaid
flowchart LR
    MCP_A["MCP-A<br>（データソースA）"]
    MCP_B["MCP-B<br>（データソースB）"]
    AGENT["Agent<br>（統合・判断）"]
    RESULT["統合結果"]

    MCP_A -->|"データA"| AGENT
    MCP_B -->|"データB"| AGENT
    AGENT --> RESULT

    style MCP_A fill:#FFB6C1,color:#333
    style MCP_B fill:#FFB6C1,color:#333
```

### 実績のある組み合わせ

| 組み合わせ                        | 用途                            | 実績                              |
| --------------------------------- | ------------------------------- | --------------------------------- |
| **deepl-mcp + xcomet-mcp**        | 翻訳 → 品質評価 → 再翻訳        | 180ページ技術文書を1日で翻訳・$12 |
| **rfcxml-mcp + w3c-mcp**          | RFC仕様 + Web API定義の統合参照 | WebSocket仕様確認ワークフロー     |
| **rfcxml-mcp + hourei-mcp**       | 技術仕様 × 法令条文のマッピング | 電子署名法 × RFC 3161 対応表      |
| **pdf-spec-mcp + pdf-reader-mcp** | PDF仕様参照 + 実ファイル検証    | PDF/UA準拠性検証                  |

### 設計上のポイント

- **順序依存か並列可能かを明確にする**: deepl → xcomet は順序依存、rfcxml + w3c は並列可能
- **データ統合のロジックはAgent層が担う**: MCPは生データを返すだけ。統合・判断はAgentの役割

## パターン3: Skills（複数Skill組み合わせ）

コンテキスト（開発局面）に応じて複数のSkillを同時に発動する構成。

### 設計原則

```mermaid
flowchart TB
    CONTEXT["開発コンテキスト"]
    SKILL_A["Skill-A"]
    SKILL_B["Skill-B"]
    SKILL_C["Skill-C"]
    OUTPUT["統合された判断"]

    CONTEXT --> SKILL_A
    CONTEXT --> SKILL_B
    CONTEXT --> SKILL_C
    SKILL_A --> OUTPUT
    SKILL_B --> OUTPUT
    SKILL_C --> OUTPUT

    style SKILL_A fill:#90EE90,color:#333
    style SKILL_B fill:#90EE90,color:#333
    style SKILL_C fill:#90EE90,color:#333
```

### コンテキスト別Skillセット

```mermaid
flowchart TB
    subgraph CODE_REVIEW["コードレビューセット"]
        direction TB
        CR1["🔵 SOLID<br>原則違反の検出"]
        CR2["🔴 Clean Code<br>スタイル・可読性"]
        CR3["🟢 Refactoring<br>改善提案"]
        CR1 --> CR3
        CR2 --> CR3
    end

    subgraph ARCH_DESIGN["アーキテクチャ設計セット"]
        direction TB
        AD1["🟡 DDD<br>ドメインモデリング"]
        AD2["🔵 Clean Architecture<br>レイヤー設計"]
        AD3["🔵 12 Factor App<br>クラウド対応"]
        AD1 --> AD2
        AD2 --> AD3
    end

    subgraph TEST_DESIGN["テスト設計セット"]
        direction TB
        TD1["🟡 TDD<br>プロセス"]
        TD2["🟡 BDD<br>シナリオ定義"]
        TD3["🟢 Test Patterns<br>パターン適用"]
        TD4["🟠 Coverage<br>網羅性判断"]
        TD1 --> TD3
        TD2 --> TD3
        TD3 --> TD4
    end

    style CODE_REVIEW fill:#FFEBEE,stroke:#C62828,color:#333
    style ARCH_DESIGN fill:#E3F2FD,stroke:#1565C0,color:#333
    style TEST_DESIGN fill:#FFFDE7,stroke:#F9A825,color:#333
```

### 設計上のポイント

- **Skill間の優先順位を定める**: コードレビューセットでは、SOLID（原則）→ Clean Code（スタイル）→ Refactoring（改善）の順で評価する
- **「定義の一次ソース」ルール**: スコープが重複する概念（例: SRP）は、一方のSkillを一次ソース、他方は参照とする
- **セット全体をメタSkill化できる**: 「コードレビューセット」自体を1つのSkillとして定義し、3つのSkillを内部で参照する構成も可能

## パターン4: MCPs + Skills（完全統合）

複数のMCPと複数のSkillが協調する、最も複雑だが最も強力な構成。

### 設計原則

```mermaid
flowchart TB
    subgraph DATA["データ取得層（MCPs）"]
        MCP_A["MCP-A"]
        MCP_B["MCP-B"]
    end

    subgraph KNOWLEDGE["知識層（Skills）"]
        SKILL_A["Skill-A"]
        SKILL_B["Skill-B"]
    end

    AGENT["Agent<br>（オーケストレーション）"]
    RESULT["最終成果"]

    MCP_A --> AGENT
    MCP_B --> AGENT
    SKILL_A --> AGENT
    SKILL_B --> AGENT
    AGENT --> RESULT

    style DATA fill:#FFB6C1,color:#333
    style KNOWLEDGE fill:#90EE90,color:#333
    style AGENT fill:#87CEEB,color:#333
```

### 具体例

#### セキュリティ監査ワークフロー

```mermaid
sequenceDiagram
    actor U as ユーザー
    participant A as Agent
    participant RFC as rfcxml-mcp
    participant W3C as w3c-mcp
    participant OS as OWASP Skill
    participant OA as OAuth Skill

    U->>A: WebSocket認証の安全性を監査して
    A->>RFC: get_requirements(6455)
    RFC-->>A: WebSocket仕様の要件
    A->>RFC: get_requirements(6749)
    RFC-->>A: OAuth 2.0仕様の要件
    A->>W3C: get_webidl("websockets")
    W3C-->>A: WebSocket API定義
    A->>OS: OWASP Top 10の該当項目を参照
    OS-->>A: A01:Broken Access Control の基準
    A->>OA: OAuth実装パターンを参照
    OA-->>A: トークン管理のベストプラクティス
    A-->>U: セキュリティ監査レポート
```

| 層        | 要素        | 役割                         |
| --------- | ----------- | ---------------------------- |
| **MCP**   | rfcxml-mcp  | RFC 6455/6749 の仕様要件取得 |
| **MCP**   | w3c-mcp     | WebSocket API定義取得        |
| **Skill** | OWASP Skill | 脆弱性の判断基準             |
| **Skill** | OAuth Skill | 認証実装のベストプラクティス |

#### 仕様準拠の品質ゲート

```mermaid
flowchart TB
    subgraph INPUT["入力"]
        CODE["実装コード"]
    end

    subgraph CHECK["検証プロセス"]
        direction TB
        subgraph MCP_LAYER["MCPs: 仕様参照"]
            RFC["rfcxml-mcp<br>技術仕様"]
            HOUREI["hourei-mcp<br>法令条文"]
        end
        subgraph SKILL_LAYER["Skills: 品質基準"]
            SOLID_S["SOLID Skill<br>設計品質"]
            TEST_S["Test Patterns Skill<br>テスト品質"]
        end
    end

    subgraph OUTPUT["成果"]
        REPORT["品質ゲートレポート<br>仕様準拠 + 設計品質 + テスト充足度"]
    end

    CODE --> MCP_LAYER
    CODE --> SKILL_LAYER
    MCP_LAYER --> REPORT
    SKILL_LAYER --> REPORT

    style MCP_LAYER fill:#FFB6C1,color:#333
    style SKILL_LAYER fill:#90EE90,color:#333
```

### 設計上のポイント

- **Agent のオーケストレーションが鍵**: どのMCPを先に呼び、どのSkillをいつ参照するかの判断はAgent層が行う
- **MCP呼び出しの並列化**: 独立したMCP呼び出しは並列実行してコンテキストウィンドウを効率的に使う
- **Skillの発動タイミング**: データ取得後にまとめて判断するか、逐次判断するかを明確にする

## パターン選択ガイド

```mermaid
flowchart TD
    START{"何を達成したいか？"}

    START -->|"外部データの<br>取得 + 評価"| P1["パターン1<br>MCP + Skill"]
    START -->|"複数データソースの<br>統合・比較"| P2["パターン2<br>MCPs"]
    START -->|"複数知識の<br>重ね合わせ"| P3["パターン3<br>Skills"]
    START -->|"データ + 知識の<br>完全な統合"| P4["パターン4<br>MCPs + Skills"]

    P1 -->|"例"| P1E["コンプライアンスチェック<br>法令条文 + 判断基準"]
    P2 -->|"例"| P2E["翻訳ワークフロー<br>翻訳 + 品質評価"]
    P3 -->|"例"| P3E["コードレビュー<br>SOLID + Clean Code + Refactoring"]
    P4 -->|"例"| P4E["セキュリティ監査<br>仕様参照 + OWASP + OAuth"]

    style P1 fill:#FFD700,color:#333
    style P2 fill:#FFB6C1,color:#333
    style P3 fill:#90EE90,color:#333
    style P4 fill:#E3F2FD,color:#333
```

## 成果の蓄積

各パターンの実践結果は [outputs.md](../outputs.md) に記録する。以下の情報を含める。

| 項目         | 内容                                       |
| ------------ | ------------------------------------------ |
| 使用パターン | 4パターンのどれか                          |
| 構成要素     | 使用したMCP・Skill                         |
| 入力         | 何を対象としたか                           |
| 成果         | 定量的な結果（時間・コスト・品質スコア等） |
| 学び         | 改善点・次回への示唆                       |

## 関連ドキュメント

- [mcp-roadmap.md](./mcp-roadmap) — MCP構築ロードマップ
- [skill-roadmap.md](./skill-roadmap) — Skill構築ロードマップ
- [workflows/patterns.md](../workflows/patterns) — 既存のワークフローパターン（パターン2の実績）
- [concepts/03-architecture.md](../concepts/03-architecture) — MCP / Skill / Agent のレイヤー構造
- [mcp/catalog.md](../mcp/catalog) — 構築済みMCPカタログ
