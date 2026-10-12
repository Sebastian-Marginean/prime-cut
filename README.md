# prime-cut

Claude Code plugin with the **taste** skill — design taste rules for UI work.

## Install

From GitHub:

```
/plugin marketplace add <github-user>/prime-cut
/plugin install taste@prime-cut
```

From a local clone:

```
/plugin marketplace add C:/path/to/prime-cut
/plugin install taste@prime-cut
```

Or copy `skills/taste/` into `~/.claude/skills/` (all projects) or `<project>/.claude/skills/` (one project).

## Use

The skill triggers automatically when Claude builds UI. You can also call it explicitly with `/taste`.

## Structure

```
.claude-plugin/
  plugin.json        plugin manifest
  marketplace.json   lets this repo act as a plugin marketplace
skills/
  taste/SKILL.md     the skill
```
