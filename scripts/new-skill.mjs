import fs from 'node:fs/promises'
import path from 'node:path'

const args = process.argv.slice(2)
const name = args[0]
const description = args[1] || ''
const force = args.includes('--force')

if (!name) {
  process.stderr.write(
    'Usage: node scripts/new-skill.mjs <skill-name> "<description>" [--force]\n'
  )
  process.exit(1)
}

const validName = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name) && name.length <= 64
if (!validName) {
  process.stderr.write(
    'Invalid skill name. Use lowercase letters/numbers and hyphens only, max 64 chars.\n'
  )
  process.exit(1)
}

const repoRoot = process.cwd()
const templateDir = path.join(repoRoot, 'skills', 'skill-template')
const targetDir = path.join(repoRoot, 'skills', name)
const templateSkillPath = path.join(templateDir, 'SKILL.md')
const targetSkillPath = path.join(targetDir, 'SKILL.md')

async function exists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

if (!(await exists(templateSkillPath))) {
  process.stderr.write('Template not found: skills/skill-template/SKILL.md\n')
  process.exit(1)
}

if ((await exists(targetDir)) && !force) {
  process.stderr.write(
    `Target already exists: skills/${name}\nUse --force to overwrite.\n`
  )
  process.exit(1)
}

await fs.rm(targetDir, { recursive: true, force: true })
await fs.mkdir(targetDir, { recursive: true })

const template = await fs.readFile(templateSkillPath, 'utf8')

const updated = template
  .replace(/name:\s*skill-template/g, `name: ${name}`)
  .replace(
    /description:\s*.*$/m,
    `description: ${description || 'Describe what this skill does and when to use it.'}`
  )
  .replace(/^#\s*skill-template\s*$/m, `# ${name}`)

await fs.writeFile(targetSkillPath, updated, 'utf8')

process.stdout.write(`Created: skills/${name}/SKILL.md\n`)
process.stdout.write('Next:\n')
process.stdout.write(`- Edit skills/${name}/SKILL.md\n`)
process.stdout.write('- Validate: npx skills add . --list\n')
