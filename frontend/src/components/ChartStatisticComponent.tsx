import '../styles/ChartStatisticComponent.css';
import React from 'react';
import ChartComponent from './ChartComponent';
import { ChartStatisticComponentProps } from '../types/ChartStatisticComponentProps';

const ChartStatisticComponent: React.FC<ChartStatisticComponentProps> = ({ data }) => {

    return (
        <div className="charts-container">
            {data.map((score, index) => (
                <div key={index} className="chart-item">
                    <ChartComponent
                        id={score.id}
                        name={score.name}
                        scores={score.scores}
                    />
                </div>
            ))}
        </div>
    );
};

export default ChartStatisticComponent;