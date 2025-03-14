import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@types';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (user) setLoggedInUser(JSON.parse(user));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        router.replace('/');
    };

    return (
        <header className="sticky top-0 z-50 p-4 border-bottom bg-gradient-to-br from-purple-900 to-purple-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <h1 className="text-white text-4xl">Frontend</h1>
            </div>
            <nav className="flex items-center">
                <Link
                    href="/"
                    className="px-4 py-2 text-white text-xl text-white hover:bg-purple-600 rounded-lg"
                >
                    Home
                </Link>
                <Link
                    href="/quiz"
                    className="px-4 py-2 text-white text-xl text-white hover:bg-purple-600 rounded-lg"
                >
                    Quiz
                </Link>
                {!loggedInUser && (
                    <Link
                        href="/auth"
                        className="px-4 py-2 text-white text-xl hover:bg-purple-600 rounded-lg"
                    >
                        Login
                    </Link>
                )}
                {loggedInUser && (
                    <>
                        <Link
                            href="/"
                            onClick={handleLogout}
                            className="px-4 py-2 text-white text-xl text-white hover:bg-purple-600 rounded-lg"
                        >
                            Logout
                        </Link>
                        <p className="px-4 py-2 text-white text-xl text-white border-l">
                            {loggedInUser.username}
                        </p>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
