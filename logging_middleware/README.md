# Logging Middleware

A reusable logging package in TypeScript for the Campus Hiring Evaluation.

## Building the Package

To compile the TypeScript source into JavaScript so that it can be used in your Frontend or Backend applications, run:

```bash
npm install
npm run build
```

This will output the compiled files into the `dist/` folder.

## Linking the Package

To use this package locally in your other applications without publishing it to NPM, you can use `npm link`.

1. Inside this `logging middleware` folder, run:
   ```bash
   npm link
   ```
2. Navigate to your Frontend (or Backend) project folder, and run:
   ```bash
   npm link logging-middleware
   ```

## Usage

Before logging any messages, you must initialize the `Logger` with the `access_token` you received from the `/auth` API. 

```javascript
import { Logger, Log } from "logging-middleware";

// 1. Initialize the Logger (do this once when your app starts)
Logger.init("YOUR_ACCESS_TOKEN_HERE");

// 2. Call the Log function wherever needed in your application
// Log(stack, level, package, message)
Log("frontend", "info", "page", "User successfully visited the homepage.");
```

### Constraints

The `Log` function strict types enforce the following:
- **Stack**: `"backend" | "frontend"`
- **Level**: `"debug" | "info" | "warn" | "error" | "fatal"`
- **Package**:
  - Frontend only: `"api" | "component" | "hook" | "page" | "state" | "style"`
  - Backend only: `"cache" | "controller" | "cron_job" | "db" | "domain" | "handler" | "repository" | "route" | "service"`
  - Both: `"auth" | "config" | "middleware" | "utils"`
