# book-v2 フェーズ2指示書 — 既存ページの書籍目次への組み込み

作業ブランチ: `rewrite/book-v2`（`main` は変更しない）
必読: `AGENTS.md` → `PLAN-book-v2.md` → `CLAUDE.md`
本指示と衝突する場合は、本指示を優先する（本指示はフェーズ2の範囲定義である）。

## 目的

骨格（序章〜第IV部）は既にある。本フェーズでは、横置きの既存ページを
**読む順と所属が書籍側に見える形**へ組み込む。

やることの中心は次の2点である。

1. サイドバー（日英）の再編
2. 各部の「本論」ページから、配下の実務ページへの短い導線

やらないこと:

- How-to / カタログ / strategy / workflows の全文改稿
- パスの大規模移動（`skills/` `mcp/` `agents/` `strategy/` `workflows/` は維持）
- 実践例・ショーケースの削除
- 新章の大量追加
- `main` へのマージ

## 組み込み方針

| 区分                               | 所属                       | パス             |
| ---------------------------------- | -------------------------- | ---------------- |
| Skills 入口・How-to・ショーケース  | 第III部 Skills 配下        | `skills/**` 維持 |
| MCP 入口・カタログ・セキュリティ等 | 第III部 MCP 配下           | `mcp/**` 維持    |
| Agent 入口・各論                   | 第III部 Agent 配下         | `agents/**` 維持 |
| Doctrine / Memory                  | 第III部（既存 `part-3/`）  | 変更しない       |
| `strategy/*`                       | 第IV部 周辺・展開          | パス維持         |
| `workflows/**`                     | 付録                       | パス維持         |
| `information/**` `glossary`        | 付録または用語             | パス維持         |
| `faq/*`                            | 付録 FAQ                   | パス維持         |
| 旧 `concepts/*`                    | 「旧パス」折りたたみのまま | スタブ維持       |

重複を消さない。所属と読む順を変える。

## サイドバー最終形（日本語）

`docs/.vitepress/locales/ja.ts` を次の構造に再編する。英語 `en.ts` も同じ階層にする。

1. 序章
   - 本書の問いと範囲 → `/ja/preface`
2. 第I部 前提
   - 制約の要約 → `/ja/part-1/constraints`
3. 第II部 モデル
   - 五層 → `/ja/part-2/layers`
   - 配置基準 → `/ja/part-2/placement`
4. 第III部 各層
   - Skills（本論）→ `/ja/skills/what-is-skills`
   - Skills の手順・実例（collapsed: true 可）
     - Skill設計ガイド
     - スキル作成ガイド
     - 会話からの Skill 蒸留
     - スキル導入・利用
     - 活用パターン
     - アンチパターン
     - MCP vs Skills
     - 実例ショーケース
   - MCP（本論）→ `/ja/mcp/what-is-mcp`
   - MCP の手順・カタログ（collapsed: true 可）
     - カタログ / セキュリティ / Semantic Layer / 開発
     - （日本語にあれば）verifiable-mcp
   - Doctrine → `/ja/part-3/doctrine`
   - Memory → `/ja/part-3/memory`
   - Agent（本論）→ `/ja/agents/`
   - Agent の各論（collapsed: true 可）
     - 分類 / サブエージェント / vs Skills / 品質ゲート / Teams / A2A / ID
5. 第IV部 構成と展開
   - パターン / 限界 / 物理世界 / プロンプトの分解（既存 part-4）
   - 戦略・展開（collapsed: true 可）— `strategy/*` 全12本をここへ移す
6. 付録
   - FAQ（scope / mcp-vs-skills / 4者比較）
   - 情報基盤
   - ワークフロー（development-phases / patterns 配下 / autonomous-dev）
   - 用語集
   - 成果物（outputs）— 目次から外さず付録末尾でよい
7. 旧パス（Concepts）— collapsed: true のまま維持

禁止:

- トップレベルに「MCP」「Skills」「エージェント」「戦略」「ワークフロー」を書籍目次と二重に置かない
- 実務ページを消してリンク切れを作らない

## 本論ページへの導線（短い追記のみ）

次のページの末尾「関連ドキュメント」または要約の直後に、配下への案内を **3〜6行** 追加する。長文の改稿はしない。

| ページ                             | 追記する案内の内容                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------ |
| `docs/ja/skills/what-is-skills.md` | 本論の次に読む手順・実例（creating / how-to / showcase 等）へのリンク                |
| `docs/ja/mcp/what-is-mcp.md`       | カタログ・セキュリティ・開発へのリンク                                               |
| `docs/ja/agents/index.md`          | 分類・サブエージェント・A2A 等へのリンク                                             |
| `docs/ja/part-4/patterns.md`       | 第IV部本論と `strategy/*` の関係（本論＝型、strategy＝展開・判断）を一文＋主要リンク |
| `docs/ja/part-3/doctrine.md`       | 変更不要（配下 How-to なし）                                                         |
| `docs/ja/part-3/memory.md`         | 変更不要                                                                             |

英語の対応ページにも、同じ役割の短い導線を入れる（対称更新）。

文例（日本語、常体）:

> 本章は層の定義と境界である。手順、カタログ、実例は次を見る。
>
> - …

口語・絵文字・「詳しくはこちら！」調は使わない。

## `PLAN-book-v2.md` の更新

フェーズ表の末尾に、フェーズ9として本作業を追記する。

| #   | 内容                     | 備考                                             |
| --- | ------------------------ | ------------------------------------------------ |
| 9   | 既存ページの目次組み込み | パス維持。サイドバー再編と本論からの短い導線のみ |

対応表に「サイドバー所属」列を足す必要はない。本指示書を正本にしてよい。ただし `PLAN-book-v2.md` にフェーズ9への参照を1段落で残す。

## 触ってよいファイル

- `docs/.vitepress/locales/ja.ts`
- `docs/.vitepress/locales/en.ts`
- 上表の本論ページ（日英）への短い追記
- `PLAN-book-v2.md`（フェーズ9の追記のみ）

## 触ってはいけないファイル

- `docs/ja/preface.md` および骨格本論の論理改稿
- `skills/` `mcp/` `agents/` `strategy/` `workflows/` の本文全面書き換え
- リダイレクトスタブ（`concepts/*`）の削除
- `package.json` やビルド設定の変更（サイドバー以外）

## 検証

1. `ja.ts` / `en.ts` の sidebar が、書籍目次の下に実務ページを内包している
2. トップレベルに MCP/Skills/戦略/ワークフローの二重見出しがない
3. 旧 concepts 折りたたみと FAQ・用語集が残っている
4. 本論5ページ（Skills / MCP / Agent / patterns、および英対応）に配下への短い導線がある
5. 可能なら `npm run docs:build`（またはリポジトリの文書ビルドコマンド）でエラーがないこと

## 終了条件と報告

終了条件:

- サイドバー日英が上記構造になっている
- 本論からの導線が日英で入っている
- パス移動・全文改稿をしていない
- `PLAN-book-v2.md` にフェーズ9が追記されている

報告フォーマット:

1. 変更ファイル一覧
2. サイドバーで移したグループ（III配下 / IV配下 / 付録）
3. 導線を足したページ
4. ビルド結果
5. 残課題（How-to 常体化などは次フェーズと明記）

## 明示的な非目標（次フェーズ以降）

- How-to 群の常体・文書体化
- `strategy/composition-patterns` と `part-4/patterns` の本文統合
- `main` への PR / マージ
- 公開サイトの本番切り替え
