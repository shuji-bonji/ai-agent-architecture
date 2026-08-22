---
title: IV.1 Patterns
description: RAG, MCP, fine-tuning, prompts, agents. Which to use, when, and in combination.
---

# IV.1 Patterns

> [!NOTE] Where Part IV sits
> Through Part III, ownership of the five layers was fixed. Part IV looks at types that show up in the field, and at lines that cannot be reached. This chapter is how to pick a type that fills a knowledge limit. RAG implementation steps are not cut here.

## 1.1 Types that show up often

There are several types for adding knowledge the model does not hold. They are not exclusive. One job may stack several.

| Type | What it does | Fits when | Breaks when |
| --- | --- | --- | --- |
| **Prompt** | Shape this turn's asking | Small trials. Setting tone | Everything is written here |
| **RAG** | Cut documents, search, place hits beside the answer | Internal write-ups, manuals | You need to point at a place, as in an article of a statute |
| **MCP** | Connect to source text or an API in a fixed form | Statutes, RFCs, the value of this instant | The server stops |
| **GraphRAG** | Search after relations are a graph | "Who is linked to what" | Graph quality is poor |
| **Fine-tuning** | Rewrite the inside of the model | Soak in phrasing and form for a long time | Statutes and specs change often |
| **Agentic** | Plan, use tools, check | Work with several steps | Loaded onto simple work that needs no judgment |

A prompt is the base of every type. Agent often combines RAG and MCP.

## 1.2 RAG and MCP

Both use knowledge outside the model. The centre of the difference is whether you cut text and look for similar sentences, or point at a place and take it.

Ask what Close code 1006 is in RFC 6455, and search of document scraps may mix in the neighbouring number. Taking the section through MCP lets you attach a citation.

"That write-up from that time" on an internal wiki is often enough with RAG. An article of a statute is connected to source text through MCP. If a net of relations is the body of the work, look at Memory or GraphRAG.

RAG **MUST NOT** be treated as "the standard". It is one type that joins search and generation. Bad chunk cuts drop context. Structured source text **SHOULD** (should) not be finished with scrap search alone.

Knowledge that changes often **MUST NOT** (must not) be baked into the model by fine-tuning. A design that retrains on every legal amendment breaks in operations first.

## 1.3 Ways of crowding that fail

| Crowd | What happens |
| --- | --- |
| Everything as RAG | Articles and tables become scraps and drift |
| Everything as an agent | Simple work gets heavy and hard to read |
| Everything as fine-tuning | Freshness cannot be followed |
| Everything as a prompt | Each turn fattens, and there is no seat for knowledge that should be loaded |

Work that needs no judgment may stay an ordinary program. That is the same as placement in Part II.

## 1.4 Relation to the five layers

A pattern is not another name for a layer. RAG is, in many cases, a way of fetching inside Agent. MCP is both a layer and a type. This book prefers the layer name. Type names are used when matching field language.

Field talk of combinations remains in [composition patterns](../strategy/composition-patterns).

## 1.5 Summary

Types may be stacked. Follow source text with MCP, search write-ups with RAG, keep relations with Memory, soak in phrasing with fine-tuning, and use Agent for work with steps. There is no silver bullet. Pick by how it breaks.

## Related pages

- [II.2 Placement](../part-2/placement)
- [Composition patterns](../strategy/composition-patterns)
- [III.2 MCP](../mcp/what-is-mcp)
- [III.4 Memory](../part-3/memory)

---

> **Previous**: [Agents](../agents/)
>
> **Next**: [IV.2 Limits](./limits)
