import { useEffect, useState } from "react";

function Test() {
  const [childVisibile, setVisible] = useState(true);

  return (
    <div className="h-screen border-red-600 flex flex-col">
      <div className="" onClick={() => setVisible(!childVisibile)}>
        Click Me!
      </div>
      <div className="grow-1 border border-5 border-pink-700">Container</div>
    </div>
  );
}

export default Test;
