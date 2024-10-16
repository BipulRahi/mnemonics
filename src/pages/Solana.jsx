import React, { useEffect, useState } from "react";
import Car from "../components/com/Car";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58"
import { Keypair } from "@solana/web3.js";
import { ArrowBigDown } from "lucide-react";

const Solana = () => {
  const [m, setm] = useState(() => {
    // Retrieve cards from local storage
    const savedCards = localStorage.getItem("cards");
    return savedCards ? JSON.parse(savedCards) : [];
  });
  const [showArrow, setShowArrow] = useState(false);

  const [load, setload] = useState(false);
  const [me, setme] = useState("");
  const [i, seti] = useState(0);

  const mint = async () => {
    setload(true);
    let mneo;
    if (me === "") {
      mneo = generateMnemonic();
    } else {
      mneo = me;
    }
    const seed = await mnemonicToSeed(mneo);

    const path =`m/44'/501'/${i}'/0'`;

    const derivativepath = derivePath(path, (await seed).toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivativepath).secretKey;

    const keypair = Keypair.fromSecretKey(secret);
    // console.log(keypair.secretKey.toString());
    setm((prevItems) => {
      if (!Array.isArray(prevItems)) {
        return [
          {
            id: i,
            pub: keypair.publicKey.toBase58(),
            sec: bs58.encode(secret),
          },
        ]; // Ensure prevItems is an array
      }
      return [
        ...prevItems,
        {
          id: i,
          pub: keypair.publicKey.toBase58(),
          sec: bs58.encode(secret),
        },
      ];
    });
    
    // console.log(bs58.encode(privateKey));
    setShowArrow(true)
    setTimeout(() => {
      setShowArrow(false);
    }, 5000);

    seti(i + 1);
    // console.log(m);
    setload(false);
  };
  const deleteItem = (id) => {
    setm((prevItems) => prevItems.filter((item) => item.id !== id));
  };


  
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };


  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(m));
  }, [m]);

  const reset=()=>{
    localStorage.clear();
    setm([]);
    seti(0);
  }

  return (
    <div className="w-full">
       {
        
        m.length > 1 && showArrow && (
          <div className=" w-full" >
                      <ArrowBigDown onClick={scrollToBottom} className=' bounce ease-linear fixed bottom-10 right-[4rem] transform -translate-x-1/2 text-2xl transition-opacity duration-800   '/>

            </div>
        )
      }
    <div className="w-full flex flex-col justify-center items-center">
      <div className="md:text-9xl text-3xl font-bold md:mb-2 mb-4  font">
        SOLANA
        <br />
      </div>
      <div className=" relative flex gap-3 justify-center items-center md:flex-row flex-col flex-wrap mt-[2%]  w-full    space-x-2">
        <Input
          type="email"
          placeholder="Mnemonics"
          onChange={(e) => setme(e.target.value)}
        />
      <div className="flex md:flex-row flex-col gap-3 flex-wrap">
        <Button size="icon" type="submit" onClick={mint}>
          {load ? "Loading" : "Mint it"}
        </Button>
        {
          m.length > 0 && 
        <Button variant='destructive'onClick={reset}> Reset </Button>
        }
      </div>
      
      </div>
      <div>


      </div>
      <div
        className={`mt-20  w-full pt-6 p-5 flex gap-14 items-center   justify-center  flex-wrap  `}
      >
        {m.map((d) => (
          <Car key={d.id} data={d} onDelete={deleteItem} />
        ))}
      </div>
    </div>
  </div>
);
};

export default Solana;
