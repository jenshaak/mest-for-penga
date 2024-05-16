import mongoose from "mongoose";

export const connectToDb = async () => {
  type ConnectionType = {
      isConnected?: boolean;
  };
  const connection: ConnectionType = {};

  try {
    console.log("1");
    if (connection.isConnected) return;
    console.log("2");
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    console.log("3");
      connection.isConnected = db.connections[0].readyState === 1;
  } catch (error) {
        console.log("Did not connect", error)
      throw new Error(error instanceof Error ? error.message : 'Cannot connect to DataBase');
  }
};
    