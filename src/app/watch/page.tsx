import VideoDetails from "@/components/videoDetails/VideoDetails";

const VideoDetailsPage = ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { vid_id: string };
}) => {
  return <VideoDetails video_id={searchParams?.vid_id} />;
};

export default VideoDetailsPage;
