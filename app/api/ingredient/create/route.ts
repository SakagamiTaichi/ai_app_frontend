import { NextResponse } from "next/server";
import env from "dotenv";
import mongoose from "mongoose";
import IngredientModel from "@/app/models/IngredientModel";

export async function POST(request: Request) {
  // const reqBody = await request.json();

  env.config();

  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in the environment variables");
  }

  await mongoose.connect(mongoUri);

  //他の食材データをマップ型で定義
  const ingrediensData = [
    { name: "バナナ", category: "果物" },
    { name: "いちご", category: "果物" },
    { name: "オレンジ", category: "果物" },
    { name: "ぶどう", category: "果物" },
    { name: "メロン", category: "果物" },
    { name: "桃", category: "果物" },
    { name: "梨", category: "果物" },
    { name: "キウイ", category: "果物" },
    { name: "パイナップル", category: "果物" },
    { name: "マンゴー", category: "果物" },
    { name: "柿", category: "果物" },
    { name: "さくらんぼ", category: "果物" },
    { name: "レモン", category: "果物" },
    { name: "ライム", category: "果物" },
    { name: "グレープフルーツ", category: "果物" },
    { name: "アボカド", category: "果物" },
    { name: "パッションフルーツ", category: "果物" },
    { name: "牛乳", category: "乳製品" },
    { name: "ヨーグルト", category: "乳製品" },
    { name: "チーズ", category: "乳製品" },
    { name: "生クリーム", category: "乳製品" },
    { name: "バター", category: "乳製品" },
    { name: "マーガリン", category: "乳製品" },
    { name: "卵", category: "卵" },
    { name: "小麦粉", category: "穀物" },
    { name: "砂糖", category: "甘味料" },
    { name: "塩", category: "調味料" },
    { name: "醤油", category: "調味料" },
    { name: "みりん", category: "調味料" },
    { name: "酒", category: "調味料" },
    { name: "酢", category: "調味料" },
    { name: "油", category: "調味料" },
    { name: "豆腐", category: "大豆" },
    { name: "納豆", category: "大豆" },
    { name: "味噌", category: "大豆" },
    { name: "キャベツ", category: "野菜" },
    { name: "にんじん", category: "野菜" },
    { name: "じゃがいも", category: "野菜" },
    { name: "たまねぎ", category: "野菜" },
    { name: "ほうれん草", category: "野菜" },
    { name: "ピーマン", category: "野菜" },
    { name: "トマト", category: "野菜" },
    { name: "きゅうり", category: "野菜" },
    { name: "なす", category: "野菜" },
    { name: "かぼちゃ", category: "野菜" },
    { name: "れんこん", category: "野菜" },
    { name: "さつまいも", category: "野菜" },
    { name: "大根", category: "野菜" },
    { name: "ごぼう", category: "野菜" },
    { name: "しいたけ", category: "きのこ" },
    { name: "えのき", category: "きのこ" },
    { name: "しめじ", category: "きのこ" },
    { name: "マッシュルーム", category: "きのこ" },
    { name: "かつお節", category: "魚介" },
    { name: "昆布", category: "魚介" },
    { name: "鰹節", category: "魚介" },
    { name: "鮭", category: "魚介" },
    { name: "鯖", category: "魚介" },
    { name: "鮪", category: "魚介" },
    { name: "鯛", category: "魚介" },
    { name: "鰻", category: "魚介" },
    { name: "鰈", category: "魚介" },
    { name: "鮹", category: "魚介" },
    { name: "鮎", category: "魚介" },
    { name: "鱈", category: "魚介" },
    { name: "鮑", category: "魚介" },
    { name: "豚バラ", category: "肉" },
    { name: "豚ヒレ", category: "肉" },
    { name: "豚肩ロース", category: "肉" },
    { name: "牛バラ", category: "肉" },
    { name: "牛ヒレ", category: "肉" },
    { name: "牛肩ロース", category: "肉" },
    { name: "鶏もも", category: "肉" },
    { name: "鶏むね", category: "肉" },
    { name: "鶏手羽", category: "肉" },
    { name: "鶏レバー", category: "肉" },
    { name: "鶏ハツ", category: "肉" },
    { name: "鶏皮", category: "肉" },
  ];

  //食材データを保存
  const result = await IngredientModel.insertMany(ingrediensData);

  await mongoose.connection.close();

  // レスポンスを返す
  return new Response(JSON.stringify(result), {
    headers: { "content-type": "application/json" },
  });
  // コネクションを閉じる
}
