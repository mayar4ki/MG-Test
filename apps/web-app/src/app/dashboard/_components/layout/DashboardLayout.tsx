'use client';

import { SidebarInset, SidebarProvider } from '@acme/ui/sidebar';
import { AppFooter } from './DashboardFooter';
import { AppHeader } from './DashboardHeader';
import { AppSidebar } from './DashboardSidebar';

export const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
<SidebarProvider>
        <AppSidebar />
        <SidebarInset className="border overflow-x-auto">
          <AppHeader />
          {children}
          <AppFooter />
        </SidebarInset>
      </SidebarProvider>
);
}
