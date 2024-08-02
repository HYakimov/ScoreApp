import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import HttpHelperService from '../HttpHelperService';
import { ChartComponentProps } from '../types/ChartComponentProps';
import '../styles/ChartContainerComponent.css';
import { ChartData } from '../types/ChartData';

const ChartsContainer = () => {
    const [data, setData] = useState<ChartComponentProps[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>('competitionId');

    useEffect(() => {
        fetchDataForCharts(selectedOption);
    }, [selectedOption]);

    const fetchDataForCharts = async (primaryKey: string) => {
        const response = await HttpHelperService.getDataForCharts(primaryKey);
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

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className='charts-page-container'>
            <div className="dropdown-container">
                <label className="dropdown-label" style={{ color: 'white' }}>Select Chart: </label>
                <select id="chart-dropdown" value={selectedOption} onChange={handleDropdownChange}>
                    <option value="competitionId">Competition</option>
                    <option value="countryId">Country</option>
                </select>
            </div>
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
        </div>
    );
};

export default ChartsContainer;