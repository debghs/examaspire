import { useState } from "react";

const usePagination = (items: any[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentPageItems = items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) setCurrentPage(page);
  };

  return { currentPageItems, currentPage, totalPages, goToPage };
};

export default usePagination;
