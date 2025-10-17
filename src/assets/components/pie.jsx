import { useState } from "react";

export function PieChart() {
 cont[ count, setCount ] = useState(0);

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
    <h1>{count}</h1>
    <button onClick={()=>setCount(count + 1)}>+</button>
    <button onClick={()=>setCount(count - 1)}>-</button>
    </div>
    </>
   
  )
}; export default PieChart;