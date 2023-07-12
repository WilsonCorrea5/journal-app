import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { value, name } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onInputClean = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};
    for (const formfield of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formfield];
      formCheckedValues[`${formfield}Valid`] = fn(formState[formfield])
        ? null
        : errorMessage;
    }
    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onInputClean,

    ...formValidation,
    isFormValid,
  };
};
