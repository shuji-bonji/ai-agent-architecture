---
title: IV.4 Prompt decomposition
description: Split what you write every time into addresses in the five layers. The prompt does not vanish. It thins.
---

# IV.4 Prompt decomposition

> [!NOTE] Where this chapter sits
> A good prompt is already a bundle of concerns. This chapter splits that bundle into addresses in the five layers. Technique of phrasing is out. Why a flat sentence degrades is held by the sister site.

## 4.1 A prompt is one snapshot

"You are a careful reviewer. Look at this file this time. Do not take a change that has not passed tests. Return a table" looks like one sentence. Inside it, role, this turn's object, a prohibition, and form sit together.

Together is convenient for that turn. When the conversation ends, it vanishes. The next turn, you write it all again. The longer it is, the thinner the first prohibition, and the harder the middle is to read. The prescription is not a longer prompt. It is moving stable conditions into layers.

Prompt and design are not either-or. Layers are not a substitute for prompts. They are addresses so you need not say it every time. What remains in the prompt becomes "what is new this time". It thins.

## 4.2 Seven conditions

Role, premise, purpose, input, process and constraints, output form, examples and checks. An axis you do not specify, the model fills. The filled place drifts from turn to turn.

Existing frames such as RTF and CO-STAR point at the same concerns. The difference is that they are ways of writing inside one input. This book decides where the writing lives afterwards.

| Condition | Main address | If only this turn |
| --- | --- | --- |
| Role | Agent (from whose view) | May stay in the prompt |
| Premise | Memory (what happened) and Skills (what is true) | Today's background stays in the prompt |
| Purpose | Doctrine | — |
| Input | MCP (fetch) | Paste is the flattened form |
| Process and constraints | Doctrine (the line) and Skills (the steps) | — |
| Output form | Skills | A one-off form stays in the prompt |
| Examples and checks | Skills (examples), Doctrine (the pass line), Agent (the act of checking) | — |

The map is not a clean one-to-one. Constraints split to Doctrine, steps to Skills. Premise is Skills if it is "what is true", Memory if it is "what happened".

## 4.3 Lifetime chooses the address

After kind, look at how long it must last.

| Lifetime | Where it lives | Example |
| --- | --- | --- |
| This conversation only | The prompt | Today's file, today's request |
| For the project | Doctrine, Skills, `CLAUDE.md` | Conventions, pass lines, roles |
| Relations across cases | Memory | How it was decided last time |

Rewriting role, convention, form, and examples every time is the shape to avoid. Stable instructions and this turn's request fight for a seat. Move what can be moved. What remains **SHOULD** (should) be only what is new this time.

If you write purpose every time, that is a sign Doctrine is not there yet. If you paste input every time, that is a sign it is not yet fetchable through MCP.

## 4.4 Summary

The inside of a good prompt is a bundle of seven conditions. Split the bundle into the five layers by lifetime and kind. The prompt does not vanish. It thins into a sentence that carries only this turn. The layers are those addresses.

## Related pages

- [II.2 Placement](../part-2/placement)
- [III.1 Skills](../skills/what-is-skills)
- [III.3 Doctrine](../part-3/doctrine)
- [understanding-llm / Part 1](https://shuji-bonji.github.io/understanding-llm-through-claude-code/01-llm-structural-problems/) — why long input degrades

---

> **Previous**: [IV.3 Physical world](./physical)
>
> **Next**: [Composition patterns](../strategy/composition-patterns)
