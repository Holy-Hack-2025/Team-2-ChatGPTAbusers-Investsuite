import Head from 'next/head';
import Header from '@components/Header';
import LineGraph from '@components/LineGraph';

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
                                        8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906, 10073,
                                        11471, 11648,
                                    ],
                                },
                            ],
                        }}
                    />
                </div>
            </main>
        </>
    );
};

export default Home;
