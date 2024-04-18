import React, { useEffect, useState } from "react";
import { VideoCard } from "./videoCard/VideoCard";
import { Button, Grid } from "@mui/material";
import styles from "./userVideos.module.css";

const UserVideos = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // current selected page
  const resultsPerPage = 10; // 10 results per page

  const getData = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();
    setData(data.products);
  };

  useEffect(() => {
    getData();
  }, []);

  // It handles page click
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 style={{ margin: "1rem 0" }}>Videos</h2>
      <Grid
        justifyContent={"center"}
        container
        wrap="wrap"
        spacing={5}
        direction={"column"}
        sx={{ margin: "2rem" }}
      >
        <div className={styles.items}>
          {data?.length > 0 &&
            data
              ?.slice(
                currentPage * resultsPerPage - resultsPerPage,
                currentPage * resultsPerPage
              )
              ?.map((item) => (
                <div className={styles.item} key={item?.title}>
                  {item?.title}
                </div>
              ))}
        </div>

        {/*
e.g
current page is 2
resperpage is 3

it will start from 2 * 3 - 3 = 3
and it will go upto 2 * 3 = 6
so it will go from 3 to 6
*/}
        {/* Pages count and next prev btn */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button disabled={currentPage ===1} onClick={() => handlePageClick(currentPage - 1)}>Prev</Button>
          {Array.from({ length: data?.length / resultsPerPage }).map((_, i) => (
            <span
              onClick={() => handlePageClick(i + 1)}
              className={`${styles.single_page_number} ${
                currentPage === i + 1 && styles.selected_page
              }`}
              key={i + 1}
            >
              {i + 1}
            </span>
          ))}
          <Button disabled={currentPage === data?.length / resultsPerPage} onClick={() => handlePageClick(currentPage + 1)}>Next</Button>
        </div>

        {/* It will create the array of data?.length/resultsPerPage elements, which we will use to show the pages count below */}

        {/* <Grid item>
          <VideoCard />
        </Grid>
        <Grid item>
          <VideoCard />
        </Grid>
        <Grid item>
          <VideoCard />
        </Grid>
        <Grid item>
          <VideoCard />
        </Grid>*/}
      </Grid>
    </div>
  );
};

export default UserVideos;
