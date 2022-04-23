export interface SignupRequestPayload {
    username: string;
    email: string;
    password: string;
}

export interface LoginRequestPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    authenticationToken: string;
    refreshToken: string;
    expiresAt: Date;
    username: string;
}


export interface CommentPayload {
    text: string;
    postId: string;
    username?: string;
    duration?: string;
}