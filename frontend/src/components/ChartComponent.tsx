import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import LoaderComponent from './LoaderComponent';
import { ChartComponentProps } from '../types/ChartComponentProps';

const ChartComponent: React.FC<ChartComponentProps> = ({ scores }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dataArray, setDataArray] = useState<(string | number)[][]>([]);

    useEffect(() => {
        if (scores) {
            const transformedData = [
                ['Country ID', 'Average Score', { role: 'annotation' }] as (string | number)[],
                ...scores.map(score => [score.countryId, score.averageScore, score.countryId]),
            ];
            setDataArray(transformedData);
        }
        setIsLoading(false);
    }, [scores]);


    const options = {
        title: 'Competition Scores by Country',
        hAxis: { title: 'Country ID' },
        vAxis: { title: 'Average Score' },
        legend: { position: 'bottom' },
        chartArea: { width: '70%', height: '70%' },
        animation: {
            startup: true,
            easing: 'linear',
            duration: 1500,
        },
    };

    return (
        <>
            {isLoading ? (
                <LoaderComponent />
            ) : (
                <Chart
                    chartType="ColumnChart"
                    width="250px"
                    height="150px"
                    data={dataArray}
                    options={options}
                />
            )}
        </>
    );
};

export default ChartComponent;