import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import "./Car.css";
import pop from "./pop.mp3";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";

function Car({ data, onDelete }) {
  const [cho, setCho] = useState("Public");
  const [amount,setamount]=useState(null)
  const [keyValue, setKeyValue] = useState(data.pub);
  const [isDeleted, setIsDeleted] = useState(false);
  const [show, setshow] = useState("text");
  const navigate=useLocation().pathname
  const [loading,ssetloading]=useState(false)

  // console.log(import.meta.env.VITE_SOL)
  // return
  const checkBalance = async () => {
    let response;
    ssetloading(true);
    try {
      if (navigate === '/solana') {
        // Solana Balance Request
        response = await axios.post(`${import.meta.env.VITE_SOL}`, {
          jsonrpc: "2.0",
          id: 1,
          method: "getBalance",
          params: [data.pub],
        });
        // console.log(result)/
        const result = response.data.result.value/1e9;
        setamount(result);
        ssetloading(false);
      }
       else{
        response = await axios.post(`${EthApi}`, {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBalance",
          params: [data.pub, "latest"],
        });
        
        const result = parseInt(response.data.result,16)/1e18;
        
        setamount(result); 
      }
      // Now turn on balance modal
    
    } catch (error) {
      ssetloading(false)
      console.error("Error fetching balance:", error);
      toast({
        title: "Couldn't check your balance!",
        description: error,
      })
    
    }
  };





  const handleCopy = () => {
    navigator.clipboard
      .writeText(keyValue)
      .then(() => {
        toast({
          title: "Copied To  Clipboard 🪙",
          description: `press ctrl+v to Paste the ${cho} key`,
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleChange = (value) => {
    setCho(value);
    setshow(value === "Public" ? "text" : "password");
    setKeyValue(value === "Public" ? data.pub : data.sec);
  };

  const handleDelete = () => {
    setIsDeleted(true);

    const audio = new Audio(pop); // Adjust path to your sound file

    audio.play();
    setTimeout(() => {
      onDelete(data.id);
    }, 200);
  };

  useEffect(() => {
    console.log(`Selected key type: ${cho}`);
  }, [cho]);

  return (
    <Card
    className={`md:w-[60%] w-full shadow-xl ${isDeleted ? "fade-out" : ""}`}
    >
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between w-full">
     
            Account {data.id + 1}
            {loading ?  <Loader/> :
        <div>{amount==null ? "" : amount} {navigate =="/solana" ? "SOL" : "ETH"}</div>
            }
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="w-full">
          <div className="grid w-full items-center gap-4">
            <div className="flex  flex-col  space-y-1.5">
              <Label htmlFor="keyValue" >Key Value</Label>
              <Input type={show}
               id="keyValue"
                value={keyValue} 
                className="md:w-full "
                />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="choose">Key Type</Label>
              <Select onValueChange={handleChange} defaultValue={cho}>
                <SelectTrigger id="choose">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Public">Public Key</SelectItem>
                  <SelectItem value="Private">Private Key</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex md:flex-row flex-col gap-3 items-center justify-between">
        {/* <Button variant="destructive" onClick={handleDelete}>Delete</Button> */}

        <AlertDialog>
          <AlertDialogTrigger className="bg-destructive flex p-2 rounded-md text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure to Delete it ?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our here.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <div className="flex  md:flex-row flex-col  gap-3">

        <Button onClick={handleCopy}>Copy clipboard</Button>
       {(navigate !=="/Eth"  )&&<Button  onClick={checkBalance}>Check Balance</Button>}
        </div>
      </CardFooter>
    </Card>
  );
}

export default Car;



//  question bronze stamp popular rhythm retreat fury release have few expire twenty