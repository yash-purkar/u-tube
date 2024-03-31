import { getFilters } from "@/clientHandlers/handlers";
import { Box, Chip, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Chip {
  name: string;
  slug: string;
}

const useStyles: () => any = makeStyles({
  filters_container: {
    margin: "1rem",
    width: "95%",
    overflow: "auto",
    padding: "1rem",
  },
  chip: {
    cursor: "pointer",
  },
});

const Filters = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
  });

  const classes = useStyles();
  return (
    <Box
      alignSelf={"flex-start"}
      overflow={"auto"}
      className={classes.filters_container}
    >
      <Stack
        direction={"row"}
        spacing={2}
        className={classes.filters_chips_container}
      >
        {isError && <p>Failed to get Filters</p>}
        {isLoading && <p>Getting Filters: </p>}
        {data?.data?.filters?.length > 0 &&
          data?.data?.filters?.map((chip: Chip) => (
            <Chip
              key={chip?.slug}
              label={chip?.name}
              className={classes.chip}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default Filters;
