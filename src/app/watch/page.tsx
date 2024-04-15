import VideoDetails from "@/components/videoDetails/VideoDetails";
import axios from "axios";
import { Video } from "../types";

// We can not use getServerSideProps in app directory so next js documentation suggests this alternative in app dir. To take the query params we directly get it in 2nd param of page.
// It will work same as getServerSideProps

const getVideoDetails = async (vid_id: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/videos/watch?vid_id=${vid_id}`
    );
    return response.data;
  } catch (error) {
    return {
      message: "Failed to get video details",
    };
  }
};

const VideoDetailsPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { vid_id: string };
}) => {
  const videoDetails: { Success: boolean; video: Video } =
    await getVideoDetails(searchParams?.vid_id);

  if (!videoDetails?.Success) return <p>Failed to get video details</p>;

  return <VideoDetails video={videoDetails?.video} />;
};

export default VideoDetailsPage;
