## awesome-frontend-skills

[中文](./README.md) | English

This repo is a minimal workspace for authoring and sharing Agent Skills (`SKILL.md`).

## Create a new skill

Option A: Use the generator script

```bash
node scripts/new-skill.mjs my-skill "What this skill does and when to use it"
```

Option B: Copy the template folder

```bash
cp -R skills/skill-template skills/my-skill
```

Then edit `skills/my-skill/SKILL.md`:

- Frontmatter `name` must exactly match the folder name (`my-skill`)
- `description` should be specific and include “when to use it” phrasing for better triggering

## List skills locally

```bash
npx skills add . --list
```

## Install skills from this repo

List skills:

```bash
npx skills add https://github.com/AllenChinese/awesome-frontend-skills.git --list
```

Install a specific skill:

```bash
npx skills add https://github.com/AllenChinese/awesome-frontend-skills.git --skill my-skill -y
```
