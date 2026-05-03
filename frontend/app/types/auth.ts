export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export interface AuthResponse {
    message: string;
    user: AuthUser;
}
