const getStock = async (stock: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stock/${stock}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken(),
        },
    });
};

const getMyStocks = async (): Promise<Response> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/stock`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken(),
        },
    });
};

const manageStock = async (stock: string, amount: number): Promise<Response> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/stock?token=${stock}&amount=${amount}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken(),
        },
    });
};

const getToken = (): string => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return token ? `Bearer ${token}` : '';
};

const StockService = {
    getStock,
    getMyStocks,
    manageStock,
};

export default StockService;
