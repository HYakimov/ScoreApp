import './styles/App.css';
import FormComponent from './components/FormComponent';
import TableComponent from './components/TableComponent';
import io from 'socket.io-client';
import HttpHelperService from './HttpHelperService';
import React, { useEffect } from 'react';
import { paginationLimit } from './constants/PaginationConstants';
import { baseUrl } from './constants/HttpConstants';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBarComponent';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from './store/store';
import { setTableData, sethigHlightedRow } from './store/states/tableSlice';
import { setTotalPages } from './store/states/pageSlice';
import { setSort } from './store/states/sortSlice';
import { resetSort } from './constants/SortingConstants';
import { FormPage, MainPage } from './constants/RouteConstants';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.page.value);
  const currentSortBy = useSelector((state: RootState) => state.sort.value);

  useEffect(() => {
    const socket = io(baseUrl);

    const handleUpdate = () => {
      fetchData();
    };

    const handleNewAndEdit = (data: { id: number }) => {
      dispatch(sethigHlightedRow(data.id));
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
      dispatch(setSort(resetSort));
    }
    try {
      const data = await HttpHelperService.get(page, currentSortBy);
      dispatch(setTableData(data.data));
      dispatch(setTotalPages(Math.ceil(data.totalCount / paginationLimit)))
      setTimeout(() => dispatch(sethigHlightedRow(-1)), 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="main-page">
      <Navbar />
      <div className="child">
        <Routes>
          <Route path={FormPage} element={<FormComponent />} />
          <Route path={MainPage} element={<TableComponent />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </Router>
  );
}

export default App;