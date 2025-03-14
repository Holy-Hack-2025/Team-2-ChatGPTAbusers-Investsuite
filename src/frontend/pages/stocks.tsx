import Head from 'next/head';
import Header from '@components/Header';
import quizService from '@services/quizService';
import { useEffect, useState } from 'react';
import QuestionOverview from '@components/Quiz/QuestionOverview';
import StockService from '@services/stockService';

const Stocks: React.FC = () => {
    const [stocks, setStocks] = useState<any[]>([]);

    useEffect(() => {
        const getStocks = async () => {
            const response = await StockService.getMyStocks();

            if (!response.ok) {
                console.error('Failed to get question');
            } else {
                const result = await response.json();
                console.log(result);
                setStocks(result);
            };
        }

        getStocks();
    }, []);

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