import SinglePlaylistDetails from "@/components/playlists/SinglePlaylistDetails/SinglePlaylistDetails";
import React from "react";

const page = ({ params }: { params: any; searchParams: any }) => {
  return <SinglePlaylistDetails playlist_id={params?.id}/>;
};

export default page;
