import { DashboardLayout } from "./_components/layout/DashboardLayout";
import { RequireAuth } from "./_components/RequireAuth";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RequireAuth>
      <DashboardLayout>{children}</DashboardLayout>
    </RequireAuth>
  );
}
