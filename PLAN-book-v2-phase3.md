# book-v2 フェーズ3指示書 — 第III部周辺の書籍整合

作業ブランチ: `rewrite/book-v2`（`main` は変更しない）
必読: `AGENTS.md` → `PLAN-book-v2.md` → `PLAN-book-v2-phase2.md` → `CLAUDE.md`
本指示と衝突する場合は、本指示を優先する。

## 目的

骨格と目次は既にある。本フェーズでは、第III部配下の実務ページを
本書の層モデル・パス・文体へ揃える。全文の再執筆はしない。

やること:

1. 本書の層を指す「三層」を「五層」へ直す
2. 旧 `concepts/0x` リンクを新パスへ直す
3. 残っているですます調を常体へ直す（コード例・引用・アンチパターンの反例は除く）
4. 英語ページを対称に更新する

やらないこと:

- How-to / カタログの構成テンプレの破棄
- `strategy/` `workflows/` FAQ の常体化（次フェーズ）
- `strategy/composition-patterns` と `part-4/patterns` の本文統合
- `main` へのマージ

## 対象

`docs/ja/{skills,mcp,agents}/**` と英語対応。入口（what-is-skills / what-is-mcp / agents/index）は改稿済みなので、リンクと用語の追随だけにする。

スタブ（`skills/overview.md`）は常体の一文に直してよい。

## 三層の扱い

置き換えるもの（本書の層モデル）:

- 「三層アーキテクチャ（Agent / Skills / MCP）」→ 五層（Doctrine / Agent / Skills / Memory / MCP）
- `concepts/03-architecture` への「全体アーキテクチャ」リンク → `part-2/layers`

置き換えないもの（別物の三層）:

- A2A の Build / Equip / Communicate
- MCP + A2A + Agent ID の接続構成
- Skill / サブエージェント / MCP の三つ組（「五層」と呼ばない。「3つの要素」等で層モデルと混ぜない）

## パス対応

| 旧 | 新 |
| --- | --- |
| `concepts/03-architecture` | `part-2/layers` |
| `concepts/02-reference-sources` | `part-2/placement` |
| `concepts/07-doctrine-and-intent` | `part-3/doctrine` |
| `concepts/08-memory-and-knowledge` | `part-3/memory` |

## `PLAN-book-v2.md` の更新

フェーズ表にフェーズ10を追記する。範囲の正本は本ファイルである。
