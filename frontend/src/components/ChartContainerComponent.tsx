import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import HttpHelperService from '../HttpHelperService';
import { ChartData } from '../types/ChartData';
import { ChartComponentProps } from '../types/ChartComponentProps';
import '../styles/ChartContainerComponent.css';

const ChartsContainer = () => {
    const [data, setData] = useState<ChartComponentProps[]>([]);

    useEffect(() => {
        fetchDataForCharts();
    }, []);

    const fetchDataForCharts = async () => {
        const response = await HttpHelperService.getDataForCharts();
        const fetchedData = response.data.map((item: any) => ({
            competitionId: item.competitionId,
            competitionName: item.competitionName,
            scores: item.scores.map((score: any) => new ChartData(score))
        }));
        setData(fetchedData);
    };

    return (
        <div className="charts-container">
            {data.map((d, index) => (
                <div key={index} className="chart-item">
                    <ChartComponent
                        competitionId={d.competitionId}
                        competitionName={d.competitionName}
                        scores={d.scores}
                    />
                </div>
            ))}
        </div>
    );
};

export default ChartsContainer;