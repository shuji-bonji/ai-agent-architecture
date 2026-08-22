# LLM Agent Design Architecture

[日本語版 (Japanese)](./README.ja.md)

A design document for agents whose inference core is an LLM. Japanese title: **LLMエージェントの設計**. This is not a product how-to.

Site: [https://shuji-bonji.github.io/ai-agent-architecture/](https://shuji-bonji.github.io/ai-agent-architecture/)

## Sister projects

| Concern | Project |
| --- | --- |
| Understand (origin of limits) | [understanding-llm-through-claude-code](https://github.com/shuji-bonji/understanding-llm-through-claude-code) |
| Design | This repository |
| Apply in operations | [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services) (in preparation) |

## Reading order

| Part | Content |
| --- | --- |
| Preface | Questions and scope |
| Part I | Constraint summary |
| Part II | Five layers and placement |
| Part III | Skills / MCP / Doctrine / Memory / Agent |
| Part IV | Patterns, limits, the physical world, prompt decomposition |

How-tos, catalogues, showcases, strategy, and workflows keep their paths.

## Five layers

| Layer | Owns |
| --- | --- |
| **Doctrine** | Purpose, prohibitions, priority |
| **Agent** | Understanding the work and combining the others |
| **Skills** | Stable knowledge and procedures |
| **Memory** | Memory and relations that last |
| **MCP** | Connections to outside systems |

The five layers are a split of ownership, not a server diagram.

## Scope

The AI this book treats is primarily an LLM. Reinforcement learning and classical rule bases are out of scope. The definition lives in the [Preface](https://shuji-bonji.github.io/ai-agent-architecture/preface).

The former title was AI Agent Architecture. That name is not used at the entrance.

## License

MIT
