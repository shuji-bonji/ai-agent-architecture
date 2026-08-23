---
layout: home
title: LLM Agent Design Architecture
description: Design agents around an LLM such as Claude so they remain usable. Doctrine / Agent / Skills / Memory / MCP.

hero:
  name: LLM Agent Design Architecture
  text: LLMエージェントの設計
  tagline: Design agents around an LLM such as Claude so they remain usable.
  actions:
    - theme: brand
      text: Read the Preface
      link: /preface
    - theme: alt
      text: See the five layers
      link: /part-2/layers
    - theme: alt
      text: View on GitHub
      link: https://github.com/shuji-bonji/ai-agent-architecture

features:
  - title: Preface
    details: What the book covers and what it does not. Readers and how to read it.
    link: /preface
    linkText: Read the Preface
  - title: Constraint summary
    details: Limits the model already has. Mechanisms belong to the sister site.
    link: /part-1/constraints
    linkText: Read the constraint summary
  - title: Five layers
    details: Doctrine / Agent / Skills / Memory / MCP. Who owns what.
    link: /part-2/layers
    linkText: Read the five layers
  - title: Placement
    details: Which layer receives what. Conditions for a source you can check.
    link: /part-2/placement
    linkText: Read placement
  - title: Each layer (Part III)
    details: Skills / MCP / Doctrine / Memory / Agent. Entries and practice pages.
    link: /skills/what-is-skills
    linkText: Part III entry
  - title: Patterns (Part IV)
    details: RAG, MCP, agents — choosing a type and how far it reaches.
    link: /part-4/patterns
    linkText: Read patterns
---

The English title is **LLM Agent Design Architecture**. The Japanese title is **LLMエージェントの設計**.

The AI this book treats is primarily an LLM (large language model). That is the core of Claude. A plausible answer can be produced. There is no guarantee it matches the source text. Yesterday's conversation is gone unless you pass it in. This book is about assembling agents on that premise. It does not cover product how-tos.

Scope and terms are in the [Preface](./preface).

A [harness](./glossary#harness) is the machinery for finishing today's task. This book is the design document for after the run. See [Harness Engineering Mapping](/strategy/harness-engineering-mapping) for the correspondence.

## Related materials

| Concern | Material | Role |
| --- | --- | --- |
| Understand (origin of limits) | [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/) | Why |
| Design | This book | What / How |
| Apply in operations | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services) | In preparation |

<div style="text-align: center; padding: 1.5rem 2rem; margin-top: 1rem; color: var(--vp-c-text-2); font-size: 0.9em; max-width: 720px; margin-left: auto; margin-right: auto;">

This is a record of knowledge from assembling agents. It is not official documentation from Anthropic or any other organisation. Comments and discussion are welcome in [GitHub Issues](https://github.com/shuji-bonji/ai-agent-architecture/issues).

</div>
