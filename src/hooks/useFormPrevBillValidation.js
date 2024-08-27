import { useState } from "react";

const useFormPrevBillValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name of the bill is required";
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setValues((prevValues) => ({
      ...prevValues,
      dueDate: date,
    }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    console.log("handleSubmit function triggered");

    const validationErrors = validate(values);
    console.log("Validation Errors:", validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("No validation errors, calling callback function");
      callback();
    }
  };

  const resetFormValues = () => {
    setValues(initialValues);
  };

  return {
    previousBillFormValues: values,
    previousBillFormErrors: errors,
    handlePreviousBillInputChange: handleInputChange,
    handlePreviousBillDateChange: handleDateChange,
    handlePreviousBillSubmit: handleSubmit,
    resetPreviousBillFormValues: resetFormValues,
    setPreviousBillFormValues: setValues,
  };
};

export default useFormPrevBillValidation;
