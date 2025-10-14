# 📦 Git & GitHub Setup Guide

## 🎯 Step-by-Step Instructions

### ✅ Step 1: Create New GitHub Repository

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name**: `tenant-management-system` (or your choice)
   - **Description**: `Laravel + React Tenant Management System with CRUD operations`
   - **Visibility**: Choose **Public** or **Private**
   - ⚠️ **DO NOT** check "Initialize this repository with a README"
   - ⚠️ **DO NOT** add `.gitignore` or license (we have them already)
3. Click **Create repository**
4. **Copy the repository URL** (it will look like: `https://github.com/YOUR_USERNAME/tenant-management-system.git`)

---

### ✅ Step 2: Initialize Git in Your Project

Open PowerShell in your project folder:

```powershell
# Navigate to your project
cd c:\xampp\htdocs\SammiesAptt

# Initialize git
git init

# Check status (see what files will be added)
git status
```

---

### ✅ Step 3: Configure Git (First Time Only)

If this is your first time using Git, set your identity:

```powershell
# Set your name
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"

# Verify
git config --global --list
```

---

### ✅ Step 4: Add Files and Create First Commit

```powershell
# Add all files (respects .gitignore)
git add .

# Check what will be committed
git status

# Create your first commit
git commit -m "Initial commit: Complete Laravel + React Tenant Management System

Features:
✅ CRUD operations (Create, Read, Update, Delete)
✅ Avatar upload with AVIF support
✅ Enhanced validation (Name, Room, Contact, Email)
✅ Philippine contact number format (09XXXXXXXXX)
✅ Unique room numbers validation
✅ Real-time error handling
✅ CORS configured
✅ File storage setup
✅ Toast notifications
✅ Modal-based UI"
```

---

### ✅ Step 5: Connect to GitHub

```powershell
# Add your GitHub repository as remote
# Replace YOUR_USERNAME and YOUR_REPO with your actual values
git remote add origin https://github.com/YOUR_USERNAME/tenant-management-system.git

# Verify the remote
git remote -v
```

---

### ✅ Step 6: Push to GitHub

```powershell
# Rename branch to 'main' (if needed)
git branch -M main

# Push to GitHub (first time)
git push -u origin main
```

If prompted, you may need to authenticate:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your password)
  - Get token at: https://github.com/settings/tokens

---

## 🔄 Future Updates

After the initial setup, when you make changes:

```powershell
# See what changed
git status

# Add specific files
git add TenantManagement.jsx
git add api/app/Http/Controllers/TenantController.php

# Or add all changes
git add .

# Commit with message
git commit -m "Fix: Updated contact validation for +639 format"

# Push to GitHub
git push
```

---

## 📝 Useful Git Commands

```powershell
# Check current status
git status

# View commit history
git log --oneline

# See what changed in files
git diff

# Undo changes to a file (before commit)
git checkout -- filename.txt

# View remote repository
git remote -v

# Pull latest changes from GitHub
git pull origin main

# Create a new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main
```

---

## 🚫 What .gitignore Excludes

Your `.gitignore` file prevents these from being committed:

- ❌ `/api/vendor/` - Composer dependencies
- ❌ `/api/.env` - Database credentials (NEVER commit this!)
- ❌ `/api/storage/logs/` - Log files
- ❌ `/api/storage/framework/` - Cache files
- ❌ `/api/storage/app/private/` - Private files
- ❌ `/api/storage/app/public/avatars/*` - User uploaded images (optional)
- ❌ `.idea/`, `.vscode/` - IDE settings
- ❌ `node_modules/` - Node packages

✅ The `.env` file is EXCLUDED - this is important for security!

---

## ⚠️ Important Notes

### 🔐 Never Commit Sensitive Data
```
❌ NEVER commit:
- Database passwords (.env file)
- API keys
- Private keys
- User uploaded files (optional)
```

### 📄 .env File Handling
The `.env` file is NOT committed. Create a `.env.example` instead:

```powershell
cd api
copy .env .env.example

# Edit .env.example to remove sensitive data
# Replace actual values with placeholders:
DB_PASSWORD=your_password_here
```

Then commit `.env.example`:
```powershell
git add .env.example
git commit -m "Add .env.example for setup reference"
git push
```

---

## 🎯 Quick Reference

### Initial Setup
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

### Regular Updates
```powershell
git add .
git commit -m "Your commit message"
git push
```

---

## 🆘 Common Issues

### Issue: "fatal: not a git repository"
**Solution**: Run `git init` first

### Issue: "failed to push some refs"
**Solution**: Pull first, then push
```powershell
git pull origin main --rebase
git push origin main
```

### Issue: "Permission denied"
**Solution**: Use Personal Access Token instead of password
- Generate at: https://github.com/settings/tokens

### Issue: "Everything up-to-date"
**Solution**: You haven't committed changes yet
```powershell
git add .
git commit -m "Your message"
git push
```

---

## ✅ Checklist Before Pushing

- [ ] `.gitignore` file is in place
- [ ] `.env` file is NOT being committed
- [ ] Sensitive data removed
- [ ] Code tested and working
- [ ] Meaningful commit message
- [ ] README.md updated (if needed)

---

## 🎉 You're Done!

Your code is now on GitHub! View it at:
```
https://github.com/YOUR_USERNAME/tenant-management-system
```

Share your repository link with others! 🚀
