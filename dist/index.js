"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.Logger = void 0;
__exportStar(require("./types"), exports);
class Logger {
    /**
     * Initializes the logger with the bearer access token.
     * This should be called once when your application starts.
     */
    static init(accessToken, customApiUrl) {
        this.accessToken = accessToken;
        if (customApiUrl) {
            this.API_URL = customApiUrl;
        }
    }
    /**
     * Sends a log message to the AffordMed evaluation service.
     */
    static async Log(stack, level, pkg, message) {
        if (!this.accessToken) {
            console.warn("Logger is not initialized. Call Logger.init(accessToken) before logging.");
            return;
        }
        const payload = {
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
            else {
                // Optional: you can uncomment the next line to debug successful log creations
                // const data = await response.json();
                // console.log("Log created:", data);
            }
        }
        catch (error) {
            console.error("Network error while trying to send log:", error);
        }
    }
}
exports.Logger = Logger;
Logger.accessToken = null;
Logger.API_URL = "http://20.207.122.201/evaluation-service/logs";
// Exporting a convenient standalone function as requested by the test
const Log = (stack, level, pkg, message) => {
    return Logger.Log(stack, level, pkg, message);
};
exports.Log = Log;
