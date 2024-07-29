import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MainPage } from "../constants/RouteConstants";
import HttpHelperService from "../HttpHelperService";
import { initialState, setScore } from "../store/states/ScoreDataSlice";
import { competitionsSelector, scoreSelector, usersDataForScoreSelector } from "../store/selectors/selectors";
import { setCompetitions } from "../store/states/CompetitionsDataSlice";
import { setUsersDataForScore } from "../store/states/UsersDataForScoreSlice";
import { setUsers } from "../store/states/UsersDataSlice";

const ScoresFormComponent = () => {
    const scoreData = useSelector(scoreSelector);
    const users = useSelector(usersDataForScoreSelector);
    const competitions = useSelector(competitionsSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompetitions();
    }, []);

    const fetchCompetitions = async () => {
        const data = await HttpHelperService.getCompetitions();
        dispatch(setCompetitions(data));
    }

    const fetchUsers = async () => {
        const data = await HttpHelperService.getUsers();
        dispatch(setUsers(data.data));
    }

    const fetchUsersForCompetition = async (competitionId: number) => {
        const data = await HttpHelperService.getUsersForCompetition(competitionId);
        dispatch(setUsersDataForScore(data.data));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setScore({ ...scoreData, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(setScore({ ...scoreData, [name]: value, userId: null }));
        if (value) {
            fetchUsersForCompetition(Number(value));
        }
    };

    const handleSelectUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        dispatch(setScore({ ...scoreData, userId: Number(value) }));
    };

    const handleCancel = () => {
        dispatch(setScore(initialState));
        navigate(MainPage);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const selectedUser = users.find(user => user.userId === scoreData.userId);
        if (selectedUser && selectedUser.scores) {
            const existingScore = selectedUser.scores.find(score => score.competitionId == scoreData.competitionId);
            if (existingScore) {
                scoreData.id = existingScore.scoreId;
            }
        }
        const data = { ...scoreData };
        dispatch(setScore(data));
        e.preventDefault();
        await HttpHelperService.submitScore(data);
        dispatch(setScore(initialState));
        fetchUsers(); // for chart purpose
        navigate(MainPage);
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <div>
                <h2>Scores Form</h2>
            </div>
            <div>
                <label className="label">Score:</label>
                <input type="number" name="value" value={scoreData.value ?? ''} onChange={handleInputChange} required className="input" />
            </div>
            <div>
                <label className="label">Competition:</label>
                <select name="competitionId" value={scoreData.competitionId ?? ''} onChange={handleSelectChange} required className="input select-input">
                    <option value="">Select Competition</option>
                    {competitions.map(c => (
                        <option key={c.id} value={c.id ?? 0}>{c.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="label">User:</label>
                <select name="userId" value={scoreData.userId ?? ''} onChange={handleSelectUserChange} required className="input select-input">
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user.userId} value={user.userId ?? 0}>{user.firstName}</option>
                    ))}
                </select>
            </div>
            <div className='btn-container'>
                <button type="submit" className="button">Submit</button>
                <button className="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default ScoresFormComponent;