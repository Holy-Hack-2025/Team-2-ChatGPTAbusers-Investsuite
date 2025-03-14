const getQuestion = (): Promise<Response> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/stock/question`, {
        method: 'GET',
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

const quizService = {
    getQuestion,
};

export default quizService;
