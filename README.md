# DevOps-Based Student Task Management System

A beginner-friendly DevOps college project. It is a static web application, so it does not need MongoDB, a backend server, or IP configuration.

## Features
- Add, edit, complete, and delete tasks
- Subject, due date, priority, and description
- Search and filters
- Task statistics
- Clear completed tasks
- Browser localStorage persistence
- Light/dark mode

## DevOps Features
- Git/GitHub version control
- Automated tests with Node.js
- GitHub Actions CI workflow
- Docker containerization with Nginx
- GitHub Pages deployment workflow

## Run locally
Prerequisite: Node.js 18+.

```bash
npm install
npm test
npm run build
```

To open the app locally without installing a global package:

```bash
npx serve .
```

Then open the local URL shown by `serve`.

You can also simply double-click `index.html` for a quick UI-only demo, but use the commands above when demonstrating DevOps.

## Project structure

```text
student-task-devops/
├── .github/workflows/ci.yml
├── .github/workflows/pages.yml
├── tests/test.js
├── tests/build-check.js
├── index.html
├── style.css
├── app.js
├── package.json
├── Dockerfile
├── .dockerignore
├── .gitignore
├── README.md
└── DEPLOYMENT.md
```

## Suggested viva flow

1. Show the task application.
2. Add a task and mark it completed.
3. Push a small change to GitHub.
4. Open GitHub Actions and show the test/build/Docker steps.
5. Show the deployed site.
6. Explain that the same workflow can automatically validate every push.
