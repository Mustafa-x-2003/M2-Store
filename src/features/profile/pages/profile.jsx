import ProfileHeader from "../components/profileHeader";
import Address from "../components/address";
import ChangePassword from "../components/changePassword";
import Logout from "../components/logout";
import { useAuth } from "../../../context/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="px-4 pb-10 lg:px-0 lg:pt-30  md:w-[85%] lg:w-[78%] xl:w-[70%] mx-auto animate-fade-in">
      <h1 className="mb-8 text-2xl font-bold">My Profile</h1>
      <ProfileHeader user={user} />
      <Address user={user} />
      <ChangePassword userEmail={user?.email} />
      <Logout />
    </div>
  );
}