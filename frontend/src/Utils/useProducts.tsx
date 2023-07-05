import {useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../Configs/Redux/store';
import { fetchProducts, setCurrentPage } from '../Configs/Redux/catalogueSlice';

export function useProducts() {
  const dispatch = useAppDispatch();
  const { currentPage, totalCount, filteredTotalCount } = useAppSelector(state => state.catalog);
  const { sortingParams } = useAppSelector(state=>state.params)
  const itemsPerPage = 8;
  
  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage)); 
    dispatch(
      fetchProducts({ 
        skip: (newPage - 1) * itemsPerPage,
        take: itemsPerPage,
        brands: sortingParams.brands,
        types: sortingParams.types,
        orderBy: sortingParams.orderBy,
        searchTerm: sortingParams.searchTerm,
      })
    );
  }; 
 
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [sortingParams, dispatch]);

  return { handlePageChange, currentPage, totalCount, filteredTotalCount, itemsPerPage };
}
