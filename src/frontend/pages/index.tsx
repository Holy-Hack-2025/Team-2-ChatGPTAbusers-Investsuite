import Head from 'next/head';
import Header from '@components/Header';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Frontend</title>
                <meta name="description" content="Watchlist app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <main className="h-screen bg-stone-100 content-center">
                <div className="flex flex flex-col items-center">
                    <h1 className="mt-2 text-7xl text-gray-800">Welcome</h1>
                </div>
            </main>
        </>
    );
};

export default Home;
