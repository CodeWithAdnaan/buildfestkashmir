# How to Run BuildFest Kashmir Website

This guide provides step-by-step instructions for setting up, running, and building the BuildFest Kashmir website.

---

## 1. Prerequisites

Before running the project, ensure you have installed:
- **Node.js**: v18.x or higher (recommended v20+)
- **npm**: (comes bundled with Node.js)

---

## 2. Environment Variables Setup

Ensure you have a `.env` file in the root of the project with the following required variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://sukhrojtmzzawynyfjnz.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-key-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

*(Note: If `.env` is missing, copy `.env.local.example` to `.env` and fill in the Supabase details).*

---

## 3. Install Dependencies

To install all required packages, run:

```bash
npm install
```

> **Windows PowerShell Note:** If PowerShell blocks script execution (`npm.ps1 cannot be loaded`), run:
> ```cmd
> npm.cmd install
> ```

---

## 4. Run Development Server

To start the local development server with hot-reloading:

### Standard Command (Linux / macOS / Git Bash / CMD):
```bash
npm run dev
```

### Windows PowerShell Command:
If you encounter PowerShell script execution restriction error:
```powershell
npm.cmd run dev
```
*or*
```powershell
cmd /c npm run dev
```
*or temporarily bypass execution policy for the current session:*
```powershell
Set-ExecutionPolicy -Scope Process RemoteSigned
npm run dev
```

---

## 5. Accessing the Website

Once the server is running, open your web browser and navigate to:

- **Local URL**: [http://localhost:3000](http://localhost:3000)

---

## 6. Additional Useful Commands

### Build for Production
To create an optimized production build:
```bash
npm run build
# (On Windows PowerShell if needed: npm.cmd run build)
```

### Start Production Server
To run the built production version:
```bash
npm run start
# (On Windows PowerShell if needed: npm.cmd run start)
```

### Run ESLint / Linter
To check for code formatting and linting errors:
```bash
npm run lint
# (On Windows PowerShell if needed: npm.cmd run lint)
```
