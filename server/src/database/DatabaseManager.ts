import mongoose from "mongoose";

export class DatabaseManager {
  private static instance: DatabaseManager;
  private isConnected: boolean = false;

  private constructor() {}

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async connect(mongoURI: string): Promise<void> {
    if (this.isConnected) {
      console.log("Using existing database connection");
      return;
    }

    try {
      await mongoose.connect(mongoURI, {
        maxPoolSize: 50,
        retryWrites: true,
      });

      mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
        this.isConnected = false;
      });

      mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected");
        this.isConnected = false;
      });

      mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
        this.isConnected = true;
      });

      this.isConnected = true;
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Error connecting to database:", error);
      this.isConnected = false;
      throw error;
    }
  }

  getConnection() {
    if (!this.isConnected) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return mongoose.connection.db;
  }
}
