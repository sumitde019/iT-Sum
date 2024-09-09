import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://name:password@cluster0.wakmgrx.mongodb.net/food_del').then(()=>console.log("DB connected"));
}
