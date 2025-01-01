"use client";

import React from "react";
import { Autocomplete, TextField, Box, Chip } from "@mui/material";
import { Ingredient } from "@/app/types";

interface IngredientSearchProps {
  ingredients: Ingredient[];
  selectedIngredients: Ingredient[];
  onAddIngredient: (ingredient: Ingredient) => void;
  onDeleteIngredient: (ingredient: string) => void;
}

export const IngredientSearch: React.FC<IngredientSearchProps> = ({
  ingredients,
  selectedIngredients,
  onAddIngredient,
  onDeleteIngredient,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const sortedIngredients = [...ingredients].sort((a, b) =>
    a.category.localeCompare(b.category, "ja")
  );

  return (
    <>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Autocomplete
          id="grouped-ingredients"
          options={sortedIngredients}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.name}
          onChange={(_event, newValue) => {
            if (newValue) {
              onAddIngredient(newValue);
              setInputValue(""); // 選択後に入力値をクリア
            }
          }}
          inputValue={inputValue}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          sx={{ flex: 1 }}
          renderInput={(params) => (
            <TextField placeholder="食材を入力" {...params} />
          )}
          value={null}
        />
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {selectedIngredients.map((ingredient) => (
          <Chip
            key={ingredient.name}
            label={ingredient.name}
            onDelete={() => onDeleteIngredient(ingredient.name)}
            sx={{
              bgcolor: "rgb(219, 234, 254)",
              color: "rgb(29, 78, 216)",
              "& .MuiChip-deleteIcon": {
                color: "rgb(29, 78, 216)",
              },
            }}
          />
        ))}
      </Box>
    </>
  );
};
