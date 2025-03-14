import { useState, useEffect } from 'react';
import LineGraph from '@components/graphs/LineGraph';

type Props = {
    question: any;
    handleAnswer: (answer: string) => void;
};

const QuestionOverview: React.FC<Props> = ({ question, handleAnswer }: Props) => {
    const [viewMode, setViewMode] = useState<'questionToGraphs' | 'graphToQuestions'>('questionToGraphs');

    const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400'];

    // Randomly select the view mode when the component mounts or when the question changes
    useEffect(() => {
        setViewMode(Math.random() > 0.5 ? 'questionToGraphs' : 'graphToQuestions');
    }, [question]); // Trigger on question change

    if (!question || !question.options || question.options.length === 0) {
        return <p className="text-red-500">No data available.</p>;
    }

    console.log('Rendering QuestionOverview with:', question, 'Mode:', viewMode);

    return (
        <div className="flex flex-col w-full">
            {viewMode === 'questionToGraphs' ? (
                <>
                    <h3 className="text-black text-center text-2xl mt-3">What is the graph of '{question.token}'</h3>
                    <div className="text-black grid grid-cols-2 gap-3 p-3">
                        {question.options.map((option: any, index: number) => (
                            <button
                                key={index}
                                className={`w-full rounded p-4 cursor-pointer flex flex-col items-center gap-2 ${colors[index]}`}
                                onClick={() => handleAnswer(option.token)}
                            >
                                {option.historicPrices ? (
                                    <LineGraph
                                        lineGraphOptions={{
                                            yTitle: `Stock Price (${option.currency})`,
                                            xTitle: 'Last 30 days',
                                            start: 0,
                                            series: [{ data: option.historicPrices, name: '???' }],
                                        }}
                                    />
                                ) : (
                                    <p className="text-red-500">Invalid graph data</p>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <h3 className="text-black text-center text-2xl">What matches this graph?</h3>
                    <div className="flex justify-center p-3">
                        {question.options[0].historicPrices ? (
                            <LineGraph
                                lineGraphOptions={{
                                    yTitle: `Stock Price (${question.options[0].currency})`,
                                    xTitle: 'Last 30 days',
                                    start: 0,
                                    series: [{ data: question.options[0].historicPrices, name: '???' }],
                                }}
                            />
                        ) : (
                            <p className="text-red-500">Invalid graph data</p>
                        )}
                    </div>
                    <div className="text-black grid grid-cols-2 gap-3 p-3">
                        {question.options.map((option: any, index: number) => (
                            <button
                                key={index}
                                className={`w-full rounded p-4 cursor-pointer text-lg font-semibold ${colors[index]}`}
                                onClick={() => handleAnswer(option.token)}
                            >
                                {option.token}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default QuestionOverview;
