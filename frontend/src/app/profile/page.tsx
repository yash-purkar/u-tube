import { Profile } from "@/components/profile/Profile";


const UserProfilePage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { user: string };
}) => {

  return <Profile username={searchParams.user}/>;
};

export default UserProfilePage;
