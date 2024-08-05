import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import LoaderComponent from './LoaderComponent';
import { ChartComponentProps } from '../types/ChartComponentProps';

const ChartComponent: React.FC<ChartComponentProps> = ({ id, name, scores }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [dataArray, setDataArray] = useState<(string | number)[][]>([]);
    const colors = [`red`, `blue`, `green`, `orange`, `purple`, `yellow`];
    const getColor = (index: number) => {
        return colors[index % colors.length];
    }

    useEffect(() => {
        if (scores) {
            const transformedData = [
                ['Country', 'Average Score', { role: 'style' }, { role: 'annotation' }] as (string | number)[],
                ...scores.map((score, index) => [
                    `${score.name}`,
                    score.averageScore,
                    getColor(index),
                    score.averageScore
                ]),
            ];
            setDataArray(transformedData);
        }
        setIsLoading(false);
    }, [scores]);

    const options = {
        title: `${name}`,
        vAxis: { title: 'Average Score' },
        legend: { position: 'none' },
        chartArea: { width: '70%', height: '70%' },
        bar: { groupWidth: '50%' },
        animation: {
            startup: true,
            easing: 'linear',
            duration: 2000,
        },
    };

    return (
        <>
            {isLoading ? (
                <LoaderComponent />
            ) : (
                <Chart
                    chartType="ColumnChart"
                    width="350px"
                    height="300px"
                    data={dataArray}
                    options={options}
                />
            )}
        </>
    );
};

export default ChartComponent;