const minValue = min => value => value && value < min ? `Must be greater than ${ min }` : undefined,
maxValue = max => value => value && value > max ? `Must be smaller than ${ max }` : undefined,
minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined,
maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined,
email = email => value =>
  email && value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined,
alphaNumeric = alphaNumeric => value =>
  alphaNumeric && value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined,
phoneNumber = phoneNumber => value =>
  phoneNumber && value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined,
required = required => value => required && !value ? 'Required' : undefined,
passwordConfirm = name => (value, allValues) =>
  name && value && value !== allValues[name]
    ? 'Passwords must match'
    : undefined;


export default {
  minValue,
  maxValue,
  minLength,
  maxLength,
  email,
  alphaNumeric,
  phoneNumber,
  required,
  passwordConfirm
};
