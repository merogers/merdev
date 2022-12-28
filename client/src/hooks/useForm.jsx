import { toast } from 'react-toastify';

const useForm = (setState) => {
  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  // Check state for type ie. NULL
  const validateField = ({ field, value, error, message }) => {
    if (field === value) {
      toast.error(message);
      setState((prev) => ({
        ...prev,
        [error]: true,
      }));
      return false;
    }
    return true;
  };

  // Check for empty field
  const validateEmptyField = ({ field, error, message }) => {
    if (field.length === 0) {
      toast.error(message);
      setState((prev) => ({
        ...prev,
        [error]: true,
      }));
      return false;
    }
    return true;
  };

  // Check field has minimum length of characters
  const validateMinLengthField = ({ field, minLength, error, message }) => {
    if (field.length < minLength) {
      toast.error(message);
      setState((prev) => ({
        ...prev,
        [error]: true,
      }));
      return false;
    }
    return true;
  };

  // Check field has minimum length of characters
  const validateEmailField = ({ field, error, message }) => {
    if (field.length === 0 || !field.includes('@')) {
      toast.error(message);
      setState((prev) => ({
        ...prev,
        [error]: true,
      }));
      return false;
    }
    return true;
  };

  // Check passwords match
  const validatePasswordsMatch = ({
    password,
    confirmPassword,
    error,
    message,
  }) => {
    if (password !== confirmPassword || confirmPassword.length === 0) {
      toast.error(message);
      setState((prev) => ({
        ...prev,
        [error]: true,
      }));
      return false;
    }
    return true;
  };

  return {
    handleChange,
    handleFileChange,
    validateField,
    validateEmptyField,
    validateMinLengthField,
    validateEmailField,
    validatePasswordsMatch,
  };
};

export default useForm;
