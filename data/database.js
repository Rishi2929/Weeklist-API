import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "weeklistapi",

        });
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error.message);
    }
};
