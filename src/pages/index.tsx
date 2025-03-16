import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [counter, setCounter] = useState(0);

  // Fetch counter value
  const fetchCounter = async () => {
    const response = await axios.get("http://localhost:5000/counter");
    setCounter(response.data.counter);
  };

  // Increase counter
  const increaseCounter = async () => {
    await axios.post("http://localhost:5000/increase");
    fetchCounter();
  };

  useEffect(() => {
    fetchCounter();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        KRNL Counter dApp
      </h1>
      <h2 className="text-2xl text-gray-700 mb-4">Counter: {counter}</h2>
      <button
        onClick={increaseCounter}
        className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer"
      >
        Increase Counter
      </button>
    </div>
  );
}
