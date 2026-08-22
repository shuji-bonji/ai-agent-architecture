# プロジェクト概要

このリポジトリは『LLMエージェントの設計』（英語書名 LLM Agent Design Architecture）の多言語ドキュメントサイトである。公開 URL は維持する。リポジトリ名は変えない。

方針は `AGENTS.md` が優先する。v2 の論理原稿は日本語を先に確定し、英語はそれに対応させる。サイトの locale は `docs/` = 英語、`docs/ja/` = 日本語のままである。

姉妹プロジェクト: [understanding-llm-through-claude-code](https://github.com/shuji-bonji/understanding-llm-through-claude-code)（LLM の構造的制約 = Why）。本書は What / How の設計である。

骨格の読み順:

| 部 | 内容 | 主なパス |
| --- | --- | --- |
| 序章 | 問いと範囲 | `preface.md` |
| 第I部 | 制約の要約 | `part-1/constraints.md` |
| 第II部 | 五層と配置基準 | `part-2/layers.md`, `part-2/placement.md` |
| 第III部 | Skills / MCP / Doctrine / Memory / Agent | `skills/what-is-skills.md`, `mcp/what-is-mcp.md`, `part-3/doctrine.md`, `part-3/memory.md`, `agents/index.md` |
| 第IV部 | パターン、限界、物理世界、プロンプトの分解 | `part-4/*.md` |

`docs/(ja/)concepts/01`–`09` と `concepts/index` は旧 URL のリダイレクトである。How-to、カタログ、ショーケース、strategy、workflows はパスを維持する。

# 言語・文体ルール

- 専門用語（MCP, Skills, Sub-agent, A2A, Agent ID, Knowledge Graph 等）は両言語とも英語のまま使用する
- コード例やツール名（`SKILL.md`, `.claude/agents/`, `mcp__xcomet__*` 等）もそのまま表記する
- 日本語本文は常体（である調）。語尾は「である」の連続を避け、「する／置く／残る／足りる」で散らす
- 入口は場面から入る。漢語が先に来ないようにする。口語（腹落ち、逆に言えば、調べて来られた方へ）、絵文字、記号だけの断言は使わない
- 英語は同等の内容を、英語の技術書として書く。口語のキャッチコピーを本文の論理にしない
- カタカナ表記の専門用語（サブエージェント、エージェント、ドメイン等）は日本語版で文脈に応じて使用可
- MUST / SHOULD は RFC 2119 の意味で使う。本文では「しなければならない」「するのがよい」（英語では must / should）を併記する

# i18n ルール

- ディレクトリ構成: `docs/` = English, `docs/ja/` = 日本語
- 各英語ページの先頭に `🌐 [日本語](../ja/SECTION/FILENAME.md)` を配置しない (VitePress の locale switcher で代替)
- `README.md` = English, `README.ja.md` = 日本語
- 英語版のナビゲーション: `> **Next**:` / `> **Previous**:`
- 日本語版のナビゲーション: `> **次へ**:` / `> **前へ**:`
- 英語版のリンクは `docs/` 配下、日本語版のリンクは `docs/ja/` 配下を指す
- 同一ページの英日両方を必ず対称に更新する (片方だけ更新は禁止)
- パス移動は英日同時。英語本文が未完でも、旧パスにスタブを置く

# レイヤーモデル

5 層（Doctrine / Agent / Skills / Memory / MCP）。三層に戻さない。

| レイヤー | 役割 | 色 (Mermaid `fill`) |
| --- | --- | --- |
| **Doctrine** | 目的・禁止・優先順位 | `#FFE4B5` (薄橙) |
| **Agent** | 作業の理解と割り振り | `#87CEEB` (水色) |
| **Skills** | 変わらない知識と手順 | `#90EE90` (薄緑) |
| **Memory** | 残す記憶と関係 | `#E6E6FA` (Lavender) |
| **MCP** | 外のシステムへの接続 | `#FFB6C1` (ピンク) |

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

# 書籍の章の形式

`preface.md` と `part-*`、および第III部の入口（`skills/what-is-skills.md`, `mcp/what-is-mcp.md`, `agents/index.md`）は書籍の章である。Concepts シリーズのテンプレ（キャッチフレーズ、`::: warning` 位置づけ、`::: details` メタ情報）は適用しない。

1. `# 部番号と題` (h1)
2. `> [!NOTE]` で位置づけ
3. 本論（場面から入り、担当で切る）
4. `## 関連ドキュメント`（任意）
5. 末尾ナビゲーション (`> **前へ**:` / `> **次へ**:`)

How-to、カタログ、strategy、workflows は既存のページ形式を維持してよい。

# 規範強度ラダー (RFC 2119)

本サイトのドキュメントでは規範キーワードを以下の強度で使用する。

| キーワード | 強度 | 意味 |
| --- | --- | --- |
| **MUST** / **SHALL** | 必須 | 絶対的な要件、違反は設計上の欠陥 |
| **MUST NOT** / **SHALL NOT** | 禁止 | 絶対的な禁止事項 |
| **SHOULD** | 推奨 | 正当な理由がある場合のみ逸脱可能 |
| **SHOULD NOT** | 非推奨 | 正当な理由がある場合のみ採用可能 |
| **MAY** | 任意 | 完全に選択的 |

Skills の合格基準、Sub-agent 品質ゲートの判定基準等で使用する。本文では記号だけに意味を預けない。

# 姉妹サイトとの相互リンク

本サイトのページに「**なぜそうなるか (Why)**」を扱う箇所がある場合は、姉妹サイト [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/) への導線を置く。書籍の章では絵文字見出しは使わない。

逆に、本サイト独自の実装パターンや運用知見については、姉妹サイトからの導線を受ける側になる。

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
