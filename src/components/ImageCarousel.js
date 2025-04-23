import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import img1 from "../../images/crousel.jpg"; 
import img2 from "../../images/img2.jpg";
import img3 from "../../images/img3.jpg"; 
import img4 from "../../images/img4.webp";
import img5 from "../../images/img5.avif";
import TopRatedFilter from "./TopRatedFilter";

const images = [img1, img2, img3, img4 , img5];

export default function ImageCarousel({ listOfRestaurants, setFilteredResturant }) {
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  return (
    <div className="flex flex-col  md:flex-row w-full mt-20 mb-12  items-center justify-center gap-6 px-4">
      {/* Carousel (left) */}
      <div
        className="overflow-hidden w-full md:w-1/2 max-w-3xl rounded-xl shadow-lg"
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((src, index) => (
            <div
              className="min-w-full flex justify-center items-center"
              key={index}
            >
              <img
                src={src}
                alt={`Slide ${index}`}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text Content (right) */}
      <div className="w-full md:w-1/2 text-center md:text-left">
  <h2 className="text-3xl font-extrabold text-[#ff5722] mb-4">
    Where <span className="text-yellow-500">Taste</span> Meets <span className="text-red-500">Passion</span> 🍽️
  </h2>

  <p className="text-gray-200 text-lg mb-8">
    At <span className="text-orange-500 font-bold">SansChef</span>, we celebrate 
    <span className="text-pink-600 font-medium"> flavors that spark joy</span>. 
    From <span className="text-red-500 font-semibold">fiery street bites</span> to 
    <span className="text-green-600 font-semibold"> soulful meals</span>, we bring you only the <span className="text-blue-600 font-bold">best</span>.
  </p>

  <p className="text-gray-300 font-semibold text-lg mb-3">
    Not sure where to start? 
    <span className="text-purple-600 font-semibold">  Discover what foodies are loving the most!</span> 💬
  </p>

  <div className="text-lg font-semibold text-green-700 mb-4 animate-bounce">
    👇 Tap below to explore our <span className="underline text-blue-700">Top Rated Restaurants</span>
  </div>

  <TopRatedFilter 
    listOfRestaurants={listOfRestaurants}
    setFilteredRestaurants={setFilteredResturant}
  />
</div>

    </div>
  );
}
