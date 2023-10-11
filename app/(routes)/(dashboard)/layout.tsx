import Navbar from "@/components/navbar";
import SideBar from "@/components/side-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:grid md:grid-cols-5 h-full">
      <div className="hidden md:block  md:col-span-1 ">
        <SideBar />
      </div>
      <div className="md:col-span-4">
        <main>
          <Navbar />
          {children}
        </main>
      </div>
    </div>
  );
}
