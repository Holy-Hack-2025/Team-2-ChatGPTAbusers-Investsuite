import Head from 'next/head';
import Header from '@components/Header';
import { useEffect, useState } from 'react';
import StockService from '@services/stockService';
import { StatusMessage } from '@types';
import classNames from 'classnames';
import StockOverview from '@components/stocks/StockOverview';

const Stocks: React.FC = () => {
    const [stocks, setStocks] = useState<any[]>([]);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const showStatusMessage = async (statusMessage: StatusMessage) => {
        setStatusMessages([]);
        setStatusMessages([statusMessage]);
        setTimeout(() => {
            setStatusMessages([]);
        }, 3000);
    };

    const getStocks = async () => {
        const response = await StockService.getMyStocks();

        if (!response.ok) {
            console.error('Failed to get question');
        } else {
            const result = await response.json();
            setStocks(result);
        }
    };

    useEffect(() => {
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
            <main className="flex-grow bg-stone-100 flex flex-col items-center justify-center text-black">
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
                <div className="flex flex-col items-center justify-center gap-4">
                    {stocks && (
                        <ul className="flex flex-col items-center gap-8">
                            {stocks.map((stock, i) => (
                                <StockOverview
                                    key={i}
                                    stock={stock.token}
                                    amount={stock.amount}
                                    showStatusMessage={showStatusMessage}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Stocks;
