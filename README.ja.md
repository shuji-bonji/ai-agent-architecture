# LLMエージェントの設計

[English](./README.md)

英語書名 **LLM Agent Design Architecture**。LLM を中心にしたエージェントの設計の文書である。製品の操作手順ではない。

サイト: [https://shuji-bonji.github.io/ai-agent-architecture/ja/](https://shuji-bonji.github.io/ai-agent-architecture/ja/)

## 姉妹資料

| 関心 | 資料 |
| --- | --- |
| 理解する（限界の由来） | [understanding-llm-through-claude-code](https://github.com/shuji-bonji/understanding-llm-through-claude-code) |
| 設計する | このリポジトリ |
| 運用へ適用する | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services)（準備中） |

## 読む順

| 部 | 内容 |
| --- | --- |
| 序章 | 問いと範囲 |
| 第I部 | 制約の要約 |
| 第II部 | 五層と配置基準 |
| 第III部 | Skills / MCP / Doctrine / Memory / Agent |
| 第IV部 | パターン、限界、物理世界、プロンプトの分解 |

How-to、カタログ、ショーケース、strategy、workflows のパスは維持する。

## 五層

| 層 | 担当 |
| --- | --- |
| **Doctrine** | 目的、禁止、優先順位 |
| **Agent** | 作業の理解と組み合わせ |
| **Skills** | 変わらない知識と手順 |
| **Memory** | 残す記憶と関係 |
| **MCP** | 外のシステムへの接続 |

五層は担当の分け方である。サーバの台数の図ではない。

## 範囲

本書が扱う AI は、主に LLM である。強化学習や昔の規則ベースは扱わない。定義は [序章](https://shuji-bonji.github.io/ai-agent-architecture/ja/preface) にある。

以前の書名は AI Agent Architecture だった。入口には使わない。

## ライセンス

MIT
