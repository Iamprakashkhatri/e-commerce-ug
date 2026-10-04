export default function validateSignUp(values) {
  let errors = {};

  if (!values.first_name) {
    errors.first_name = "Please enter Firstname";
  } else if (/^[a-zA-Z]+ [a-zA-Z]+$/.test(values.first_name)) {
    errors.first_name = "Invalid firstname";
  }
  if (!values.last_name) {
    errors.last_name = "Please enter Lastname";
  } else if (/^[a-zA-Z]+ [a-zA-Z]+$/.test(values.last_name)) {
    errors.last_name = "Invalid lastname";
  }
  if (!values.email) {
    errors.email = "Please enter Email";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.phone_no) {
    errors.phone_no = "Please enter phone number";
  }
  if (!(values.confirm_password === values.password)) {
    errors.password = "Password must be the same";
  }
  if (!values.password) {
    errors.password = "Please enter Password";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be more than 6 characters";
  }
  return errors;
}
