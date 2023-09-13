// useInput.js
import { useState, useEffect } from "react";

function useInput(initialValue, validator) {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validator ? validator(value) : true);
  }, [value, validator]);

  return {
    value,
    isValid,
    onChange: (e) => setValue(e.target.value),
  };
}

export default useInput;
