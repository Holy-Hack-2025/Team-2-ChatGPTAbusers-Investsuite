import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AuthService from '@services/authService';
import { StatusMessage } from '@types';
import classNames from 'classnames';
import Helper from 'utils/helper';

type Props = {
    requestSwitch: (register: boolean) => void;
};

const RegisterForm: React.FC<Props> = ({ requestSwitch }: Props) => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setUsernameError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let isValid = true;
        const usernameRegExp = new RegExp(/^[a-zA-Z0-9-_]*$/);
        const passwordRegExp = new RegExp(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        );

        if (!usernameRegExp.test(username)) {
            setUsernameError('Username can only contain letters, numbers, dash and underscore.');
            isValid = false;
        }
        if (username.length < 3 || username.length > 25) {
            setUsernameError('Username must be between 3 and 25 characters.');
            isValid = false;
        }

        if (!passwordRegExp.test(password)) {
            setPasswordError(
                'Password must be 8 characters or longer. Password must contain at least one uppercase and one lowercase letter, one number and one special character.'
            );
            isValid = false;
        }

        return isValid;
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            clearErrors();

            if (!validate()) return;
            const response = await AuthService.registerUser({ username, password });

            if (response.status === 200) {
                const registerResponse = await response.json();
                setStatusMessages([
                    {
                        message: `Register successfull, welcome ${registerResponse.username}`,
                        type: 'success',
                    },
                ]);
                Helper.login(router, registerResponse);
            } else if (response.status === 400 || response.status === 401) {
                const errorMessage = await response.json();
                setStatusMessages([{ message: errorMessage.message, type: 'error' }]);
            } else {
                setStatusMessages([
                    {
                        message: 'An error has occured. Please try again later.',
                        type: 'error',
                    },
                ]);
            }
        } catch (err: any) {
            setStatusMessages([
                {
                    message: 'An error has occured. Please try again later.',
                    type: 'error',
                },
            ]);
        }
        setTimeout(() => {
            setStatusMessages([]);
        }, 3000);
    };

    return (
        <>
            <h1 className="text-5xl pb-8">Register</h1>
            {statusMessages && (
                <div className="flex flex-col items-center">
                    <ul className="list-none mb-1 mx-auto ">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    'text-sm text-red-800': type === 'error',
                                    'text-sm text-green-800': type === 'success',
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {[usernameError, passwordError].map(
                (error, i) =>
                    error && (
                        <div key={i} className="text-sm text-red-800 text-center mb-2">
                            {error}
                        </div>
                    )
            )}
            <form className="flex flex-col items-center" onSubmit={handleRegister}>
                <div>
                    <div>
                        <label htmlFor="usernameInput" className="block mb-2 text-sm font-medium">
                            Username
                        </label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="usernameInput"
                            type="text"
                            value={username}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value.replace(/ +/g, ''))}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                        />
                    </div>
                </div>                
                <div className="mt-2">
                    <div>
                        <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
                            Password
                        </label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="passwordInput"
                            type="password"
                            value={password}
                            autoComplete="off"
                            onChange={(e) => setPassword(e.target.value.replace(/ +/g, ''))}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                        />
                    </div>
                </div>
                <button
                    className="text-white text-center text-base bg-purple-500 border-2 border-purple-500 rounded-lg px-4 py-2 mt-2 hover:border-black"
                    type="submit"
                >
                    Register
                </button>
                <p onClick={() => requestSwitch(false)} className="mt-2">
                    Already have an account?{' '}
                    <span className="text-blue-500 cursor-pointer">Click here</span>.
                </p>
            </form>
        </>
    );
};

export default RegisterForm;
