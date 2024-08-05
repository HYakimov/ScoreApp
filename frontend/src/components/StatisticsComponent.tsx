import React, { useEffect, useState } from 'react';
import HttpHelperService from '../HttpHelperService';
import ChartTableComponent from './ChartTableComponent';
import { TableDataForChartComponent } from '../types/TableDataForChartComponent';
import ChartStatisticComponent from './ChartStatisticComponent';
import { ChartComponentProps } from '../types/ChartComponentProps';
import { ChartData } from '../types/ChartData';
import { ChartTypes } from '../types/ChartTypes';

const StatisticsComponent = () => {
    const [selectedOption, setSelectedOption] = useState<string>(ChartTypes.competition);
    const [tableData, setTableData] = useState<TableDataForChartComponent[]>();
    const [chartData, setChartData] = useState<ChartComponentProps[]>([]);

    useEffect(() => {
        switch (selectedOption) {
            case ChartTypes.age:
                fetchDataForChartTables();
                break;
            case ChartTypes.competition:
                fetchDataForCharts(ChartTypes.competition);
                break;
            case ChartTypes.country:
                fetchDataForCharts(ChartTypes.country);
                break;
            default:
                break;
        }
    }, [selectedOption]);


    const fetchDataForCharts = async (chartType: string) => {
        const response = await HttpHelperService.getDataForCharts(chartType);
        const fetchedData = response.data.map((item: any): ChartComponentProps => ({
            id: item.id,
            name: item.name,
            scores: item.scores.map((score: any): ChartData => ({
                id: score.id,
                name: score.name,
                averageScore: parseFloat(score.averageScore)
            }))
        }));
        setChartData(fetchedData);
    };

    const fetchDataForChartTables = async () => {
        const response = await HttpHelperService.getDataForChartTable();
        const fetchedData = response.data.map((item: any) => ({
            competitionId: item.competitionId,
            competitionName: item.competitionName,
            userId: item.userId,
            fullName: item.fullName,
            age: item.age,
            maxScore: item.maxScore
        }));
        setTableData(fetchedData);
    };

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const getStatisticComponent = () => {
        switch (selectedOption) {
            case ChartTypes.competition:
            case ChartTypes.country:
                return (
                    <ChartStatisticComponent
                        data={chartData}
                    />
                );
            case ChartTypes.age:
                return (
                    <ChartTableComponent
                        data={tableData!}
                    />
                );
        }
    }

    return (
        <div className='charts-page-container'>
            <div className="dropdown-container">
                <label className="dropdown-label" style={{ color: 'white' }}>Select Chart: </label>
                <select id="chart-dropdown" value={selectedOption} onChange={handleDropdownChange}>
                    <option value="competition">Competition</option>
                    <option value="country">Country</option>
                    <option value="age">Age</option>
                </select>
            </div>
            {getStatisticComponent()}
        </div>
    );
};

export default StatisticsComponent;