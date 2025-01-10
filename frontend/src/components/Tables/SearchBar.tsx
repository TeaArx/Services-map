import React from "react";
import { Box, TextField, Autocomplete } from "@mui/material";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  uniqueResponsibles: string[];
  selectedResponsible: string;
  setSelectedResponsible: (value: string) => void;
}

export default function SearchBar({
  search,
  setSearch,
  uniqueResponsibles,
  selectedResponsible,
  setSelectedResponsible,
}: SearchBarProps) {
  return (
    <Box display="flex" alignItems="center" gap={2} marginBottom={2} sx={{ padding: "16px", gap: "16px" }}>
    <TextField
      label="Поиск"
      variant="outlined"
      fullWidth
      value={search}
      onChange={(e) => setSearch(e.target.value)} 
    />
    <Autocomplete
      options={uniqueResponsibles}
      getOptionLabel={(option) => option}
      renderInput={(params) => <TextField {...params} label="Ответственный" variant="outlined" />}
      value={selectedResponsible}
      onChange={(event, newValue) => setSelectedResponsible(newValue || "")}
      style={{ width: 250 }}
    />
  </Box>
  );
}
