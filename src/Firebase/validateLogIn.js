export default function validateLogin(values) {
  let errors = {};

  if (!values.email) {
    errors.email = "Please enter Email";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Please enter Password";
  }
  return errors;
}
