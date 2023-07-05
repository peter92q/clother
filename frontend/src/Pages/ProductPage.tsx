import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addBasketItemAsync } from '../Configs/Redux/basketSlice';
import { useAppSelector, useAppDispatch } from '../Configs/Redux/store';
import { button } from '../Utils/Button';
import LoadingComponent from '../Components/LoadingComponent';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import { Product } from '../Configs/Types/Product';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { basket } = useAppSelector((state) => state.basket);
  const [product, setProduct] = useState<Product | null>()
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [addQuantity, setAddQuantity] = useState(1);
  const [outline, setOutline] = useState(0);
  const [activePic, setActivePic] = useState('');
  const [selectedSize, setSelectedSize] = useState<string>();
  const item = basket?.items.find((i) => i.productId === product?.id);
 
  useEffect(() => {
    if (item) setAddQuantity(item.quantity);
  }, [item]); 
 
  const handleImageChange = (newImage: string, num: number) => {
    setActivePic(newImage);
    setOutline(num);
  };

  function handleInputChange(e: any) {
    if (e.target.value >= 0) setAddQuantity(parseInt(e.target.value));
  }

  function handleSizeChange(input: string) {
    setSelectedSize(input);
  }

 async function handleUpdateCart() {
    setLoading(true);
    await dispatch(
      addBasketItemAsync({
        productId: product?.id!,
        quantity: addQuantity,
        size: selectedSize!,
      })
    ).then(() => setAddQuantity(1))
     .finally(()=> setLoading(false));
  }

  useEffect(()=>{
    async function getProduct(){
      const response = await axios.get(`/products/${id}`)
      setProduct(response.data)
    }
    getProduct();
  },[])

  if (!product) return <LoadingComponent message="Loading product" />;

  return (
    <div className="md:h-[93vh] h-full px-5 mt-10">
      <div className="flex md:flex-row flex-col gap-3 justify-evenly">
        <div className="flex flex-col relative">
          <img
            src={activePic ? activePic : product.mainpic}
            alt="Big"
            className="lg:w-[450px] lg:h-[550px] pointer-events-none rounded-sm bg-black p-[0.01rem] shadow-md"
          />
          <div className="flex flex-col gap-2 absolute">
            {product?.pictures.map((pic, index) => (
              <img
                src={pic.url}
                key={pic.id}
                alt="dadaya"
                onMouseEnter={() => handleImageChange(pic.url, pic.id)}
                className={`w-[10%] h-[10%] cursor-pointer ml-[1px] mt-[1px] ${
                  outline === index || outline === pic.id
                    ? 'border-[1px] border-black'
                    : ''
                }`}
              />
            ))}
          </div>
        </div>
        <div className="md:w-[45vw] lg:w-[40vw] xl:w-[30vw] text-gray-900 flex flex-col items-center 
        justify-center text-center sm:items-start sm:justify-start sm:text-start">
          <p className="text-[30px]">{product.name}</p>
          <div className="border-b-[1px] border-gray-500/40 w-[30vw] my-2" />
          <h2>{product.description}</h2>
          <div className="border-b-[1px] border-gray-500/40 w-[30vw] my-2" />
          <h2>Brand: {product.brand}</h2>
          <div className="border-b-[1px] border-gray-500/40 w-[30vw] my-2" />
          <h2>Available sizes:</h2>
          <div className="flex flex-row gap-2">
            {product.sizes && product.sizes.map((size) => (
              <h5
                className={`hover:opacity-60 hover:cursor-pointer 
                  px-[3px] py-[1px] border-[1px] ${
                    selectedSize === size.name
                      ? 'border-[#5293f7] text-[#5293f7]'
                      : 'border-black'
                  } `}
                onClick={() => handleSizeChange(size.name)}
                key={size.id}
              >
                {size.name}
              </h5>
            ))}
          </div>
          <div className="border-b-[1px] border-gray-500/40 w-[30vw] mt-2" />
          <input
            placeholder="select quantity(required)"
            className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            onChange={handleInputChange}
            value={addQuantity}
          />
          <button
            onClick={handleUpdateCart}
            className={`${button} w-full`}
            disabled={!selectedSize || addQuantity === 0}
          >
            {loading ? <BeatLoader color="#fff" className='pt-1'/> : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
