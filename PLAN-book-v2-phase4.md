# book-v2 フェーズ4指示書 — 第IV部周辺・付録のリンクと層用語の整合

作業ブランチ: `rewrite/book-v2`（`main` は変更しない）
必読: `AGENTS.md` → `PLAN-book-v2.md` → `PLAN-book-v2-phase3.md` → `CLAUDE.md`
本指示と衝突する場合は、本指示を優先する。

## 目的

フェーズ3で第III部（skills / mcp / agents）の中核は揃えた。
本フェーズでは、まだ旧パス・旧「三層」が残っている **第IV部周辺と付録** を、同じ基準で揃える。

やること:

1. 旧 `concepts/0x` リンクを新パスへ直す
2. 本書の層モデルを指す「三層」を「五層」へ直す
3. 明らかなですます調を常体へ直す（コード例・引用・チェックリスト・反例文は除く）
4. 英語ページを対称に更新する

やらないこと:

- strategy / workflows の全文再執筆
- `part-4/patterns` と `strategy/composition-patterns` の本文統合
- hooks ページの新規追加（→ フェーズ5）
- How-to 群の構成テンプレ破棄
- `main` へのマージ
- サイドバー構造の再設計（フェーズ2で完了済み）

## 対象ディレクトリ

優先順:

1. `docs/ja/strategy/**` と `docs/strategy/**`
2. `docs/ja/workflows/**` と `docs/workflows/**`
3. `docs/ja/information/**` と `docs/information/**`
4. `docs/ja/faq/**` と `docs/faq/**`（scope は既に縮小済み。リンクだけ追随）
5. 必要なら `docs/ja/README.md` / `docs/README.md` の旧パス表

対象外（触らない）:

- `docs/ja/preface.md`、`part-1`〜`part-4` の本論の論理改稿
- `docs/ja/skills/**` `mcp/**` `agents/**`（フェーズ3済み。明らかな取りこぼし1件だけなら直してよい）
- `concepts/*` リダイレクトスタブの削除

## パス対応表（必須）

| 旧                                   | 新                            |
| ------------------------------------ | ----------------------------- |
| `concepts/01-vision`                 | `part-1/constraints`          |
| `concepts/02-reference-sources`      | `part-2/placement`            |
| `concepts/03-architecture`           | `part-2/layers`               |
| `concepts/04-ai-design-patterns`     | `part-4/patterns`             |
| `concepts/05-solving-ai-limitations` | `part-4/limits`               |
| `concepts/06-physical-ai`            | `part-4/physical`             |
| `concepts/07-doctrine-and-intent`    | `part-3/doctrine`             |
| `concepts/08-memory-and-knowledge`   | `part-3/memory`               |
| `concepts/09-prompt-decomposition`   | `part-4/prompt-decomposition` |

リンクテキストも「Concepts 03」「三層モデル」など旧称のままにしない。
例: 「[II.1 五層](../part-2/layers)」

## 「三層」の扱い

置き換えるもの（本書の層モデル）:

- 「三層アーキテクチャ（Agent / Skills / MCP）」
- 「三層モデル」が Doctrine / Memory を含まない旧図を指す場合
- `concepts/03-architecture` への「全体アーキテクチャ」リンク文言

置き換えないもの（別物）:

- A2A の Build / Equip / Communicate
- MCP + A2A + Agent ID の接続構成
- テストの「ユニット / 統合 / E2E」など、層モデル以外の三層
- Skill / サブエージェント / MCP の三つ組（「五層」と呼ばない）

## 文体

- 本文の「です／ます」を常体へ。説明の「である／する／置く」に揃える
- チェックリスト項目、コードコメント、引用ブロックは無理に書き換えない
- 絵文字見出し（🔗 など）が残っていれば、書籍調の見出しに直してよい（削除して「関連ドキュメント」に統合してもよい）

## `PLAN-book-v2.md` の更新

フェーズ表に次を追記する。

| #   | 内容                             | 備考                            |
| --- | -------------------------------- | ------------------------------- |
| 11  | 第IV部周辺・付録のリンクと層用語 | 詳細は `PLAN-book-v2-phase4.md` |

## 検証

1. 対象ディレクトリで `concepts/0[1-9]` へのリンクが残っていない（スタブ自身を除く）
2. 本書の層を指す「三層アーキテクチャ」が、対象ディレクトリに残っていない
3. 日英で同じパス修正が入っている
4. 可能なら文書ビルドが通る

## 終了条件と報告

終了条件:

- 上記対象の旧パスが新パスへ置換されている
- 層モデルの「三層」が「五層」へ置換されている（例外規定を除く）
- パス移動・新章追加をしていない
- `PLAN-book-v2.md` にフェーズ11が追記されている

報告:

1. 変更ファイル一覧
2. 置換したリンクの件数感（おおよそでよい）
3. 意図的に残した「三層」の箇所
4. ビルド結果
5. 残課題（hooks はフェーズ5、How-to 全文常体化は別、と明記）
