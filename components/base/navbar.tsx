import { getLimit } from "@/lib/api-limit";
import { MobileSidebar } from ".";
import { UserButton } from "@clerk/nextjs";

const Navbar = async () => {
  const apiLimitCount = await getLimit();
  return (
    <div className="flex items-center p-4">
      <MobileSidebar count={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
