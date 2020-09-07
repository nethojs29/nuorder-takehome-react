import React, { useState } from 'react';

export const usePagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const changePage = (page) => {
        setCurrentPage(page);
    }

    return [currentPage, totalPages, setTotalPages , changePage];
}