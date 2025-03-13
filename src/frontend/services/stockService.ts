const getAllStocksForUser = async (userId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stock/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken(),
        },
    });
};

const searchStocks = async (searchString: string) => {
    return await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stock/search/${searchString}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getToken(),
            },
        }
    );
};

const getToken = (): string => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return token ? `Bearer ${token}` : '';
};

const CodeService = {
    getAllStocksForUser,
    searchStocks,
};

export default CodeService;
