import PropTypes from "prop-types";
import { useContext } from "react";
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
  const { currentPage: current_Page, totalPages: total_Pages } = appState;
  // const current_Page = simpleContext.appState.currentPage;
  // const total_Pages = simpleContext.appState.totalPages;
  const renderPaginationLinks = () => {
    let pages = [];
    const additionalPages = current_Page === 9 ? 4 : 0;
    const totalDisplayedPages = Math.min(9 + additionalPages, total_Pages);

    for (let i = 1; i <= totalDisplayedPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === current_Page}
            href="#"
            onClick={() => onPageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };
  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              isActive
              href="#"
              onClick={() => onPageChange(current_Page - 1)}
              disabled={current_Page === 1}
            />
          </PaginationItem>
          {renderPaginationLinks()}
          {current_Page < total_Pages - 4 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  isActive={current_Page === total_Pages}
                  href="#"
                  onClick={() => onPageChange(total_Pages)}
                >
                  {total_Pages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationNext
              isActive
              href="#"
              onClick={() => onPageChange(current_Page + 1)}
              disabled={current_Page === total_Pages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
Paging.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Paging;
