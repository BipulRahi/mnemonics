import { useEffect, useState } from "react";
// import  {encoder} from "bs58"
import "./App.css";


import Navbar from "./pages/Navbar";
import Solana from "./pages/Solana";
import Choice from "./pages/Choice";
import { Route, Routes } from "react-router-dom";
import ETHER from "./pages/ETHER";
import Thh from "./components/com/Thh";
import TTT from "./pages/TTT";
function App() {
  const [n,setn]=useState(true);
  const [sol, setsol] = useState(() => {
    // Retrieve from local storage or default to -1
    const savedSol = localStorage.getItem("selectedToken");
    return savedSol !== null ? JSON.parse(savedSol) : -1;
  });
  setTimeout(() => {
    setn(false)
  }, 4000);


  useEffect(() => {
    // Store selected token in local storage whenever it changes
    localStorage.setItem("selectedToken", JSON.stringify(sol));
  }, [sol]);

 

  return (
    <div className="w-screen   min-h-screen justify-center items-center  flex flex-col font-inter">
   {n &&   <TTT/>}
    <Navbar/>
      <div
        className="relative mx-auto m-6 mt-20   flex flex-col w-11/12 max-w-maxContent items-center 
        justify-center "
      >
      
       
        <Routes>
       
          <Route path="/" index element={<Choice setsol={setsol} />} />
          <Route path="/solana" element={<Solana />} />
          <Route path="/Eth" element={<ETHER/>} />
          <Route path="*" element={<div />} />
        
      </Routes>


       {/* <Solana mint={mint} setme={setme} load={load} m={m} deleteItem={deleteItem} sol={sol}/> */}
      </div>
    </div>
  );
}

export default App;
