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
      <div className="w-full md:w-1/2  text-center md:text-left [&_span]:transition-all [&_span]:duration-200">
  {/* Animated Heading with Gradient Underline */}
  <h2 className="text-3xl font-extrabold text-[#ff5722] mt-2 mb-2 group inline-block">
    Where <span className="text-yellow-500 hover:text-yellow-300">Taste</span> Meets <span className="text-red-500 hover:text-red-300">Passion</span> 🍽️
    <span className="block h-0.5 bg-gradient-to-r from-yellow-500 to-red-500 w-0 group-hover:w-full transition-all duration-300 mt-1"></span>
  </h2>

  {/* Interactive Paragraph with Micro-Interactions */}
  <p className=" font-semibold text-2xl mb-2 ">
    At <span className="text-orange-500 font-bold hover:underline cursor-help" title="SansChef - Your culinary guide">SansChef</span>, we celebrate 
    <span className="text-pink-800 font-semibold hover:bg-pink-800 px-1 rounded"> flavors that spark joy</span>. 
    From <span className="text-red-800 text-[1.4rem] font-semibold hover:animate-pulse">fiery street bites<span className="inline-block hover:scale-110">🌶️</span></span> to 
    <span className="text-green-600 font-semibold hover:underline"> soulful meals<span className="inline-block hover:rotate-12">🍲</span></span>, we bring you only the <span className="text-blue-600 font-bold relative">
      best
      <span className="absolute -inset-1 rounded-full bg-blue-600/10 hover:animate-ping opacity-0 hover:opacity-100"></span>
    </span>.
  </p>

  {/* Discover Section with Subtle Hover */}
  <p className=" w-80 font-semibold text-xl mb-3 hover:bg-gray-200/30 p-2 rounded-lg cursor-pointer">
    Not sure where to start? {" "}
    <span className="text-purple-600 font-semibold hover:text-purple-400">
      Discover what foodies are loving!
    </span> <span className="inline-block hover:rotate-12">💬</span>
  </p>

  {/* Animated CTA Button */}
  <div className="text-lg font-semibold text-green-700 mb-4 group cursor-pointer hover:bg-green-100/20 p-2 rounded-lg">
    <span className="inline-block group-hover:translate-y-1">👇</span> Tap below to explore our 
    <span className="underline text-blue-700 hover:text-blue-500 ml-1">
      Top Rated Restaurants
    </span>
  </div>


  <TopRatedFilter 
    listOfRestaurants={listOfRestaurants}
    setFilteredRestaurants={setFilteredResturant}
  />
</div>

    </div>
  );
}
