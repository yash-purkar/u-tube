import { Profile } from "@/components/profile/Profile";
import axios from "axios";

const getUserDetails = async (user: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/user/user_by_id/${user}`
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
