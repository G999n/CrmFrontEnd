export interface Notification {
    notificationId: number;      // Primary Key
    type: string;                // Type of notification (e.g., Lead Conversion, Task Deadline)
    message: string;             // Notification message content
    timestamp: Date;             // Timestamp of the notification
    userId: number;              // Foreign key to User table (recipient of the notification)
    isRead: boolean;             // To track if the notification has been read
}