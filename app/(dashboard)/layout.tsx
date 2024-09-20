import DashboardLayout from "@/components/core/layouts/DashboardLayout";

function DashboardRootLayout({ children }: { children: React.ReactElement }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

export default DashboardRootLayout;
