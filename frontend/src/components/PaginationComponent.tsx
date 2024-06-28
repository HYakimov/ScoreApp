import "../styles/PaginationComponent.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setPage } from "../store/states/pageSlice";


const PaginationComponent = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.page.value);
    const totalPages = useSelector((state: RootState) => state.page.totalPages);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            dispatch(setPage(page));
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const range = 1;
        const startPage = Math.max(currentPage - range, 1);
        const endPage = Math.min(currentPage + range, totalPages);

        if (currentPage > range + 1) {
            pageNumbers.push(<span key="start-ellipsis">...</span>);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? "active" : ""}
                >
                    {i}
                </button>
            );
        }

        if (currentPage + range < totalPages) {
            pageNumbers.push(<span key="end-ellipsis">...</span>);
        }

        return pageNumbers;
    };

    return (
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
            </button>
            {renderPageNumbers()}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default PaginationComponent;