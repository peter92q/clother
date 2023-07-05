import { useState,useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../Configs/Redux/store';
import { fetchProducts } from '../../../Configs/Redux/catalogueSlice';
import Order from './OrderByMenu';
import FilterByBrand from './FilterByBrand';
import FilterByType from './FilterByType';
import Search from './Search';
import { setSortingParams } from '../../../Configs/Redux/sortParamsSlice';

export default function ProductsMenu() {
  const {products} =useAppSelector(state=>state.catalog);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>('');
 
  const fetchUpdatedProducts = () => {
    const brands = selectedBrands.join(",");
    const types = selectedTypes.join(",");
    const orderBy = selectedOrder;
    dispatch(setSortingParams({ brands, types, orderBy, searchTerm }));
    dispatch(fetchProducts({ skip: 0, take: 8, orderBy, brands, types, searchTerm }));
  }; 

  useEffect(() => {
    if (selectedBrands?.length || selectedTypes?.length || selectedOrder?.length || searchTerm?.length) {
      fetchUpdatedProducts();
    }
    else if(products?.length<8 && selectedBrands?.length===0 && selectedTypes?.length===0 && selectedOrder?.length===0 && searchTerm?.length===0){
      dispatch(setSortingParams({}));
      dispatch(fetchProducts({}))
    }
  }, [selectedBrands, selectedTypes, selectedOrder, searchTerm]);
 
  return (
    <>
        <Search
          setSearchTerm={setSearchTerm}
        />
        <div className="shadow-md rounded-md border-[0.05rem] border-gray-400/40">
        {/*submenu1*/}
        <Order
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        />

        {/*submenu2*/}
        <FilterByBrand
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
        />

       {/*submenu3*/}
       <FilterByType
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
       />
      </div>
    </>
  );
}
