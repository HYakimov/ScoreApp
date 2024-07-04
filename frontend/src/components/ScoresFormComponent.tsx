import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { MainPage } from "../constants/RouteConstants";
import HttpHelperService from "../HttpHelperService";
import { initialState, setScore } from "../store/states/scoreSlice";

export interface ScoreData {
    id: number | null
    value: number | null;
    userId: number | null;
}

const ScoresFormComponent = () => {
    const scoreData = useSelector((state: RootState) => state.score);
    const users = useSelector((state: RootState) => state.users.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setScore({ ...scoreData, [name]: value }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const selectedUser = users.find(user => user.id === Number(value));
        if (selectedUser) {
            const updatedScoreData = {
                ...scoreData,
                userId: selectedUser.id,
                value: selectedUser.scoreValue ?? scoreData.value,
                id: selectedUser.scoreId ?? scoreData.id
            };
            dispatch(setScore(updatedScoreData));
            console.log(updatedScoreData);
        }
    };

    const handleCancel = () => {
        dispatch(setScore(initialState));
        navigate(MainPage);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                <label className="label">User:</label>
                <select name="userId" value={scoreData.userId == null ? '' : scoreData.userId} onChange={handleSelectChange} required className="input select-input">
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