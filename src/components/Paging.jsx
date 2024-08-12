import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { appContext } from "@/contexts/Context";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

const Paging = ({ onPageChange }) => {
  const simpleContext = useContext(appContext);
  const { appState } = simpleContext;
  const { currentPage, totalPages } = appState;
  const [showGoToFirst, setShowGoToFirst] = useState(false);
  const [pages, setPages] = useState(undefined);

  useEffect(() => {
    setShowGoToFirst(currentPage > 5);
  }, [currentPage, totalPages]);

  useEffect(() => {
    renderPaginationLinks();
  }, [currentPage, totalPages]);

  const renderPaginationLinks = () => {
    let pages = [];
    const additionalPages = currentPage === 9 ? 4 : 0;
    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(startPage + 7 + additionalPages, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === currentPage}
            href="#"
            onClick={() => onPageChange(i)}
            className={
              i == currentPage ? "active-link bg-gray-800 text-white" : ""
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            href="#"
            onClick={() => onPageChange(totalPages)}
            className={
              currentPage === totalPages
                ? "active-link bg-gray-800 text-white"
                : ""
            }
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    setPages(pages);
  };
  const goToFirstPage = () => {
    onPageChange(1);
  };
  return (
    <div className="flex justify-center mt-4">
      <Pagination className="flex flex-row items-center space-x-1 text-sm">
        <PaginationContent className="flex flex-col sm:flex-row items-center space-x-1">
          <PaginationItem>
            <PaginationPrevious
              isActive
              href="#"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded"
            />
          </PaginationItem>
          {showGoToFirst && (
            <div className="flex items-center">
              <div>
                <PaginationItem>
                  <button
                    onClick={goToFirstPage}
                    className="p-1 sm:p-2 hover:bg-gray-100 rounded"
                    disabled={currentPage === 1}
                  >
                    1
                  </button>
                </PaginationItem>
              </div>
              <div>
                <PaginationEllipsis className="hidden sm:block" />
              </div>
            </div>
          )}
          {pages}
          <PaginationItem>
            <PaginationNext
              isActive
              href="#"
              onClick={() => onPageChange(Number(currentPage) + 1)}
              disabled={currentPage === totalPages}
              className="p-1 sm:p-2 hover:bg-gray-100 rounded"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
Paging.propTypes = {
  onPageChange: PropTypes.func.isRequired,
};

export default Paging;
