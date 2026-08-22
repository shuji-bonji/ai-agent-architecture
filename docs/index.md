---
layout: home
title: "AI Agent Architecture — MCP, Skills, and Agent Design Patterns"
description: "A comprehensive guide to AI Agent Architecture: Model Context Protocol (MCP), AI Skills, and the three-layer model for building production-ready AI agent systems with Claude Code, Cursor, and Cline."

hero:
  name: AI Agent Architecture
  text: "MCP, AI Skills & Agent Design Patterns"
  tagline: "The complete guide to how AI agents discover and orchestrate Skills, Tools, and Protocols — with practical patterns for Claude Code, Cursor, and Cline."
  actions:
    - theme: brand
      text: Get Started
      link: /concepts/01-vision
    - theme: alt
      text: What is MCP?
      link: /mcp/what-is-mcp
    - theme: alt
      text: What are AI Skills?
      link: /skills/what-is-skills
    - theme: alt
      text: View on GitHub
      link: https://github.com/shuji-bonji/ai-agent-architecture

features:
  - icon: 🧠
    title: Concepts & Vision
    details: Why "reliable reference sources" matter — the core philosophy behind AI-driven development and how to overcome AI's fundamental limitations.
    link: /concepts/01-vision
    linkText: Read the Vision
  - icon: 🔌
    title: MCP (Model Context Protocol)
    details: The standard protocol by Anthropic for connecting AI agents to external tools, APIs, and data sources. Learn MCP servers, clients, and hosts.
    link: /mcp/what-is-mcp
    linkText: Learn about MCP
  - icon: 📋
    title: AI Skills (Domain Knowledge)
    details: Reusable Markdown-based knowledge files (skill.md) that give AI agents specialized capabilities. Works with npx skills, Claude Code, Cursor, and Cline.
    link: /skills/what-is-skills
    linkText: Explore AI Skills
  - icon: 🤖
    title: Agents & A2A
    details: Sub-agents, orchestration patterns, and the Agent-to-Agent protocol — how autonomous agents collaborate.
    link: /agents/what-is-a2a
    linkText: Discover Agents
  - icon: 🏗️
    title: Three-Layer Architecture
    details: The Agent / Skills / MCP three-layer model and how they compose into production-ready AI agent systems.
    link: /concepts/03-architecture
    linkText: See Architecture
  - icon: 🗺️
    title: Strategy & Roadmap
    details: Build priorities, composition patterns, and practical roadmaps for MCP and Skill construction.
    link: /strategy/composition-patterns
    linkText: View Strategy
---

## 🎯 Why Learn AI Agent Design?

> If you just need to **operate** an agent, harness engineering (the implementation patterns of Agent Engineering / Context Engineering) is enough.
> But in AI-driven development, you also need to **design, maintain, extend, and hand off** agents.

This site is not a "how to operate" manual — it's a **map for design**. How to compose Skills, MCP, Sub-agents, and Doctrine; what to write as MUST vs SHOULD; how to make components reusable. The goal is **structuring the entire development process**, not automating one-off tasks.

### Three Perspectives — Which is Yours?

| Verb | Goal | Primary Reference |
| --- | --- | --- |
| **Operate** | Complete today's task | Harness engineering frameworks |
| **Design** | Build reusable structures and judgment criteria | 👈 **This site (ai-agent-architecture)** |
| **Understand** | Grasp the structural constraints of LLMs | [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/) |

> 💡 **For readers who came here searching for "harness engineering"** — [Harness](./glossary#harness) is the mechanism for *operating*; this site is the map for *designing*. For the mapping between the two and the layers harness doesn't cover (Skills layer / Doctrine layer), see [Harness Engineering Mapping](/strategy/harness-engineering-mapping).

## 📚 Sister Projects

A 3-phase learning path: "Know LLMs → Know Agent Design → Apply to Systems."

| Phase | Project | Focus |
| --- | --- | --- |
| **1. Know LLMs** | [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/) | LLM structural constraints and the *why* behind configuration design |
| **2. Know Agent Design** | 👈 **This site** | MCP, Skills, and Agent composition with implementation patterns (*what/how*) |
| **3. Apply to Systems** | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services) | _Coming soon_ — System operations in the AI era |

> 💡 **For readers who learned "what are Skills?" or "Skills vs MCP" here** — if you want to understand **why** the Skills design is necessary from LLM structural constraints, read [understanding-llm / Part 5: On-Demand Context](https://shuji-bonji.github.io/understanding-llm-through-claude-code/05-on-demand-context/) alongside this site.

<div style="text-align: center; padding: 1.5rem 2rem; margin-top: 1rem; color: var(--vp-c-text-2); font-size: 0.9em; max-width: 720px; margin-left: auto; margin-right: auto;">

**Note:** This documentation reflects the author's practical insights gained through building and operating AI agent systems with Claude. It is not official documentation from Anthropic or any other organization. Contributions and discussions via [GitHub Issues](https://github.com/shuji-bonji/ai-agent-architecture/issues) are welcome.

</div>
