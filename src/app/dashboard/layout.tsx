import DashboardSidebar from "@/components/dashboard/DashbaordSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <aside className="flex">
      <DashboardSidebar />
      {children}
    </aside>

  );
}
