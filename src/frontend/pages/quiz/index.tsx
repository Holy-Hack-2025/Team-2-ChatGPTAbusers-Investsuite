import Head from 'next/head';
import Header from '@components/Header';
import quizService from '@services/quizService';
import { useState } from 'react';
import QuestionOverview from '@components/Quiz/QuestionOverview';

const Quiz: React.FC = () => {
    const [mode, setMode] = useState<string>("start");
    const [question, setQuestion] = useState<any>(null);
    const [answer, setAnswer] = useState<boolean>(true);

    const getQuestion = async () => {
        const response = await quizService.getQuestion();

        if (!response.ok) {
            console.error('Failed to get question');
        } else {
            const result = await response.json();
            console.log(result);

            setQuestion(result);
            setMode('question');
        };
    }

    const handleAnswer = (answer: string) => {
        const isTrue: boolean = (answer == question.token);
        console.log(answer == question.token)

        setAnswer(isTrue);
        setMode('answer');
    }

    return (
        <div className="flex flex-col h-screen">
            <Head>
                <title>Quiz</title>
                <meta name="description" content="Quiz app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <main className="flex-grow bg-stone-100 flex items-center justify-center">
                {mode == 'start' && (
                    <div className="flex flex-col items-center">
                        <h1 className="mt-2 text-7xl text-gray-800">Test your knowledge! </h1>
                        <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getQuestion}>get question</button>
                    </div>
                )}
                {mode == 'question' && (
                    <QuestionOverview question={question} handleAnswer={handleAnswer} />
                )}
                {mode == 'answer' && (
                    <div className="flex flex-col items-center">
                        {answer == true ? (
                            <h1 className="text-7xl text-green-500 align-center">Correct!</h1>
                            
                        ): (
                            <h1 className="text-7xl text-red-500 align-center">Incorrect!</h1>
                        )}
                        <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getQuestion}>Next question</button>
                    </div>
                )}
            </main>
        </div>
    );
};


export default Quiz;