const Grocery = () => {
    const handleClick = () => {
      const message = document.getElementById("grocery-message");
      const button = document.getElementById("notify-button");
  
      message.innerHTML = "Great news! Grocery features are coming soon! 🚀";
      button.innerHTML = "Notified!";
      button.disabled = true;
      button.classList.add("bg-gray-400", "cursor-not-allowed");
    };
  
    return (
      <div className="flex flex-col items-center mt-40 text-[24px]">
        <p
          id="grocery-message"
          className="text-center font-serif font-semibold text-lime-600  px-6"
        >
          Our platform still does not have the <i className="italic text-red-400">Grocery features.</i>
        </p>
  
        <button
          id="notify-button"
          onClick={handleClick}
          className="mt-4 px-6 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-yellow-500 transition-all"
        >
          Notify Me
        </button>
      </div>
    );
  };
  
  export default Grocery;
  