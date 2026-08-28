# Vibe Marketing B2B Skill

Create B2B vibe-marketing strategy, platform-native copy, cover concepts, and short-video production plans for partnership acquisition, especially education and training institutions that need a new growth product line.

This Codex skill is not a generic marketing prompt. It treats B2B content as a business opportunity signal: who should care, why now, what pain is being solved, what cooperation path feels credible, and how to filter out low-quality leads.

![Community mall cover example](examples/community-mall-cover.png)

![Community AI solution cover example](examples/community-ai-cover.png)

## Why Star This

- Turns vague B2B content ideas into audience-fit diagnosis, funnel logic, and concrete deliverables.
- Designed for education/training cooperation scenarios such as 科创赛考, AI智绘教室, AI literacy, robotics, science experiments, and second-growth-line packaging.
- Handles Xiaohongshu/Douyin-style covers, editor notes, hot tags, short-video scripts, and editable video design drafts.
- Includes compliance and quality rules for lead filtering, platform tone, visual QA, and mixed Chinese-English voiceover terms.
- Works as both a strategy skill and a production-prep skill before Remotion video rendering.

## When To Use

Use this skill when you want to create:

- B2B opportunity positioning for a product or cooperation offer.
- Content matrices for institution owners, campus principals, channel partners, or curriculum directors.
- Xiaohongshu/Douyin cover titles and visual directions.
- Short-video scripts and editable design drafts.
- Lead-quality filters that avoid attracting the wrong buyers.
- Cross-platform adaptations while preserving the approved business strategy.

## Example Outputs

The `examples/` folder contains representative outputs from prior production runs:

- `examples/community-mall-cover.png`: Xiaohongshu/Douyin first-frame cover for a community-mall institution scenario.
- `examples/community-ai-cover.png`: cover direction for a community growth-center AI education solution.
- `examples/video-design-draft.md`: editable short-video design draft used before rendering.

## How To Invoke

```text
$vibe-marketing-b2b
Help me package this education product as a B2B cooperation opportunity for training institution owners. Give me the target audience, pain point, title, content matrix, and lead-quality filter.
```

```text
$vibe-marketing-b2b
Create a Xiaohongshu/Douyin short-video design draft for a 科创赛考 course system aimed at English training institutions that want a second growth line.
```

```text
$vibe-marketing-b2b
Turn this approved title into a complete platform package: cover direction, editor note, 5 hot tags, and a consultation funnel.
```

## What It Produces

- B2B opportunity diagnosis and target-institution fit.
- Content matrix and single-topic planning.
- Xiaohongshu/Douyin cover strategy.
- Editable short-video design draft before production.
- Platform copy, editor note, and 5 related hot tags.
- Funnel suggestions such as checklist download, institution diagnosis, solution meeting, and pilot cooperation.
- QA checks for platform style, risk wording, lead quality, and visual delivery readiness.

## Install

Copy the skill folder into a Codex-compatible skills directory:

```bash
mkdir -p ~/.codex/skills
cp -R vibe-marketing-b2b ~/.codex/skills/
```

Then invoke it in Codex with `$vibe-marketing-b2b`.

## Repository Structure

- `vibe-marketing-b2b/SKILL.md`: main skill workflow, positioning logic, and delivery discipline.
- `vibe-marketing-b2b/references/deliverables.md`: output types and minimum requirements.
- `vibe-marketing-b2b/references/cover-formulas.md`: cover-title and scene formulas.
- `vibe-marketing-b2b/references/xiaohongshu-taboo.md`: Xiaohongshu risk and tone guardrails.
- `vibe-marketing-b2b/references/video-design-draft.md`: pre-render video draft structure.
- `vibe-marketing-b2b/references/production-qa-rules.md`: QA rules for covers, videos, and platform packages.
- `vibe-marketing-b2b/references/dependencies.md`: optional production dependencies.
- `examples/`: representative covers and a video design draft.

## Production Notes

Strategy, copy, and design drafts do not require media dependencies.

Full video production may require a local video toolchain. The dependency notes are kept in:

```text
vibe-marketing-b2b/references/dependencies.md
```

The skill defaults to draft-first production: create an editable Markdown video design draft, wait for confirmation, then render only when the user asks to proceed.

## Customization Ideas

Fork this skill if you want to adapt it for:

- SaaS channel partnerships.
- Local lifestyle franchise or招商加盟 content.
- B2B lead-generation for agencies or consultants.
- Another education segment, such as study tours, robotics, art education, STEM camps, or AI literacy.
- A stricter sales funnel with CRM fields, qualification scoring, and follow-up scripts.

The best starting points are `vibe-marketing-b2b/SKILL.md` and the files under `vibe-marketing-b2b/references/`.

## Boundary

This skill is optimized for credible B2B attraction and qualified leads. It should not make exaggerated outcome promises, imply guaranteed enrollment, or use aggressive traffic-capture wording.
