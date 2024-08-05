import './styles/App.css';
import TableComponent from './components/TableComponent';
import UserRegistrationFormComponent from './components/UserRegistrationFormComponent';
import io from 'socket.io-client';
import HttpHelperService from './HttpHelperService';
import React, { useEffect } from 'react';
import { paginationLimit } from './constants/PaginationConstants';
import { baseUrl } from './constants/HttpConstants';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBarComponent';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from './store/store';
import { setTableData, sethigHlightedRow } from './store/states/TableDataSlice';
import { setTotalPages } from './store/states/PageDataSlice';
import { setSort } from './store/states/SortDataSlice';
import { resetSort } from './constants/SortingConstants';
import { ChartPage, MainPage, RegistrationFormPage, ScoresFormPage } from './constants/RouteConstants';
import ScoresFormComponent from './components/ScoresFormComponent';
import { setLoading } from './store/states/LoadingDataSlice';
import LoaderComponent from './components/LoaderComponent';
import { loaderSelector } from './store/selectors/selectors';
import StatisticsComponent from './components/StatisticsComponent';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.page.value);
  const currentSortBy = useSelector((state: RootState) => state.sort.value);
  const isLoading = useSelector(loaderSelector);

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
    dispatch(setLoading(true));
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
    dispatch(setLoading(false));
  }

  return (
    <div className="main-page">
      {isLoading ? (
        <LoaderComponent />
      ) : (
        <>
          <Navbar />
          <div className="child">
            <Routes>
              <Route path={RegistrationFormPage} element={<UserRegistrationFormComponent />} />
              <Route path={ScoresFormPage} element={<ScoresFormComponent />} />
              <Route path={MainPage} element={<TableComponent />} />
              <Route path={ChartPage} element={<StatisticsComponent />} />
            </Routes>
          </div>
        </>
      )}
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