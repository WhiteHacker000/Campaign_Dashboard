export interface AuthUser {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
}

export interface AuthResponse {
    message: string;
    user: AuthUser;
}
