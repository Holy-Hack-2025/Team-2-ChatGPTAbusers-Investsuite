import { useState } from 'react';
import { useRouter } from 'next/router';
import Helper from 'utils/helper';
import AuthService from '@services/authService';
import { StatusMessage } from '@types';
import classNames from 'classnames';

type Props = {
    requestSwitch: (register: boolean) => void;
};

const LoginForm: React.FC<Props> = ({ requestSwitch }: Props) => {
    const router = useRouter();
    const [usernameOrEmail, setUsernameOrEmail] = useState<string>('');
    const [usernameOrEmailError, setUsernameOrEmailError] = useState<string | null>(null);
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const clearErrors = () => {
        setUsernameOrEmailError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let isValid = true;

        if (usernameOrEmail.length < 3) {
            setUsernameOrEmailError('Username / email must be at least 3 characters.');
            isValid = false;
        }
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters.');
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            clearErrors();

            if (!validate()) return;
            const response = await AuthService.loginUser({ usernameOrEmail, password });

            if (response.status === 200) {
                const loginResponse = await response.json();
                setStatusMessages([
                    {
                        message: `Login successfull, welcome ${loginResponse.username}`,
                        type: 'success',
                    },
                ]);
                Helper.login(router, loginResponse);
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
            <h1 className="text-5xl pb-8">
                Login
            </h1>
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
            {[usernameOrEmailError, passwordError].map(
                (error, i) =>
                    error && (
                        <div key={i} className="text-sm text-red-800 text-center mb-2">
                            {error}
                        </div>
                    )
            )}
            <form onSubmit={handleLogin} className="flex flex-col items-center">
                <div>
                    <div>
                        <label htmlFor="usernameInput" className="block mb-2 text-sm font-medium">
                            Username / Email
                        </label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="usernameInput"
                            type="text"
                            value={usernameOrEmail}
                            autoComplete="off"
                            onChange={(e) => setUsernameOrEmail(e.target.value.replace(/ +/g, ''))}
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
                    className="text-white text-center text-base bg-blue-500 border-2 border-blue-500 rounded-lg px-4 py-2 mt-2 hover:border-black"
                    type="submit"
                >
                    Login
                </button>
                <p onClick={() => requestSwitch(true)} className="mt-2">
                    Don't have an account yet?{' '}
                    <span className="text-blue-500 cursor-pointer">Click here</span>.
                </p>
            </form>
        </>
    );
};

export default LoginForm;
