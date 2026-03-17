## awesome-frontend-skills

默认中文 | [English](./README.en.md)

这个仓库用于编写与分享 Agent Skills（即 `SKILL.md` 形式的可复用任务流程）。

## 创建一个新 Skill

方式 A：使用生成脚本

```bash
node scripts/new-skill.mjs my-skill "这个 skill 做什么，以及什么时候使用它"
```

方式 B：复制模板目录

```bash
cp -R skills/skill-template skills/my-skill
```

然后编辑 `skills/my-skill/SKILL.md`：

- Frontmatter 的 `name` 必须与目录名完全一致（如：`my-skill`）
- `description` 建议写清楚“做什么 + 何时使用”，这样更容易被自动触发

## 本地列出 Skills

```bash
npx skills add . --list
```

## 从 GitHub 安装本仓库的 Skills

列出远端仓库的 skills：

```bash
npx skills add https://github.com/AllenChinese/awesome-frontend-skills.git --list
```

安装某个指定 skill：

```bash
npx skills add https://github.com/AllenChinese/awesome-frontend-skills.git --skill my-skill -y
```
