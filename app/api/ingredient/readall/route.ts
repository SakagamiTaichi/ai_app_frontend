import { NextResponse } from "next/server";
import env from "dotenv";
import mongoose from "mongoose";
import IngredientModel from "@/app/models/IngredientModel";

export async function GET() {
  env.config();

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in the environment variables");
  }

  try {
    // await を追加して接続が完了するまで待つ
    await mongoose.connect(mongoUri);

    const ingredients = await IngredientModel.find();

    // finally ブロックで確実に接続を閉じる
    return NextResponse.json(ingredients);
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  } finally {
    await mongoose.connection.close();
  }
}
