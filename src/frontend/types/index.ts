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

export type Meta = {
    currency: string;
    symbol: string;
    regularMarketPrice: number;
    fiftyTwoWeekHigh: number;
    fiftyTwoWeekLow: number;
    longName: string;
    range: string;
};

export type LineGraphOptions = {
    title?: string;
    subtitle?: string;
    yTitle: string;
    xTitle: string;
    start: number;
    series: Array<LineGraphSerie>;
};

export type LineGraphSerie = {
    name: string;
    data: Array<number | null>;
};

export type PieGraphOptions = {
    title: string;
    subtitle?: string;
    serieName: string;
    series: Array<PieGraphSerie>;
};

export type PieGraphSerie = {
    name: string;
    y: number;
    sliced?: boolean;
    selected?: boolean;
};
