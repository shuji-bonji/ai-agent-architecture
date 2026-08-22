---
layout: home
title: LLMエージェントの設計
description: 基盤モデルを推論の中核とするエージェントの設計。制約を前提に、Doctrine / Agent / Skills / Memory / MCP の 5 層へ置く。

hero:
  name: LLMエージェントの設計
  text: LLM Agent Design Architecture
  tagline: 基盤モデルの構造的制約を前提とした、エージェント設計の文書。
  actions:
    - theme: brand
      text: 序章を読む
      link: /ja/preface
    - theme: alt
      text: MCPとは
      link: /ja/mcp/what-is-mcp
    - theme: alt
      text: Skillsとは
      link: /ja/skills/what-is-skills
    - theme: alt
      text: GitHub で見る
      link: https://github.com/shuji-bonji/ai-agent-architecture

features:
  - title: 序章
    details: 本書が答える問い、対象とする 5 層、扱わないもの、読者、構成を定義する。
    link: /ja/preface
    linkText: 序章を読む
  - title: 制約の要約
    details: 設計の前提となる構造的制約を要約する。機序の詳細は姉妹資料が担う。
    link: /ja/concepts/01-vision
    linkText: 現行の前提ページ
  - title: 五層
    details: Doctrine / Agent / Skills / Memory / MCP の責務分離と配置基準。
    link: /ja/concepts/03-architecture
    linkText: 現行の構成ページ
  - title: Skills
    details: 静的な知識とガイドラインを置く層。
    link: /ja/skills/what-is-skills
    linkText: Skills を読む
  - title: MCP
    details: 外部システムへの接続を置く層。
    link: /ja/mcp/what-is-mcp
    linkText: MCP を読む
  - title: Agent
    details: タスク理解とオーケストレーションを置く層。
    link: /ja/agents/
    linkText: Agent を読む
---

本書の日本語書名は **LLMエージェントの設計** である。英語書名は **LLM Agent Design Architecture** である。

本書は、基盤モデルを推論の中核とするエージェントの設計を扱う。実行手順書ではない。論理の起点は、LLM（基盤モデル）の構造的制約である。

範囲、読者、隣接資料、構成は [序章](./preface) で定義する。

[ハーネス](./glossary#harness) は、エージェントを動かすための機構である。本書は設計の文書である。対応関係は [Harness Engineering との対応関係](/ja/strategy/harness-engineering-mapping) を参照する。

## 隣接する資料

| 関心 | 資料 | 役割 |
| --- | --- | --- |
| 理解する（制約の由来） | [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/) | Why |
| 設計する | 本書 | What / How |
| 運用へ適用する | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services) | 準備中 |

<div style="text-align: center; padding: 1.5rem 2rem; margin-top: 1rem; color: var(--vp-c-text-2); font-size: 0.9em; max-width: 720px; margin-left: auto; margin-right: auto;">

本ドキュメントは、著者がエージェントを組み立てる過程で得た実践知をまとめたものである。Anthropic その他の組織の公式文書ではない。指摘と議論は [GitHub Issues](https://github.com/shuji-bonji/ai-agent-architecture/issues) で受け付ける。

</div>
