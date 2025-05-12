import Header from "@/components/dashboard/Home/Header";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <main className="min-h-screen w-full dashboard-container bg-white dark:bg-gray-900 md:ml-64 relative">
        <Header />

        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
