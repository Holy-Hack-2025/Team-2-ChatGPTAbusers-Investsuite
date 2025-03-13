import Head from 'next/head';
import RegisterForm from '@components/auth/RegisterForm';
import LoginForm from '@components/auth/LoginForm';
import { useState } from 'react';
import Header from '@components/Header';

const Auth: React.FC = () => {
    const [register, setRegister] = useState<boolean>(false);

    return (
        <>
            <Head>
                <title>{register ? 'Register' : 'Login'}</title>
            </Head>
            <Header />
            <main className="h-screen flex bg-stone-100 text-black">    
                <div className="w-screen flex flex-col items-center m-auto">
                    {register ? (
                        <RegisterForm requestSwitch={setRegister} />
                    ) : (
                        <LoginForm requestSwitch={setRegister} />
                    )}
                </div>
            </main>
        </>
    );
};

export default Auth;
