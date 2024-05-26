import SinglePlaylistDetails from "@/components/playlists/SinglePlaylistDetails/SinglePlaylistDetails";

const page = ({ params }: { params: any; searchParams: any }) => {
  return <SinglePlaylistDetails playlist_id={params?.id} />;
};

export default page;
