import { useState } from "react";

const useForm = (initialState) => {
  const [formValue, setFormValue] = useState(initialState);

  const handleFormValue = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const reset = (newState = initialState) => {
    setFormValue(newState);
  };

  return [formValue, handleFormValue, reset];
};

export default useForm;
