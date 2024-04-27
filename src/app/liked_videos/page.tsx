import React from "react";
import LikedVideos from "@/components/likedVideos/LikedVideos";

const page = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { username: string };
}) => {
  return <LikedVideos username={searchParams?.username} />;
};

export default page;
