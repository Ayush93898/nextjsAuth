// now we write the functionlity of connection of the db

import mongoose from "mongoose";

export async function connect() {
  try {
    if (mongoose.connection.readyState === 1) {
      return; // i.e already connected
    }
    await mongoose.connect(process.env.MONOGDB_URL!);
    const connection = mongoose.connection;

    // emits some MongoDB connection events
    connection.on("connected", () => {
      console.log("MongoDb connection successfully");
    });
    connection.on("error", (error) => {
      console.log("MongoDb connection error", error);
    });
    
  } catch (error) {
    console.error("Something went wrong while connection to DB!");
    console.log(error);
  }
}
