'use client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@acme/ui/breadcrumb';
import { Button } from '@acme/ui/button';
import { Separator } from '@acme/ui/separator';
import { SidebarTrigger } from '@acme/ui/sidebar';
import { LogOut } from 'lucide-react';

import { ModeToggle } from '~/_components/common/ModeToggle';
import { useLogout } from '~/services/auth/useLogout';

export const AppHeader = () => {
  const { logout } = useLogout();

  return (
    <section className="py-2 sticky top-0 bg-blur-3xl backdrop-blur-md border-b border-foreground/20 border-dashed z-50">
      <div className="flex items-center justify-between gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb className="flex-1">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={logout} title="Logout">
            Logout <LogOut className="size-4" />
          </Button>
          <ModeToggle />
        </div>
      </div>
    </section>
  );
};
