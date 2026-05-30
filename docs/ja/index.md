---
layout: home

hero:
  name: AI Agent Architecture
  text: MCPの、その先へ
  tagline: エージェントがSkills・Tools・Protocolをどのように発見・オーケストレーションするかを体系化
  actions:
    - theme: brand
      text: はじめに読む
      link: /ja/concepts/01-vision
    - theme: alt
      text: MCPとは？
      link: /ja/mcp/what-is-mcp
    - theme: alt
      text: Skillsとは？
      link: /ja/skills/what-is-skills
    - theme: alt
      text: GitHub で見る
      link: https://github.com/shuji-bonji/ai-agent-architecture

features:
  - icon: 🧠
    title: コンセプト・ビジョン
    details: なぜ「ブレない参照先」が必要なのか — AI駆動開発の核心思想と、AIの根本的な制約の克服方法。
    link: /ja/concepts/01-vision
    linkText: ビジョンを読む
  - icon: 🔌
    title: MCP（Model Context Protocol）
    details: 外部連携レイヤー — リアルタイムデータソース・API・サービスへの標準化されたプロトコルによる接続。
    link: /ja/mcp/what-is-mcp
    linkText: MCPを学ぶ
  - icon: 📋
    title: Skills（ドメイン知識）
    details: MCPのリアルタイム能力を補完する静的な知識・判断基準 — テンプレート、ルール、ドメイン専門知識。
    link: /ja/skills/what-is-skills
    linkText: Skillsを探る
  - icon: 🤖
    title: エージェント・A2A
    details: サブエージェント、オーケストレーションパターン、Agent-to-Agentプロトコル — 自律エージェントの協調方法。
    link: /ja/agents/what-is-a2a
    linkText: エージェントを知る
  - icon: 🏗️
    title: アーキテクチャ
    details: MCP・Skills・Agentの三層モデルと、本番運用可能なシステムへの構成方法。
    link: /ja/concepts/03-architecture
    linkText: アーキテクチャを見る
  - icon: 🗺️
    title: 戦略・ロードマップ
    details: 構築の優先度、構成パターン、MCP・Skill構築の実践的ロードマップ。
    link: /ja/strategy/composition-patterns
    linkText: 戦略を見る
---

## 📚 姉妹プロジェクト

「LLM を知る → AI Agent 設計を知る → システムに適用する」を順序立てて学べる 3 つの姉妹プロジェクトです。

| フェーズ | プロジェクト | 内容 |
| --- | --- | --- |
| **1. LLM を知る** | [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/) | LLM の構造的制約と「なぜそう設計するのか」（Why の本棚） |
| **2. AI Agent 設計を知る** | 👈 **このサイト** | MCP・Skills・Agent の構成と実装パターン（What/How の地図） |
| **3. システムに適用する** | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services) | _準備中_ — AI 時代のシステム運用 |

> 💡 **このサイトで「Skills とは？」「MCP との違いは？」を知った方へ** — 「**なぜ Skills という設計が必要なのか**」を LLM の構造的制約から理解したい場合は、[understanding-llm / Part 5: オンデマンドコンテキスト](https://shuji-bonji.github.io/understanding-llm-through-claude-code/ja/05-on-demand-context/) を併読すると、設計の根拠が腹落ちします。

<div style="text-align: center; padding: 1.5rem 2rem; margin-top: 1rem; color: var(--vp-c-text-2); font-size: 0.9em; max-width: 720px; margin-left: auto; margin-right: auto;">

**ご注意:** 本ドキュメントは、著者がClaudeを活用してAIエージェントシステムを構築・運用する中で得た実践的知見をまとめたものです。Anthropic社やその他の組織の公式ドキュメントではありません。ご意見・ご議論は [GitHub Issues](https://github.com/shuji-bonji/ai-agent-architecture/issues) にてお気軽にどうぞ。

</div>
