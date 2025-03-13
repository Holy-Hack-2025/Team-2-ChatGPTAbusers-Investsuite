import { NextRouter } from 'next/router';
import { Auth, Role } from '@types';

export default class Helper {
    static login = (router: NextRouter, response: Auth): void => {
        const loggedInUser = {
            username: response.username,
            role: response.role,
            token: response.token,
        };
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        router.replace('/');
    };

    static getLoggedInUser = (): Auth | null => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        return loggedInUser ? JSON.parse(loggedInUser) : null;
    };

    static getRole = (): Role | null => {
        const loggedInUser = this.getLoggedInUser();
        return loggedInUser ? loggedInUser.role : null;
    };

    static isAdmin = (): boolean => {
        const role = this.getRole();
        return role ? role === Role.ADMIN : false;
    };
}
