import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });
  await mongoose.connect(
    "mongodb+srv://project:HELLO@cluster0.yx01eob.mongodb.net/e-commerce"
  );
};

export default connectDB;
