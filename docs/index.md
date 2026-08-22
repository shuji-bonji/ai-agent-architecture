---
layout: home
title: LLM Agent Design Architecture
description: Design of agents whose inference core is a foundation model. Place judgment, knowledge, memory, and connections into Doctrine / Agent / Skills / Memory / MCP.

hero:
  name: LLM Agent Design Architecture
  text: A design document
  tagline: How to design agents whose inference core is a foundation model, given the model's structural constraints.
  actions:
    - theme: brand
      text: Read the Preface
      link: /preface
    - theme: alt
      text: What is MCP
      link: /mcp/what-is-mcp
    - theme: alt
      text: What is Skills
      link: /skills/what-is-skills
    - theme: alt
      text: View on GitHub
      link: https://github.com/shuji-bonji/ai-agent-architecture

features:
  - title: Preface
    details: The questions this book answers, the five layers in scope, what it does not cover, its readers, and its structure. English text is not yet available.
    link: /preface
    linkText: Open the preface
  - title: Constraint summary
    details: A summary of the structural constraints that design must assume. Mechanisms belong to the sister site.
    link: /part-1/constraints
    linkText: Open the constraint summary
  - title: Five layers
    details: Separation of duties and placement across Doctrine / Agent / Skills / Memory / MCP.
    link: /part-2/layers
    linkText: Open the five layers
  - title: Skills
    details: The layer for static knowledge and guidelines.
    link: /skills/what-is-skills
    linkText: Read Skills
  - title: MCP
    details: The layer for connections to external systems.
    link: /mcp/what-is-mcp
    linkText: Read MCP
  - title: Agent
    details: The layer for task understanding and orchestration.
    link: /agents/
    linkText: Read Agent
---

The English title of this book is **LLM Agent Design Architecture**. The Japanese title is **LLMエージェントの設計**.

The AI this book treats is primarily an LLM (large language model). That is the core of conversational systems such as Claude. This book is about designing agents whose inference core is that model. It is not an operations manual.

Scope, terms, readers, and structure are defined in the [Preface](./preface). The English preface is not yet translated.

A [harness](./glossary#harness) is the mechanism for operating an agent. This book is the document for designing one. See [Harness Engineering Mapping](/strategy/harness-engineering-mapping) for the correspondence.

## Related materials

| Concern | Material | Role |
| --- | --- | --- |
| Understand (origin of constraints) | [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/) | Why |
| Design | This book | What / How |
| Apply in operations | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services) | In preparation |

<div style="text-align: center; padding: 1.5rem 2rem; margin-top: 1rem; color: var(--vp-c-text-2); font-size: 0.9em; max-width: 720px; margin-left: auto; margin-right: auto;">

This documentation records practical knowledge from assembling agents. It is not official documentation from Anthropic or any other organization. Comments and discussion are welcome in [GitHub Issues](https://github.com/shuji-bonji/ai-agent-architecture/issues).

</div>
