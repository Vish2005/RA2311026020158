import { Stack, Level, Package } from "./types";
export * from "./types";
export declare class Logger {
    private static accessToken;
    private static API_URL;
    /**
     * Initializes the logger with the bearer access token.
     * This should be called once when your application starts.
     */
    static init(accessToken: string, customApiUrl?: string): void;
    /**
     * Sends a log message to the AffordMed evaluation service.
     */
    static Log(stack: Stack, level: Level, pkg: Package, message: string): Promise<void>;
}
export declare const Log: (stack: Stack, level: Level, pkg: Package, message: string) => Promise<void>;
