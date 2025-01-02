// app/api/ingredient/readall/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import IngredientModel from "@/app/models/IngredientModel";

let cachedConnection: typeof mongoose | null = null;

async function connectDB() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined");
  }

  try {
    const connection = await mongoose.connect(mongoUri);
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function GET() {
  try {
    await connectDB();
    const ingredients = await IngredientModel.find();
    return NextResponse.json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
