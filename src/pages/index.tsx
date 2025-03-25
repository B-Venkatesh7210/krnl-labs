import { useEffect, useState } from "react";
import axios from "axios";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ethers as krnlEthers } from "krnl-sdk";
import { ethers } from "ethers";
import { contractABI } from "../utils/contractABI";

export default function Home() {
  const { address } = useAccount();
  const [counter, setCounter] = useState(0);
  const provider = new krnlEthers.JsonRpcProvider(
    "https://v0-0-3-rpc.node.lat"
  );
  const provider2 = new ethers.JsonRpcProvider(
    "https://ethereum-sepolia-rpc.publicnode.com"
  );
  const abiCoder = new ethers.AbiCoder();
  const textInput = "Message Changed";
  const contractAddress = "0xa13978eC1c11400145fd42C88f6Fb1aC6b6Aff35";
  const contract = new ethers.Contract(contractAddress, contractABI, provider2);

  const fetchCounter = async () => {
    const response = await axios.get("/api/counter");
    setCounter(response.data.counter);
  };

  const increaseCounter = async () => {
    await axios.get("/api/increase");
    fetchCounter();
  };

  const entryId = process.env.NEXT_PUBLIC_ENTRY_ID;
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  const kernelRequestData = {
    senderAddress: address as string,
    kernelPayload: {
      "1269": {
        // off-chain with openapi schema GET method
        parameters: {
          header: {},
          body: {},
          query: {},
          path: {},
        },
      },
    },
  };

  const functionParams = abiCoder.encode(["string"], [textInput]);

  console.log("Function Params", functionParams);

  async function executeKrnl() {
    const krnlPayload = await provider.executeKernels(
      entryId as string,
      accessToken as string,
      kernelRequestData,
      functionParams
    );
    return krnlPayload;
  }

  //@ts-expect-error it can be wrong
  async function callContractProtectedFunction(executeResult) {
    const krnlPayload = {
      auth: executeResult.auth,
      kernelResponses: executeResult.kernel_responses,
      kernelParams: executeResult.kernel_params,
    };
    const tx = await contract.protectedFunction(krnlPayload, textInput);
    return tx.hash;
  }

  const sendTxn = async () => {
    console.log("Sending Transaction");
    try {
      const krnlPayload = await executeKrnl();
      if (krnlPayload) {
        console.log("Got the Kernel Payload", krnlPayload);
        const tx = await callContractProtectedFunction(krnlPayload);
        console.log("Transaction Hash is:", tx);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const readMessage = async () => {
  //   const message = await contract.readMessage();
  //   console.log("Message is:", message);
  // };

  useEffect(() => {
    fetchCounter();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-3xl font-bold text-black">KRNL Counter dApp</div>
      <div className="mt-4 top-0 right-0 absolute mr-4">
        <ConnectButton />
      </div>

      <div className="text-2xl mt-4 text-black">Counter: {counter}</div>
      <button
        onClick={increaseCounter}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Increase Counter
      </button>
      {address && (
        <div className="flex flex-col items-center mt-4">
          <span className="text-lg text-gray-500 mt-2">
            When you click on send transaction, it will send 0.000{counter} ETH
          </span>
          <button
            onClick={sendTxn}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Send ETH
          </button>
        </div>
      )}
    </div>
  );
}
