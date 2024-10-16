import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const Choice = ({setsol}) => {
    const navigate=useNavigate()
  return (
    <div>
      <h1 className="text-6xl font-medium">select the token</h1>
      <div className="mt-[10%]    gap-2 flex  flex-row items-center justify-center">
        <Button size="icon" className="text-xl " onClick={() => {setsol(1);navigate("/solana")}}>
          Solana
        </Button>
        <Button size="icon" className="text-xl" onClick={() =>{setsol(1);navigate("/Eth")}}>
          Ether
        </Button>
      </div>
    </div>
  );
};

export default Choice;
