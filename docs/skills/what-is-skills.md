---
title: III.1 Skills
description: The layer for stable knowledge — team rules and procedures. It does not execute.
---

# III.1 Skills

> [!NOTE] Where this chapter sits
> Part III looks at the five layers one by one. Skills is the layer for rules that are not inside the model, written so they can be read when needed. How to write them and where each host puts them remain in the how-tos below.

## 1.1 What belongs here

Claude knows ordinary prose. It does not know this project's terms, the pass line for review, or the translation procedure. Writing all of that into every conversation thins as the conversation lengthens.

Skills is the layer that writes those rules in Markdown. The centre of the form is `SKILL.md`. Many products follow [Agent Skills](https://agentskills.io). They are read. They do not call outside APIs.

In translation, for example, consistent terms and "send back under xCOMET 0.85" are Skills. Calling a dictionary service is MCP. If the quality floor is the measure for every job, that is Doctrine.

## 1.2 Difference from MCP

| | Skills | MCP |
| --- | --- | --- |
| What it holds | What should be known | What can be done |
| Shape | Static documents such as Markdown | A server. Tools and data |
| Does it run? | No. It is referenced | Yes. It queries outside |
| Fits | Conventions, procedures, examples, pass lines | Fetching source text, translation APIs, scoring quality |

Both are often needed. Write "what to keep" as Skills, and add "fetch the value of this instant" as MCP. Detail of the split is [MCP vs Skills](./vs-mcp).

## 1.3 Kinds, in outline

| Kind | Content | Example |
| --- | --- | --- |
| Procedure | Order of the work | Translate, review, ship |
| Pass line | A number or a condition | xCOMET 0.85 or above |
| Guideline | A principle to keep | Naming, sentence length |
| Template | Shape of the output | A PR description, document headings |

One Skill may mix several. Mix too many, and instructions at once weaken each other. When a split is better, split roles on the Agent side.

Sections that belong in `SKILL.md` are purpose, inputs and outputs, MUST / SHOULD, steps, a measure of judgment, good and bad examples. The template is in the [Skill design guide](./creating-skills).

## 1.4 What must not live here

| Must not live here | Instead |
| --- | --- |
| Copying statute or RFC source and stopping | Connect to the source through MCP |
| Purpose and prohibitions as a whole | Doctrine |
| The body of last time's case | Memory |
| Running an outside API | MCP |

Skills are read only when referenced. They are not always all loaded. That is the answer to Context Rot. The mechanism is in the sister site [Part 5: On-demand context](https://shuji-bonji.github.io/understanding-llm-through-claude-code/05-on-demand-context/skills).

## 1.5 Pages that follow

How-tos and worked examples remain. They have not been deleted.

| Wanted | Page |
| --- | --- |
| Design judgment | [Skill design guide](./creating-skills) |
| Writing one | [How to create Skills](./how-to-create-skills) |
| Distilling from conversation | [Distilling Skills from conversations](./conversation-to-skill) |
| Adopting | [How to use Skills](./how-to-use-skills) |
| Use cases | [Skill use cases](./skill-use-cases) |
| What not to do | [Anti-patterns](./anti-patterns) |
| Worked examples | [Showcase](./showcase) |
| Split from MCP | [MCP vs Skills](./vs-mcp) |

## 1.6 Summary

Skills hold stable knowledge and procedures. They do not execute. Team rules are not inside the model, so they are written outside and read when needed. Source text and actions are MCP, the measure is Doctrine, last time's continuation is Memory.

---

> **Previous**: [II.2 Placement](../part-2/placement)
>
> **Next**: [MCP](../mcp/what-is-mcp)
