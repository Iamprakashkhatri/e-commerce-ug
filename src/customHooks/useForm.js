import { useEffect, useState } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
      setIsSubmitting(false);
    }
  }, [errors, callback]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors(validate(values));
    console.log('email duplicate error', values);
    setIsSubmitting(true);
  };

  return {
    handleChange,
    values,
    setValues,
    handleSubmit,
    errors,
    setErrors,
  };
};

export default useForm;
