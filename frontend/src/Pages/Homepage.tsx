import Skelly from '../Components/Homepage/Skelly';
import ProductsList from '../Components/Homepage/ProductsList';
import { Product } from '../Configs/Types/Product';
import Pagination from './Pagination';
import DeliveryBanner from '../Components/Homepage/DeliveryBanner';
import FillerProducts from '../Components/Homepage/FillerProducts';
import Maqrquee from '../Components/Homepage/Maqrquee';
import ProductsMenu from '../Components/Homepage/Menus/ProductMenu';
import ProductCarousel from '../Components/Homepage/ProductCarousel';
import SubscribeBar from '../Components/Homepage/SubscribeBar';
import { useMediaQuery } from '@mui/material';
import { useAppSelector } from '../Configs/Redux/store';
import { useEffect, useRef, useState } from 'react';

export default function Homepage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, status } = useAppSelector(state=>state.catalog);
  const isBigScreen = useMediaQuery('(min-width: 1023px)');
  const productsContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if(productsContainerRef.current){
      productsContainerRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };

  useEffect(()=>{
    scrollToTop();
  },[currentPage])

  return (
    <div className="mx-5">
     <ProductCarousel />
      <FillerProducts />
      <SubscribeBar />
      <Maqrquee />
      <DeliveryBanner />
      <div className="grid grid-cols-9 gap-4">
        {/*left side grid container(large screens) 30% of screen*/}
        <div
          ref={productsContainerRef} 
          className={`${isBigScreen ? '' : 'hidden'} col-span-2`}
          >
        <ProductsMenu/>
          {isBigScreen && (
            <img
              src="/filler.png"
              alt="filler"
              className="w-full object-contain mt-2 translate-x-[-4px]"
            />
          )} 
        </div>
        {/*Right side grid container for products(large screens), 70% of screen*/}
        <div
          className={`grid lg:col-span-7 col-span-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2`}
        >
        {products && products.map((product: Product) => (
                status === "loading" 
                ?
                <Skelly key={product.name+product.id}/>
                : 
                <ProductsList key={product.id} product={product} />
                ))} 
          </div> 
        </div>
        <div className="mt-8 w-full flex justify-end items-end mr-3">
      <Pagination setCurrentPage={setCurrentPage}/> 
        </div>
      </div>
  );
} 
