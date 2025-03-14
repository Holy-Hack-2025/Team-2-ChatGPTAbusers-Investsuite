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

export type LineGraphOptions = {
    title: string;
    subtitle?: string;
    yTitle: string;
    xTitle: string;
    start: number;
    series: Array<Serie>;
};

export type Serie = {
    name: string;
    data: Array<number | null>;
};
