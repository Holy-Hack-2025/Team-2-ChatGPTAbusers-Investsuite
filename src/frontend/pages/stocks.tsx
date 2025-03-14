import Head from 'next/head';
import Header from '@components/Header';
import quizService from '@services/quizService';
import { useState } from 'react';
import QuestionOverview from '@components/Quiz/QuestionOverview';

const Stocks: React.FC = () => {

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
                <p>test</p>
            </main>
        </div>
    );
};


export default Stocks;