import { getFilters } from "@/clientHandlers/handlers";
import { Box, Chip, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Chip {
  name: string;
  slug: string;
}

interface FiltersProps {
  handleFilterClick: (value: string) => void;
  selectedFilter: string;
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
  selected_filter: {
    backgroundColor: "#000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
});

const Filters: React.FC<FiltersProps> = ({
  handleFilterClick,
  selectedFilter,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
    refetchOnWindowFocus:false
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
              className={`${classes.chip} ${
                selectedFilter === chip.slug && classes.selected_filter
              }`}
              onClick={() => {
                handleFilterClick(chip?.slug);
              }}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default Filters;
