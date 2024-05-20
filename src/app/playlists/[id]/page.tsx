import SinglePlaylistDetails from "@/components/playlists/SinglePlaylistDetails/SinglePlaylistDetails";
import React from "react";

const page = ({ params }: { params: any; searchParams: any }) => {
  console.log(process.env.NEXT_PUBLIC_LOCAL_API_URL);
  return <SinglePlaylistDetails playlist_id={params?.id} />;
};

export default page;
