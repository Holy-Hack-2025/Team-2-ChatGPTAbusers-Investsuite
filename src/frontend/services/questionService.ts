const getAllQuestionForUser = async (userId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/question/${userId}`, {
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

const QuestionService = {
    getAllQuestionForUser,
};

export default QuestionService;
