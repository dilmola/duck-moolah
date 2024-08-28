import { useState } from "react";

const useFormNewBillValidation = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

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

  const handleBillTypeChange = (type) => {
    setValues((prevValues) => ({
      ...prevValues,
      billType: type,
    }));
  };

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

  const resetFormValues = () => {
    setValues(initialValues);
  };

  return {
    newBillFormValues: values,
    newBillFormErrors: errors,
    handleNewBillInputChange: handleInputChange,
    handleNewBillDateChange: handleDateChange,
    handleNewBillTypeChange: handleBillTypeChange,
    handleNewBillSubmit: handleSubmit,
    resetNewBillFormValues: resetFormValues,
    setNewBillFormValues: setValues,
  };
};

export default useFormNewBillValidation;
