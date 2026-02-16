# Composition Patterns

> Organize combination patterns and design guidelines for MCP × Skill × Agent.

[日本語](/ja/strategy/composition-patterns)

## About This Document

While MCPs and Skills have value individually, there is **value that emerges only through combination**. This document defines 4 composition patterns and organizes the design guidelines, trigger contexts, and use cases for each.

For the MCP construction strategy, see [mcp-roadmap.md](./mcp-roadmap.md). For the Skill construction strategy, see [skill-roadmap.md](./skill-roadmap.md).

## 4 Composition Patterns

```mermaid
flowchart TB
    subgraph PATTERNS["4 Composition Patterns"]
        direction TB
        subgraph P1["Pattern 1: MCP + Skill"]
            P1_D["Evaluate data retrieved by MCP<br>using Skill judgment criteria"]
        end
        subgraph P2["Pattern 2: MCPs (Multi-MCP Coordination)"]
            P2_D["Integrate, compare, and verify<br>outputs from multiple MCPs"]
        end
        subgraph P3["Pattern 3: Skills (Multi-Skill Combination)"]
            P3_D["Simultaneously trigger<br>multiple Skills by context"]
        end
        subgraph P4["Pattern 4: MCPs + Skills (Full Integration)"]
            P4_D["Workflow where multiple MCPs<br>and Skills cooperate"]
        end
    end

    style P1 fill:#FFD700,stroke:#F9A825,color:#333
    style P2 fill:#FFB6C1,stroke:#C62828,color:#333
    style P3 fill:#90EE90,stroke:#2E7D32,color:#333
    style P4 fill:#E3F2FD,stroke:#1565C0,color:#333
```

| Pattern           | Composition                     | Core Concept                       | Difficulty |
| ----------------- | ------------------------------- | ---------------------------------- | ---------- |
| **MCP + Skill**   | 1 MCP + 1 Skill                 | Data retrieval + Judgment criteria | ★★☆        |
| **MCPs**          | Multiple MCPs                   | Data integration & comparison      | ★★☆        |
| **Skills**        | Multiple Skills                 | Knowledge layering                 | ★☆☆        |
| **MCPs + Skills** | Multiple MCPs + Multiple Skills | Complete workflow                  | ★★★        |

## Pattern 1: MCP + Skill

A composition where "raw data" retrieved by MCP from external sources is evaluated using "judgment criteria" held by Skills. The basic form of **hybrid composition**.

### Design Principle

```mermaid
flowchart LR
    MCP["MCP<br>(Data Retrieval)"]
    SKILL["Skill<br>(Judgment Criteria)"]
    RESULT["Evaluation Result"]

    MCP -->|"Structured data"| SKILL
    SKILL -->|"Apply criteria"| RESULT

    style MCP fill:#FFB6C1,color:#333
    style SKILL fill:#90EE90,color:#333
```

MCP returns "what is written," and Skill determines "whether it is good or bad." This separation is important.

### Concrete Examples

#### Electronic Signature Act Compliance Check

```mermaid
sequenceDiagram
    actor U as User
    participant A as Agent
    participant H as hourei-mcp
    participant R as rfcxml-mcp
    participant S as E-Signature Act Skill

    U->>A: Is the timestamp implementation compliant?
    A->>H: find_law_article(Electronic Signature Act, 2)
    H-->>A: Article 2 text
    A->>R: get_requirements(3161)
    R-->>A: RFC 3161 technical requirements
    A->>S: Reference legal + technical requirements
    S-->>A: Mapping criteria & judgment guidelines
    A-->>U: Compliance report
```

| Element               | Role                                                              |
| --------------------- | ----------------------------------------------------------------- |
| `hourei-mcp`          | Retrieve Electronic Signature Act article text (MCP)              |
| `rfcxml-mcp`          | Retrieve RFC 3161 technical requirements (MCP)                    |
| E-Signature Act Skill | Mapping criteria between legal and technical requirements (Skill) |

#### OAuth/JWT Implementation Review

| Element         | Role                                                          |
| --------------- | ------------------------------------------------------------- |
| `rfcxml-mcp`    | Retrieve RFC 6749 (OAuth 2.0) / RFC 7519 (JWT) specifications |
| OAuth/JWT Skill | Token management best practices, implementation patterns      |

### Design Guidelines

- **Write Skills independent of MCP output**: Avoid implementation-dependent descriptions like "look at the `article_text` field in hourei-mcp's JSON response." Instead, use abstract descriptions like "verify whether the legal text contains the following requirements"
- **Make Skill judgment criteria verifiable**: Clearly define the 3 states: "compliant," "non-compliant," and "cannot determine (additional information needed)"

### Candidate List

| Theme                               | MCP                            | Skill                      | Status                        |
| ----------------------------------- | ------------------------------ | -------------------------- | ----------------------------- |
| Electronic Signature Act            | hourei-mcp + rfcxml-mcp        | Implementation guidelines  | ⚡ MCP side already available |
| Personal Information Protection Act | hourei-mcp                     | Compliance checklist       | ⚡ MCP side already available |
| Electronic Books Preservation Act   | hourei-mcp                     | Storage requirements check | ⚡ MCP side already available |
| GDPR                                | Regulatory text MCP (planned)  | DPIA checklist             | 🔲 Not started                |
| OWASP                               | Vulnerability DB MCP (planned) | Security review criteria   | 🔲 Not started                |
| OAuth/JWT                           | rfcxml-mcp                     | Implementation patterns    | ⚡ MCP side already available |

## Pattern 2: MCPs (Multi-MCP Coordination)

A composition that integrates, compares, and verifies data retrieved from multiple MCPs. There are already proven examples in [workflows/patterns.md](../workflows/patterns.md).

### Design Principle

```mermaid
flowchart LR
    MCP_A["MCP-A<br>(Data Source A)"]
    MCP_B["MCP-B<br>(Data Source B)"]
    AGENT["Agent<br>(Integration & Judgment)"]
    RESULT["Integrated Result"]

    MCP_A -->|"Data A"| AGENT
    MCP_B -->|"Data B"| AGENT
    AGENT --> RESULT

    style MCP_A fill:#FFB6C1,color:#333
    style MCP_B fill:#FFB6C1,color:#333
```

### Proven Combinations

| Combination                       | Use Case                                                | Track Record                                             |
| --------------------------------- | ------------------------------------------------------- | -------------------------------------------------------- |
| **deepl-mcp + xcomet-mcp**        | Translation → Quality evaluation → Re-translation       | 180-page technical document translated in 1 day / $12    |
| **rfcxml-mcp + w3c-mcp**          | Integrated reference of RFC specs + Web API definitions | WebSocket specification verification workflow            |
| **rfcxml-mcp + hourei-mcp**       | Technical specification × Legal text mapping            | Electronic Signature Act × RFC 3161 correspondence table |
| **pdf-spec-mcp + pdf-reader-mcp** | PDF specification reference + Actual file verification  | PDF/UA conformance verification                          |

### Design Guidelines

- **Clarify whether order-dependent or parallelizable**: deepl → xcomet is order-dependent; rfcxml + w3c is parallelizable
- **The Agent layer handles data integration logic**: MCPs only return raw data. Integration and judgment are the Agent's role

## Pattern 3: Skills (Multi-Skill Combination)

A composition that simultaneously triggers multiple Skills according to the context (development phase).

### Design Principle

```mermaid
flowchart TB
    CONTEXT["Development Context"]
    SKILL_A["Skill-A"]
    SKILL_B["Skill-B"]
    SKILL_C["Skill-C"]
    OUTPUT["Integrated Judgment"]

    CONTEXT --> SKILL_A
    CONTEXT --> SKILL_B
    CONTEXT --> SKILL_C
    SKILL_A --> OUTPUT
    SKILL_B --> OUTPUT
    SKILL_C --> OUTPUT

    style SKILL_A fill:#90EE90,color:#333
    style SKILL_B fill:#90EE90,color:#333
    style SKILL_C fill:#90EE90,color:#333
```

### Context-Based Skill Sets

```mermaid
flowchart TB
    subgraph CODE_REVIEW["Code Review Set"]
        direction TB
        CR1["🔵 SOLID<br>Detect principle violations"]
        CR2["🔴 Clean Code<br>Style & readability"]
        CR3["🟢 Refactoring<br>Improvement suggestions"]
        CR1 --> CR3
        CR2 --> CR3
    end

    subgraph ARCH_DESIGN["Architecture Design Set"]
        direction TB
        AD1["🟡 DDD<br>Domain modeling"]
        AD2["🔵 Clean Architecture<br>Layer design"]
        AD3["🔵 12 Factor App<br>Cloud readiness"]
        AD1 --> AD2
        AD2 --> AD3
    end

    subgraph TEST_DESIGN["Test Design Set"]
        direction TB
        TD1["🟡 TDD<br>Process"]
        TD2["🟡 BDD<br>Scenario definition"]
        TD3["🟢 Test Patterns<br>Pattern application"]
        TD4["🟠 Coverage<br>Coverage assessment"]
        TD1 --> TD3
        TD2 --> TD3
        TD3 --> TD4
    end

    style CODE_REVIEW fill:#FFEBEE,stroke:#C62828,color:#333
    style ARCH_DESIGN fill:#E3F2FD,stroke:#1565C0,color:#333
    style TEST_DESIGN fill:#FFFDE7,stroke:#F9A825,color:#333
```

### Design Guidelines

- **Define priority order among Skills**: In the Code Review set, evaluate in order: SOLID (principles) → Clean Code (style) → Refactoring (improvements)
- **"Primary source of definition" rule**: For concepts with overlapping scope (e.g., SRP), designate one Skill as the primary source and the other as reference
- **Entire sets can be meta-Skill-ized**: It is possible to define "Code Review Set" itself as a single Skill that internally references the three Skills

## Pattern 4: MCPs + Skills (Full Integration)

The most complex but most powerful composition where multiple MCPs and multiple Skills cooperate.

### Design Principle

```mermaid
flowchart TB
    subgraph DATA["Data Retrieval Layer (MCPs)"]
        MCP_A["MCP-A"]
        MCP_B["MCP-B"]
    end

    subgraph KNOWLEDGE["Knowledge Layer (Skills)"]
        SKILL_A["Skill-A"]
        SKILL_B["Skill-B"]
    end

    AGENT["Agent<br>(Orchestration)"]
    RESULT["Final Output"]

    MCP_A --> AGENT
    MCP_B --> AGENT
    SKILL_A --> AGENT
    SKILL_B --> AGENT
    AGENT --> RESULT

    style DATA fill:#FFB6C1,color:#333
    style KNOWLEDGE fill:#90EE90,color:#333
    style AGENT fill:#87CEEB,color:#333
```

### Concrete Examples

#### Security Audit Workflow

```mermaid
sequenceDiagram
    actor U as User
    participant A as Agent
    participant RFC as rfcxml-mcp
    participant W3C as w3c-mcp
    participant OS as OWASP Skill
    participant OA as OAuth Skill

    U->>A: Audit the security of WebSocket authentication
    A->>RFC: get_requirements(6455)
    RFC-->>A: WebSocket specification requirements
    A->>RFC: get_requirements(6749)
    RFC-->>A: OAuth 2.0 specification requirements
    A->>W3C: get_webidl("websockets")
    W3C-->>A: WebSocket API definition
    A->>OS: Reference OWASP Top 10 relevant items
    OS-->>A: A01:Broken Access Control criteria
    A->>OA: Reference OAuth implementation patterns
    OA-->>A: Token management best practices
    A-->>U: Security audit report
```

| Layer     | Element     | Role                                              |
| --------- | ----------- | ------------------------------------------------- |
| **MCP**   | rfcxml-mcp  | Retrieve RFC 6455/6749 specification requirements |
| **MCP**   | w3c-mcp     | Retrieve WebSocket API definition                 |
| **Skill** | OWASP Skill | Vulnerability judgment criteria                   |
| **Skill** | OAuth Skill | Authentication implementation best practices      |

#### Specification Compliance Quality Gate

```mermaid
flowchart TB
    subgraph INPUT["Input"]
        CODE["Implementation Code"]
    end

    subgraph CHECK["Verification Process"]
        direction TB
        subgraph MCP_LAYER["MCPs: Specification Reference"]
            RFC["rfcxml-mcp<br>Technical specifications"]
            HOUREI["hourei-mcp<br>Legal texts"]
        end
        subgraph SKILL_LAYER["Skills: Quality Criteria"]
            SOLID_S["SOLID Skill<br>Design quality"]
            TEST_S["Test Patterns Skill<br>Test quality"]
        end
    end

    subgraph OUTPUT["Output"]
        REPORT["Quality Gate Report<br>Spec compliance + Design quality + Test sufficiency"]
    end

    CODE --> MCP_LAYER
    CODE --> SKILL_LAYER
    MCP_LAYER --> REPORT
    SKILL_LAYER --> REPORT

    style MCP_LAYER fill:#FFB6C1,color:#333
    style SKILL_LAYER fill:#90EE90,color:#333
```

### Design Guidelines

- **Agent orchestration is key**: The Agent layer determines which MCPs to call first and when to reference which Skills
- **Parallelize MCP calls**: Independent MCP calls should be executed in parallel to efficiently use the context window
- **Skill trigger timing**: Clarify whether to judge collectively after data retrieval or to judge incrementally

## Pattern Selection Guide

```mermaid
flowchart TD
    START{"What do you want<br>to achieve?"}

    START -->|"External data<br>retrieval + evaluation"| P1["Pattern 1<br>MCP + Skill"]
    START -->|"Multiple data source<br>integration & comparison"| P2["Pattern 2<br>MCPs"]
    START -->|"Multiple knowledge<br>layering"| P3["Pattern 3<br>Skills"]
    START -->|"Data + knowledge<br>full integration"| P4["Pattern 4<br>MCPs + Skills"]

    P1 -->|"Example"| P1E["Compliance check<br>Legal text + Judgment criteria"]
    P2 -->|"Example"| P2E["Translation workflow<br>Translation + Quality evaluation"]
    P3 -->|"Example"| P3E["Code review<br>SOLID + Clean Code + Refactoring"]
    P4 -->|"Example"| P4E["Security audit<br>Spec reference + OWASP + OAuth"]

    style P1 fill:#FFD700,color:#333
    style P2 fill:#FFB6C1,color:#333
    style P3 fill:#90EE90,color:#333
    style P4 fill:#E3F2FD,color:#333
```

## Accumulating Results

Practical results from each pattern are recorded in [outputs.md](../outputs.md). Include the following information.

| Item         | Content                                                  |
| ------------ | -------------------------------------------------------- |
| Pattern Used | Which of the 4 patterns                                  |
| Components   | MCPs and Skills used                                     |
| Input        | What was targeted                                        |
| Results      | Quantitative outcomes (time, cost, quality scores, etc.) |
| Learnings    | Improvements and suggestions for next time               |

## Related Documents

- [mcp-roadmap.md](./mcp-roadmap.md) — MCP Construction Roadmap
- [skill-roadmap.md](./skill-roadmap.md) — Skill Construction Roadmap
- [workflows/patterns.md](../workflows/patterns.md) — Existing Workflow Patterns (Pattern 2 track record)
- [concepts/03-architecture.md](../concepts/03-architecture.md) — MCP / Skill / Agent Layer Structure
- [mcp/catalog.md](../mcp/catalog.md) — Built MCP Catalog
