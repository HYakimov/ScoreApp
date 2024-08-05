import "../styles/ChartTableComponent.css";
import React from "react";
import { TableStatisticComponentProps } from "../types/TableStatisticComponentProps";

const ChartTableComponent: React.FC<TableStatisticComponentProps> = ({ data }) => {

    return (
        <div className="table-container">
            <div>
                <h2>Table</h2>
            </div>
            <div className="table-wrapper">
                <table id="table">
                    <thead>
                        <tr>
                            <th>Competition</th>
                            <th>User</th>
                            <th>Score</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((d, index) => (
                            <tr key={index}>
                                <td style={{ borderBottomLeftRadius: index === data.length - 1 ? "15px" : "0" }}>
                                    {d.competitionName}
                                </td>
                                <td>{d.fullName}</td>
                                <td>{d.maxScore}</td>
                                <td>{d.age}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChartTableComponent;