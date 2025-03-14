import Head from 'next/head';
import Header from '@components/Header';
import quizService from '@services/quizService';

const Quiz: React.FC = () => {

    const getQuestion = async () => {
        const response = await quizService.getQuestion();

        if (!response.ok) {
            console.error('Failed to get question');
        } else {
            console.log(getQuestion);
            getQuestion();
        };
    }

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
                    <h1 className="mt-2 text-7xl text-gray-800">Test your knowledge! ignore this bitch </h1>
                    <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getQuestion}>get question</button>
                </div>
            </main>
        </>
    );
};


export default Quiz;