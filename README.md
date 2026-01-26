# MCP Server Construction and Integration

MCP（Model Context Protocol）サーバーの構築・統合に関する設計思想・アーキテクチャ・実践ノウハウをまとめたリポジトリ。

> [!WARNING]
> このリポジトリの内容は、AIとの壁打ちで得た、個人の意見にすぎない。

## 核心的な問い

> AIがCI/CDを含め、いきなりバイナリを出力して実装できるようになるまで、AI駆動開発には、これまでの人々が培ってきたエンジニアリングの導入が不可欠である。
>
> AIの判断には**ブレない参照先**が必要。

## ドキュメント

詳細は [docs/](./docs/) を参照。

### ビジョン・思想

| ファイル                                                  | 内容                           |
| --------------------------------------------------------- | ------------------------------ |
| [01-vision.md](./docs/01-vision.md)                       | AI駆動開発のビジョン・核心思想 |
| [02-reference-sources.md](./docs/02-reference-sources.md) | 「ブレない参照先」の体系       |

### アーキテクチャ・設計

| ファイル                                            | 内容                           |
| --------------------------------------------------- | ------------------------------ |
| [03-architecture.md](./docs/03-architecture.md)     | MCP/A2A/Skill/Agentの構成論    |
| [04-tool-selection.md](./docs/04-tool-selection.md) | MCP vs Skill vs Agent 使い分け |

### カタログ・ワークフロー

| ファイル                                                  | 内容                       |
| --------------------------------------------------------- | -------------------------- |
| [05-mcp-catalog.md](./docs/05-mcp-catalog.md)             | 構築済みMCPカタログと成果  |
| [06-workflow-patterns.md](./docs/06-workflow-patterns.md) | 連携パターン・ワークフロー |

### 開発・運用

| ファイル                                                    | 内容                        |
| ----------------------------------------------------------- | --------------------------- |
| [07-development-phases.md](./docs/07-development-phases.md) | 開発フェーズ × MCP対応      |
| [08-security.md](./docs/08-security.md)                     | MCP開発時のセキュリティ考慮 |

### 計画・実績

| ファイル                              | 内容                   |
| ------------------------------------- | ---------------------- |
| [09-roadmap.md](./docs/09-roadmap.md) | 優先度・ロードマップ   |
| [10-outputs.md](./docs/10-outputs.md) | 実績・アウトプット一覧 |

### リファレンス

| ファイル                          | 内容   |
| --------------------------------- | ------ |
| [glossary.md](./docs/glossary.md) | 用語集 |

## 関連プロジェクト

- [RFC MCP Server](https://github.com/shuji-bonji/rfc-mcp-server) - IETF RFC検索・解析
- [xCOMET MCP Server](https://github.com/shuji-bonji/xcomet-mcp-server) - 翻訳品質評価
- [RxJS MCP Server](https://github.com/shuji-bonji/rxjs-mcp-server) - RxJSストリーム実行・可視化
