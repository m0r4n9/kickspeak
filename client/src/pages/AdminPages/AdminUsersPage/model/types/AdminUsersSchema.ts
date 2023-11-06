import { Profile } from '@/entities/Profile';
import { ErrorInterface } from '@/shared/interfaces/ErrorInterface.ts';

export interface UsersData {
    users: Profile[];
    hasMore: boolean;
}

export interface AdminUsersSchema {
    isLoading: boolean;
    data?: UsersData;
    page: number;
    query: string;
    error?: ErrorInterface;
}
