import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [counter, setCounter] = useState(0);

  const fetchCounter = async () => {
    const response = await axios.get("/api/counter");
    setCounter(response.data.counter);
  };

  const increaseCounter = async () => {
    await axios.post("/api/increase");
    fetchCounter();
  };

  useEffect(() => {
    fetchCounter();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-black">KRNL Counter dApp</h1>
      <h2 className="text-2xl mt-4 text-black">Counter: {counter}</h2>
      <button
        onClick={increaseCounter}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Increase Counter
      </button>
    </div>
  );
}
