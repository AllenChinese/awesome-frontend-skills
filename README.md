## awesome-frontend-skills

This repo is a minimal workspace for authoring and sharing Agent Skills (SKILL.md).

## Create A New Skill

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

## List Skills Locally

```bash
npx skills add . --list
```

## Install Skills From This Repo

List skills:

```bash
npx skills add https://github.com/AllenChinese/awesome-frontend-skills.git --list
```

Install a specific skill:

```bash
npx skills add https://github.com/AllenChinese/awesome-frontend-skills.git --skill my-skill -y
```
