const getQuestion = (): Promise<Response> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/stock/question`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const quizService = {
    getQuestion
};

export default quizService;