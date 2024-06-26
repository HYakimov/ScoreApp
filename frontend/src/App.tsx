import React, { useEffect, useState } from 'react';
import { paginationLimit } from './constants/PaginationConstants';
import { baseUrl } from './constants/HttpConstants';
import FormComponent from './components/FormComponent';
import TableComponent from './components/TableComponent';
import HttpService from './HttpService';
import io from 'socket.io-client';
import './styles/App.css';

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

  const handleEditForm = (formData: FormData) => {
    setEditFormData(formData);
  };

  useEffect(() => {
    const socket = io(baseUrl);
    const handleUpdate = () => {
      fetchData();
    };
    socket.on('update', handleUpdate);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchData(currentPage, currentSortBy);
  }, [currentPage, currentSortBy]);

  const fetchData = async (page: number = 1, sortBy: string = "") => {
    let url = `/data?page=${page}&limit=${paginationLimit}`;
    if (sortBy === '') {
      setCurrentSortBy(sortBy);
    } else if (currentSortBy) {
      url += `&sortBy=${currentSortBy}`;
    }
    try {
      const data = await HttpService.get(url);
      setTableData(data.data);
      setTotalPages(Math.ceil(data.totalCount / paginationLimit));
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
        />
      </div>
    </div>
  );
};

export default App;