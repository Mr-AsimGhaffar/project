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

const Paging = ({ onPageChange, sort }) => {
  const simpleContext = useContext(appContext);
  const { appState } = simpleContext;
  const { currentPage, totalPages } = appState;
  const [showGoToFirst, setShowGoToFirst] = useState(false);
  const [pages, setPages] = useState(undefined);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    setShowGoToFirst(currentPage > 5);
  }, [currentPage, totalPages]);

  useEffect(() => {
    renderPaginationLinks();
  }, [sort, currentPage, totalPages, isSmallScreen]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderPaginationLinks = () => {
    let startPage, endPage;
    const additionalPages = currentPage === 9 ? 4 : 0;
    if (isSmallScreen) {
      // On small screens, start pagination after the 2nd page
      startPage = Math.max(1, currentPage - 1);
      endPage = Math.min(startPage + 1 + additionalPages, totalPages);
    } else {
      // On larger screens, standard pagination logic
      startPage = Math.max(1, currentPage - 4);
      endPage = Math.min(startPage + 7 + additionalPages, totalPages);
    }
    let pages = [];

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
    <div>
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => onPageChange(Number(currentPage) - 1)}
                className="dark:bg-black"
              />
            </PaginationItem>
          )}
          {showGoToFirst && (
            <div className="flex items-center">
              <div>
                <PaginationItem>
                  <button
                    onClick={goToFirstPage}
                    className="p-2 hover:bg-gray-100 rounded active"
                    disabled={currentPage === 1}
                  >
                    1
                  </button>
                </PaginationItem>
              </div>
              <div>
                <PaginationEllipsis />
              </div>
            </div>
          )}
          {pages}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => onPageChange(Number(currentPage) + 1)}
                className="dark:bg-black"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
Paging.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired,
  totalCount: PropTypes.number,
};

export default Paging;
