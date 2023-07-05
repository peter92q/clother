import { IconButton, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBasketItemAsync } from "../../Configs/Redux/basketSlice";
import { useAppSelector, useAppDispatch } from "../../Configs/Redux/store";
import { Product } from "../../Configs/Types/Product";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { button, outlinedButton } from "../../Utils/Button";

type Props = {
  product: Product;
}

const ProductsList = ({product}: Props) => { 
  const {status} = useAppSelector(state=>state.basket);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleSizeChange(input: string){
    setSelectedSize(input)
  }

  function handleClick (){
     navigate(`/productDetails/${product.id}`) 
   }

  return (
      <div key={product.id} className='rounded-sm shadow-md xl:h-[370px] flex 
      flex-col items-bottom justify-end relative overflow-hidden parent border-[0.01rem] border-gray-400/40
      pb-1'>
      <img src={product.mainpic} 
        alt='logo' 
        className="h-[100%] w-[100%] object-cover pointer-events-none"/>
       <div className="absolute element bg-white w-[100%] p-1">
        <div className="flex flex-row justify-between px-1 gap-1">
          <div className="flex flex-col">
           <p className="text-lg text-black">{product.name}</p>
           <p className="text-sm text-gray-700 translate-y-[-5px]">{product.brand}</p>
           </div>
           <p className="text-md text-black">{product.price}$</p>
        </div>
           <div className="flex flex-col justify-between h-[12vh] items-baseline px-1 py-1 mb-2">     
              <div className="flex flex-row justify-between w-full">
              <div className="flex flex-col">
               <p className="text-sm text-black mb-[1px] ml-[1px]"> Available sizes:</p>
                <div className="flex flex-row gap-2 text-sm">
                  {product.sizes && product.sizes.map((size)=>
                  <h5 className={`hover:opacity-60 hover:cursor-pointer 
                    px-[3px] py-[1px] border-[1px] ${selectedSize === size.name 
                      ? 'border-blue-400 text-blue-400':'border-black text-black'}`} 
                    onClick={()=>handleSizeChange(size.name)} key={size.id}
                    >
                    {size.name}
                  </h5>)} 
                </div> 
              </div>
              <IconButton><FavoriteBorderIcon className="mt-1 mr-[-7px]"/></IconButton> 
              </div>
            <div className="flex flex-row gap-1 mt-[5px] items-center justify-between w-full"> 
              <button 
                disabled={!selectedSize} 
                onClick={()=>dispatch(addBasketItemAsync({productId: product.id, 
                              quantity: 1, size: selectedSize}))}          
                className={button} 
                  > 
                  {
                  selectedSize 
                  ? status.includes('pending') 
                  ? (<div className="flex flex-row items-center justify-start">
                    <CircularProgress sx={{padding: '10px'}} color="inherit"/> 
                    <p className="text-[15px]">Adding</p>  
                    </div> )
                    :'Buy' :
                  'Select Size'
                  }  
                </button>
              <button
                onClick={handleClick} 
                className={outlinedButton}
                >
                  View
                </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProductsList;