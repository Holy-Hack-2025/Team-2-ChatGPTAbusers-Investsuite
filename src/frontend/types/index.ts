export type Auth = {
    username: string;
    token: string;
};

export type User = {
    id: number;
    username: string;
};

export type StatusMessage = {
    message: string;
    type: 'error' | 'success';
};