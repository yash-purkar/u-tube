import { Profile } from "@/components/profile/Profile";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const getUserDetails = async (user: string) => {
  try {
    const response = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_LOCAL_API_URL}user/user_by_id/${user}`
    );
    return response.data;
  } catch (error) {
    return {
      message: "Failed to get user details"
    }
  }
};

const UserProfilePage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { user: string };
}) => {
  const response = await getUserDetails(searchParams.user);

  return < Profile user={response.user}/>;
};

export default UserProfilePage;
