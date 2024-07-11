import React, { useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { useSelector } from 'react-redux';
import { tableRecordsSelector } from '../store/selectors/selectors';

const ChartComponent: React.FC = () => {
    const tableData = useSelector(tableRecordsSelector);
    let data: (string | number)[][] = [];
    let maxLength: number = 0;

    useEffect(() => {
        const header = ['First Name'];
        tableData.forEach(data => {
            if (data.scores && data.scores.length > maxLength) {
                maxLength = data.scores.length;
            }
        })

        for (let i = 1; i <= maxLength; i++) {
            header.push(`Score ` + i);
        }
        data.push(header);

        tableData.forEach(record => {
            const row: (string | number)[] = [record.firstName];
            const sortedScores = record.scores ? record.scores.slice(0, 3).sort((a, b) => a.competitionId - b.competitionId) : [];
            const scores = sortedScores.map(score => score.scoreValue);
            while (scores.length < 3) {
                scores.push(0);
            }
            row.push(...scores);
            console.log(row)
            data.push(row);
        });

    }, [tableData])

    const options = {
        title: 'User Scores',
        vAxis: { title: 'Scores' },
        legend: { position: 'bottom' },
    };

    return (
        <Chart
            chartType="ColumnChart"
            width="600px"
            height="400px"
            data={data}
            options={options}
        />
    );
};

export default ChartComponent;