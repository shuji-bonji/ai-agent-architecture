---
title: "Does 'AI Agent' Mean Only LLMs? — The Scope of This Site"
description: "AI is far broader than LLMs — reinforcement learning, symbolic AI, computer vision, and more. A 3-line answer to why this site still scopes 'AI agents' to foundation-model (mainly LLM) driven agents."
---

# Does "AI Agent" Mean Only LLMs? — The Scope of This Site

> [!IMPORTANT] Answered in 3 lines
> 1. Academically, **AI agents ⊋ LLM agents**. Reinforcement learning agents (AlphaGo), symbolic AI, and robot control are all agents.
> 2. On this site, "AI agent" means an **agent whose reasoning core is a foundation model (mainly an LLM)** — the same de facto usage as Anthropic / OpenAI / Google in 2026.
> 3. Why the narrower scope: Skills / MCP / Memory / Doctrine — the subject of this site — only make sense as **responses to the structural constraints of LLMs**. AlphaGo does not need a `SKILL.md`.

## Where LLMs Sit in the AI Landscape

LLMs are only one part of the vast field called "AI". In the technical hierarchy, an LLM is one Transformer-based example within deep learning (DL).

```mermaid
flowchart TB
    AI["Artificial Intelligence (AI)"]
    SYM["Symbolic AI<br/>Expert systems, rule-based, ontologies"]
    EVO["Evolutionary computation, swarm intelligence<br/>Genetic algorithms, etc."]
    ML["Machine Learning (ML)"]
    DL["Deep Learning (DL)"]
    CV["Computer Vision<br/>Object detection, segmentation"]
    RL["Reinforcement Learning<br/>AlphaGo, robot control"]
    TF["Transformer"]
    LLM["LLM<br/>(text generation)"]
    DIFF["Diffusion models<br/>(image / video generation)"]

    AI --> SYM
    AI --> EVO
    AI --> ML
    ML --> RL
    ML --> DL
    DL --> CV
    DL --> TF
    DL --> DIFF
    TF --> LLM

    style AI fill:#f3f4f6,stroke:#374151,color:#000
    style SYM fill:#f3f4f6,stroke:#374151,color:#000
    style EVO fill:#f3f4f6,stroke:#374151,color:#000
    style ML fill:#dbeafe,stroke:#1d4ed8,color:#000
    style DL fill:#dbeafe,stroke:#1d4ed8,color:#000
    style CV fill:#dbeafe,stroke:#1d4ed8,color:#000
    style RL fill:#dbeafe,stroke:#1d4ed8,color:#000
    style TF fill:#dbeafe,stroke:#1d4ed8,color:#000
    style DIFF fill:#dbeafe,stroke:#1d4ed8,color:#000
    style LLM fill:#87CEEB,stroke:#333,color:#333
```

Change the classification axis and even more diversity appears.

| Axis | Main categories / examples |
| --- | --- |
| **Capability scope** | Narrow AI (ANI — nearly everything in production today, including LLMs) / General AI (AGI — still research) |
| **Function / output** | Generative (LLMs, diffusion models, speech synthesis) / Discriminative & predictive (spam detection, medical imaging, demand forecasting) |
| **Learning paradigm** | Supervised / unsupervised / **reinforcement learning** / self-supervised |
| **Technical approach** | Symbolic / statistical & connectionist (ML, DL) / evolutionary computation / neuro-symbolic (hybrid) |
| **Application domain** | Computer vision / robotics & Embodied AI / speech (ASR, TTS) / recommendation / domain-specific models like AlphaFold |

The concept of an "agent" itself also predates LLMs. The rational-agent framework since Russell & Norvig covers rule-based reflex agents, BDI architectures, reinforcement learning agents, and robot control.

## Why This Site Still Scopes to Foundation-Model-Driven Agents

Skills / MCP / Memory / Doctrine — the subject of this site — are not a general theory of agents. They are designs that **become necessary precisely because of the structural constraints of LLMs**.

| Building block on this site | LLM structural constraint it responds to |
| --- | --- |
| **Skills** | Knowledge boundary — domain procedures and conventions are not in the weights |
| **MCP** | Accuracy & currency — hallucination and training-data cutoff |
| **Memory** | Statelessness — nothing is remembered across sessions |
| **Doctrine** | No built-in criteria — no native goals, constraints, or priorities |
| **Agent (orchestration)** | Finite context — cannot see everything at once |

> [!TIP] Developer analogy
> AlphaGo does not need a `SKILL.md`. Its decision criteria are baked into the weights, and it never discovers tools from natural-language descriptions. Conversely, the architecture on this site only exists for foundation models that **take instructions in natural language and discover tools through natural language**.

```mermaid
flowchart TB
    AI["AI as a whole"]
    SYM2["Symbolic AI, planners"]
    ML2["Discriminative / predictive ML<br/>(CV, anomaly detection, etc.)"]
    RL2["Reinforcement learning agents<br/>(AlphaGo, etc.)"]
    FM["Foundation-model-driven agents<br/>LLM / multimodal / VLA"]
    SITE(["Scope of this site<br/>Skills / MCP / Memory / Doctrine"])

    AI --> SYM2
    AI --> ML2
    AI --> RL2
    AI --> FM
    FM --> SITE

    style AI fill:#f3f4f6,stroke:#374151,color:#000
    style SYM2 fill:#f3f4f6,stroke:#374151,color:#000
    style ML2 fill:#f3f4f6,stroke:#374151,color:#000
    style RL2 fill:#f3f4f6,stroke:#374151,color:#000
    style FM fill:#dbeafe,stroke:#1d4ed8,color:#000
    style SITE fill:#87CEEB,stroke:#333,color:#333
```

> [!NOTE] Strictly speaking, slightly broader than "LLM"
> The moment [06-physical-ai](../concepts/06-physical-ai) covers VLA (Vision-Language-Action) models, this site's scope steps outside pure text LLMs. The precise scope is "**agents whose reasoning core is a foundation model**". The text often says LLM by convention.

## Are Non-LLM AI Technologies Irrelevant, Then?

No. Real-world agent systems typically use a **hybrid composition**: an LLM as the reasoning core combined with non-LLM components. In this site's five-layer model, those components appear not as the reasoning core but on the **MCP / tool side**.

```mermaid
flowchart LR
    subgraph CORE["Reasoning core (the main subject of this site)"]
        A["Foundation model<br/>(LLM)"]
    end

    subgraph EXT["Non-LLM components (connected as MCP / tools)"]
        V["Vector DB, retrieval<br/>(RAG)"]
        CV2["Perception modules<br/>(computer vision)"]
        P["Planning & control logic<br/>(symbolic / RL)"]
        D["Discriminative models<br/>(anomaly detection, etc.)"]
    end

    A -->|"MCP / tool calls"| V
    A -->|"MCP / tool calls"| CV2
    A -->|"MCP / tool calls"| P
    A -->|"MCP / tool calls"| D

    style A fill:#87CEEB,stroke:#333,color:#333
    style V fill:#FFB6C1,stroke:#333,color:#333
    style CV2 fill:#FFB6C1,stroke:#333,color:#333
    style P fill:#FFB6C1,stroke:#333,color:#333
    style D fill:#FFB6C1,stroke:#333,color:#333
```

LLMs can be inferior to other AI techniques in interpretability, deterministic guarantees, latency, and domain accuracy, so production systems integrate the right technique for each job. But **who decides and orchestrates that integration** — that is the role of the foundation model, and the territory this site covers.

## Learn More

| What you want to know | Page |
| --- | --- |
| Why authoritative references are needed (start of Concepts) | [01-vision](../concepts/01-vision) |
| The five-layer model | [03-architecture](../concepts/03-architecture) |
| Extension to the physical world (VLA, Embodied AI) | [06-physical-ai](../concepts/06-physical-ai) |
| Agent terminology for LLM-based systems | [Agent taxonomy](../agents/agent-taxonomy) |

## 🔗 Going Deeper: Why Do LLMs Have Structural Constraints?

This page covered **where LLM agents sit (What)** within the broader AI landscape. To understand **why** LLMs are stateless, context-limited, and prone to hallucination, see the sister site.

- [understanding-llm / Part 1: LLM Structural Problems](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/) — the eight structural problems that each layer of this site responds to

---

> **Next**: [MCP vs Skills FAQ](./mcp-vs-skills)
