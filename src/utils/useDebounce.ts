import { useState } from "react";

export const useDebounce = () => {
  const [loading, setIsLoading] = useState(false);

  const handleSuccess = (callback: () => void) => {
    callback();
  };

  return {
    Hello: "World",
    handleSuccess,
    // object: opbject,
    // data,
    // isLoadin,
  };
};
