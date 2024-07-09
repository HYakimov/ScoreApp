import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MainPage } from "../constants/RouteConstants";
import HttpHelperService from "../HttpHelperService";
import { initialState, setScore } from "../store/states/ScoreDataSlice";
import { setUsers } from "../store/states/UsersDataSlice";
import { competitionsSelector, scoreSelector, usersSelector } from "../store/selectors/selectors";
import { setCompetitions } from "../store/states/CompetitionsDataSlice";

const ScoresFormComponent = () => {
    const scoreData = useSelector(scoreSelector);
    const users = useSelector(usersSelector);
    const competitions = useSelector(competitionsSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
        fetchCompetitions();
    }, []);

    const fetchUsers = async () => {
        const data = await HttpHelperService.getUsers();
        dispatch(setUsers(data));
    }

    const fetchCompetitions = async () => {
        const data = await HttpHelperService.getCompetitions();
        dispatch(setCompetitions(data));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setScore({ ...scoreData, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        dispatch(setScore({ ...scoreData, [name]: value }));
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
        const selectedUser = users.find(user => user.id === scoreData.userId);
        if (selectedUser != undefined) {
            scoreData.id = selectedUser.scoreId;
            const updatedScoreData = {
                id: selectedUser.scoreId,
                value: scoreData.value,
                competitionId: scoreData.competitionId,
                userId: selectedUser.id
            };
            dispatch(setScore(updatedScoreData));
        }
        e.preventDefault();
        console.log(scoreData);
        await HttpHelperService.submitScore(scoreData);
        dispatch(setScore(initialState));
        navigate(MainPage);
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <div>
                <h2>Scores Form</h2>
            </div>
            <div>
                <label className="label">Score:</label>
                <input type="number" name="value" value={scoreData.value == null ? '' : scoreData.value} onChange={handleInputChange} required className="input" />
            </div>
            <div>
                <label className="label">Competition:</label>
                <select name="competitionId" value={scoreData.competitionId == null ? '' : scoreData.competitionId} onChange={handleSelectChange} required className="input select-input">
                    <option value="">Select Competition</option>
                    {competitions.map(c => (
                        <option key={c.id} value={c.id == null ? 0 : c.id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="label">User:</label>
                <select name="userId" value={scoreData.userId == null ? '' : scoreData.userId} onChange={handleSelectUserChange} required className="input select-input">
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id == null ? 0 : user.id}>{user.firstName}</option>
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