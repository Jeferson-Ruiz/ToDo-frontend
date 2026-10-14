import { api } from "@/lib/api";

export interface RegisterDto {
    name: string,
    lastName: string,
    email: string,
    username: string,
    password: string
}

export const register = (dto: RegisterDto) => api.post<string>("/auth/register", dto).then(r => r.data);