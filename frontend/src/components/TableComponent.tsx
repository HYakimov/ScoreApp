import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FormData } from "../App";
import "../styles/TableComponent.css";
import PaginationComponent from "./PaginationComponent";
import HttpHelperService from "../HttpHelperService";

interface TableProps {
  loadTable: () => void;
  onEdit: (item: FormData) => void;
  tableData: FormData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: string) => void;
  highlightedRow: number;
}

const TableComponent: React.FC<TableProps> = ({ loadTable, onEdit, tableData, currentPage, totalPages, onPageChange, onSortChange, highlightedRow }) => {

  const clearTable = async () => {
    await HttpHelperService.delete();
  };

  const handleDelete = async (id: string) => {
    await HttpHelperService.deleteById(id);
    onPageChange(1);
  };

  const handleSortByAge = () => {
    onSortChange(`age`);
    onPageChange(1);
  };

  const handleSortByScore = () => {
    onSortChange(`score`);
    onPageChange(1);
  };

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
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr
                key={item.id}
                // style={{ background: getBackgroundColor(item.score) }}
                className={`${highlightedRow == parseInt(item.id) ? 'table-row-highlight' : ''}`}
              >
                <td style={{ borderBottomLeftRadius: index === tableData.length - 1 ? "15px" : "0" }}>
                  {item.firstName}
                </td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>{item.score}</td>
                <td>
                  <FontAwesomeIcon icon={faPencilAlt} onClick={() => onEdit(item)} style={{ cursor: "pointer" }} />
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
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <div className="btn-container">
        <button className="table-button" onClick={loadTable}> Load Table </button>
        <button className="table-button" onClick={handleSortByAge}> Sort by Age </button>
        <button className="table-button" onClick={handleSortByScore}> Sort by Score </button>
        <button className="table-button" onClick={clearTable}> Clear Table </button>
      </div>
    </div>
  );
};

export default TableComponent;