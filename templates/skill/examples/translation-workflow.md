---
name: translation-workflow
description: 技術文書の翻訳ワークフローと品質基準
---

# 技術文書翻訳ワークフロー Skill

## 概要

技術文書を正確かつ読みやすく翻訳するためのワークフロー。機械翻訳と品質評価を組み合わせ、一定の品質を担保する。

## 対象

- READMEやドキュメントの翻訳
- 技術記事の多言語化
- APIドキュメントの翻訳

## 使用MCP

| MCP | ツール | 用途 |
| --- | ------ | ---- |
| deepl | translate-text | テキスト翻訳 |
| deepl | get-glossary-info | 用語集の参照 |
| xcomet | xcomet_evaluate | 翻訳品質スコア算出 |
| xcomet | xcomet_detect_errors | エラー箇所の検出 |

## ワークフロー

### 1. 翻訳の実行

```
deepl:translate-text で翻訳
- formality: "more"（技術文書向け）
- preserve_formatting: true
```

用語集がある場合は事前に `get-glossary-info` で確認。

### 2. 品質評価

```
xcomet:xcomet_evaluate で品質スコアを取得
```

### 3. 結果に応じた対応

スコアに基づいて次のアクションを決定。

### 4. エラー検出（必要に応じて）

```
xcomet:xcomet_detect_errors で問題箇所を特定
```

## 判断基準

| 条件 | アクション |
| ---- | ---------- |
| スコア >= 0.90 | そのまま使用 |
| 0.85 <= スコア < 0.90 | 軽微な修正を検討 |
| 0.70 <= スコア < 0.85 | パラメータ調整して再翻訳 |
| スコア < 0.70 | 手動での大幅修正が必要 |

## 注意事項

- 技術用語は用語集で統一する
- コードブロック内は翻訳しない
- 固有名詞（プロダクト名等）は原文維持

## 参考資料

- [DeepL API Documentation](https://developers.deepl.com/docs)
- [xCOMET MCP Server](https://github.com/shuji-bonji/xcomet-mcp-server)
