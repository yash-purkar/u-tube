import axios from "axios";

// Fetches filters
export const getFilters = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/filters/all_filters");
    return response;
  } catch (error) {
    throw new Error("Failed to get filters.");
  }
};

// Fetches all videos
export const getAllVideos = async() => {
  try{
    const response = await axios.get('http://localhost:3001/api/videos/all_videos');
    return response.data;
  }catch(err:any){
    throw new err
  }
}
