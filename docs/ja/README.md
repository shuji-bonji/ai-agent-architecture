# Docs

このディレクトリには、AIエージェント構成に関する体系化されたドキュメントを配置する。

## 新構成（v2）

リポジトリのスコープ拡大に伴い、ドキュメント構成を以下のように再編成した。各ディレクトリは異なる視点から知識を体系化している。

```
docs/
├── preface.md         # 序章
├── part-1/            # 第I部 前提
│   └── constraints.md
├── part-2/            # 第II部 モデル
│   ├── layers.md
│   └── placement.md
├── part-3/            # 第III部 Doctrine / Memory
│   ├── doctrine.md
│   └── memory.md
├── part-4/            # 第IV部 構成と展開
│   ├── patterns.md
│   ├── limits.md
│   ├── physical.md
│   └── prompt-decomposition.md
├── concepts/          # 旧 URL のリダイレクト
├── mcp/              # MCP（外部連携）
│   ├── what-is-mcp.md    # MCPとは何か（入門）
│   ├── catalog.md
│   ├── security.md
│   └── development.md
├── skills/           # Skills（ドメイン知識）
│   ├── what-is-skills.md       # Skillsとは何か（入門）
│   ├── creating-skills.md      # Skill設計ガイド
│   ├── how-to-create-skills.md # スキル作成チュートリアル
│   ├── how-to-use-skills.md    # スキル導入・利用ガイド
│   ├── skill-use-cases.md      # 活用パターン
│   ├── vs-mcp.md               # 選択判断ガイド
│   └── anti-patterns.md
├── agents/           # エージェント間連携
│   ├── what-is-a2a.md        # A2Aとは何か（入門）
│   └── what-is-subagent.md   # サブエージェントとは何か（入門）
├── strategy/          # 構築戦略
│   └── composition-patterns.md # 複合構成パターン
├── workflows/        # ワークフロー・運用
│   ├── patterns.md
│   └── development-phases.md
├── outputs.md
├── glossary.md
└── translation-quality-report.md
```

## このドキュメント群について

このドキュメント群は、AI駆動開発を支えるMCPエコシステムの**設計思想・アーキテクチャ・実践ノウハウ**を体系化したものである。

単なるツールの使い方マニュアルではなく、「なぜMCPを作るのか」「AIと人間はどう協働すべきか」「何を優先して構築すべきか」といった本質的な問いに対する回答を含む。

Claudeとの対話を通じて得られた洞察を、再利用可能な形式でまとめている。

## ドキュメント一覧

### 骨格

| ファイル | 内容 |
| -------- | ---- |
| [序章](./preface) | 本書の問いと範囲 |
| [I.1 制約の要約](./part-1/constraints) | 基盤モデルの構造的制約 |
| [II.1 五層](./part-2/layers) | Doctrine / Agent / Skills / Memory / MCP |
| [II.2 配置基準](./part-2/placement) | 何をどの層へ置くか |
| [IV.1 パターン](./part-4/patterns) | 型の選び方 |
| [IV.2 限界](./part-4/limits) | 届かない線 |

### MCP（外部連携）

| ファイル                             | 内容                        |
| ------------------------------------ | --------------------------- |
| [mcp/what-is-mcp.md](./mcp/what-is-mcp.md)  | **MCPとは何か（入門）** |
| [mcp/catalog.md](./mcp/catalog.md)           | 構築済みMCPカタログと成果   |
| [mcp/security.md](./mcp/security.md)         | MCP開発時のセキュリティ考慮 |
| [mcp/development.md](./mcp/development.md)   | MCP開発ガイド               |

### Skills（ドメイン知識）

| ファイル                                           | 内容                             |
| -------------------------------------------------- | -------------------------------- |
| [skills/what-is-skills.md](./skills/what-is-skills.md) | Skillsとは何か（入門） |
| [skills/creating-skills.md](./skills/creating-skills.md) | Skill設計ガイド |
| [skills/how-to-create-skills.md](./skills/how-to-create-skills.md) | スキル作成チュートリアル |
| [skills/how-to-use-skills.md](./skills/how-to-use-skills.md) | スキル導入・利用ガイド |
| [skills/skill-use-cases.md](./skills/skill-use-cases.md) | 活用パターン |
| [skills/vs-mcp.md](./skills/vs-mcp.md)             | MCP vs Skills 選択判断ガイド     |
| [skills/anti-patterns.md](./skills/anti-patterns.md)       | MCP/Skills アンチパターン集      |

### Agents（エージェント間連携）

| ファイル                                           | 内容                             |
| -------------------------------------------------- | -------------------------------- |
| [agents/what-is-a2a.md](./agents/what-is-a2a.md)           | **A2Aとは何か（入門）** |
| [agents/what-is-subagent.md](./agents/what-is-subagent.md) | **サブエージェントとは何か（入門）** |

### Strategy（構築戦略）

| ファイル                                                             | 内容                       |
| -------------------------------------------------------------------- | -------------------------- |
| [strategy/composition-patterns.md](./strategy/composition-patterns) | 複合構成パターン（MCP×Skill×Agent） |

### Workflows（ワークフロー・運用）

| ファイル                                                             | 内容                       |
| -------------------------------------------------------------------- | -------------------------- |
| [workflows/patterns.md](./workflows/patterns.md)                     | 連携パターン・ワークフロー |
| [workflows/development-phases.md](./workflows/development-phases.md) | 開発フェーズ × 対応        |

### 計画・実績

| ファイル                         | 内容                   |
| -------------------------------- | ---------------------- |
| [outputs.md](./outputs.md)   | 実績・アウトプット一覧 |

### リファレンス

| ファイル                     | 内容   |
| ---------------------------- | ------ |
| [glossary.md](./glossary.md) | 用語集 |

## 読み方ガイド

### 初めて読む場合

1. **preface.md** - 本書の問いと範囲
2. **part-1/constraints.md** - 制約の要約
3. **part-2/layers.md** - 五層
4. **part-4/patterns.md** - 型の選び方
5. **mcp/catalog.md** - 具体的なMCPを確認

### 初めてMCPを学びたい場合

1. **mcp/what-is-mcp.md** - MCPの基本概念
2. **part-2/layers.md** - 五層での位置づけ
3. **mcp/catalog.md** - 構築済みMCPの実例

### エージェント間連携を学びたい場合

1. **agents/what-is-subagent.md** - カスタムサブエージェントの基本
2. **agents/what-is-a2a.md** - A2Aプロトコルの基本
3. **part-2/layers.md** - 五層での位置づけ

### 実践したい場合

1. **skills/vs-mcp.md** - 何を使うべきか判断
2. **workflows/patterns.md** - 具体的なワークフロー
3. **mcp/catalog.md** - 各MCPの詳細

### MCPを作りたい場合

1. **mcp/development.md** - MCP開発ガイド
2. **skills/vs-mcp.md** - 本当にMCPにすべきか判断
3. **mcp/security.md** - セキュリティ考慮
4. **mcp/catalog.md** - 既存MCPの実例

### Skillを作りたい場合

1. **skills/creating-skills.md** - Skill作成ガイド
2. **skills/anti-patterns.md** - 避けるべきパターン
3. **skills/what-is-skills.md** - Skills全体像

### 構築計画を知りたい場合

1. **strategy/composition-patterns.md** - MCP×Skillの組み合わせパターン

### 開発に参加したい場合

1. **mcp/security.md** - セキュリティ考慮
2. **glossary.md** - 用語確認

## 関連ディレクトリ

- `../references/` - 参考リンク・資料
- `../templates/` - Skill・Command テンプレート

## 更新履歴

| 日付       | 内容                   |
| ---------- | ---------------------- |
| 2025-01-26 | 初版作成（11ファイル） |
| 2026-02-11 | mcp/development.md、skills/creating-skills.md 追加 |
| 2026-02-12 | block-beta図変換、4概念入門ページ追加（what-is-mcp/skills/a2a/subagent）、agents/ディレクトリ新設 |
| 2026-02-16 | strategy/ディレクトリ新設（mcp-roadmap, skill-roadmap, composition-patterns） |
