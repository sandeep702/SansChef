import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import mcdonalds from "../../images/mcdonalds.png";
import subway from "../../images/subway.png";
import kfc from "../../images/kfc.png";
import dominos from "../../images/dominos.png";
import burger from "../../images/burger.jpeg";
import Footer from "./Footer";

import { testimonials } from "../utils/testimonial";
import TestimonialCard from "../components/TestimonialCard";

const About = () => {
  const restaurants = ["KFC", "McDonald's", "Subway", "Pizza Hut", "Domino’s"];
  const [activeRestaurant, setActiveRestaurant] = useState(restaurants[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRestaurant(
        (prev) => restaurants[(restaurants.indexOf(prev) + 1) % restaurants.length]
      );
    }, 1800); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row px-8 py-16">
        {/* Left - Image */}
        <div className="md:w-1/2 flex mt-20 justify-center">
  <img
    src={burger}
    alt="Delicious Meal"
    className="w-[600px] h-[500px] rounded-lg shadow-lg transition-transform duration-500 ease-in-out hover:scale-105 hover:brightness-125"
  />
</div>



        {/* Right - Content */}
        <div className="md:w-1/2 text-center md:text-left pt-28 mt-2 md:mt-0">
          <span className="text-sm uppercase font-semibold bg-red-100 text-red-600 px-4 py-1 rounded-full">
            Taste The Best
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-4">
            Home of <span className="text-yellow-500">{activeRestaurant}</span> & More!
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            We bring together your favorite restaurants under one roof—from crispy delights at {" "}
            <span className="text-yellow-600 font-semibold">{activeRestaurant}</span> {" "}
            to gourmet meals that satisfy every craving.
          </p>

          {/* Buttons */}
          <div className="flex gap-6 mt-6">
            <button className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition">
              <Link to="/"> Explore Restaurants</Link>
            </button>
            <button className="bg-white text-red-600 border border-red-500 px-6 py-3 rounded-full shadow-lg hover:bg-red-100 transition">
              <Link to="sggk">View Our Menu</Link>
            </button>
          </div>

          {/* Restaurant Logos Section */}
          <p className="text-xl font-bold text-gray-900 mt-8">Our Collaborative Restaurants:</p>
          <p className="text-lg text-gray-700">
            Enjoy a variety of flavors from{" "}
            <span className="text-red-600 font-semibold">KFC</span>,{" "}
            <span className="text-yellow-500 font-semibold">McDonald's</span>,{" "}
            <span className="text-green-600 font-semibold">Subway</span>, and{" "}
            <span className="text-blue-600 font-semibold">Domino's</span>!  and{" "}
            <span className="text-lime-600 font-semibold">King-Burger</span>!
          </p>

          <div className="flex gap-4 mt-8">
            {[mcdonalds, subway, kfc, dominos, kfc].map((img, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-lg shadow-md hover:scale-110 transition-transform duration-300 ease-in-out hover:-translate-y-2"
              >
                <img src={img} alt="Restaurant Logo" className="w-16 h-16" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="min-h-screen bg-gray-100 pt-4">
        <h2 className="text-4xl pt-4 font-extrabold text-center mb-6 text-gray-900 hover:text-red-500 transition duration-300">
          Hear What Our Customers Say 👻🤷‍♀️
        </h2>
        {/* Subtitle */}
        <p className="text-center text-gray-700 text-lg mt-4 mb-14">
          Hear directly from our happy customers and their delightful experiences!
        </p>
        <div className="flex flex-wrap justify-start gap-10 px-10 ml-20">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="w-full sm:w-[48%] lg:w-[30%] flex justify-center lg:justify-start"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

      </div>
      <Footer />
      <p className="font-mono text-lime-600  italic justify-center flex  font-semibold ">Designed by Sandeep kmbz</p>
    </div>
  );
};

export default About;
