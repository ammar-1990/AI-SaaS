import Navbar from "@/components/navbar";
import SideBar from "@/components/side-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:flex h-full ">
      <div className="hidden md:block  w-72 ">
        <SideBar />
      </div>
      <div className="md:flex-1">
        <main>
          <Navbar />
          {children}
        </main>
      </div>
    </div>
  );
}
