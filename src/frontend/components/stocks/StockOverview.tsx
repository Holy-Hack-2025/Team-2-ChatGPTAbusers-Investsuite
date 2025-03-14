import { useEffect, useState } from 'react';
import { StatusMessage } from '@types';
import StockService from '@services/stockService';

type Props = {
    stock: string;
    amount: number;
    showStatusMessage: (statusMessage: StatusMessage) => void;
};

const StockOverview: React.FC<Props> = ({ stock, amount, showStatusMessage }: Props) => {
    const [currentAmount, setCurrentAmount] = useState<number>(amount);

    useEffect(() => {
        currentAmount !== amount ? handleChange() : null;
    }, [currentAmount]);

    const handleChange = async () => {
        try {
            const response = await StockService.manageStock(stock, currentAmount);

            if (response.status === 200 || response.status === 204) {
                const addStockResponse = await response.json();
            } else if (response.status === 400 || response.status === 401) {
                const errorMessage = await response.json();
                showStatusMessage({ message: errorMessage.message, type: 'error' });
            } else {
                showStatusMessage({
                    message: 'An error has occured. Please try again later.',
                    type: 'error',
                });
            }
        } catch (err: any) {}
    };

    return (
        <>
            {currentAmount > 0 && (
                <li className="flex items-center w-96 gap-4">
                    <p>
                        {stock} ({currentAmount})
                    </p>
                    <div className="flex-grow" />
                    <div className="flex flex-row items-center justify-between gap-3">
                        <button
                            onClick={() => setCurrentAmount((prev) => prev + 1)}
                            className="text-white text-center text-base bg-purple-500 border-2 border-purple-500 rounded-lg w-10 aspect-square hover:border-black"
                        >
                            +
                        </button>
                        <button
                            onClick={() => setCurrentAmount((prev) => (prev > 0 ? prev - 1 : prev))}
                            className="text-white text-center text-base bg-purple-500 border-2 border-purple-500 rounded-lg w-10 aspect-square hover:border-black"
                        >
                            -
                        </button>
                    </div>
                </li>
            )}
        </>
    );
};

export default StockOverview;
