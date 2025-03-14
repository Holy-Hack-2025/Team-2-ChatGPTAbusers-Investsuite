import StockService from '@services/stockService';
import { StatusMessage } from '@types';

type Props = {
    stock: string;
    amount: number;
    changeAmount: (amount: number | null, statusMessage: StatusMessage) => void;
};

const ManageStockComponent: React.FC<Props> = ({ stock, amount, changeAmount }: Props) => {
    const handleAdd = async () => {
        try {
            const newAmount = amount + 1;
            const response = await StockService.manageStock(stock, newAmount);

            if (response.status === 200) {
                const addStockResponse = await response.json();
                changeAmount(newAmount, {
                    message: 'Adding stock successfull',
                    type: 'success',
                });
            } else if (response.status === 400 || response.status === 401) {
                const errorMessage = await response.json();
                changeAmount(null, { message: errorMessage.message, type: 'error' });
            } else {
                changeAmount(null, {
                    message: 'An error has occured. Please try again later.',
                    type: 'error',
                });
            }
        } catch (err: any) {
            changeAmount(null, {
                message: 'An error has occured. Please try again later.',
                type: 'error',
            });
        }
    };

    const handleSubtract = async () => {
        try {
            const newAmount = amount - 1;
            const response = await StockService.manageStock(stock, newAmount);

            if (response.status === 200) {
                const subtractStockResponse = await response.json();
                changeAmount(newAmount, {
                    message: 'Subtracting stock successfull',
                    type: 'success',
                });
            } else if (response.status === 400 || response.status === 401) {
                const errorMessage = await response.json();
                changeAmount(null, { message: errorMessage.message, type: 'error' });
            } else {
                changeAmount(null, {
                    message: 'An error has occured. Please try again later.',
                    type: 'error',
                });
            }
        } catch (err: any) {
            changeAmount(null, {
                message: 'An error has occured. Please try again later.',
                type: 'error',
            });
        }
    };

    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <button
                    onClick={handleAdd}
                    className="text-white text-center text-base bg-purple-500 border-2 border-purple-500 rounded-lg px-4 py-2 hover:border-black"
                >
                    +
                </button>
                <button
                    onClick={handleSubtract}
                    className="text-white text-center text-base bg-purple-500 border-2 border-purple-500 rounded-lg px-4 py-2 hover:border-black"
                >
                    -
                </button>
            </div>
        </>
    );
};

export default ManageStockComponent;
