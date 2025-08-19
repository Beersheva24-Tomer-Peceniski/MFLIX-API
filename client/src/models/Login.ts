export interface Login {
    email: string;
    password: string;
}

export interface Signup {
    email: string;
    password: string;
    name: string;
}

export interface LoginResponse {
    token: string;
    user: {
        email: string;
        name: string;
        role: string;
    };
}