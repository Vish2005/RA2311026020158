import { Stack, Level, Package, LogPayload } from "./types";

export * from "./types";

export class Logger {
  private static accessToken: string | null = null;
  private static API_URL = "http://20.207.122.201/evaluation-service/logs";

  /**
   * Initializes the logger with the bearer access token.
   * This should be called once when your application starts.
   */
  public static init(accessToken: string, customApiUrl?: string) {
    this.accessToken = accessToken;
    if (customApiUrl) {
      this.API_URL = customApiUrl;
    }
  }

  /**
   * Sends a log message to the AffordMed evaluation service.
   */
  public static async Log(stack: Stack, level: Level, pkg: Package, message: string): Promise<void> {
    if (!this.accessToken) {
      console.warn("Logger is not initialized. Call Logger.init(accessToken) before logging.");
      return;
    }

    const payload: LogPayload = {
      stack,
      level,
      package: pkg,
      message,
    };

    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`Failed to send log to evaluation service. Status: ${response.status}`, errorData);
      }
    } catch (error) {
      console.error("Network error while trying to send log:", error);
    }
  }
}

export const Log = (stack: Stack, level: Level, pkg: Package, message: string) => {
  return Logger.Log(stack, level, pkg, message);
};
