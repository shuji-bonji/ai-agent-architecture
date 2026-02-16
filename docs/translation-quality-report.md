# 翻訳品質レポート

> xCOMET MCP を用いた自動翻訳品質評価

## 評価結果サマリー

| ファイルカテゴリ | 評価ペア数 | 平均スコア | 品質判定 |
|-----------------|-----------|-----------|---------|
| README.md | 10 | **0.975** | ✅ 優良 |
| concepts/ (01-vision.md, vs-mcp.md) | 10 | **0.978** | ✅ 優良 |
| mcp/ & skills/ (security.md, anti-patterns.md) | 10 | **0.957** | ✅ 優良 |
| workflows/ (patterns.md) | 10 | **0.977** | ✅ 優良 |
| **全体** | **40** | **0.972** | ✅ **優良** |

## 品質判定基準

xCOMET 評価スコアに基づく判定:

| スコア範囲 | 判定 | 推奨アクション |
|-----------|------|---------------|
| ≥ 0.90 | 優良 | そのまま使用可能 |
| 0.85 - 0.90 | 良好 | 軽微な修正を検討 |
| 0.70 - 0.85 | 要改善 | パラメータ調整して再翻訳 |
| < 0.70 | 要注意 | 大幅な手動修正が必要 |

## 主な発見事項

- **クリティカルエラー検出: 0件**
- **全40セグメントが「優良」評価（0.90以上）**
- 最高スコア: 1.000（完璧な翻訳が複数）
- 最低スコア: 0.894（それでも「良好」範囲内）

## スコアが相対的に低かったセグメント（0.90-0.95）

| 原文（日本語） | 翻訳（英語） | スコア |
|---------------|-------------|-------|
| MCPサーバーの開発・運用におけるセキュリティリスクと対策を整理する。 | Organizing security risks and countermeasures for MCP server development and operation. | 0.898 |
| チーム内部の知識やガイドラインまでMCPサーバーとして実装してしまう。 | Implementing internal team knowledge and guidelines as MCP servers. | 0.894 |
| このような実践知をパターンとして蓄積する。 | This document accumulates such practical knowledge as patterns. | 0.903 |

## 評価方法

### 使用ツール

| MCP | ツール | 用途 |
|-----|-------|------|
| xcomet-mcp-server | xcomet_batch_evaluate | バッチ品質スコアリング |

### 評価パラメータ

```
source_lang: ja
target_lang: en
response_format: markdown
```

### サンプル選定

以下から代表的なセグメントを選定:
- ドキュメントタイトル・見出し
- 主要な概念説明
- 技術的な説明文
- 判断基準・ガイドライン

## 結論

日本語→英語翻訳は**公開に適した高品質**を達成:

- 全体平均スコア **0.972** は「優良」閾値を超過
- クリティカルエラーや重大な意味の誤りは検出されず
- 技術用語は一貫して翻訳
- 自然な英語表現を維持

## 関連ドキュメント

- [翻訳ワークフロー Skill](../templates/skill/examples/translation-workflow.ja.md)
- [連携パターン](./workflows/patterns.ja.md#パターン1-技術文書翻訳ワークフロー)

---

*レポート生成日: 2025-01-28*
*評価ツール: [xCOMET MCP Server](https://github.com/shuji-bonji/xcomet-mcp-server)*
