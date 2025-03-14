import Head from 'next/head';
import Header from '@components/Header';
import LineGraph from '@components/graphs/LineGraph';
import PieGraph from '@components/graphs/PieGraph';
import StockService from '@services/stockService';
import { useEffect, useState } from 'react';
import { Meta } from '@types';

const Home: React.FC = () => {
    const [meta, setMeta] = useState<Meta | null>(null);
    const [close, setClose] = useState<Array<number>>([]);

    return (
        <div className="flex flex-col h-screen">
            <Head>
                <title>Frontend</title>
                <meta name="description" content="Watchlist app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <main className="flex-grow bg-stone-100 flex items-center justify-center">
                <div className="flex flex flex-col items-center">
                    <h1 className="mt-2 text-9xl text-purple-800">Welcome</h1>
                </div>
            </main>
        </div>
    );
};

export default Home;
