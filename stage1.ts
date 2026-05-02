// stage1.ts

interface Notification {
    ID: string;
    Type: "Placement" | "Result" | "Event";
    Message: string;
    Timestamp: string;
}

interface ApiResponse {
    notifications: Notification[];
}


const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "YOUR_ACCESS_TOKEN_HERE";
const API_URL = "http://20.207.122.201/evaluation-service/notifications";

/**
 * Weights for notification types: Placement > Result > Event
 */
const TYPE_WEIGHTS: Record<Notification["Type"], number> = {
    Placement: 3,
    Result: 2,
    Event: 1,
};

/**
 * Fetches notifications from the API.
 */
async function fetchNotifications(): Promise<Notification[]> {
    if (ACCESS_TOKEN === "YOUR_ACCESS_TOKEN_HERE") {
        console.error("Please set your ACCESS_TOKEN in the script or via environment variable.");
        process.exit(1);
    }

    try {
        const response = await fetch(API_URL, {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`API returned status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        return data.notifications;
    } catch (error) {
        console.error("Failed to fetch notifications:", error);
        return [];
    }
}

/**
 * Sorts notifications based on priority (Type weight) and recency (Timestamp).
 */
function sortNotifications(notifications: Notification[]): Notification[] {
    return notifications.sort((a, b) => {

        const weightA = TYPE_WEIGHTS[a.Type] || 0;
        const weightB = TYPE_WEIGHTS[b.Type] || 0;

        if (weightA !== weightB) {
            return weightB - weightA;
        }


        if (a.Timestamp > b.Timestamp) return -1;
        if (a.Timestamp < b.Timestamp) return 1;

        return 0;
    });
}

/**
 * Main execution function
 */
async function runStage1(n: number) {
    console.log("Fetching notifications...");
    const notifications = await fetchNotifications();
    console.log(`Successfully fetched ${notifications.length} notifications.\n`);

    const sortedNotifications = sortNotifications(notifications);
    const topN = sortedNotifications.slice(0, n);

    console.log(`--- Top ${n} Priority Notifications ---\n`);
    topN.forEach((notif, index) => {
        console.log(`${index + 1}. [${notif.Type}] (${notif.Timestamp})`);
        console.log(`    Message: ${notif.Message}`);
        console.log(`    ID: ${notif.ID}\n`);
    });
}


runStage1(10);
