import { Profile } from '@/entities/Profile';
import { ErrorInterface } from '@/shared/interfaces/ApiError';

export interface UsersData {
    users: Profile[];
    totalUsers: number;
}

export interface AdminUsersSchema {
    isLoading: boolean;
    data?: UsersData;
    page: number;
    limit: number;
    query: string;
    error?: ErrorInterface;
}
