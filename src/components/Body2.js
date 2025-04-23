import { useUser} from "@clerk/clerk-react"; // Clerk Auth


const Body1 = () => {
    const { user } = useUser();

    return (
<div>
<h1 className="font-semibold font-serif text-lg flex mx-20 pt-12 mb-6">
  Welcome, <p class="text-blue-400 mx-2">{user?.fullName || "Guest"}  🙏</p>
</h1>

<p className="mx-20 font-semibold font-serif text-red-500 text-[32px]">
  What's on your mind today? 👻
</p>

<p className="font-semibold font-serif justify-end text-lg flex mx-20 py-2 mb-4 text-green-600 transition-all duration-500 ease-in-out hover:scale-105 hover:translate-x-2 animate-bounce">
  Just one click away 🤭!!
</p>


<div className="flex ml-20 mr-20 mb-10  justify-between">
  <div>
    
      <img className="rounded-3xl shadow-lg border-2 cursor-pointer"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2025/3/1/27af148a-4db6-4070-94c1-eb5c0299b978_PCTIleRamadansSpecial.png" alt="hello"></img>
  </div>
  <div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Pizzas.png" alt="hello"></img>
</div>
<div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_chole bhature.png" alt="hello"></img>
</div>
<div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png" alt="hello"></img>
</div>
<div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_burger.png" alt="hello"></img>
</div>
<div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/7b7d0577-54a4-4d59-8f62-9db0a568831e_northindian1.png" alt="hello"></img>
</div>
<div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/17/4ec9d604-32db-4820-a21d-4dde0ced8ecc_Rolls1.png" alt="hello"></img>
</div>
<div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_Salad-1.png" alt="hello"></img>
</div>
</div>
<div className="flex ml-20 mr-20 mb-10  justify-between">
  <div>
    
      <img  className="rounded-3xl shadow-lg border-2 cursor-pointer"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_chole bhature.png" alt="hello"></img>
  </div>
  <div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/f1263395-5d4a-4775-95dc-80ab6f3bbd89_samosa.png" alt="hello"></img>
</div>
<div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/f1263395-5d4a-4775-95dc-80ab6f3bbd89_pasta.png" alt="hello"></img>
</div>
<div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Dosa.png" alt="hello"></img>
</div>
<div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/e7e36151-9e90-40eb-b6bb-bb7d946ac219_Chinese2.png" alt="hello"></img>
</div>
<div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_Pure Veg.png" alt="hello"></img>
</div>
<div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_coffee.png" alt="hello"></img>
</div>
<div>
    
    <img className="rounded-3xl shadow-lg border-2 cursor-pointer"  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_160,h_192/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/8f508de7-e0ac-4ba8-b54d-def9db98959e_Shake.png" alt="hello"></img>
</div>
</div>

</div>   

    );
};
export default Body1;