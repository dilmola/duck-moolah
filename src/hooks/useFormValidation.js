import { useState } from "react";

// Custom hook to manage form state and validation
const useFormValidation = (initialValues) => {
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name of the bill is required";
    }
    if (!values.billType) {
      errors.billType = "Type of bill is required";
    }
    if (!values.dueDate) {
      errors.dueDate = "Due date is required";
    }
    if (!values.amount) {
      errors.amount = "Bill amount is required";
    } else if (isNaN(values.amount)) {
      errors.amount = "Bill amount must be a number";
    }
    return errors;
  };
  // State to store form values
  const [values, setValues] = useState(initialValues);

  // State to store form validation errors
  const [errors, setErrors] = useState({});

  // Handler for input change events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handler for date change events
  const handleDateChange = (date) => {
    setValues((prevValues) => ({
      ...prevValues,
      dueDate: date,
    }));
  };

  // Handler for changing bill type
  const handleBillTypeChange = (type) => {
    setValues((prevValues) => ({
      ...prevValues,
      billType: type,
    }));
  };

  // Handler for form submission
  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      callback();
    }
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  return {
    values,
    errors,
    handleChange,
    handleDateChange,
    handleBillTypeChange,
    handleSubmit,
    resetValues,
  };
};

export default useFormValidation;
