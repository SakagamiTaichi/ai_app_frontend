export interface Ingredient {
  id: string;
  name: string;
  category: string;
}

export interface RecipeIngredient {
  name: string;
  amount: string;
}

export interface APIRecipeIngredient {
  name: string;
  amount: string;
}

export interface RecipeHistoryAPIResponse {
  id: string;
  dish_name: string;
  created_at: Date;
  image_url: string;
}

export interface RecipeHistoriesAPIResponse {
  recipe_histories: RecipeHistoryAPIResponse[];
}

interface RecipeHistory {
  id: string;
  dishName: string;
  createdAt: Date;
  imageUrl: string;
}

export interface RecipeHistories {
  recipeHistories: RecipeHistory[];
}

export interface APIRecipeResponse {
  dish_name: string;
  ingredients: APIRecipeIngredient[];
  steps: string[];
  tips: string[];
  image_url: string;
}

export type Role = "user" | "assistant";

export interface Message {
  role: Role;
  content: string;
}

export interface WebSocketHookReturn {
  messages: Message[];
  isConnected: boolean;
  sendMessage: (message: string) => void;
  resetMessages: () => void;
}
