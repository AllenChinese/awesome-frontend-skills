---
name: skill-template
description: A template skill folder you can copy to quickly create new skills (copy/rename the folder and update name/description).
---

# skill-template

This is a template skill. Copy this folder to create a new skill quickly.

## Quick Start

1. Copy this folder to `skills/<your-skill-name>/`
2. In the new folder, edit `SKILL.md`:
   - Update frontmatter `name` to exactly match the folder name
   - Update `description` to clearly state what the skill does and when to use it
3. Replace all placeholder sections below with your real workflow

## Structure

Use this structure for most skills:

- **Goal**: What the agent should accomplish
- **Triggering**: What user phrases/contexts should load this skill
- **Inputs**: What the user must provide (files, URLs, constraints)
- **Outputs**: What the agent should produce (files, code, checklist)
- **Workflow**: Step-by-step procedure
- **Quality Gates**: How to verify the output is correct

## Goal

Describe the skill’s purpose in one paragraph.

## When To Use

List the scenarios that should trigger this skill.

## Inputs

- Required:
  - <input-1>
  - <input-2>
- Optional:
  - <input-optional-1>

## Outputs

Define the expected output format(s).

## Workflow

1. Gather context
2. Locate relevant files
3. Implement changes following repo conventions
4. Validate with available commands
5. Summarize changes and provide file links

## Quality Gates

- No secrets logged or committed
- Follows existing code style and project conventions
- Runs relevant checks (lint/typecheck/tests) when available

## Notes

- Keep frontmatter `description` specific and “trigger-friendly”
- Prefer referencing additional files in this folder for long checklists/examples
