import { useState } from 'react';

export const useInputValidation = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (validator) {
      const validation = validator(newValue);
      setError(validation.isValid ? "" : validation.errorMessage);
    }
  };

  return {
    value,
    onChange,
    error,
  };
};

export const usernameValidator = (username) => {
  if (username.length < 6) {
    return { isValid: false, errorMessage: "Username must be at least 6 characters long" };
  }
  if (username.length > 16) {
    return { isValid: false, errorMessage: "Username must be no more than 16 characters long" };
  }
  if (username.includes('-')) {
    return { isValid: false, errorMessage: "Username cannot contain the '-' character" };
  }
  return { isValid: true, errorMessage: "" };
};

export const passwordValidator = (password) => {
  if (password.length < 6) {
    return { isValid: false, errorMessage: "Password must include at least one Special Character, Number." };
  }
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const numberRegex = /[0-9]/;  
  
  if (!specialCharacterRegex.test(password)) {
    return { isValid: false, errorMessage: "Password must include at least one Special Character, Number." };
  }
  
  if (!numberRegex.test(password)) {
    return { isValid: false, errorMessage: "Password must include at least one Special Character, Number." };
  }
  
  return { isValid: true, errorMessage: "" };
};

