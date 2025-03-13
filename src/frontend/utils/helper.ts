import { NextRouter } from 'next/router';
import { Auth } from '@types';

export default class Helper {
    static login = (router: NextRouter, response: Auth): void => {
        const loggedInUser = {
            username: response.username,
            token: response.token,
        };
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        router.replace('/');
    };

    static getLoggedInUser = (): Auth | null => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        return loggedInUser ? JSON.parse(loggedInUser) : null;
    };
}
