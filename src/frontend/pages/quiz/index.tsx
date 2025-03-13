import Head from 'next/head';
import Header from '@components/Header';

const Quiz: React.FC = () => {
    return (
        <>
            <Head>
                <title>Quiz</title>
                <meta name="description" content="Quiz app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <main className="h-screen bg-stone-100 content-center">
                <div className="flex flex flex-col items-center">
                    <h1 className="mt-2 text-7xl text-gray-800">Test your knowledge!</h1>
                    <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Quiz</button>
                </div>
            </main>
        </>
    );
};

export default Quiz;