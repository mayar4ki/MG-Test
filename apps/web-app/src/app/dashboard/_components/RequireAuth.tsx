'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { tokenService } from '~/services/auth/tokenService';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!tokenService.hasToken()) {
      router.replace('/auth/login');
      return;
    }

    setIsVerified(true);
  }, [router]);

  if (!isVerified) {
    return (
      <div className="min-h-screen grid place-items-center text-muted-foreground">
        Checking session...
      </div>
    );
  }

  return <>{children}</>;
};
