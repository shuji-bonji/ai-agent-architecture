# Harness Engineering Mapping

> Map the four [harness](../glossary#harness) elements onto the 5-layer model and clarify what harness covers and what it doesn't.

## About This Document

> [!NOTE]
> "Harness Engineering" emerged as a notable framing in 2025–2026 for organizing the implementation mechanisms used to **operate** an LLM. Since this site is a map for **designing** LLM agents, this page makes the relationship between the two explicit.

For readers who found this site while searching for harness engineering: this page maps the four harness elements onto the site's 5-layer model and shows why the **areas harness does not cover** (Skills layer, part of Doctrine layer, the Why behind each prescription) still require a separate framework.

> [!TIP]
> **In three lines**
>
> - Harness is the *mechanism* for operating; the 5-layer model is the *map* for designing. They live at different abstraction levels.
> - The four harness elements map onto MCP, Memory, Agent, and Doctrine (defensive aspect only).
> - **The Skills layer and the offensive side of the Doctrine layer (normative strength declarations) are not part of harness**, so this site fills that gap.

## First Principle — the LLM Is the Brain, the Harness Is the Only Executor

Before the four elements, define **what a harness is** one level down. The LLM itself is a **text in / text out** function: it merely emits `tool_call` (a structured [token](../glossary#token) specifying which tool to call with which arguments). **Everything that touches the outside world (HTTP, files, other agents, GUI, the physical world) is done by the execution layer that surrounds the LLM — the harness.**

```mermaid
flowchart LR
    MOD["LLM (brain)<br/>text in / out, only emits tool_call"]
    HAR["Harness (agent loop)<br/>= the only executor"]
    EXT["External<br/>tool / data / other agent / GUI / physical"]
    MOD -->|"① tool_call"| HAR
    HAR -->|"② perform real I/O"| EXT
    EXT -->|"③ result"| HAR
    HAR -->|"④ feed back into context"| MOD

    style MOD fill:#dcfce7,stroke:#15803d,color:#000
    style HAR fill:#dbeafe,stroke:#1d4ed8,color:#000
    style EXT fill:#FFB6C1,color:#333,stroke:#333
```

The loop itself — "run ①–④ until the stop condition is met" — *is* the harness, and **this distinction is what separates "LLM" from "agent."**

> [!IMPORTANT]
> **MCP, direct HTTP, A2A, and plugins look like different *kinds* of external connection, but they are all just implementation variants of step ②.** Whichever you choose, the skeleton is unchanged: the model emits `tool_call` at ①, the harness performs real I/O at ②, and ③④ feed the result back into context. The reason this page can later map the four elements onto the 5-layer model is precisely that this single skeleton underlies all of them.

The single-shelf list of "kinds" (target × I/F × executor), why the named winners collapse to just two protocols — MCP and A2A — and why MCP alone splits step ② into two communication hops are all covered in the "External Interface Catalog" section of [mcp/what-is-mcp](../mcp/what-is-mcp). This page's scope ends at the skeleton: "they are all the contents of step ②."

## What Is Harness Engineering

> [!NOTE]
> In this document, "harness engineering" refers to the implementation mechanism composed of the following four elements. They correspond to the **four responsibilities carried by the step-② executor** in the first principle above.

| Element | Description |
| --- | --- |
| **Action (tool integration)** | Connection points for accessing external APIs, databases, file systems, browsers, etc. |
| **Context (memory)** | A mechanism that retains past context, business background, and agent action history, and hands it back to the LLM when needed |
| **Guardrails (safety controls)** | Safety devices (sandboxes, etc.) that prevent leakage of confidential information and uncontrolled system damage |
| **Orchestration (loop control)** | A continuous loop that decomposes tasks, lets the LLM think, executes, evaluates results, and decides the next action |

The word "harness" — like the harness used in rocketry or climbing — carries the metaphor of a **fixture or restraint** and is used as the implementation mechanism beneath higher-level methodologies such as Agent Engineering or Context Engineering.

## Mapping to the 5-Layer Model

```mermaid
graph TB
  subgraph HARNESS["Harness Engineering: 4 Elements"]
    H_A["Action<br/>(tool integration)"]
    H_C["Context<br/>(memory)"]
    H_G["Guardrails<br/>(safety controls)"]
    H_O["Orchestration<br/>(loop control)"]
  end

  subgraph LAYER["5-Layer Model"]
    DOCTRINE["Doctrine"]
    AGENT["Agent"]
    SKILLS["Skills"]
    MEMORY["Memory"]
    MCP["MCP"]
  end

  H_O --> AGENT
  H_C --> MEMORY
  H_A --> MCP
  H_G -->|defensive aspect only| DOCTRINE

  NA["no counterpart<br/>(absent in harness)"] -.-> SKILLS

  style DOCTRINE fill:#FFE4B5,color:#333,stroke:#333
  style AGENT fill:#87CEEB,color:#333,stroke:#333
  style SKILLS fill:#90EE90,color:#333,stroke:#333
  style MEMORY fill:#E6E6FA,color:#333,stroke:#333
  style MCP fill:#FFB6C1,color:#333,stroke:#333
  style H_A fill:#dbeafe,stroke:#1d4ed8,color:#000
  style H_C fill:#dbeafe,stroke:#1d4ed8,color:#000
  style H_G fill:#dbeafe,stroke:#1d4ed8,color:#000
  style H_O fill:#dbeafe,stroke:#1d4ed8,color:#000
  style NA fill:#fee2e2,stroke:#b91c1c,color:#000
```

### Mapping Table

| Harness Element | 5-Layer Model | Correspondence |
| --- | --- | --- |
| **Action (tool integration)** | **MCP** | Connection points for external systems. Protocol layer. |
| **Context (memory)** | **Memory** | Persistent memory and relationships. Knowledge Graph, etc. |
| **Guardrails (safety controls)** | **Doctrine** (defensive aspect only) | Constraints, prohibitions, sandboxing. **Does not include normative strength declarations (MUST/SHOULD/MAY) or offensive design guidance.** |
| **Orchestration (loop control)** | **Agent** | The locus of task decomposition, execution, and evaluation loops. |
| ❌ no counterpart | **Skills** | Static knowledge, guidelines, progressive disclosure. Absent in the harness vocabulary. |

## Three Areas Harness Does Not Cover

### 1. The Skills Layer (Reference Model for Static Knowledge)

The four harness elements lack the concept of **"how to structure static knowledge and when to invoke it."** The Skills layer covers:

- The `SKILL.md` format and progressive disclosure
- Auto-triggering based on description matching
- The choice between Skills and MCP (see [Sub-agent vs Skills](../agents/subagent-vs-skill))
- Composition across multiple Skills

These are neither Context (memory) nor Action (tools); they are **judgment criteria conditionally injected into the LLM's immediate context** and require an independent layer.

> [!IMPORTANT]
> Squeezing Skills into Context causes token bloat and [Priority Saturation](../glossary#structural-problems). The design hinges on expanding Skills *only when invoked* — explored in detail in [II.1 Five layers](../part-2/layers).

### 2. The Offensive Side of the Doctrine Layer

The Guardrails element of harness is confined to **defensive** functions: leak prevention and runaway prevention. The Doctrine layer also covers:

- **Purpose declarations** (what the agent exists for)
- **Judgment criteria** (priority order when trade-offs arise)
- **Normative strength ladder** (MUST / SHOULD / MAY, per RFC 2119)
- **Role boundaries** (what the agent addresses and what it does not)

These are "offensive design guidance" and have no counterpart in the harness vocabulary. See [III.3 Doctrine](../part-3/doctrine) for detail.

### 3. The Why Behind Each Prescription

Harness prescribes "give it memory" and "wrap it in a loop," but does not explain **why** those prescriptions are necessary:

- Why externalize Context? → [Context Rot](../glossary#structural-problems), [Lost in the Middle](../glossary#structural-problems)
- Why re-inject instructions in a loop? → [Instruction Decay](../glossary#structural-problems), Priority Saturation
- Why sandbox at all? → [Hallucination](../glossary#structural-problems), [Sycophancy](../glossary#structural-problems)

These **structural constraints** are the subject of the sister site, [understanding-llm-through-claude-code](https://shuji-bonji.github.io/understanding-llm-through-claude-code/).

## "Is Harness Enough?" Decision Table

Determine whether harness alone covers your question:

| Reader's Question | Harness Enough? | Where to Look Next |
| --- | --- | --- |
| "I want to give the LLM tools" | ✅ Yes | — |
| "I need to design memory" | ⚠️ Partial | Why (Context Rot, Lost in the Middle) → understanding-llm |
| "Should this go in Skills or MCP?" | ❌ No | [II.1 Five layers](../part-2/layers), [skills/what-is-skills](../skills/what-is-skills) |
| "Criteria for splitting sub-agents" | ❌ No | [agents/subagent-vs-skill](../agents/subagent-vs-skill), [agents/subagent-quality-gate](../agents/subagent-quality-gate) |
| "What to write as MUST vs SHOULD" | ❌ No | [III.3 Doctrine](../part-3/doctrine) |
| "Instructions decay over long tasks" | ⚠️ Symptomatic only | Why (Instruction Decay) → understanding-llm |
| "Granularity of guardrails" | ⚠️ Defensive only | Doctrine (offensive normativity) |
| "Coordination across multiple MCPs and Skills" | ❌ No | [strategy/composition-patterns](./composition-patterns) |

## Vocabulary Hierarchy — Harness Is a Mechanism, Engineering Is a Methodology

```mermaid
graph TB
  subgraph METHOD["Methodology layer (X Engineering)<br/>fluid, easily swapped"]
    AE["Agent Engineering<br/>whole-agent design"]
    CE["Context Engineering<br/>context composition"]
  end

  subgraph MECH["Mechanism layer (concrete parts)<br/>nouns, durable"]
    H["Harness<br/>loop, tools, memory, guardrails"]
    P["Prompt"]
    S["Skill"]
    M["MCP"]
  end

  AE --> H
  AE --> S
  AE --> M
  CE --> H
  CE --> P
  CE --> M

  style AE fill:#dbeafe,stroke:#1d4ed8,color:#000
  style CE fill:#dbeafe,stroke:#1d4ed8,color:#000
  style H fill:#dcfce7,stroke:#15803d,color:#000
  style P fill:#dcfce7,stroke:#15803d,color:#000
  style S fill:#dcfce7,stroke:#15803d,color:#000
  style M fill:#dcfce7,stroke:#15803d,color:#000
```

- **Harness** = a noun, a thing. Like a rocket or climbing harness, it is a *fixture* metaphor → **persists as mechanism**.
- **X Engineering** = methodology label. Agent Engineering, Context Engineering, etc. swap in and out as the umbrella term → **disposable**.

The 5-layer model and the 8 problems on the sister site are designed as **vocabulary-independent abstractions**. Whenever a new methodology label trends, a mapping page like this one can be added without disturbing the core model.

## Reframing With Three Verbs

| Verb | Goal | Output | Time Horizon |
| --- | --- | --- | --- |
| **Operate** | Control the LLM to complete the task | A working agent (runtime) | Today |
| **Design** | Build reusable structure and judgment criteria | A design map (5-layer model + Doctrine) | Sustained next year |
| **Understand** | Grasp why the constraint exists | The why bookshelf (8 problems) | Invariant |

```mermaid
graph LR
  OPERATE["Operate<br/>(Harness)"] -->|today's task| OUTCOME1["a working agent"]
  DESIGN["Design<br/>(this site)"] -->|sustainable structure| OUTCOME2["reusable architecture"]
  UNDERSTAND["Understand<br/>(understanding-llm)"] -->|invariant constraints| OUTCOME3["explanatory power"]

  style OPERATE fill:#dbeafe,stroke:#1d4ed8,color:#000
  style DESIGN fill:#dcfce7,stroke:#15803d,color:#000
  style UNDERSTAND fill:#fee2e2,stroke:#b91c1c,color:#000
```

> [!IMPORTANT]
> The three are **complementary at different layers, not interchangeable**. Harness handles *operate*, this site handles *design*, and the sister site handles *understand*.

## Go Deeper: Why Each Harness Element Is Necessary

This page covers the **structural correspondence (What)** between harness and the 5-layer model. For **why** each harness element is necessary in terms of LLM structural constraints, see the sister site.

- [understanding-llm / Appendix: Harness and LLM Structural Constraints](https://shuji-bonji.github.io/understanding-llm-through-claude-code/appendix/harness-and-llm-constraints) — harness 4 elements ⇔ 8 problems mapping, diagnosis before prescription
- [understanding-llm / Part 1: Structural Problems](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/) — overview of the 8 problems

## Related Documents

- [II.1 Five layers](../part-2/layers) — the 5-layer model
- [III.3 Doctrine](../part-3/doctrine) — Doctrine layer in detail
- [skills/what-is-skills](../skills/what-is-skills) — why Skills isn't part of harness
- [strategy/composition-patterns](./composition-patterns) — composition patterns across multiple MCPs and Skills
- [strategy/proposal-and-binding](./proposal-and-binding) — the ①–④ loop re-cut along the axis of whether each step binds (sequel to this page)
- [strategy/permission-vs-authority](./permission-vs-authority) — what harness-type and doctrine-type agents ask for at the boundary
- [Hooks](./hooks) — a harness-side interrupt at a point in the run

---

> **Previous**: [Local LLM Workspace Mapping](./local-llm-workspace-mapping.md)
> **Next**: [Hooks](./hooks)
