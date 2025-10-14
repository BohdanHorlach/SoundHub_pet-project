import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Input, Typography } from "@material-tailwind/react";


const SingleLineInput = forwardRef(({ label, value: initialValue = "", rules = {}, onChange }, ref) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");


  const validate = (text = value) => {
    const trimmed = text.trim();

    if (rules.required && !trimmed && trimmed === "") {
      setError("Field cannot be empty");
      return false;
    }

    if (rules.forbidden && rules.forbidden.test(trimmed)) {
      setError("Contains forbidden characters");
      return false;
    }

    if (rules.maxLength && trimmed.length > rules.maxLength) {
      setError(`Too long (max ${rules.maxLength})`);
      return false;
    }

    setError("");
    return true;
  };


  useImperativeHandle(ref, () => ({
    getData: () => {
      const isValid = validate();
      if (!isValid)
        return null;

      return value.trim().replace(/[<>]/g, "");
    },
    clear: () => {
      setValue("");
      setError("");
    },
    validate,
  }));


  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    validate(newValue);
    onChange(newValue);
  };


  return (
    <div>
      {label && (
        <Typography variant="h5" className="font-medium mb-2">
          {label}
        </Typography>
      )}
      <Input
        label={label}
        value={value}
        onChange={handleChange}
        error={!!error}
        color={error ? "red" : "blue"}
      />
      {error && (
        <Typography color="red" variant="small" className="mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
});

export default SingleLineInput;
