import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = () => {
  const { user } = useUser();
  return (
    <Avatar className="h-16 w-16">
      <AvatarImage src="/logo.svg" />
    </Avatar>
  );
};

export default UserAvatar;
