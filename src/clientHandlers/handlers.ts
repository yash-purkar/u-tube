import axios from "axios";

// Fetches filters
export const getFilters = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/filters/all_filters"
    );
    return response;
  } catch (error) {
    throw new Error("Failed to get filters.");
  }
};

// Fetches all videos
export const getAllVideos = async (filterName: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/videos/all_videos?filter=${filterName}`
    );
    return response.data;
  } catch (err: any) {
    throw new err();
  }
};

// It gives uploaded time
export const getUploadedDate = (uploadedDate: Date) => {
  const currentDate = new Date();
  let uploaded;

  const yearDiff = currentDate?.getFullYear() - uploadedDate?.getFullYear();
  const monthDiff = currentDate?.getMonth() - uploadedDate?.getMonth();
  const daysDiff = currentDate?.getDay() - uploadedDate?.getDay();

  if (yearDiff > 0) {
    if (yearDiff === 1) {
      uploaded = "1 year ago";
      return;
    }
    uploaded = `${yearDiff} years ago`;
    return uploaded;
  }
  if (monthDiff > 0) {
    if (monthDiff === 1) {
      uploaded = "1 month ago";
      return uploaded;
    }
    uploaded = `${monthDiff} months ago`;
    return;
  }
  if (daysDiff > 0) {
    if (daysDiff === 1) {
      uploaded = "1 day ago";
      return uploaded;
    }
    uploaded = `${daysDiff} days ago`;
    return uploaded;
  }
  uploaded = "Posted Today";
  return uploaded;
};
