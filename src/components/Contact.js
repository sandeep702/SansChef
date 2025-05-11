import { Link } from "react-router-dom"; 
import { motion } from "framer-motion"; 
import Footer from "./Footer";
import Chatbot from "./Chatbot";

const Contact = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }} 
      className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6 md:p-12"
    >
      {/* Contact Section */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.7, ease: "easeOut" }} 
        className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 p-10 bg-white shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition-all"
      >
        {/* Left Content */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }} 
          className="flex-1 space-y-6"
        >
          {/* Continuous Waving Animation for Heading */}
          <motion.h1 
            animate={{ rotate: [-2, 2, -2] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} 
            className="text-4xl font-extrabold text-gray-900 drop-shadow-lg"
          >
            Contact Us 👻
          </motion.h1>

          <p className="text-gray-700 text-lg leading-relaxed">
            Have questions? We’re happy to assist with reservations, catering, or anything else.
          </p>

          {/* Contact Info Section */}
          <div className="space-y-4">
            {[
              { img: "https://sleeknotecom.wpenginepowered.com/wp-content/uploads/2020/10/Pin-2.svg", text: "Fatehabad, 125051-Haryana" },
              { img: "https://sleeknotecom.wpenginepowered.com/wp-content/uploads/2020/10/Phone-2.svg", text: "+91 8295059****" },
              { img: "https://sleeknotecom.wpenginepowered.com/wp-content/uploads/2020/10/Mail.svg", text: "contact@sanschef.com" },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <img src={item.img} alt="Icon" className="w-8 h-8" />
                <p className="text-gray-800 text-lg">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Pulsing Button */}
          <motion.button 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} 
            className="mt-6 px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all"
          >
            Reserve a Table
          </motion.button>
        </motion.div>

        {/* Floating Image Animation */}
        <motion.div 
          animate={{ y: [-10, 10, -10] }} 
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} 
          className="flex-1 flex justify-center"
        >
          <img
            src="https://sleeknotecom.wpenginepowered.com/wp-content/uploads/2023/11/image-4-2048x2048.png"
            alt="Restaurant Illustration"
            className="w-[80%] max-w-[400px] md:max-w-[450px] rounded-lg shadow-lg"
          />
        </motion.div>
      </motion.div>

      {/* Additional Info Section with Floating Animation */}
      <motion.div 
        animate={{ scale: [1, 1.02, 1] }} 
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} 
        className="max-w-6xl py-16 px-6 bg-white mt-12 rounded-2xl shadow-lg border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: "Make a Reservation", desc: "Book a table for your special occasion or a casual dining experience.", btnText: "Book Now" },
            { title: "Catering Services", desc: "Host an event with our delicious food. Perfect for weddings, parties, and more.", btnText: "Contact Us" },
            { title: "Join Our Team", desc: "We’re hiring! Become a part of our amazing restaurant family.", btnText: "Apply Now" },
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ duration: 0.6, delay: index * 0.2 }} 
              whileHover={{ scale: 1.05 }} 
              className="space-y-4 p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="text-gray-600">{item.desc}</p>
              <motion.button 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} 
                className="bg-red-600 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition-all"
              >
                {item.btnText}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
<Chatbot />
{/* //chatbot component  */}
      <Footer />
    </motion.div>
  );
};

export default Contact;
