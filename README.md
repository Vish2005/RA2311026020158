# Campus Notifications System

A complete solution for the Campus Hiring Evaluation, consisting of a custom logging middleware package, a robust backend data processing script, and a responsive frontend web application built with Next.js and Material UI.

## Demo Video

https://github.com/user-attachments/assets/8b32f5f6-20f8-446a-acf9-4ac4d9614fbf

## Project Structure

This repository is organized into the following components to adhere to the strict evaluation constraints:

*   **`logging_middleware/`**
    *   A standalone, reusable TypeScript NPM package.
    *   Implements strict type constraints for logging `stack`, `level`, and `package` origins.
    *   Securely formats and transmits logs to the evaluation service using Bearer token authentication.
*   **`notification_app_fe/`**
    *   A Next.js (App Router) frontend application.
    *   Features a responsive, Material UI-based interface.
    *   Includes a `Settings` page for dynamic token injection and state persistence.
    *   Provides dynamic fetching, filtering, and priority sorting of notifications.
    *   Uses a Next.js API proxy (`next.config.ts` rewrites) to seamlessly bypass CORS blocking.
*   **`notification_app_be/`**
    *   Contains the `stage1.ts` backend script.
    *   Implements the custom priority algorithm (sorting by Weight: Placement > Result > Event, and then by Recency).
*   **`notification_system_design.md`**
    *   Detailed architectural documentation covering the system design, error handling, API integration strategy, and component lifecycle.

## Getting Started

### 1. Setup the Logging Middleware
```bash
cd logging_middleware
npm install
npm run build
npm link
```

### 2. Run the Frontend Application
```bash
cd ../notification_app_fe
npm install
npm link logging-middleware
npm run dev
```
Open `http://localhost:3000` in your browser. Navigate to the **Settings** tab to input your generated Access Token before viewing notifications.

### 3. Run the Backend Priority Script
```bash
cd ../notification_app_be
# Ensure you set your ACCESS_TOKEN inside the script or as an env variable
npx tsx stage1.ts
```
