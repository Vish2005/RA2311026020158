# Stage 1

## Priority Inbox Design

### Approach
The primary goal of the Priority Inbox is to surface the most critical and timely notifications to students, preventing important updates from being lost in a high-volume notification stream.

To achieve this, the sorting mechanism relies on two key factors:
1. **Weight (Type-based Priority):** Not all notifications carry the same significance. We assign a deterministic weight to each notification type:
   - **Placement** (Weight: 3) - Highest priority, as these directly impact a student's career.
   - **Result** (Weight: 2) - High priority, representing academic performance.
   - **Event** (Weight: 1) - Standard priority, representing extra-curricular or campus events.
2. **Recency:** If two notifications share the same weight, the newer notification is prioritized to ensure the most up-to-date information is seen first.

### Algorithm implementation
The algorithm fetches the raw list of notifications and applies a standard array sort `O(n log n)`. 
1. The comparator first checks the `Type` of `Notification A` against `Notification B`. If the weights differ, it sorts descending by weight.
2. If the weights are identical, it falls back to a string comparison of the `Timestamp` field. Since the timestamps are formatted as `YYYY-MM-DD HH:MM:SS`, standard lexicographical string comparison correctly and efficiently sorts them chronologically in `O(1)` time per comparison.

### Handling Incoming Notifications Efficiently
As new notifications continuously arrive, re-sorting the entire list of `N` notifications every time is inefficient. To maintain the top 10 efficiently in a production system:
- **Min-Heap (Priority Queue):** We would maintain a Min-Heap of size `k` (where `k=10`). 
- As new notifications stream in, they are compared against the root of the Min-Heap (the lowest priority item currently in the top 10). 
- If the incoming notification has a higher priority (better weight or newer recency) than the root, we extract the root and insert the new notification.
- This approach drops the continuous processing time from `O(N log N)` down to `O(log k)` per new notification, making the system highly scalable regardless of notification volume.
