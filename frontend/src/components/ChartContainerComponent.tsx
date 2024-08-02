import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import HttpHelperService from '../HttpHelperService';
import { ChartComponentProps } from '../types/ChartComponentProps';
import '../styles/ChartContainerComponent.css';
import { ChartData } from '../types/ChartData';

const ChartsContainer = () => {
    const [data, setData] = useState<ChartComponentProps[]>([]);

    useEffect(() => {
        fetchDataForCharts();
    }, []);

    const fetchDataForCharts = async () => {
        const response = await HttpHelperService.getDataForCharts();
        const fetchedData = response.data.map((item: any): ChartComponentProps => ({
            id: item.id,
            name: item.name,
            scores: item.scores.map((score: any): ChartData => ({
                id: score.id,
                name: score.name,
                averageScore: parseFloat(score.averageScore)
            }))
        }));
        setData(fetchedData);
    };

    return (
        <div className="charts-container">
            {data.map((d, index) => (
                <div key={index} className="chart-item">
                    <ChartComponent
                        id={d.id}
                        name={d.name}
                        scores={d.scores}
                    />
                </div>
            ))}
        </div>
    );
};

export default ChartsContainer;