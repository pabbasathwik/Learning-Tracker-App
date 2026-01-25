import { reactive } from "vue";

export function useValidation() {
  const errors = reactive({});

  function clearErrors() {
    Object.keys(errors).forEach(k => (errors[k] = ""));
  }

  function isRequired(value, field) {
    if (!value && value !== 0) {
      errors[field] = `${field} is required`;
      return false;
    }
    return true;
  }

  function minLength(value, len, field) {
    if (!value || value.length < len) {
      errors[field] = `${field} must be at least ${len} characters`;
      return false;
    }
    return true;
  }

  function minChars(value, len, field) {
    return minLength(value, len, field);
  }

  function minValue(value, min, field) {
    if (Number(value) < min) {
      errors[field] = `${field} must be at least ${min}`;
      return false;
    }
    return true;
  }

  function isEmail(value, field) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      errors[field] = "Invalid email format";
      return false;
    }
    return true;
  }

  return {
    errors,
    clearErrors,
    isRequired,
    minLength,
    minChars,
    minValue,
    isEmail
  };
}
