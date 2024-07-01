import "../styles/TableComponent.css";
import PaginationComponent from "./PaginationComponent";
import HttpHelperService from "../HttpHelperService";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FormData } from "./FormComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setFormData } from "../store/states/formSlice";
import { useNavigate } from "react-router-dom";
import { FormPage } from "../constants/RouteConstants";
import { setPage } from "../store/states/pageSlice";
import { setSort } from "../store/states/sortSlice";
import { resetSort, sortByAge, sortByScore } from "../constants/SortingConstants";

const TableComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const tableData = useSelector((state: RootState) => state.table.tableData);
  const highlightedRow = useSelector((state: RootState) => state.table.highlightedRow);

  const handleClearTable = async () => {
    await HttpHelperService.delete();
  };

  const handleDelete = async (id: string) => {
    await HttpHelperService.deleteById(id);
    dispatch(setPage(1));
  };

  const handleEdit = (formData: FormData) => {
    navigate(FormPage);
    dispatch(setFormData(formData));
    dispatch(setPage(1));
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

  function getBackgroundColor(score: string) {
    const hue = Math.round((parseInt(score) / 100) * 120);
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
              <th>Score</th>
              <th>Country</th>
              <th>City</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr
                key={item.id}
                style={{ background: getBackgroundColor(item.score) }}
                className={`${highlightedRow == parseInt(item.id) ? 'table-row-highlight' : ''}`}
              >
                <td style={{ borderBottomLeftRadius: index === tableData.length - 1 ? "15px" : "0" }}>
                  {item.firstName}
                </td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>{item.score}</td>
                <td>{item.country}</td>
                <td>{item.city}</td>
                <td>{item.gender}</td>
                <td>
                  <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEdit(item)} style={{ cursor: "pointer" }} />
                </td>
                <td style={{ borderBottomRightRadius: index === tableData.length - 1 ? "15px" : "0" }}>
                  <FontAwesomeIcon icon={faTimes} onClick={() => handleDelete(item.id)} style={{ cursor: "pointer" }} />
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
      </div>
    </div>
  );
};

export default TableComponent;