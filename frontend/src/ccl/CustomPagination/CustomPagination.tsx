import { Button, Chip, Stack } from "@mui/material";
import React, { useState } from "react";
import styles from "./customPagination.module.css";
import { makeStyles } from "@mui/styles";

interface CustomPaginationProps {
  totalItems: number;
  onPageClick: (page: number) => void;
}

const useStyles = makeStyles({
  page: {
    border: "1px solid gray",
    backgroundColor: "#fff",
  },
  current_page: {
    border: "1px solid gray",
    backgroundColor: "lightgray",
  },
});

const CustomPagination: React.FC<CustomPaginationProps> = ({
  totalItems,
  onPageClick,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resultsPerPage = 3;

  const classes = useStyles();

  // It handles page click
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onPageClick(page);
  };

  return (
    <>
      {totalItems > resultsPerPage && (
        <div className={styles.pages_container}>
          <Button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            size="small"
          >
            Previous
          </Button>
          <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
            {Array.from({ length: totalItems / resultsPerPage }).map((_, i) => (
              <Chip
                onClick={() => handlePageClick(i + 1)}
                className={
                  currentPage === i + 1 ? classes.current_page : classes.page
                }
                clickable
                key={i + 1}
                label={i + 1}
              />
            ))}
          </Stack>
          <Button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalItems / resultsPerPage}
            size="small"
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default CustomPagination;

// Array.from - It will create the new array. length will be totalItems / resultsPerPage
// e.g 100 / 10 = 10 so there will be 10 pages
