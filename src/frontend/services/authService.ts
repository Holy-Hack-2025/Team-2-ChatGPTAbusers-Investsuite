const registerUser = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
};

const loginUser = async ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/User/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
};

const AuthService = {
    registerUser,
    loginUser,
};

export default AuthService;
