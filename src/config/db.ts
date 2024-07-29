import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("already connected to MongoDB");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI as string || '', {});
        console.log("db details after connected:- ", db.connections)
        connection.isConnected = db.connections[0].readyState

        console.log("Db connection established")

    } catch (e) {
        console.log("Error connecting to MongoDB :", e);
        process.exit(1);
    }
}

export default dbConnect;