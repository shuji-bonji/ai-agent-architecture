# Docs

このディレクトリには、discussionsで議論した内容を体系化した成果物を配置する。

## 📁 新構成（v2 リストラクチャリング）

リポジトリのスコープ拡大に伴い、ドキュメント構成を以下のように再編成しました。

```
docs/
├── concepts/          # ビジョン・思想・理論
│   ├── 01-vision.md
│   ├── 02-reference-sources.md
│   └── 03-architecture.md
├── mcp/              # MCP（外部連携）
│   ├── catalog.md
│   ├── security.md
│   └── development.md (計画中)
├── skills/           # Skills（ドメイン知識）
│   ├── overview.md
│   ├── vs-mcp.md     # 選択判断ガイド
│   └── creating-skills.md (計画中)
├── workflows/        # ワークフロー・運用
│   ├── patterns.md
│   └── development-phases.md
├── roadmap.md
├── outputs.md
└── glossary.md
```

## このドキュメント群について

このドキュメント群は、AI駆動開発を支えるMCPエコシステムの**設計思想・アーキテクチャ・実践ノウハウ**を体系化したものである。

単なるツールの使い方マニュアルではなく、「なぜMCPを作るのか」「AIと人間はどう協働すべきか」「何を優先して構築すべきか」といった本質的な問いに対する回答を含む。

Claudeとの対話（`discussions/`）を通じて得られた洞察を、再利用可能な形式でまとめている。

## ドキュメント一覧

### ビジョン・思想

| ファイル                                                               | 内容                           |
| ---------------------------------------------------------------------- | ------------------------------ |
| [concepts/01-vision.md](./concepts/01-vision.md)                       | AI駆動開発のビジョン・核心思想 |
| [concepts/02-reference-sources.md](./concepts/02-reference-sources.md) | 「ブレない参照先」の体系       |

### アーキテクチャ・設計

| ファイル                                                     | 内容                     |
| ------------------------------------------------------------ | ------------------------ |
| [concepts/03-architecture.md](./concepts/03-architecture.md) | MCP/Skills/Agentの構成論 |

### MCP（外部連携）

| ファイル                             | 内容                        |
| ------------------------------------ | --------------------------- |
| [mcp/catalog.md](./mcp/catalog.md)   | 構築済みMCPカタログと成果   |
| [mcp/security.md](./mcp/security.md) | MCP開発時のセキュリティ考慮 |

### Skills（ドメイン知識）

| ファイル                                   | 内容                             |
| ------------------------------------------ | -------------------------------- |
| [skills/overview.md](./skills/overview.md) | Vercel Skills・Agent Skills Spec |
| [skills/vs-mcp.md](./skills/vs-mcp.md)     | MCP vs Skills 選択判断ガイド     |

### Workflows（ワークフロー・運用）

| ファイル                                                             | 内容                       |
| -------------------------------------------------------------------- | -------------------------- |
| [workflows/patterns.md](./workflows/patterns.md)                     | 連携パターン・ワークフロー |
| [workflows/development-phases.md](./workflows/development-phases.md) | 開発フェーズ × 対応        |

### 計画・実績

| ファイル                         | 内容                   |
| -------------------------------- | ---------------------- |
| [roadmap.md](./roadmap.md)   | 優先度・ロードマップ   |
| [outputs.md](./outputs.md)   | 実績・アウトプット一覧 |

### リファレンス

| ファイル                     | 内容   |
| ---------------------------- | ------ |
| [glossary.md](./glossary.md) | 用語集 |

## 読み方ガイド

### 初めて読む場合

1. **concepts/01-vision.md** - 全体の思想を理解
2. **03-architecture.md** - 構成要素を理解
3. **05-mcp-catalog.md** - 具体的なMCPを確認

### 実践したい場合

1. **04-tool-selection.md** - 何を使うべきか判断
2. **06-workflow-patterns.md** - 具体的なワークフロー
3. **05-mcp-catalog.md** - 各MCPの詳細

### 開発に参加したい場合

1. **09-roadmap.md** - 優先度・計画
2. **08-security.md** - セキュリティ考慮
3. **glossary.md** - 用語確認

## 関連ディレクトリ

- `../discussions/` - Claudeとの議論ログ（時系列）
- `../references/` - 参考リンク・資料

## 更新履歴

| 日付       | 内容                   |
| ---------- | ---------------------- |
| 2025-01-26 | 初版作成（11ファイル） |
