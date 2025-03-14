import { useState } from 'react';
import ManageStockComponent from '@components/stocks/ManageStockComponent';
import { StatusMessage } from '@types';

type Props = {
    stock: string;
    amount: number;
    showStatusMessage: (statusMessage: StatusMessage) => void;
};

const StockOverview: React.FC<Props> = ({ stock, amount, showStatusMessage }: Props) => {
    const [currentAmount, setCurrentAmount] = useState<number>(amount);

    const changeAmount = async (newAmount: number | null, statusMessage: StatusMessage) => {
        newAmount ? setCurrentAmount(newAmount) : null;
        showStatusMessage(statusMessage);
    };

    return (
        <li className="flex items-center w-96 gap-4">
            <p>
                {stock} ({currentAmount})
            </p>
            <div className='flex-grow' />
            <ManageStockComponent
                stock={stock}
                amount={currentAmount}
                changeAmount={changeAmount}
            />
        </li>
    );
};

export default StockOverview;
