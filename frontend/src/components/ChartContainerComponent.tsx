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
        try {
            const response = await HttpHelperService.getUsers();
            const fetchedData = response.data.map((item: any) => {
                const scores = item.scores.map((score: any) => new ChartData(score));
                return new ChartComponentProps(item.competitionId, scores);
            });
            setData(fetchedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="charts-container">
            {data.map((d, index) => (
                <div key={index} className="chart-item">
                    <ChartComponent
                        scores={d.scores}
                    />
                </div>
            ))}
        </div>
    );
};

export default ChartsContainer;