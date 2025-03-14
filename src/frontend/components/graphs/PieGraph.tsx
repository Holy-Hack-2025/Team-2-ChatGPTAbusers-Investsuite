import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PieGraphOptions } from '@types';

type Props = {
    pieGraphOptions: PieGraphOptions;
};

const PieGraph: React.FC<Props> = ({ pieGraphOptions }: Props) => {
    const options = {
        chart: {
            type: 'pie',
        },
        title: {
            text: pieGraphOptions.title,
        },
        tooltip: {
            valueSuffix: '%',
        },
        subtitle: {
            text:
                pieGraphOptions.subtitle ??
                'By stock worth (<a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank">SOURCE</a>)',
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [
                    {
                        enabled: true,
                        distance: 20,
                    },
                    {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7,
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10,
                        },
                    },
                ],
            },
        },
        series: [
            {
                name: pieGraphOptions.serieName,
                colorByPoint: true,
                data: pieGraphOptions.series,
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieGraph;
