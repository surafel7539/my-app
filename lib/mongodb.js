import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function MongoDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // ❌ CRITICAL: Stops Mongoose from silently waiting if DB is offline
      serverSelectionTimeoutMS: 5000, // ⏱️ Crash fast after 5 seconds if connection fails
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("▶️ MongoDB Connected Successfully");
      return mongooseInstance;
    }).catch((err) => {
      console.error("❌ MongoDB Connection Error:", err);
      cached.promise = null; // Reset cache on failure so next request tries again
      throw err;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
      );
    }

    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;