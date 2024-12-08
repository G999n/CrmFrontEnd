export interface User {
    userId: number;        // Primary key for the user
    username: string;      // Username for the user
    passwordHash: string;  // Hashed password for secure storage
    role: string;          // Role of the user (e.g., Admin, SalesRep, etc.)
    email: string;         // Email address of the user
    isActive: boolean;     // Whether the user is active
}