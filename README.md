# AI Agent Toolkit

AIエージェント構成（MCP・Skills・Agent統合）に関する設計思想・アーキテクチャ・実践ノウハウをまとめたリポジトリ。

## スコープ

| レイヤー   | 役割                             | 例                               |
| ---------- | -------------------------------- | -------------------------------- |
| **MCP**    | 外部ツール・API連携              | rfcxml-mcp, deepl-mcp            |
| **Skills** | ドメイン知識・ベストプラクティス | frontend-design, doc-coauthoring |
| **Agent**  | 自律的タスク実行                 | Claude Code, Cursor              |

## 経緯

当初は[MCP](https://modelcontextprotocol.io/)サーバー構築が対象でしたが、以下を踏まえスコープを拡大

- [Vercel Skills v1.1.1](https://vercel.com/changelog/skills-v1-1-1-interactive-discovery-open-source-release-and-agent-support) のオープンソース化
- [Agent Skills Specification](https://agentskills.io) の標準化
  > このリポジトリの内容は、AIとの壁打ちで得た、個人の意見にすぎない。

## 核心的な問い

> AIがいきなり（CI/CDを含め）バイナリを出力して実装できるようになる未来が来るまで、AI駆動開発には、これまでの人々が培ってきたエンジニアリングの導入が不可欠である。
>
> AIの判断には**ブレない参照先**が必要。

## ドキュメント

詳細は [docs/](./docs/) を参照。

### Concepts（概念・思想）

| ファイル                                                                    | 内容                           |
| --------------------------------------------------------------------------- | ------------------------------ |
| [concepts/01-vision.md](./docs/concepts/01-vision.md)                       | AI駆動開発のビジョン・核心思想 |
| [concepts/02-reference-sources.md](./docs/concepts/02-reference-sources.md) | 「ブレない参照先」の体系       |
| [concepts/03-architecture.md](./docs/concepts/03-architecture.md)           | MCP/Skills/Agentの構成論       |

### MCP（外部連携）

| ファイル                                        | 内容                        |
| ----------------------------------------------- | --------------------------- |
| [mcp/catalog.md](./docs/mcp/catalog.md)         | 構築済みMCPカタログと成果   |
| [mcp/security.md](./docs/mcp/security.md)       | MCP開発時のセキュリティ考慮 |
| [mcp/development.md](./docs/mcp/development.md) | MCP開発ガイド（計画中）     |

### Skills（ドメイン知識）

| ファイル                                                      | 内容                                        |
| ------------------------------------------------------------- | ------------------------------------------- |
| [skills/overview.md](./docs/skills/overview.md)               | Vercel Skills と Agent Skills Specification |
| [skills/vs-mcp.md](./docs/skills/vs-mcp.md)                   | MCP vs Skills の本質的な違い・選択判断      |
| [skills/creating-skills.md](./docs/skills/creating-skills.md) | Skills作成ガイド（計画中）                  |

### Workflows（ワークフロー・運用）

| ファイル                                                                  | 内容                       |
| ------------------------------------------------------------------------- | -------------------------- |
| [workflows/patterns.md](./docs/workflows/patterns.md)                     | 連携パターン・ワークフロー |
| [workflows/development-phases.md](./docs/workflows/development-phases.md) | 開発フェーズ × 対応        |

### 計画・参考

| ファイル                          | 内容                   |
| --------------------------------- | ---------------------- |
| [roadmap.md](./docs/roadmap.md)   | 優先度・ロードマップ   |
| [outputs.md](./docs/outputs.md)   | 実績・アウトプット一覧 |
| [glossary.md](./docs/glossary.md) | 用語集                 |

## リファレンス

- [Skills リンク集](./references/skills/links.md) - Vercel Skills・Agent Skills Specification

## 関連プロジェクト

- [RFC MCP Server](https://github.com/shuji-bonji/rfc-mcp-server) - IETF RFC検索・解析
- [xCOMET MCP Server](https://github.com/shuji-bonji/xcomet-mcp-server) - 翻訳品質評価
- [RxJS MCP Server](https://github.com/shuji-bonji/rxjs-mcp-server) - RxJSストリーム実行・可視化

## GitHub リポジトリ設定

### 説明文（About）

```
AIエージェント構成（MCP・Skills・Agent統合）の設計思想・実践ノウハウ
```

### Topics（タグ）

```
mcp, skills, ai-agent, claude-code, cursor, agent-skills
```
