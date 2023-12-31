import Navbar from "@/components/navbar";
import SideBar from "@/components/side-bar";
import { getApiCount } from "@/lib/increase-api-count";
import { checkSubscription } from "@/lib/subscription";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const count = await getApiCount()
  const isPro = await checkSubscription()
  return (
    <div className="md:flex h-full ">
      <div className="hidden md:block  w-72 ">
        <SideBar isPro={isPro} count={count} />
      </div>
      <div className="md:flex-1">
        <main className="h-screen overflow-y-auto pb-6">
          <Navbar />
          {children}
        </main>
      </div>
    </div>
  );
}
