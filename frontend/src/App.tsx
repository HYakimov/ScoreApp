import React, { useEffect, useState } from 'react';
import FormComponent from './components/FormComponent';
import TableComponent from './components/TableComponent';
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
  const limit: number = 3;

  const handleEditForm = (formData: FormData) => {
    setEditFormData(formData);
  };

  useEffect(() => {
    const socket = io('http://localhost:3000');
    const handleUpdate = (data: any) => {
      fetchData();
    };
    socket.on('update', handleUpdate);
    // Clean up the event listener when the component unmounts or on dependency change
    return () => {
      socket.off('update', handleUpdate);
      socket.disconnect(); // Disconnect the socket when component unmounts, if needed
    };
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    fetchData(currentPage, currentSortBy);
  }, [currentPage, currentSortBy]);

  const fetchData = async (page: number = 1, sortBy: string = "") => {
    let url = `http://localhost:3000/data?page=${page}&limit=${limit}`;
    if (sortBy === '') {
      setCurrentSortBy(sortBy);
    } else if (currentSortBy) {
      url += `&sortBy=${currentSortBy}`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTableData(data.data);
      setTotalPages(Math.ceil(data.totalCount / limit));
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  const handleSubmit = () => {
    fetchData();
  };

  const handleLoadTable = () => {
    fetchData();
  }

  return (
    <div className="main-page">
      <div className="child">
        <FormComponent
          refreshTableOnSubmit={handleSubmit}
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