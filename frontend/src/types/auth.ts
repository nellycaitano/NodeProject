export interface User {
    id: string;
    name: string;
    email: string;
}

export interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ForgotPasswordFormData {
    email: string;
}

export interface ResetPasswordFormData {
    email: string;
    newPassword: string;
    confirmNewPassword: string;
    token:  string;
}

export type AuthView = "login" | "signup" | "forgot-password" | "reset-password"




