import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { useSelector, useDispatch } from 'react-redux';
import { usersDataForScoreSelector } from '../store/selectors/selectors';
import HttpHelperService from '../HttpHelperService';
import { setUsersDataForScore } from '../store/states/UsersDataForScoreSlice';
import LoaderComponent from './LoaderComponent';

const ChartComponent: React.FC = () => {
    const users = useSelector(usersDataForScoreSelector);
    const dispatch = useDispatch();
    const [data, setData] = useState<(string | number)[][]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await HttpHelperService.getUsers();
        dispatch(setUsersDataForScore(response.data));
    };

    useEffect(() => {
        const header = ['First Name'];
        const dataArray: (string | number)[][] = [header];
        let maxScoresLength = 0;

        users.forEach(user => {
            user.scores?.forEach(score => {
                if (score.competitionId > maxScoresLength) {
                    maxScoresLength = score.competitionId;
                }
            });
        });

        for (let i = 1; i <= maxScoresLength; i++) {
            header.push(`Score ${i}`);
        }

        users.forEach(user => {
            const row: (string | number)[] = [user.firstName];
            const scores = new Array(maxScoresLength).fill(0);

            user.scores?.forEach(score => {
                const index = score.competitionId - 1;
                if (index >= 0 && index < maxScoresLength) {
                    scores[index] = score.scoreValue;
                }
            });
            row.push(...scores);
            dataArray.push(row);
        });
        setData(dataArray);
        setIsLoading(false);
    }, [users]);

    const options = {
        title: 'User Scores',
        vAxis: { title: 'Scores' },
        legend: { position: 'bottom' },
        chartArea: { width: '70%', height: '70%' },
        animation: {
            startup: true,
            easing: 'linear',
            duration: 1500,
        },
    }

    return (
        <>
            {isLoading ? (
                <LoaderComponent />
            ) : (
                <Chart
                    chartType="ColumnChart"
                    width="600px"
                    height="400px"
                    data={data}
                    options={options}
                />
            )}
        </>
    );
};

export default ChartComponent;