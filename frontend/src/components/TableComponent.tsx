import "../styles/TableComponent.css";
import PaginationComponent from "./PaginationComponent";
import HttpHelperService from "../HttpHelperService";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { useNavigate } from "react-router-dom";
import { RegistrationFormPage } from "../constants/RouteConstants";
import { setPage } from "../store/states/PageDataSlice";
import { setSort } from "../store/states/SortDataSlice";
import { resetSort, sortByAge, sortByScore } from "../constants/SortingConstants";
import { setCities } from "../store/states/CitiesDataSlice";
import { setLoading } from "../store/states/LoadingDataSlice";
import { FormData } from "../types/FormData";
import { setUserInputData } from "../store/states/UserInputDataSlice";
import { highlightedRowSelector, tableRecordsSelector } from "../store/selectors/selectors";

const TableComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const tableData = useSelector(tableRecordsSelector);
  const highlightedRow = useSelector(highlightedRowSelector);

  const handleClearTable = async () => {
    dispatch(setLoading(true));
    await HttpHelperService.delete();
    dispatch(setLoading(false));
  };

  const handleDelete = async (id: number) => {
    dispatch(setLoading(true));
    await HttpHelperService.deleteById(id);
    dispatch(setLoading(false));
    dispatch(setPage(1));
  };

  const handleEdit = (formData: FormData) => {
    dispatch(setLoading(true));
    navigate(RegistrationFormPage);
    fetchCities(formData.countryId ?? 0);
    dispatch(setUserInputData({
      firstName: formData.firstName,
      lastName: formData.lastName,
      age: formData.age,
      countryId: formData.countryId,
      cityId: formData.cityId,
      gender: formData.gender,
      email: formData.email,
      id: formData.id
    }));
    dispatch(setPage(1));
    dispatch(setLoading(false));
  }

  const handleSortByAge = () => {
    dispatch(setPage(1));
    dispatch(setSort(sortByAge));
  };

  const handleSortByScore = () => {
    dispatch(setPage(1));
    dispatch(setSort(sortByScore));
  };

  const handleLoadTable = async () => {
    dispatch(setPage(1));
    dispatch(setSort(resetSort));
  }

  const handleDownloadCsv = async () => {
    const csvData = await HttpHelperService.downloadCsv();
    const url = `data:text/csv;charset=utf-8,${csvData}`;
    window.open(url, '_blank');
  }

  const fetchCities = async (countryId: number) => {
    dispatch(setLoading(true));
    const data = await HttpHelperService.getCities(countryId);
    dispatch(setCities(data.data))
    dispatch(setLoading(false));
  }

  function getBackgroundColor(scoreValue: number) {
    const hue = Math.round((scoreValue / 100) * 120);
    const hue2 = (hue + 60) % 360;

    return `linear-gradient(to right, hsl(${hue}, 100%, 50%), hsl(${hue2}, 100%, 50%))`;
  }

  return (
    <div className="table-container">
      <div>
        <h2>Table</h2>
      </div>
      <div className="table-wrapper">
        <table id="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Competition</th>
              <th>Score</th>
              <th>Country</th>
              <th>City</th>
              <th>Gender</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((user, index) => (
              <tr
                key={index}
                style={{ background: getBackgroundColor(user.scoreValue ?? 1) }}
                className={`${highlightedRow ?? ''}`}
              >
                <td style={{ borderBottomLeftRadius: index === tableData.length - 1 ? "15px" : "0" }}>
                  {user.firstName}
                </td>
                <td>{user.lastName}</td>
                <td>{user.age}</td>
                <td>{user.competitionId ?? ''}</td>
                <td>{user.scoreValue ?? ''}</td>
                <td>{user.countryName}</td>
                <td>{user.cityName}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>
                  <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEdit(user)} style={{ cursor: "pointer" }} />
                </td>
                <td style={{ borderBottomRightRadius: index === tableData.length - 1 ? "15px" : "0" }}>
                  <FontAwesomeIcon icon={faTimes} onClick={() => handleDelete(user.id ?? 0)} style={{ cursor: "pointer" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <PaginationComponent />
      </div>
      <div className="btn-container">
        <button className="table-button" onClick={handleLoadTable}> Load Table </button>
        <button className="table-button" onClick={handleSortByAge}> Sort by Age </button>
        <button className="table-button" onClick={handleSortByScore}> Sort by Score </button>
        <button className="table-button" onClick={handleClearTable}> Clear Table </button>
        <button className="table-button" onClick={handleDownloadCsv}> Download Csv </button>
      </div>
    </div>
  );
};

export default TableComponent;