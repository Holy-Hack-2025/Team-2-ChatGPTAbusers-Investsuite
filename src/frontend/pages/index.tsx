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
                    <h1 className="mt-2 text-7xl text-gray-800">Welcome</h1>
                    <div className="flex gap-4">
                        <LineGraph
                            lineGraphOptions={{
                                title: 'Stocks!!!',
                                yTitle: 'Stock Price (Euro)',
                                xTitle: 'Year (2015 to 2025)',
                                start: 2015,
                                series: [
                                    {
                                        name: 'Intel',
                                        data: [
                                            65165, 81827, 112143, 142383, 171533, 165174, 155157,
                                            161454, 154610, 168960, 171558,
                                        ],
                                    },
                                    {
                                        name: 'Nvidia',
                                        data: [
                                            29742, 29851, 32490, 30282, 38121, 36885, 33726, 34243,
                                            31050, 33099, 33473,
                                        ],
                                    },
                                    {
                                        name: 'AMD',
                                        data: [
                                            16005, 19771, 20185, 24377, 32147, 30912, 29243, 29213,
                                            25663, 28978, 30618,
                                        ],
                                    },
                                    {
                                        name: 'HMMM',
                                        data: [
                                            null,
                                            null,
                                            null,
                                            null,
                                            null,
                                            null,
                                            11164,
                                            11218,
                                            10077,
                                            12530,
                                            16585,
                                        ],
                                    },
                                    {
                                        name: 'OK',
                                        data: [
                                            8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906,
                                            10073, 11471, 11648,
                                        ],
                                    },
                                ],
                            }}
                        />
                        <PieGraph
                            pieGraphOptions={{
                                title: 'Stocks!!!',
                                serieName: 'Percentage',
                                series: [
                                    {
                                        name: 'Intel',
                                        y: 55.02,
                                    },
                                    {
                                        name: 'Nvidia',
                                        sliced: true,
                                        selected: true,
                                        y: 26.71,
                                    },
                                    {
                                        name: 'AMD',
                                        y: 1.09,
                                    },
                                    {
                                        name: 'MHHH',
                                        y: 15.5,
                                    },
                                    {
                                        name: 'OK',
                                        y: 1.68,
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
