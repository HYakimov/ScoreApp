import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import HttpHelperService from '../HttpHelperService';
import { ChartData } from '../types/ChartData';
import { ChartComponentProps } from '../types/ChartComponentProps';
import '../styles/ChartContainerComponent.css';

const ChartsContainer = () => {
    const [data, setData] = useState<ChartComponentProps[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await HttpHelperService.getUsers();
        const fetchedData = response.data.map((item: any) => {
            const scores = item.scores.map((score: any) => new ChartData(score));
            return new ChartComponentProps(item.competitionId, item.competitionName, scores);
        });
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