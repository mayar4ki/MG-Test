import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { tokenService } from '~/services/auth/tokenService';

export function useLogout() {
    const router = useRouter();

    const logout = useCallback(() => {
        tokenService.removeToken();
        router.push('/auth/login');
    }, [router]);

    return { logout };
}

