import '../styles/FormComponent.css';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MainPage } from "../constants/RouteConstants";
import HttpHelperService from "../HttpHelperService";
import { initialState, setScore } from "../store/states/ScoreDataSlice";
import { competitionsSelector, scoreSelector, usersDataForCompetitionSelector } from "../store/selectors/selectors";
import { setCompetitions } from "../store/states/CompetitionsDataSlice";
import { setUsers } from "../store/states/UsersDataSlice";
import { setUsersDataForCompetition } from "../store/states/UsersDataForCompetitionSlice";
import InputWithErrorComponent from "./InputWithErrorComponent";

const ScoresFormComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(usersDataForCompetitionSelector);
    const scoreData = useSelector(scoreSelector);
    const competitions = useSelector(competitionsSelector);
    const [errorMessages, setErrorMessages] = useState<{ property: string; message: string }[]>([]);
    const [showErrorComponent, setShowErrorComponent] = useState(false);

    useEffect(() => {
        fetchCompetitions();
    }, []);

    const fetchCompetitions = async () => {
        const data = await HttpHelperService.getCompetitions();
        dispatch(setCompetitions(data.data));
    }

    const fetchUsers = async () => {
        const data = await HttpHelperService.getUsers();
        dispatch(setUsers(data.data));
    }

    const fetchUsersForCompetition = async (competitionId: number) => {
        const data = await HttpHelperService.getUsersForCompetition(competitionId);
        dispatch(setUsersDataForCompetition(data.data));
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
        e.preventDefault();
        try {
            await HttpHelperService.submitScore(scoreData);
            dispatch(setScore(initialState));
            fetchUsers(); // for chart purpose
            navigate(MainPage);
        } catch (error) {
            if (error instanceof Error) {
                const parsedError = JSON.parse(error.message);
                const messages = JSON.parse(parsedError.message);
                setErrorMessages(messages);
                setShowErrorComponent(true);
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <div>
                    <h2>Scores Form</h2>
                </div>
                <InputWithErrorComponent name="value" errorMessages={errorMessages} >
                    <label className="label">Score:</label>
                    <input type="number" name="value" value={scoreData.value ?? ''} onChange={handleInputChange} required className="input" />
                </InputWithErrorComponent>
                <InputWithErrorComponent name="competitionId" errorMessages={errorMessages}>
                    <label className="label">Competition:</label>
                    <select name="competitionId" value={scoreData.competitionId ?? ''} onChange={handleSelectChange} required className="input select-input">
                        <option value="">Select Competition</option>
                        {competitions.map(c => (
                            <option key={c.id} value={c.id ?? 0}>{c.name}</option>
                        ))}
                    </select>
                </InputWithErrorComponent>
                <InputWithErrorComponent name="userId" errorMessages={errorMessages} >
                    <label className="label">User:</label>
                    <select name="userId" value={scoreData.userId ?? ''} onChange={handleSelectUserChange} required className="input select-input">
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id ?? 0}>{user.name}</option>
                        ))}
                    </select>
                </InputWithErrorComponent>
                <div className='btn-container'>
                    <button type="submit" className="button">Submit</button>
                    <button className="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>

        </div>
    );
}

export default ScoresFormComponent;