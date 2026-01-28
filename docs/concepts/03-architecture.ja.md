# MCP/A2A/Skill/Agent の構成論

> AI駆動開発のインフラを理解するための構成要素と、それぞれの役割・関係性を整理する。

## レイヤー構造の概観

```
User Request
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│  Agent Layer                                             │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ • Task understanding                                │ │
│  │ • Orchestration decisions                           │ │
│  │ • Result synthesis                                  │ │
│  └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  Skills Layer                                            │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ • Domain knowledge                                  │ │
│  │ • Best practices & guidelines                       │ │
│  │ • Decision criteria                                 │ │
│  └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  MCP Layer                                               │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ • External API access                               │ │
│  │ • Tool execution                                    │ │
│  │ • Data retrieval                                    │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
     │
     ▼
External Services (DeepL, RFC Editor, GitHub, etc.)
```

### 各レイヤーの責務

| Layer | Responsibility | Owns | Examples |
|-------|----------------|------|----------|
| **Agent** | Orchestration, decision-making | Task flow | Claude Code, Cursor |
| **Skills** | Domain knowledge, guidelines | Best practices | SOLID principles, translation guidelines |
| **MCP** | External connectivity | Tool definitions | deepl-mcp, rfcxml-mcp |

## このドキュメントについて

AI駆動開発には複数の構成要素が存在するが、それぞれの役割と関係性を正しく理解することが効率的な開発の鍵となる。このドキュメントでは、MCP（ツール接続）、A2A（エージェント間通信）、Skill（静的知識）、カスタムサブエージェント（役割特化）という4つの主要概念を整理する。

「何をMCPにすべきか」「Skillで十分なのはどんな場合か」「サブエージェントはいつ使うべきか」という判断に迷ったとき、このドキュメントを参照することで適切な選択ができるようになる。

## 全体アーキテクチャ

```mermaid
graph TB
    subgraph ユーザー層
        USER[ユーザー]
    end

    subgraph ホストアプリケーション層
        HOST["ホスト<br/>(Claude Code / Claude.ai)"]
        SKILL["Skills<br/>(静的知識)"]
    end

    subgraph エージェント層
        MAIN["メインエージェント"]
        SUB["サブエージェント"]
    end

    subgraph プロトコル層
        MCP_CLIENT["MCP Client"]
        A2A_CLIENT["A2A Client"]
    end

    subgraph 外部サービス層
        MCP_SERVER["MCP Servers"]
        A2A_AGENT["外部A2Aエージェント"]
    end

    USER --> HOST
    HOST --> SKILL
    HOST --> MAIN
    MAIN --> SUB
    MAIN --> MCP_CLIENT
    MAIN --> A2A_CLIENT
    SUB --> MCP_CLIENT
    MCP_CLIENT --> MCP_SERVER
    A2A_CLIENT --> A2A_AGENT

    style SKILL fill:#90EE90
    style MCP_SERVER fill:#FFB6C1
    style A2A_AGENT fill:#87CEEB
```

## MCPの3層構造

### Host / Client / Server

```mermaid
graph TB
    subgraph Host["Host（ホストアプリケーション）"]
        H_DESC["ユーザーインターフェース提供<br/>セッション管理"]
    end

    subgraph Client["Client（MCPクライアント）"]
        C_DESC["サーバー発見・接続管理<br/>プロトコル処理"]
    end

    subgraph Server["Server（MCPサーバー）"]
        S_DESC["ツール/リソース提供<br/>実際の処理実行"]
    end

    Host --> Client
    Client -->|JSON-RPC| Server
```

| 層         | 役割                         | 例                           | 開発者の関わり   |
| ---------- | ---------------------------- | ---------------------------- | ---------------- |
| **Host**   | UI、セッション管理           | Claude Code, Cursor, VS Code | 使う側           |
| **Client** | プロトコル処理、サーバー管理 | Host内蔵                     | 通常は意識しない |
| **Server** | ツール/リソース提供          | rfcxml-mcp, deepl-mcp        | **作る側**       |

### なぜClientを意識しなくて済むか

```
通常の開発フロー:
1. MCP Server を作る（rfcxml等）
2. Claude Code の設定に追加
3. Claude Code が内蔵Clientとして動作
4. ツールが使える

→ Client は Host に内蔵されており、
   ブラックボックスとして機能している
```

## MCP と A2A の棲み分け

### プロトコルの違い

```mermaid
graph TB
    subgraph MCP["MCP（Model Context Protocol）"]
        MCP_DESC["エージェント ↔ ツール"]
        MCP_EXAMPLE["例: Claude → rfcxml-mcp"]
    end

    subgraph A2A["A2A（Agent-to-Agent Protocol）"]
        A2A_DESC["エージェント ↔ エージェント"]
        A2A_EXAMPLE["例: 自社Agent → Salesforce Agent"]
    end

    MCP -->|補完関係| A2A
```

| 項目             | MCP                      | A2A                          |
| ---------------- | ------------------------ | ---------------------------- |
| **主導**         | Anthropic                | Google → Linux Foundation    |
| **目的**         | ツール接続               | エージェント間通信           |
| **接続先**       | MCPサーバー（ツール）    | 他のエージェント（他社含む） |
| **コンテキスト** | 親エージェントと共有可能 | 完全分離                     |
| **所有者**       | 自分                     | 自分 or **他者**             |

### 公式の推奨

> Build with ADK, equip with **MCP** (tools), communicate with **A2A** (agents)

```
MCP = 手（ツール）を使う
A2A = 他者（エージェント）と協働
```

## カスタムサブエージェント

### サブエージェントとは

Claude Code内で定義できる**特定タスクに特化したAIアシスタント**。

```
配置場所:
├── プロジェクト: .claude/agents/xxx.md （優先度: 高）
└── ユーザー:     ~/.claude/agents/xxx.md（優先度: 低）
```

### 定義形式

```markdown
name: rfc-specialist
description: RFC仕様の確認・検証専門家
tools: rfcxml:get_rfc_structure, rfcxml:get_requirements
model: sonnet

あなたはRFC仕様の専門家です。
rfcxmlツールのみ使用してください。
```

### サブエージェントの位置づけ

```mermaid
graph TB
    subgraph Claude_Code["Claude Code 内部"]
        USER[ユーザー]
        MAIN["メインClaude<br/>（オーケストレーター）"]
        SUBAGENT["カスタムサブエージェント<br/>(.claude/agents/)"]
        MCP_CLIENT["MCP Client<br/>（Claude Code内蔵）"]
    end

    subgraph External["外部"]
        MCP_SERVERS["MCP Servers<br/>rfcxml, deepl等"]
    end

    USER --> MAIN
    MAIN -->|"委譲"| SUBAGENT
    SUBAGENT -->|"使う"| MCP_CLIENT
    MAIN -->|"直接使う"| MCP_CLIENT
    MCP_CLIENT -->|"JSON-RPC"| MCP_SERVERS

    style MCP_CLIENT fill:#FFB6C1
    style SUBAGENT fill:#90EE90
```

**重要**: サブエージェントはMCP Clientの「代わり」ではなく「上位レイヤー」

- **サブエージェント** = 「何をするか」の定義（役割・手順）
- **MCP Client** = 「どう接続するか」の実装（プロトコル処理）

## Skill（スキル）

### Skillとは

Claude Codeで参照できる**静的な知識・ガイドライン**。

```
配置場所:
├── プロジェクト: .claude/skills/xxx/SKILL.md
└── ユーザー:     ~/.claude/skills/xxx/SKILL.md
```

### Skillの特徴

| 項目                 | 説明                                               |
| -------------------- | -------------------------------------------------- |
| **形式**             | Markdownファイル                                   |
| **内容**             | ベストプラクティス、ワークフロー定義、ガイドライン |
| **実行**             | なし（参照のみ）                                   |
| **コンテキスト消費** | 低い（参照時のみ）                                 |

## MCP vs Skill vs サブエージェント

### 判断フロー

```mermaid
graph TB
    Q1{外部API/動的処理<br/>が必要?}
    Q1 -->|Yes| MCP[MCP化]
    Q1 -->|No| Q2{複雑な処理ロジック<br/>が必要?}
    Q2 -->|Yes| MCP
    Q2 -->|No| Q3{役割・専門性の<br/>分離が必要?}
    Q3 -->|Yes| AGENT[サブエージェント化]
    Q3 -->|No| SKILL[Skill化]

    style MCP fill:#FFB6C1
    style SKILL fill:#90EE90
    style AGENT fill:#87CEEB
```

### 比較表

| 観点                 | Skill              | MCP             | サブエージェント |
| -------------------- | ------------------ | --------------- | ---------------- |
| **コンテキスト消費** | 低い               | 高い            | 中程度           |
| **動的処理**         | ❌ 不可            | ✅ 可能         | ✅ 可能          |
| **外部API**          | ❌ 不可            | ✅ 可能         | △ MCP経由        |
| **メンテナンス**     | Markdown編集       | npm公開等       | Markdown編集     |
| **再利用性**         | プロジェクト内     | グローバル      | プロジェクト内   |
| **用途**             | 知識・ガイドライン | ツール・API連携 | 役割・専門性分離 |

### 使い分けの原則

```
Skill = 「知識」「ガイドライン」「ワークフロー定義」
MCP  = 「ツール」「API連携」「動的処理」
サブエージェント = 「役割」「専門性」「タスク委譲」

Skillで「何をすべきか」を定義
MCPで「どう実行するか」を提供
サブエージェントで「誰がやるか」を分離
```

## A2A vs サブエージェント

### 根本的な違い

| 観点               | カスタムサブエージェント | A2Aエージェント         |
| ------------------ | ------------------------ | ----------------------- |
| **所在**           | 同一プロセス内           | ネットワーク越し        |
| **所有者**         | 自分                     | 自分 or **他者**        |
| **信頼関係**       | 完全信頼                 | 認証・認可が必要        |
| **コンテキスト**   | 親と一部共有             | 完全分離                |
| **ライフサイクル** | セッション限り           | 永続的サービス          |
| **内部実装**       | 見える（Markdown）       | 見えない（API契約のみ） |

### 比喩

```
カスタムサブエージェント = 「社内の専門部署」
A2Aエージェント         = 「外注先・パートナー企業」

社内に専門部署があっても、外注先は必要
外注先があっても、社内の専門部署は必要

→ 両方必要、代替関係ではない
```

### 使い分け

| シナリオ                     | 使うべきもの     |
| ---------------------------- | ---------------- |
| 自分のMCPを専門的に使いたい  | サブエージェント |
| 同じ処理を繰り返し使いたい   | サブエージェント |
| ワークフローを定義したい     | サブエージェント |
| 他社のエージェントと連携     | A2A              |
| 自分のエージェントを外部公開 | A2A              |
| 複数組織間でエージェント連携 | A2A              |

## 組み合わせパターン

### 最強の組み合わせ

```mermaid
graph LR
    SKILL[Skill<br/>ワークフロー定義] -->|"参照"| AGENT[サブエージェント]
    AGENT -->|"実行"| MCP[MCP<br/>ツール群]

    style SKILL fill:#90EE90
    style MCP fill:#FFB6C1
    style AGENT fill:#87CEEB
```

### 具体例：翻訳ワークフロー

```markdown
<!-- skills/translation-workflow/SKILL.md -->

# 技術文書翻訳ワークフロー

## 使用MCP

- `deepl` - 翻訳実行
- `xcomet` - 品質評価

## ワークフロー

1. deepl:translate-text で翻訳（formality: "more"）
2. xcomet:xcomet_evaluate で評価
   - スコア 0.85以上: OK
   - スコア 0.85未満: 再翻訳または手動修正
3. xcomet:xcomet_detect_errors でエラー検出
```

```markdown
<!-- agents/translation-specialist.md -->

name: translation-specialist
description: 技術文書の翻訳と品質評価を行う専門エージェント
tools: deepl:translate-text, xcomet:xcomet_evaluate, xcomet:xcomet_detect_errors
model: sonnet

あなたは技術翻訳の専門家です。
translation-workflow スキルを参照してください。
```

## シーケンス図：実行フローの可視化

### コードレビュータスク

```mermaid
sequenceDiagram
    participant U as ユーザー
    participant M as メインエージェント
    participant S as Skill<br/>(コードレビュー)
    participant MCP as MCP Server<br/>(ESLint)

    U->>M: "このPRをレビューして"
    M->>S: ガイドライン参照
    S-->>M: レビュー観点・チェック項目
    M->>MCP: lint実行
    MCP-->>M: 違反箇所リスト
    M->>U: レビュー結果レポート
```

### 翻訳ワークフロー

```mermaid
sequenceDiagram
    participant U as ユーザー
    participant M as メインエージェント
    participant S as Skill<br/>(翻訳ガイドライン)
    participant D as MCP Server<br/>(DeepL)
    participant X as MCP Server<br/>(xCOMET)

    U->>M: "このドキュメントを翻訳して"
    M->>S: 翻訳ルール参照
    S-->>M: トーン・用語ルール
    M->>D: translate-text
    D-->>M: 翻訳結果
    M->>X: xcomet_evaluate
    X-->>M: 品質スコア
    alt スコア < 0.85
        M->>D: 再翻訳（パラメータ調整）
        D-->>M: 改善された翻訳
    end
    M->>U: 最終翻訳結果
```

## レイヤー構造まとめ

```
┌─────────────────────────────────────────────────────────┐
│  ユーザー                                                │
├─────────────────────────────────────────────────────────┤
│  ホスト（Claude Code / Claude.ai）                       │
├─────────────────────────────────────────────────────────┤
│  Skills（静的知識・ガイドライン）                         │
├─────────────────────────────────────────────────────────┤
│  メインエージェント                                       │  ← オーケストレーション
├─────────────────────────────────────────────────────────┤
│  カスタムサブエージェント                                 │  ← 役割・専門性の定義
├─────────────────────────────────────────────────────────┤
│  MCP Client / A2A Client                                │  ← プロトコル処理
├─────────────────────────────────────────────────────────┤
│  MCP Servers / 外部A2Aエージェント                       │  ← ツール・外部サービス
└─────────────────────────────────────────────────────────┘
```
