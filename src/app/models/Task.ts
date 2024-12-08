export interface Task {
    taskId: number;            // Primary key for the task
    customerId: number;        // Foreign key to the Customer table
    assignedTo: number;        // Foreign key to the User table (Assigned user)
    taskDescription: string;   // Description of the task
    dueDate: Date;             // Due date for the task
    status: string;            // Status of the task (e.g., Pending, Completed)
    priority: number;          // Priority of the task (higher number means higher priority)
}