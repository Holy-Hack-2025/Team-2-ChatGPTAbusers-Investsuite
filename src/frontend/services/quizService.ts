const getQuestion = (): Promise<Response> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/stock/question`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibWFuZGVyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwiZXhwIjoxNzQxOTU4MzEzLCJpc3MiOiJIb2x5SGFjayIsImF1ZCI6IkhvbHlIYWNrVXNlcnMifQ.OOxVRCyBzAX-BJ-BtQwxOMUyjfzZJ28ZkMq12y3jjKg`,
        },
    });
};

const getToken = (): string => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
    return token ? `Bearer ${token}` : '';
};

const quizService = {
    getQuestion
};

export default quizService;