type Props = {
    question: any;
    handleAnswer: (answer: string) => void;
};

const QuestionOverview: React.FC<Props> = ({ question, handleAnswer }: Props) => {
    return (
        <div className="flex flex-col w-full">
            <h3 className="text-black text-center">What is the graph of '{question.token}'</h3>
            <div className="text-black grid grid-cols-2 gap-3 p-3">
                <button className="w-full bg-blue-300 rounded p-8 cursor-pointer" onClick={x => handleAnswer(question.options[0].token)}>{question.options[0].token}</button>
                <button className="w-full bg-red-300 rounded p-8 cursor-pointer" onClick={x => handleAnswer(question.options[1].token)}>{question.options[1].token}</button>
                <button className="w-full bg-yellow-300 rounded p-8 cursor-pointer" onClick={x => handleAnswer(question.options[2].token)}>{question.options[2].token}</button>
                <button className="w-full bg-green-300 rounded p-8 cursor-pointer" onClick={x => handleAnswer(question.options[3].token)}>{question.options[3].token}</button>
            </div>
        </div>
    );
}

export default QuestionOverview;