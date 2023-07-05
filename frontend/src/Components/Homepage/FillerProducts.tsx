const images = [
  {
    url: 'https://img.modivo.cloud/marketing_homepage_640w_360h(homepage/640x360_mobile_men103.jpg,webp)/marketing-homepage.webp',
  },
  {
    url: 'https://cdn.shopify.com/s/files/1/0752/6435/products/0E4A5082.jpg?v=1663857189',
  },
  {
    url: 'https://cdn.shopify.com/s/files/1/0420/7073/7058/collections/2.jpg?v=1680513003',
  },
  {
    url: 'https://rukminim1.flixcart.com/image/612/612/ksuowi80/shirt/w/p/o/xxl-frml-st2-vebnor-original-imag6bkegkwmqv75.jpeg?q=70',
  },
];

export default function FillerProducts() {
  return (
    <div className="bg-pattern flex flex-row items-center overflow-x-auto w-full mb-2 rounded-tr-3xl">
      <h1 className="text-[30px] font-light text-gray-600 z-[10] mx-3">
        Newest additions
      </h1>
      {images && images.map((image, index) => (
        <img
          src={image.url}
          key={index}
          alt="clothing_brand"
          className="h-[300px] w-[250px] shadow-md rounded-tr-[30px] 
          my-1 mr-2 animate-fade-in pointer-events-none z-[10] object-cover"
          style={{
            opacity: 0,
            animation: 'fade-in 0.5s ease-in-out forwards',
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
