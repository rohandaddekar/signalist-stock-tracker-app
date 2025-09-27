import "dotenv/config";
import mongoose from "mongoose";

async function main() {
  const URI = process.env.MONGODB_URI;
  if (!URI) {
    console.error("ERROR: MONGODB_URI environment variable not set");
    process.exit(1);
  }

  try {
    const startedAt = Date.now();

    await mongoose.connect(URI, {
      bufferCommands: false,
    });

    const elapsed = Date.now() - startedAt;

    const dbName = mongoose.connection?.name || "(unknown)";
    const host = mongoose.connection?.host || "(unknown)";

    console.log(
      `SUCCESS: Connected to database [db="${dbName}", host="${host}", time=${elapsed}ms]`
    );

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("ERROR: Unable to connect to database");
    console.error(error);
    process.exit(1);
  }
}

main();
