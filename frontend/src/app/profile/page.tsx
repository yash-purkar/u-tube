import { Profile } from "@/components/profile/Profile";
import axiosInstance, { setContext } from "@/utils/axiosInstance";
import { headers } from "next/headers";

const getUserDetails = async (user: string) => {
  // We can not access req directly here, so creating a fake request to set in context for axiosInstance.
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };

  setContext({ req });
  try {
    const response = await axiosInstance.get(`user/user_by_id/${user}`);
    return response.data;
  } catch (error) {
    return {
      message: "Failed to get user details",
    };
  }
};

const UserProfilePage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { user: string };
  request: any;
}) => {
  const response = await getUserDetails(searchParams.user);

  return <Profile user={response.user} />;
};

export default UserProfilePage;
