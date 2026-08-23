# book-v2 移行計画

作業ブランチ: `rewrite/book-v2`。方針は `AGENTS.md`。論理の骨格は `docs/ja/preface.md`。本ファイルはリポジトリ上の地図である。公開サイトには出さない。

承認単位は、第III部に入る前に迷わない粒度である。第III部以降で章を分割するときは、本文草案ではなく本表を更新する。

## 非目標

この改定では次を行わない。

- リポジトリの分割、リポジトリ名の変更、公開 URL の破壊
- 実践例（自作 MCP / Skills / ショーケース）の削除
- ハーネス製品の操作マニュアル化
- 層モデルの再発明、空テンプレートへの置き換え
- App Builder によるサイト再実装
- 情報ガバナンスの制度設計
- 英語本文の先行執筆（パス移動時のスタブを除く）

## 目標目次

タイトルはここで固定する。ファイル名の番号（01, 02, …）は継承しない。

| 部 | 章 | タイトル |
| --- | --- | --- |
| 序章 | — | 本書の問いと範囲 |
| 第I部 前提 | I.1 | 制約の要約 |
| 第II部 モデル | II.1 | 五層 |
|  | II.2 | 配置基準 |
| 第III部 各層 | III.1 | Skills |
|  | III.2 | MCP |
|  | III.3 | Doctrine |
|  | III.4 | Memory |
|  | III.5 | Agent |
| 第IV部 構成と展開 | IV.1 | パターン |
|  | IV.2 | 限界 |
|  | IV.3 | 物理世界 |
|  | IV.4 | プロンプトの分解 |

英語書名は LLM Agent Design Architecture である。英語の部題はフェーズ 7 で付ける。

## パス方針

1. 骨格ページ（現行 `concepts/01`–`09`）は、書く前に新パスへ移す。旧パスはリダイレクトスタブにする。
2. 実践ディレクトリ（`skills/` `mcp/` `agents/`）はパスを維持する。`part-3/` 配下へ集めない。
3. `strategy/` `workflows/` `glossary.md` `information/` はパスを維持し、サイドバーの所属だけ変える。
4. パス移動は英日同時である。英語本文が未訳でも、旧パスにスタブを置き、新パスに「未訳・対応予定」を置く。
5. 最初のパス削除の前に、公開中の `main` へタグ `v1` を打つ。`archive/v1/` は作らない。旧 URL はスタブで残す。

新パスの接頭辞は次で固定する。

| 部 | 日本語 | 英語 |
| --- | --- | --- |
| 第I部 | `docs/ja/part-1/` | `docs/part-1/` |
| 第II部 | `docs/ja/part-2/` | `docs/part-2/` |
| 第III部（Doctrine / Memory のみ） | `docs/ja/part-3/` | `docs/part-3/` |
| 第IV部（本編 4 章） | `docs/ja/part-4/` | `docs/part-4/` |

リダイレクトの実装は、現行 `docs/ja/skills/overview.md` と同じ方式とする。旧パスにスタブを残す。

## ファイル対応表

扱いの区分:

| 記号 | 意味 |
| --- | --- |
| 改稿 | 新パスに文書体で書く。旧パスはスタブ |
| 再配置 | パスまたはサイドバーだけ動かす。本文は最小 |
| 維持 | パスも本文も維持。常体化は余力 |
| 縮小 | URL は残し、本文を短くする |
| 外す | 目次から外す。URL は残す |

### 骨格（必ず移す）

| 現行（日 / 英） | 新パス（日 / 英） | 目次 | 扱い |
| --- | --- | --- | --- |
| （新規）`ja/preface.md` | そのまま `/ja/preface` | 序章 | 改稿済み。英語はスタブのみ |
| `concepts/01-vision.md` | `part-1/constraints.md` | I.1 | 移行済み。FAQ へのスコープ委譲は外した |
| `concepts/03-architecture.md` | `part-2/layers.md` | II.1 | 移行済み。三層表記を五層に揃えた |
| `concepts/02-reference-sources.md` | `part-2/placement.md` | II.2 | 移行済み |
| `concepts/07-doctrine-and-intent.md` | `part-3/doctrine.md` | III.3 | 移行済み |
| `concepts/08-memory-and-knowledge.md` | `part-3/memory.md` | III.4 | 移行済み |
| `concepts/04-ai-design-patterns.md` | `part-4/patterns.md` | IV.1 | 移行済み |
| `concepts/05-solving-ai-limitations.md` | `part-4/limits.md` | IV.2 | 移行済み。第I部へ統合していない |
| `concepts/06-physical-ai.md` | `part-4/physical.md` | IV.3 | 移行済み |
| `concepts/09-prompt-decomposition.md` | `part-4/prompt-decomposition.md` | IV.4 | 移行済み |
| `concepts/index.md` | スタブ → `/ja/preface`（英は `/preface`） | — | 再配置 |

### 第III部（パス維持。入口だけ改稿）

| 現行 | 目次 | 扱い |
| --- | --- | --- |
| `skills/what-is-skills.md` | III.1 入口 | 改稿済み。How-to は維持 |
| `skills/creating-skills.md` ほか How-to、`vs-mcp`、`anti-patterns`、`conversation-to-skill` | III.1 周辺 | 維持 |
| `skills/showcase.md` `skill-use-cases.md` | III.1 実践 | 維持。削除しない |
| `skills/overview.md` | — | 既存スタブのまま |
| `mcp/what-is-mcp.md` | III.2 入口 | 改稿済み。カタログと開発は維持 |
| `mcp/catalog.md` `development.md` `security.md` `semantic-layer.md` | III.2 周辺 | 維持 |
| `ja/mcp/verifiable-mcp.md` | III.2 周辺 | 維持。英語ページはまだ無い |
| `agents/index.md` | III.5 入口 | 改稿済み。各論は維持 |
| `agents/agent-taxonomy.md` `what-is-subagent.md` `subagent-vs-skill.md` `subagent-quality-gate.md` `agent-teams.md` `what-is-a2a.md` `agent-identity.md` | III.5 周辺 | 維持 |

### 第IV部周辺・付録（パス維持）

| 現行 | 所属 | 扱い |
| --- | --- | --- |
| `strategy/*.md`（13 本。hooks はフェーズ 12） | 第IV部 周辺 | 再配置（サイドバー）。hooks は層ではない |
| `workflows/**` | 付録 | 維持 |
| `glossary.md` | 用語 | 維持。初出定義に追随 |
| `information/index.md` `architecture-map.md` | 隣接 | 維持。制度設計は増やさない |
| `faq/mcp-vs-skills.md` `faq/agent-vs-subagent-vs-skill.md` | 付録 | 維持 |
| `faq/scope-of-ai-agent.md` | 序章の参照 | 縮小 |
| `index.md`（ホーム） | 入口 | 改稿（書名と旧称の除去。構成の説明は序章へ） |
| `README.md` `README.ja.md` | リポジトリ入口 | 再配置（フェーズ 8） |
| `reference-selection-checklist.md` | II.2 周辺 | 維持 |
| `outputs.md` | 外す | 外す。実践カタログとして URL は残す |
| `configuring_everything-claude-code.md` | 外す | 外す。製品ツリーのメモであり本書の章ではない |
| `ja/README.md` `docs/README.md` | — | 維持 |

## リダイレクト一覧

次の旧 URL は残す。スタブ先は上表の新パスである。

| 旧（日本語） | 旧（英語） |
| --- | --- |
| `/ja/concepts/` | `/concepts/` |
| `/ja/concepts/01-vision` | `/concepts/01-vision` |
| `/ja/concepts/02-reference-sources` | `/concepts/02-reference-sources` |
| `/ja/concepts/03-architecture` | `/concepts/03-architecture` |
| `/ja/concepts/04-ai-design-patterns` | `/concepts/04-ai-design-patterns` |
| `/ja/concepts/05-solving-ai-limitations` | `/concepts/05-solving-ai-limitations` |
| `/ja/concepts/06-physical-ai` | `/concepts/06-physical-ai` |
| `/ja/concepts/07-doctrine-and-intent` | `/concepts/07-doctrine-and-intent` |
| `/ja/concepts/08-memory-and-knowledge` | `/concepts/08-memory-and-knowledge` |
| `/ja/concepts/09-prompt-decomposition` | `/concepts/09-prompt-decomposition` |

`/ja/faq/scope-of-ai-agent` と `/faq/scope-of-ai-agent` は削除しない。本文を序章への参照に縮小する。

`/ja/skills/overview` は既存どおり `/ja/skills/what-is-skills` へ残す。

## フェーズ順

各フェーズの終わりに、変更したページの目的と残課題を短く報告する。一括の全面置換はしない。

| # | 内容 | パスを動かすか | 備考 |
| --- | --- | --- | --- |
| 0 | 本計画書 | 動かさない | このファイル |
| 1 | ホーム書名 | 動かさない | 日英の `index.md`、VitePress の `title`。旧称と副題を入口から外す。CTA は序章へ |
| 2 | 第I部 | `01-vision` → `part-1/constraints` | 英日同時にスタブ。日本語を改稿。英語本文は未訳 |
| 3 | 第II部 | `03` `02` → `part-2/*` | 五層と配置基準。現行 5 層名に揃える |
| 4 | 第III部 | `07` `08` → `part-3/*`。`skills/` `mcp/` `agents/` は維持 | 入口 3 本を改稿。How-to とショーケースは維持 |
| 5 | 第IV部 | `04` `05` `06` `09` → `part-4/*` | `strategy/` はサイドバー編入のみ |
| 6 | FAQ 縮小 | 動かさない | 移行済み。`scope-of-ai-agent` は序章への短い参照 |
| 7 | 英語本文 | 動かさない（スタブを本文に置換） | 移行済み。序章〜第IV部と第III部入口 |
| 8 | `CLAUDE.md`・最終サイドバー・README | 動かさない | 移行済み |
| 9 | 既存ページの目次組み込み | 動かさない | パス維持。サイドバー再編と本論からの短い導線のみ。詳細は `PLAN-book-v2-phase2.md` |
| 10 | 第III部周辺の書籍整合 | 動かさない | 常体・五層・新パス。全文再執筆はしない。詳細は `PLAN-book-v2-phase3.md` |
| 11 | 第IV部周辺・付録のリンクと層用語 | 動かさない | 詳細は `PLAN-book-v2-phase4.md` |
| 12 | hooks を strategy に追加 | 動かさない | 詳細は `PLAN-book-v2-phase5.md`。層にはしない |

サイドバーはフェーズ 1〜5 の都度、動かしたページだけ追随する。骨格の最終形はフェーズ 8、実務ページの目次組み込みはフェーズ 9 である。

フェーズ 9 は、骨格完成後の組み込みである。パスは動かさない。サイドバーの所属と本論からの短い導線だけを変える。範囲の正本は `PLAN-book-v2-phase2.md` である。

フェーズ 10 は、第III部周辺の書籍整合である。常体・五層・新パスへ揃える。全文の再執筆はしない。範囲の正本は `PLAN-book-v2-phase3.md` である。

フェーズ 11 は、第IV部周辺と付録のリンクと層用語である。パスは動かさない。範囲の正本は `PLAN-book-v2-phase4.md` である。

フェーズ 11 の終了条件は 2026-08-23 に検証した。`strategy` / `workflows` / `information` / `faq` に、本書の層を指す旧 `concepts/0x` リンクと「三層アーキテクチャ」は残っていない。用語集（日英）に残っていた旧パス 6 件は同日に新パスへ置換した。意図的に残した「三層」は A2A の Build / Equip / Communicate、MCP + A2A + Agent ID、判定ドリフトの三層、本論での旧稿対比である。

フェーズ 12 は、hooks を strategy に1本追加する。層にはしない。範囲の正本は `PLAN-book-v2-phase5.md` である。

フェーズ 2 の直前に、公開中の `main` へ `v1` を打つ。

## 更新規則

- 正本は本ファイルである。パスを変える作業の前に対応表を更新する。
- 序章 0.6 の四部は変えない。変えるのは対応表の行だけである。
- 日本語を先に確定する。英語はフェーズ 7。ただしパス移動は英日同時である。
- 残すべき実践知と、入口の古い語りを混ぜない。後者は改稿対象の入口ページだけで捨てる。
