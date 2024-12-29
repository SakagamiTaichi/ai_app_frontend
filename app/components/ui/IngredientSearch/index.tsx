"use client";

import React, { useState } from "react";
import { Autocomplete, TextField, Button, Box, Chip } from "@mui/material";
import { Ingredient } from "@/app/types";

interface IngredientSearchProps {
  ingredients: Ingredient[];
  selectedIngredients: string[];
  inputValue: string;
  value: Ingredient | null;
  setValue: (value: Ingredient | null) => void;
  onInputChange: (value: string) => void;
  onAddIngredient: () => void;
  onDeleteIngredient: (ingredient: string) => void;
}

export const IngredientSearch: React.FC<IngredientSearchProps> = ({
  ingredients,
  selectedIngredients,
  inputValue,
  value,
  setValue,
  onInputChange,
  onAddIngredient,
  onDeleteIngredient,
}) => {
  const sortedIngredients = [...ingredients].sort((a, b) =>
    a.category.localeCompare(b.category, "ja")
  );
  return (
    <>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Autocomplete
          id="grouped-ingredients"
          value={value}
          onChange={(_event, newValue: Ingredient | null) => setValue(newValue)}
          options={sortedIngredients}
          inputValue={inputValue}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          onInputChange={(_event, newInputValue: string) =>
            onInputChange(newInputValue)
          }
          groupBy={(option) => option.category}
          getOptionLabel={(option) => option.name}
          sx={{ flex: 1 }}
          renderInput={(params) => (
            <TextField placeholder="食材を入力" {...params} />
          )}
        />
        <Button
          variant="contained"
          disabled={!inputValue}
          onClick={onAddIngredient}
        >
          追加
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {selectedIngredients.map((ingredient) => (
          <Chip
            key={ingredient}
            label={ingredient}
            onDelete={() => onDeleteIngredient(ingredient)}
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
