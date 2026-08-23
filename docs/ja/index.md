---
layout: home
title: LLMエージェントの設計
description: Claude のような LLM を中心に、エージェントを長く使える形へ設計する。Doctrine / Agent / Skills / Memory / MCP の 5 層。

hero:
  name: LLMエージェントの設計
  text: LLM Agent Design Architecture
  tagline: Claude のような LLM を、長く使える形に設計する。
  actions:
    - theme: brand
      text: 序章を読む
      link: /ja/preface
    - theme: alt
      text: 五層を見る
      link: /ja/part-2/layers
    - theme: alt
      text: GitHub で見る
      link: https://github.com/shuji-bonji/ai-agent-architecture

features:
  - title: 序章
    details: 何を扱い、何を扱わないか。読者と、全体の読み方。
    link: /ja/preface
    linkText: 序章を読む
  - title: 制約の要約
    details: モデルが最初から持っている限界。なぜそうなるかの細部は姉妹資料へ。
    link: /ja/part-1/constraints
    linkText: 制約の要約を読む
  - title: 五層
    details: Doctrine / Agent / Skills / Memory / MCP。誰が何を担当するか。
    link: /ja/part-2/layers
    linkText: 五層を読む
  - title: 配置基準
    details: 何をどの層へ置くか。原文へたどれる参照の条件。
    link: /ja/part-2/placement
    linkText: 配置基準を読む
  - title: 各層（第III部）
    details: Skills / MCP / Doctrine / Memory / Agent。入口と実践ページ。
    link: /ja/skills/what-is-skills
    linkText: 第III部の入口へ
  - title: パターン（第IV部）
    details: RAG・MCP・エージェントなど、型の選び方と届く範囲。
    link: /ja/part-4/patterns
    linkText: パターンを読む
---

日本語の書名は **LLMエージェントの設計**、英語の書名は **LLM Agent Design Architecture** である。

本書が扱う AI は、主に LLM（大規模言語モデル）である。Claude の中身がこれに当たる。それらしい答えは出せるが、原文と一致する保証はない。昨日の続きも、渡さなければ覚えていない。本書は、その前提でエージェントを組む話である。製品の操作手順は扱わない。

範囲と用語は [序章](./preface) に書いた。

[ハーネス](./glossary#harness) は、今日の作業を終わらせるための仕組みである。本書は、動かしたあとの設計の本である。対応は [Harness Engineering との対応関係](/ja/strategy/harness-engineering-mapping) を見る。

## 隣接する資料

| 関心 | 資料 | 役割 |
| --- | --- | --- |
| 理解する（限界の由来） | [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/) | Why |
| 設計する | 本書 | What / How |
| 運用へ適用する | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services) | 準備中 |

<div style="text-align: center; padding: 1.5rem 2rem; margin-top: 1rem; color: var(--vp-c-text-2); font-size: 0.9em; max-width: 720px; margin-left: auto; margin-right: auto;">

これは、著者がエージェントを組むなかで得た知見のまとめである。Anthropic などの公式文書ではない。指摘と議論は [GitHub Issues](https://github.com/shuji-bonji/ai-agent-architecture/issues) で受け付ける。

</div>
