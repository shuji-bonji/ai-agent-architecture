---
name: translation-quality
description: xCOMET を使用した翻訳品質チェックのワークフローと基準
version: 1.0.0
owner: '@shuji-bonji'
last_reviewed: 2026-01-28
---

# 翻訳品質チェック Skill

## 目的

ドキュメントや技術コンテンツの日本語→英語翻訳の高品質を確保する。この Skill は翻訳品質を評価・改善するための標準化された基準とワークフローを提供する。

### なぜこの Skill が必要か？

- すべての翻訳ドキュメントで一貫した品質基準
- 公開前の自動品質ゲート
- 低品質翻訳に対する明確な修正ワークフロー

## MCP ツール

| MCP    | ツール                | 目的                     |
| ------ | --------------------- | ------------------------ |
| xcomet | xcomet_evaluate       | 単一ペアの品質スコア計算 |
| xcomet | xcomet_detect_errors  | 重大度付きエラー箇所検出 |
| xcomet | xcomet_batch_evaluate | 複数ペアの効率的な評価   |
| deepl  | translate-text        | 品質不良時の再翻訳       |

## 品質基準

| スコア    | 評価            | アクション           |
| --------- | --------------- | -------------------- |
| 0.95+     | ⭐⭐⭐⭐⭐ 優良 | 公開可能             |
| 0.85-0.94 | ⭐⭐⭐⭐ 良好   | 軽微なレビュー推奨   |
| 0.70-0.84 | ⭐⭐⭐ 許容範囲 | レビューと改善が必要 |
| < 0.70    | ⭐⭐ 不良       | 再翻訳が必要         |

## ワークフロー

### ステップ1: 翻訳ペアの特定

ソース（日本語）とターゲット（英語）のドキュメントペアを特定

```
docs/skills/overview.ja.md  ←→  docs/skills/overview.md
README.ja.md                ←→  README.md
```

### ステップ2: 品質評価

単一ドキュメントの場合、

```
xcomet:xcomet_evaluate
  - source: 日本語テキスト
  - translation: 英語テキスト
  - source_lang: ja
  - target_lang: en
```

複数ドキュメント（5ペア以上）の場合、

```
xcomet:xcomet_batch_evaluate
  - pairs: [{source, translation}, ...]
  - source_lang: ja
  - target_lang: en
```

### ステップ3: 結果分析

スコアが 0.85 未満の場合、

```
xcomet:xcomet_detect_errors
  - source: 日本語テキスト
  - translation: 英語テキスト
  - min_severity: minor
```

### ステップ4: 修正

| 条件                          | アクション                    |
| ----------------------------- | ----------------------------- |
| スコア < 0.70                 | deepl:translate-text で再翻訳 |
| スコア 0.70-0.84 でエラーあり | 特定のエラー箇所を修正        |
| スコア 0.85+ で軽微な問題     | 任意で改善                    |

## 判定基準

| 条件                        | アクション       | 理由             |
| --------------------------- | ---------------- | ---------------- |
| 全スコア ≥ 0.95             | 公開承認         | 優良品質         |
| 平均 ≥ 0.85、重大エラーなし | 注記付き承認     | 十分な品質       |
| いずれかのスコア < 0.70     | 公開ブロック     | 品質ゲート不合格 |
| 重大エラー検出              | 手動レビュー必要 | 意味的な問題     |

## 使用例

### 例1: 単一ドキュメントチェック

**入力：**

```
ソース（JA）: MCPだけでは不十分
翻訳（EN）: MCP alone is not enough
```

**処理：**

1. source_lang=ja, target_lang=en で xcomet_evaluate を呼び出し
2. スコア: 0.973（優良）
3. 結果: 公開可能

### 例2: バッチチェック

**入力：**

```json
[
	{ "source": "設計思想", "translation": "Design principles" },
	{ "source": "実践ノウハウ", "translation": "Practical knowledge" }
]
```

**処理：**

1. xcomet_batch_evaluate を呼び出し
2. 平均: 0.95+
3. 結果: 全ペア準備完了

### 例3: 低品質検出

**入力：**

```
ソース（JA）: エージェント側でのカスタマイズが困難
翻訳（EN）: Customization difficult agent side
```

**処理：**

1. xcomet_evaluate → スコア: 0.65（不良）
2. xcomet_detect_errors → 文法問題を検出
3. deepl で再翻訳
4. 再評価 → スコア: 0.92（良好）

## アンチパターン

### ❌ バッチ評価をスキップ

**問題のあるアプローチ：**

```
# 20ペアを1つずつ評価
for each pair:
    xcomet_evaluate(pair)  # 非効率
```

**正しいアプローチ：**

```
# 5ペア以上はバッチを使用
xcomet_batch_evaluate(all_pairs)  # 効率的
```

### ❌ エラー重大度を無視

**問題のあるアプローチ：**

```
スコアは0.80、エラー表示なし → 承認
```

**正しいアプローチ：**

```
スコアが0.80 → xcomet_detect_errors を実行
承認前に重大/主要エラーをチェック
```

## 関連MCP

| MCP    | 用途     | 必要性 |
| ------ | -------- | ------ |
| xcomet | 品質評価 | 必須   |
| deepl  | 再翻訳   | 推奨   |

## 参考資料

- [xCOMET MCP Server](https://github.com/shuji-bonji/xcomet-mcp-server)
- [DeepL MCP](https://github.com/anthropics/claude-code-deepl)
- [翻訳ワークフローパターン](../../docs/workflows/patterns.ja.md)
