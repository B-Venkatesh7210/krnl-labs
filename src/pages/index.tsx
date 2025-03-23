import { useEffect, useState } from "react";
import axios from "axios";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();
  const { data: hash, sendTransaction } = useSendTransaction();
  const [counter, setCounter] = useState(0);

  const fetchCounter = async () => {
    const response = await axios.get("/api/counter");
    setCounter(response.data.counter);
  };

  const increaseCounter = async () => {
    await axios.get("/api/increase");
    fetchCounter();
  };

  async function executeKrnl() {
    const krnlPayload = await provider.executeKernels(
      entryId,
      accessToken,
      kernelRequestData,
      functionParams
    );
    return krnlPayload;
  }

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
    try {
      const krnlPayload = await executeKrnl();
      if (krnlPayload) {
        console.log(krnlPayload);
        const tx = await callContractProtectedFunction(krnlPayload);
        console.log("Transaction Hash is:", tx);
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Sending transaction");
    sendTransaction({
      to: "0x97A907011c57AD4880aeE2245705234328330c6c",
      value: parseEther("0.0001"),
    });
  };

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
            You can only send transaction if counter is greater than 5.
          </span>
          <button
            onClick={sendTxn}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            Send 0.0001 ETH
          </button>
        </div>
      )}

      {hash && <div>Transaction Hash: {hash}</div>}
    </div>
  );
}
