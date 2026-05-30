# プロジェクト概要

このリポジトリは「AIエージェントが Skills・Tools・Memory・Identity をどう発見・オーケストレーションするか」を体系化する多言語ドキュメントサイト。Concepts (8章) + MCP + Skills + Agents + FAQ + Strategy + Workflows で構成される。英語がメイン、日本語版は `docs/ja/` に配置。

姉妹プロジェクト: [understanding-llm-through-claude-code](https://github.com/shuji-bonji/understanding-llm-through-claude-code) (LLM の構造的制約 = Why の本棚)。本サイトは What/How の地図として補完関係にある。

# 言語・文体ルール

- 英語版（`docs/`）がメイン、日本語版（`docs/ja/`）がサブ
- 専門用語（MCP, Skills, Sub-agent, A2A, Agent ID, Knowledge Graph 等）は両言語とも英語のまま使用する
- コード例やツール名（`SKILL.md`, `.claude/agents/`, `mcp__xcomet__*` 等）もそのまま表記する
- カタカナ表記の専門用語（サブエージェント、エージェント、ドメイン等）は日本語版で文脈に応じて使用可

# i18n ルール

- ディレクトリ構成: `docs/` = English, `docs/ja/` = 日本語
- 各英語ページの先頭に `🌐 [日本語](../ja/SECTION/FILENAME.md)` を配置しない (VitePress の locale switcher で代替)
- `README.md` = English, `README.ja.md` = 日本語
- 英語版のナビゲーション: `> **Next**:` / `> **Previous**:`
- 日本語版のナビゲーション: `> **次へ**:` / `> **前へ**:`
- 英語版のリンクは `docs/` 配下、日本語版のリンクは `docs/ja/` 配下を指す
- 同一ページの英日両方を必ず対称に更新する (片方だけ更新は禁止)

# 章構成 (Concepts)

Concepts は 8 章で構成される。新規概念ページを追加する場合は、適切な番号と「中心的な問い」(WHY/WHAT/HOW/WHICH/REALITY/EXTENSION/DOCTRINE/MEMORY) を割り当てる。

| 章 | ラベル | 中心的な問い |
| --- | --- | --- |
| 01 | WHY | AIになぜ指針が必要か |
| 02 | WHAT | 何を参照先とするか |
| 03 | HOW | どう構成するか (三層モデル) |
| 04 | WHICH | どのパターンをいつ選ぶか |
| 05 | REALITY | 現実の制約にどう向き合うか |
| 06 | EXTENSION | 物理世界での拡張 |
| 07 | DOCTRINE | 何を基準に判断するか |
| 08 | MEMORY | 何を記憶し、どう接続するか |

# レイヤーモデル

本サイトは 5 層モデルを採用 (三層モデル + Memory 層 + Doctrine 層)。

| レイヤー | 役割 | 色 (Mermaid `fill`) |
| --- | --- | --- |
| **Doctrine** | 制約・目的・判断基準 | `#FFE4B5` (薄橙) |
| **Agent** | タスク理解・オーケストレーション | `#87CEEB` (水色) |
| **Skills** | 静的知識・ガイドライン | `#90EE90` (薄緑) |
| **Memory** | 永続化された記憶・関係性 | `#E6E6FA` (Lavender) |
| **MCP** | 外部システムへの接続 | `#FFB6C1` (ピンク) |

> [!IMPORTANT]
> Mermaid 図で 5 層に言及する場合は、上記の色を必ず使用する。ダークモード対策として `color:#333` または `color:#000` を明示する。

# ツール利用方針

- Mermaid 図の生成には mcp-mermaid を使用すること
- 棒グラフには `xychart`（`xychart-beta` ではなく）を使用する
- 翻訳品質チェックは `/check-translation` コマンド (`.claude/commands/check-translation.md`) を使用

# Mermaid 図のスタイル規約

## ノード形状

- 構造的概念 (層、エンティティ): 四角形 `["テキスト"]`
- 実装単位・コンポーネント: 四角形
- アクション・フロー結果: 丸角 `(["テキスト"])` または `{条件}`

## レイヤー別配色 (上記「レイヤーモデル」と一致)

```
style AGENT fill:#87CEEB,color:#333,stroke:#333
style SKILLS fill:#90EE90,color:#333,stroke:#333
style MCP fill:#FFB6C1,color:#333,stroke:#333
style MEMORY fill:#E6E6FA,color:#333,stroke:#333
style DOCTRINE fill:#FFE4B5,color:#333,stroke:#333
```

## 補助色

| 用途 | カラー | Mermaid `fill` |
| --- | --- | --- |
| 警告・問題 (Anti-pattern等) | 薄赤 | `#fee2e2,stroke:#b91c1c,color:#000` |
| 注意・トレードオフ | 薄橙 | `#fef9c3,stroke:#a16207,color:#000` |
| 良い例・推奨 | 薄緑 | `#dcfce7,stroke:#15803d,color:#000` |
| 情報・補足 | 薄青 | `#dbeafe,stroke:#1d4ed8,color:#000` |

## ダークモード対策

- すべてのカスタムスタイルに `color:#000` または `color:#333` を明示する (ダークモードでテキストが見えなくなるのを防止)

# GitHub Alerts 構文

- 強調ブロックには GitHub の Alerts 構文を使用する (素の `> ` blockquote は使わない)
- ナビゲーション (`> **次へ**:` / `> **前へ**:`) と参照リンクは素の blockquote のまま
- 使い分け:
  - `[!NOTE]` — ページ冒頭の定義・概要、補足情報
  - `[!TIP]` — 実践的なヒント、開発者向けアナロジー、3 行回答
  - `[!IMPORTANT]` — 設計根拠 (Why)、重要な判断基準、本番運用上の重要事項
  - `[!WARNING]` — 注意すべき制約や落とし穴
  - `[!CAUTION]` — 重大なリスクや禁止事項

# Concepts セクション専用フォーマット

`docs/(ja/)concepts/0X-*.md` の各章は以下の構造を必ず持つ:

1. `# タイトル — サブタイトル` (h1)
2. `> キャッチフレーズ` (blockquote)
3. `## このドキュメントについて` (背景・対象読者)
4. `> **対象読者**:` (blockquote)
5. `::: warning このページの位置づけ` (シリーズチェーンを示す)
6. `::: details メタ情報` (固定するもの / 扱わないこと / 依存 / 誤用ポイント)
7. `## ドキュメントシリーズにおける位置づけ` (Mermaid 図)
8. 本論
9. `## 関連ドキュメント`
10. `## 🔗 さらに深く: ...` (姉妹サイトへの導線)
11. 末尾ナビゲーション (`> **前へ**:` / `> **次へ**:`)

# 規範強度ラダー (RFC 2119)

本サイトのドキュメントでは規範キーワードを以下の強度で使用する。

| キーワード | 強度 | 意味 |
| --- | --- | --- |
| **MUST** / **SHALL** | 必須 | 絶対的な要件、違反は設計上の欠陥 |
| **MUST NOT** / **SHALL NOT** | 禁止 | 絶対的な禁止事項 |
| **SHOULD** | 推奨 | 正当な理由がある場合のみ逸脱可能 |
| **SHOULD NOT** | 非推奨 | 正当な理由がある場合のみ採用可能 |
| **MAY** | 任意 | 完全に選択的 |

Skills の合格基準、Sub-agent 品質ゲートの判定基準等で使用する。

# 姉妹サイトとの相互リンク

本サイトのページに「**なぜそうなるか (Why)**」を扱うセクションがある場合は、姉妹サイト [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/) への導線を末尾に追加する。

形式:

```markdown
## 🔗 さらに深く: なぜ XXX が必要なのか

本ページは XXX の **構造 (What/How)** を扱った。「**なぜ** XXX が必要なのか」を LLM の構造的制約から理解したい場合は、姉妹サイトを参照。

- [understanding-llm / Part N: TITLE](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/PATH) — 簡潔な説明
```

逆に、本サイト独自の実装パターンや 2026 年現在の運用知見については、姉妹サイトからの導線を受ける側になる。

# 参考文献の体裁

- 形式: `著者名 (年). "論文タイトル / 記事タイトル." 出典. [リンクテキスト](URL) — 補足説明`
- 英語版は英語の補足説明、日本語版は日本語の補足説明を使う
- arXiv、Linux Foundation、OpenID Foundation、Zenn 等のリンクがある場合は必ず付与する
- 例: `takanorisuzuki (2026). "AIエージェントが毎回データを取りに行く設計の限界." Zenn. [zenn.dev/knowledge_graph](https://zenn.dev/knowledge_graph/articles/kg-agent-memory-first-design) — scatter-gather 問題と Memory-first 設計`

# ページ構成ルール (全ページ共通)

- 各ページの末尾に `---` + 前後ナビゲーションを配置する
  - `> **次へ**: [ページ名](ファイル名.md)`
  - `> **前へ**: [ページ名](ファイル名.md)`
- Discussion / 出典リンクがある場合はナビゲーションの下に配置する
- 末尾に「**最終更新**: YYYY年MM月」を入れる場合は、変更時に必ず更新する

# 関連リポジトリ (MCP / Skill / Plugin)

本サイトで言及する MCP サーバは shuji-bonji 製のものを優先。執筆中に MCP を例示する場合は以下を参照:

- [rfcxml-mcp](https://github.com/shuji-bonji/rfcxml-mcp) — IETF RFC
- [xcomet-mcp-server](https://github.com/shuji-bonji/xcomet-mcp-server) — 翻訳品質評価
- [w3c-mcp](https://github.com/shuji-bonji/w3c-mcp) — W3C/WHATWG
- [epsg-mcp](https://github.com/shuji-bonji/epsg-mcp) — EPSG
- [pdf-spec-mcp](https://github.com/shuji-bonji/pdf-spec-mcp) — PDF 仕様
- [pdf-reader-mcp](https://github.com/shuji-bonji/pdf-reader-mcp) — PDF 解析
- [deepl-glossary-translation](https://github.com/shuji-bonji/deepl-glossary-translation) — Skill
- [code-review-skill](https://github.com/shuji-bonji/code-review-skill) — Skill
- [spec-compliance-skills](https://github.com/shuji-bonji/spec-compliance-skills) — Cowork Plugin
