import Head from 'next/head';
import RegisterForm from '@components/auth/RegisterForm';
import LoginForm from '@components/auth/LoginForm';
import { useState } from 'react';
import Header from '@components/Header';

const Auth: React.FC = () => {
    const [register, setRegister] = useState<boolean>(false);

    return (
        <div className="flex flex-col h-screen">
            <Head>
                <title>{register ? 'Register' : 'Login'}</title>
            </Head>
            <Header />
            <main className="flex-grow bg-stone-100 flex items-center justify-center text-black">    
                <div className="w-screen flex flex-col items-center m-auto">
                    {register ? (
                        <RegisterForm requestSwitch={setRegister} />
                    ) : (
                        <LoginForm requestSwitch={setRegister} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Auth;
