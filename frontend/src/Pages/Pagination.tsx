import { useProducts } from "../Utils/useProducts";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Dispatch, SetStateAction } from "react";

const Pagination= ({setCurrentPage}:{setCurrentPage: Dispatch<SetStateAction<number>>}) => {
  const {handlePageChange, itemsPerPage, currentPage, totalCount, filteredTotalCount} = useProducts()
  const isFilterApplied = filteredTotalCount !== totalCount;
  const totalPages = Math.ceil((isFilterApplied ? filteredTotalCount : totalCount) / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
      setCurrentPage(currentPage-1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
      setCurrentPage(currentPage+1)
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center">
      <button
        className={`${currentPage === 1 ? "text-gray-300 cursor-default hover:opacity-100":"text-black"} hover:opacity-80 py-2`}
        onClick={handlePreviousPage}
      >
        <ArrowBackIosIcon sx={{fontSize:"15px"}}/>
      </button>
      {pageNumbers?.map((page) => (
        <span
          key={page}
          className={`${
            page === currentPage
              ? "bg-gray-200"
              : "hover:opacity-80 cursor-pointer"
          } text-gray-800 font-normal h-[35px] w-[35px] rounded-full items-center flex justify-center mx-[0.1rem]`}
          onClick={() =>{ 
            handlePageChange(page)
            setCurrentPage(page);
          }}
        >
          {page}
        </span>
      ))}
      <button
        className={`${currentPage === totalPages ? "text-gray-300 cursor-default hover:opacity-100":"text-black"} hover:opacity-80 py-2`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <ArrowForwardIosIcon sx={{fontSize:"15px"}}/>
      </button>
    </div>
  );
};

export default Pagination;
