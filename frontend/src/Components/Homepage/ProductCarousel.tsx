import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

interface Product {
    id: number;
    name: string;
    image: string;
  } 
  
  const ProductCarousel = () => {
    const carouselProducts: Product[] = [
      { id: 1, name: "Product 1", image: "/dodo.jpg" },
      { id: 2, name: "Product 2", image: "https://cdn.aboutstatic.com/file/e6ed0dc1aacfa35e2d3c65a1f6ea12c0.jpg?width=2000&height=2000&quality=90&progressive=1" },
      { id: 3, name: "Product 3", image: "https://cdn.aboutstatic.com/file/b267c3e6f9d7e0d0709d31f2c73e0be4.jpg?width=2000&height=2000&quality=90&progressive=1" },
      { id: 3, name: "Product 3", image: "https://cdn.aboutstatic.com/file/9c34dff457e3a5114205a9e9657690d7.jpg?width=2000&height=2000&quality=90&progressive=1" },
    ];

    return (
      <div className='overflow-hidden mb-2'>
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        interval={3000}
        infiniteLoop
        swipeable
        dynamicHeight
        emulateTouch
      >
        {carouselProducts && carouselProducts.map((product) => (
          <div key={product.id}>
            <img 
              src={product.image} 
              alt={product.name} 
              className='w-full object-contain'
              />
          </div>
        ))}
      </Carousel>
      </div>
    );
  };

  export default ProductCarousel;
  