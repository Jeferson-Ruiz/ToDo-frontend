import { api } from "@/lib/api";

export interface RegisterDto {
    name: string,
    lastName: string,
    email: string,
    username: string,
    password: string
}

export const register = (dto: RegisterDto) => api.post<string>("/auth/register", dto).then(r => r.data);

export const activateAccount = (token: string) =>
  api.get<string>("/auth/activation", { params: { token } }).then(r => r.data);

export interface LoginDto {
    email: string,
    password: string
}

export interface AuthResponse {
    token: string,
    email: string,
    role: string,
    expiresIn: number
}

export const login = (dto: LoginDto) =>
  api.post<AuthResponse>("/auth/login", dto).then(r => r.data);

export const logout = () =>
  api.post<string>("/auth/logout").then(r => r.data);