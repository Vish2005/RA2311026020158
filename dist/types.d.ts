export type Stack = "backend" | "frontend";
export type Level = "debug" | "info" | "warn" | "error" | "fatal";
export type Package = "api" | "component" | "hook" | "page" | "state" | "style" | "cache" | "controller" | "cron_job" | "db" | "domain" | "handler" | "repository" | "route" | "service" | "auth" | "config" | "middleware" | "utils";
export interface LogPayload {
    stack: Stack;
    level: Level;
    package: Package;
    message: string;
}
