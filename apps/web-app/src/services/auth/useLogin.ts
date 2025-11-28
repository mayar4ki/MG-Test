import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { apiClient } from '~/services/apiClient';
import { tokenService } from '~/services/auth/tokenService';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

async function loginRequest(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);
    return response.data;
}

export function useLogin() {
    const router = useRouter();

    return useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            // Store the token
            tokenService.setToken(data.accessToken);

            // Redirect to dashboard
            router.push('/dashboard');
        },
    });
}

