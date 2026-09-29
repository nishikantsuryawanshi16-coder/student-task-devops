# Deployment Guide

## Option A — GitHub Pages (recommended for the college demo)

### 1. Create a GitHub repository
Create an empty repository, for example:

`student-task-devops`

### 2. Open the project in VS Code
Open the folder containing `index.html`.

### 3. Push the project
In the VS Code terminal:

```cmd
git init
git add .
git commit -m "Initial student task manager"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your repository URL.

### 4. Enable GitHub Pages
On GitHub, open the repository:

`Settings → Pages`

Under **Build and deployment**, choose **GitHub Actions**.

The repository already contains `.github/workflows/pages.yml`.

### 5. Wait for the workflow to finish
Open:

`Actions → Deploy to GitHub Pages`

When it succeeds, GitHub Pages will show the deployed site URL.

Every new push to `main` will trigger the deployment workflow again.

## Option B — Docker (local demo)

From the project folder:

```cmd
docker build -t student-task-manager .
docker run --name student-task-manager -p 8080:80 student-task-manager
```

Open:

`http://localhost:8080`

Stop the container:

```cmd
docker stop student-task-manager
docker rm student-task-manager
```

## Option C — Vercel

1. Push the project to GitHub.
2. Sign in to Vercel.
3. Import the GitHub repository.
4. Use the repository root as the project directory.
5. Deploy.

No environment variables are required for this project.

## CI/CD explanation

The CI workflow in `.github/workflows/ci.yml` runs on pushes and pull requests to `main`.

```text
Developer
   ↓
git push
   ↓
GitHub
   ↓
GitHub Actions
   ├── Install Node.js dependencies
   ├── Run automated tests
   ├── Run build check
   └── Build Docker image
```

The Pages workflow then publishes the static site to GitHub Pages on pushes to `main`.
