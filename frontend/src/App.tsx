import React, { useEffect, useState } from 'react';
import { paginationLimit } from './constants/PaginationConstants';
import { baseUrl } from './constants/HttpConstants';
import FormComponent from './components/FormComponent';
import TableComponent from './components/TableComponent';
import io from 'socket.io-client';
import './styles/App.css';
import HttpHelperService from './HttpHelperService';

export interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  score: string;
  id: string;
}

const App: React.FC = () => {
  const [tableData, setTableData] = useState<FormData[]>([]);
  const [editFormData, setEditFormData] = useState<FormData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentSortBy, setCurrentSortBy] = useState('');
  const [highlightedRow, setHighlightedRow] = useState(-1);
  let idOfHighlightedRow: number;

  const handleEditForm = (formData: FormData) => {
    setEditFormData(formData);
  };

  useEffect(() => {
    const socket = io(baseUrl);
    const handleUpdate = () => {
      fetchData();
    };
    const handleNewAndEdit = (data: { id: number }) => {
      idOfHighlightedRow = data.id;
      fetchData();
    };

    socket.on('update', handleUpdate);
    socket.on('newOrEdit', handleNewAndEdit);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchData(currentPage, currentSortBy);
  }, [currentPage, currentSortBy]);

  const fetchData = async (page: number = 1, sortBy: string = '') => {
    if (sortBy === '') {
      setCurrentSortBy(sortBy);
    }
    try {
      const data = await HttpHelperService.get(page, currentSortBy);
      setTableData(data.data);
      setTotalPages(Math.ceil(data.totalCount / paginationLimit));
      setHighlightedRow(idOfHighlightedRow);
      setTimeout(() => setHighlightedRow(-1), 1000);
      setTimeout(() => idOfHighlightedRow = -1, 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleLoadTable = async () => {
    setCurrentPage(1);
    setCurrentSortBy('');
  }

  return (
    <div className="main-page">
      <div className="child">
        <FormComponent
          editFormData={editFormData}
        />
      </div>
      <div className="child">
        <TableComponent
          loadTable={handleLoadTable}
          onEdit={handleEditForm}
          tableData={tableData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onSortChange={setCurrentSortBy}
          highlightedRow={highlightedRow}
        />
      </div>
    </div>
  );
};

export default App;