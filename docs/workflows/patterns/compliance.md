# Compliance Workflows

> Clarifying the correspondence between legal requirements and technical specifications, systematically managing compliance.

## Pattern 4: Legal × Technical Specification Mapping Workflow

### Overview

A flow for clarifying the correspondence between legal requirements and technical specifications. Cross-references requirements from different domains — law and technical specifications — to identify gaps and formulate response plans.

### MCPs Used

- `hourei-mcp` - Japanese law reference
- `rfcxml-mcp` - Technical specification reference

### Flow Diagram

This workflow integrates legal and technical domains to identify gaps and alignment:

```mermaid
flowchart TB
    START[Compliance Requirements] --> LEGAL[hourei:find_law_article<br/>Get Legal Requirements]
    LEGAL --> TECH[rfcxml:get_requirements<br/>Get Technical Requirements]
    TECH --> MAP[Requirements Mapping]
    MAP --> GAP{Gap Exists?}
    GAP -->|Yes| IDENTIFY[Identify Unaddressed Requirements]
    GAP -->|No| REPORT[Generate Compliance Report]
    IDENTIFY --> PLAN[Create Response Plan]
    PLAN --> IMPL[Implementation]
    IMPL --> VERIFY[Verification]
    VERIFY --> REPORT
```

### Specific Example: Electronic Signature Act × RFC 3161

This specific example demonstrates how legal and technical requirements map to each other:

```mermaid
graph TB
    subgraph Legal Requirements["Electronic Signature Act Article 2"]
        L1["Creator Authentication"]
        L2["Tampering Detection"]
    end

    subgraph Technical Requirements["RFC 3161"]
        T1["TSA Signature"]
        T2["MessageImprint"]
        T3["genTime"]
    end

    L1 --> T1
    L2 --> T2
    T1 --> T3
    T2 --> T3
```

### Results

This approach has successfully enabled cross-domain analysis:

- Created correspondence table between Electronic Signature Act and RFC 3161
- Reflected in Notes-about-Digital-Signatures repository

### Design Decisions and Failure Cases

- **Mapping granularity:** Mapping at the law "article" level to technical "MUST requirement" level is most practical. Going down to the law "paragraph" level often makes the technical correspondence ambiguous.
- **Failure case:** Since law amendments and specification updates are asynchronous, the temporal validity of mappings must always be verified. While `hourei-mcp` retrieves the latest law data via the e-Gov API, attention must also be paid to the difference between enactment and promulgation dates.
- **Extensibility:** Currently limited to Electronic Signature Act × RFC, but legal-technical mapping is applicable to many domains — for example, Personal Information Protection Act × OAuth/OIDC specifications, or Electronic Books Preservation Act × PDF/A specifications.
