import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { LineGraphOptions } from '@types';

type Props = {
    lineGraphOptions: LineGraphOptions;
};

const LineGraph: React.FC<Props> = ({ lineGraphOptions }: Props) => {
    const options = {
        chart: { width: 512, height: 256 },
        title: {
            text: lineGraphOptions.title ?? '???',
            align: 'center',
        },
        yAxis: {
            title: {
                text: lineGraphOptions.yTitle,
            },
        },
        xAxis: {
            visible: false,
            title: {
                text: lineGraphOptions.xTitle,
            },
        },
        legend: {
            enabled: false,
        },
        series: lineGraphOptions.series,
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineGraph;
