import { Sidebar, Navbar } from "@/components/base";
import { getLimit } from "@/lib/api-limit";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "AI - Generation",
  description: "Dashboard for AI - Generation",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLimitCount = await getLimit();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-slate-800">
        <Sidebar count={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
