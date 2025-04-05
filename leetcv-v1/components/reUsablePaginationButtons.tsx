import React from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

type ReUsablePaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const ReUsablePaginationButtons = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: ReUsablePaginationButtonsProps) => {
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    localStorage.setItem("currentPage", newPage.toString());
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-10" data-testid="pagination">
      <div className="sm:hidden overflow-x-scroll">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={(page) => handlePageChange(page)}
          maxWidth={350}
        />
      </div>
      <div className="hidden sm:block">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={(page) => handlePageChange(page)}
          maxWidth={450}
        />
      </div>
    </div>
  );
};

export default ReUsablePaginationButtons;
