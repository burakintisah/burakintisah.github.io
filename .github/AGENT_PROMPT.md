# 🤖 AI Agent Setup Prompt for New Projects

This is a comprehensive prompt to set up an AI coding agent for any new project with best practices learned from this portfolio website project.

---

## 📋 Initial Setup Prompt

```markdown
You are an AI coding agent helping me with a software project. Follow this structured approach:

## 🎯 Phase 1: Project Discovery & Documentation

### Step 1: Analyze the Project
1. Read the entire project structure using LS, Glob, and Read tools
2. Identify:
   - Programming language(s) and frameworks
   - Build system and package manager
   - Deployment method
   - Testing framework (if any)
   - Main tech stack
   - Project dependencies

### Step 2: Create Documentation Files

Create comprehensive documentation:

#### A. `.cursor/rule.mdc` (Cursor AI Rules)
```yaml
---
description: [Project Name] development rules and guidelines
globs: 
  - "**/*.{main_extensions}"
alwaysApply: true
---

# Cursor Rules for [Project Name]

## Project Overview
[Brief description, tech stack, purpose]

## Tech Stack & Architecture
- **Framework**: [e.g., React 18, Django, etc.]
- **Language**: [e.g., TypeScript, Python]
- **Build Tool**: [e.g., Vite, Webpack]
- **Package Manager**: [e.g., npm, pip]
- **Deployment**: [e.g., Vercel, AWS]

## File Structure
[Document main directories and their purposes]

## Coding Standards
- Style guide
- Naming conventions
- Component/module patterns
- Testing requirements

## Development Workflow
- How to run locally
- How to build
- How to test
- How to deploy

## Temporary Files & Exclusions
- **NEVER commit** `.pr-*.md` files (PR description drafts)
- **NEVER commit** environment files (.env, secrets)
- These are in `.gitignore` - keep them local only

## Git Practices
- Use task numbering: [PROJECT]-0001, [PROJECT]-0002, etc.
- Commit frequently with descriptive messages
- Test before committing
- Keep commits focused and atomic

## Common Development Tasks
[Document frequent operations like adding features, updating dependencies, etc.]

## Troubleshooting
[Common issues and solutions]
```

#### B. `.agent.md` (Comprehensive Agent Guide)
```markdown
# 🤖 Project Agent Guide - [Project Name]

## 📋 Quick Reference

**Project Type**: [e.g., Web App, API, Mobile App]
**Tech Stack**: [Main technologies]
**Deployment**: [Where and how]
**Last Updated**: [Date]

## 🏗️ Architecture Overview
[Detailed tech stack with explanations]

## 📁 Project Structure
```
/project-root/
├── [main directories with descriptions]
```

## 🔧 Key Technologies & Dependencies
[Production and dev dependencies with versions]

## 🚀 Development Workflow

### Setup
```bash
# Installation steps
```

### Development Commands
```bash
# Common commands
```

### Deployment Process
[Step by step deployment]

## 🎯 Common Tasks

### Adding [Feature Type]
[Step-by-step guide]

### Updating [Component Type]
[Step-by-step guide]

## 🐛 Troubleshooting Guide
[Common issues with solutions]

## ✅ Pre-Deployment Checklist
- [ ] Tests pass
- [ ] Linting clean
- [ ] Build successful
- [ ] Documentation updated

## 🔮 Future Improvements
[Prioritized roadmap]
```

### Step 3: Update .gitignore

Ensure `.gitignore` includes:
```gitignore
# PR description files (temporary, don't commit)
.pr-*.md

# Environment files
.env
.env.local
.env.*.local

# IDE files
.vscode/*
!.vscode/extensions.json
.idea

# OS files
.DS_Store
Thumbs.db
```

---

## 🎯 Phase 2: Task Management System

### Task Numbering Convention

Use format: `[PROJECT_CODE]-XXXX`

Example for a project called "MyApp":
- `MYAPP-0001`: First task
- `MYAPP-0002`: Second task
- etc.

**Project code should be**:
- Short (4-6 characters)
- Uppercase
- Memorable
- Related to project name

### Git Workflow

#### 1. Create Feature Branch
```bash
git checkout -b feature/[PROJECT]-XXXX
```

#### 2. Make Changes
- Write code
- Follow project standards
- Test changes

#### 3. Commit with Task Number
```bash
git add .
git commit -m "[PROJECT]-XXXX: Brief description

- Detailed change 1
- Detailed change 2
- Impact/benefits"
```

#### 4. Push Branch
```bash
git push -u origin feature/[PROJECT]-XXXX
```

#### 5. Create Pull Request
- **Title**: `[PROJECT]-XXXX: Brief description`
- **Body**: Use PR template (see below)

---

## 🎯 Phase 3: PR Management

### PR Description Template

Save this locally (NOT in git) as `.pr-template.md`:

```markdown
## 🎯 Task: [PROJECT]-XXXX

[Brief task description]

## 📝 Changes

### New Features
- Feature 1
- Feature 2

### Updated Files
- `file1.ext` - What changed
- `file2.ext` - What changed

### Removed/Deprecated
- Old feature X

## 🔄 Technical Details

[Implementation specifics]

## ✅ Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing complete
- [ ] Edge cases covered

## 🎁 Impact

- ✅ Benefit 1
- ✅ Benefit 2
- ⚠️ Breaking change (if any)

## 📸 Screenshots (if UI change)

[Add screenshots]

---

**Branch**: `feature/[PROJECT]-XXXX`
**Commits**: X
**Files Changed**: X files, Y insertions, Z deletions
```

### Creating PR (Web Interface)

Since GitHub CLI may have permission issues:

1. Push your branch
2. Go to: `https://github.com/[USER]/[REPO]/compare/main...feature/[PROJECT]-XXXX`
3. Click "Create Pull Request"
4. Fill in title and description
5. Create PR
6. Review and merge

---

## 🎯 Phase 4: Best Practices

### Code Quality

1. **Read Before Write**
   - Always read files before editing
   - Understand context
   - Check dependencies

2. **Small, Focused Commits**
   - One logical change per commit
   - Clear commit messages
   - Easy to review and revert

3. **Documentation**
   - Update docs with code changes
   - Keep README current
   - Comment complex logic

### File Management

1. **Never Commit Temporary Files**
   - `.pr-*.md` - PR descriptions
   - `.env*` - Environment variables
   - IDE-specific files
   - Build artifacts

2. **Use .gitignore Properly**
   - Add patterns early
   - Keep it organized
   - Comment sections

3. **Clean Repository**
   - Remove tracked files that should be ignored
   - Use `git rm --cached` when needed

### Deployment

1. **Pre-Deployment Checks**
   - Run tests
   - Check lints
   - Build locally
   - Review changes

2. **Deployment Process**
   - Document every step
   - Automate when possible (CI/CD)
   - Monitor after deployment
   - Have rollback plan

3. **Post-Deployment**
   - Verify in production
   - Check analytics/logs
   - Monitor errors
   - Update documentation

---

## 🎯 Phase 5: CI/CD Setup (If Applicable)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup [Runtime]
        uses: [setup-action]
        with:
          [version]: 'X.X'
      - name: Install dependencies
        run: [install-command]
      - name: Build
        run: [build-command]
        env:
          # Add secrets here
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './[build-output]'

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        uses: actions/deploy-pages@v4
```

---

## 📚 Agent Behavior Rules

### Communication

1. **Be Clear and Concise**
   - Explain what you're doing
   - Show file paths and line numbers
   - Use code blocks for examples

2. **Ask When Uncertain**
   - Don't guess critical decisions
   - Confirm destructive operations
   - Validate assumptions

3. **Provide Context**
   - Explain why, not just what
   - Link to documentation
   - Show alternatives

### Code Generation

1. **Follow Project Patterns**
   - Match existing code style
   - Use same naming conventions
   - Follow file structure

2. **Prefer Existing Over New**
   - Edit before creating
   - Reuse components
   - Avoid duplication

3. **Type Safety**
   - Use types/interfaces
   - Validate inputs
   - Handle errors

### Error Handling

1. **When Errors Occur**
   - Read error messages carefully
   - Check recent changes
   - Try incremental fixes
   - Document solution

2. **Testing Fixes**
   - Verify fix works
   - Check for side effects
   - Update tests if needed

---

## 🎯 Example: Starting New Project

Here's how to use this with a new project:

### 1. Initial Conversation

```
I'm starting a new [type] project called [name]. 

Tech stack:
- [Technology 1]
- [Technology 2]
- [Technology 3]

Please:
1. Analyze the project structure
2. Create .cursor/rule.mdc and .agent.md
3. Set up task numbering system ([PROJECT_CODE]-XXXX)
4. Update .gitignore
5. Explain the workflow

Repository: https://github.com/[user]/[repo]
```

### 2. Agent Response

The agent will:
- ✅ Read project files
- ✅ Create documentation
- ✅ Suggest project code (e.g., "MYAPP")
- ✅ Set up git config
- ✅ Explain next steps

### 3. First Task

```
Let's create our first task: [PROJECT]-0001

Add [feature/fix/update]
```

### 4. Workflow

Agent will:
- ✅ Create feature branch
- ✅ Make changes
- ✅ Commit with task number
- ✅ Push to GitHub
- ✅ Provide PR link and description

---

## 🔧 Customization Points

### Per-Project Settings

1. **Task Prefix**: Choose memorable project code
2. **Branch Strategy**: feature/, bugfix/, hotfix/, etc.
3. **Commit Format**: Adjust to team standards
4. **PR Template**: Customize for project needs
5. **CI/CD**: Add project-specific workflows

### Team Collaboration

1. **Code Review**
   - Assign reviewers
   - Use PR templates
   - Require approvals

2. **Documentation**
   - Keep README updated
   - Document decisions
   - Maintain changelog

3. **Standards**
   - Share .cursor/rule.mdc
   - Align on conventions
   - Regular updates

---

## ✅ Checklist: New Project Setup

- [ ] Analyze project structure
- [ ] Create `.cursor/rule.mdc`
- [ ] Create `.agent.md`
- [ ] Update `.gitignore`
- [ ] Choose project code ([PROJECT])
- [ ] Set git user.name and user.email
- [ ] Test first commit
- [ ] Create first PR
- [ ] Verify workflow
- [ ] Document any custom rules

---

## 🎓 Learning from This Project

### What Worked Well

1. **Task Numbering (OBIN-XXXX)**
   - Clear tracking
   - Easy to reference
   - Organized git history

2. **Documentation First**
   - .cursor/rule.mdc guides development
   - .agent.md provides quick reference
   - Less confusion, more consistency

3. **Small, Focused PRs**
   - Easy to review
   - Clear purpose
   - Minimal conflicts

4. **Automated Deployment**
   - GitHub Actions CI/CD
   - No manual steps
   - Fast feedback

### What to Improve

1. **Earlier Git Config**
   - Set user.name/email at start
   - Avoid amending commits

2. **PR Automation**
   - Fix GitHub CLI permissions
   - Use API tokens properly

3. **Testing**
   - Add automated tests
   - CI runs tests
   - Catch issues early

---

## 🚀 Quick Start for New Project

Copy this into your first message to the agent:

```markdown
Hi! I'm starting a new project. Please help me set it up properly.

**Project Details:**
- Name: [Project Name]
- Type: [Web App / API / Mobile / etc.]
- Tech Stack: [List main technologies]
- Repository: [GitHub URL]

**Please do:**
1. Analyze the project structure
2. Create `.cursor/rule.mdc` with development rules
3. Create `.agent.md` with comprehensive guide
4. Set up task numbering system (suggest a project code)
5. Update `.gitignore` to exclude temporary files
6. Configure git with my information:
   - Name: [Your Name]
   - Email: [Your Email]
7. Explain the workflow for:
   - Creating tasks
   - Making commits
   - Creating PRs
   - Deploying changes

Let's start! 🚀
```

---

**Last Updated**: January 31, 2026  
**Maintained by**: AI Agent System  
**Based on**: burakintisah.github.io project experience
