import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { LineGraphOptions } from '@types';

type Props = {
    lineGraphOptions: LineGraphOptions;
};

const LineGraph: React.FC<Props> = ({ lineGraphOptions }: Props) => {
    const options = {
        title: {
            text: lineGraphOptions.title,
            align: 'left',
        },
        subtitle: {
            text:
                lineGraphOptions.subtitle ??
                'By stock worth (<a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank">SOURCE</a>)',
            align: 'left',
        },
        yAxis: {
            title: {
                text: lineGraphOptions.yTitle,
            },
        },
        xAxis: {
            title: {
                text: lineGraphOptions.xTitle,
            },
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false,
                },
                pointStart: lineGraphOptions.start,
            },
        },
        series: lineGraphOptions.series,
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500,
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom',
                        },
                    },
                },
            ],
        },
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineGraph;
