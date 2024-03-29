import { Box, Chip, Container, Stack } from "@mui/material";
import React from "react";

interface Chip {
  name: string;
  slug: string;
}

const chips: Chip[] = [
  { name: "Yash's Favourites songs", slug: "yashs_favourite_songs" },
  { name: "NextJS", slug: "next_js" },
  { name: "ReactJS", slug: "react_js" },
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javaScript" },
  { name: "ReducToolkit", slug: "redux_toolkit" },
  { name: "MaterialUI", slug: "material_ui" },
  { name: "TailwindCSS", slug: "tailwind_css" },
  { name: "Jest", slug: "jest" },
];

const Filters = () => {
  return (
    <Box alignSelf={"flex-start"} sx={{ margin: "1rem" }}>
      <Stack direction={"row"} spacing={2} flexWrap={"wrap"}>
        {chips?.map((chip) => (
          <Chip key={chip?.slug} label={chip?.name} />
        ))}
      </Stack>
    </Box>
  );
};

export default Filters;
