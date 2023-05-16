import { getter } from '@progress/kendo-react-common';
const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const phoneRegex = new RegExp(/^[0-9 ()+-]+$/);
const ccardRegex = new RegExp(/^[0-9-]+$/);
const cvcRegex = new RegExp(/^[0-9]+$/);
export const terms = value => value ? "" : "It's required to agree with Terms and Conditions.";
export const email = value => !value ? "Email field is required." : emailRegex.test(value) ? "" : "Invalid Email";
export const name = value => !value ? "Full Name is required" : value.length < 7 ? "Full Name should be at least 7 characters long." : "";
export const userName = value => !value ? "User Name is required" : value.length < 5 ? "User name should be at least 5 characters long." : "";
export const number = value => !value ? "Phone number is required." : phoneRegex.test(value) ? "" : "Not a valid phone number.";
export const quesnumber = value => !value ? "Entered value must be in the specified range of 0 and 10000000" : ccardRegex.test(value) ? "" : "Not a valid  number.";
export const card = value => !value ? "Credit card number is required. " : ccardRegex.test(value) ? "" : "Not a valid credit card number format.";
export const cvc = value => !value ? "CVC code is required," : cvcRegex.test(value) || value.length !== 3 ? "" : "Not a valid CVC code format.";
export const guests = value => !value ? "Number of guests is required" : value < 5 ? "" : "Maximum 5 guests";
export const nights = value => value ? "" : "Number of Nights is required.";
export const arrivalDate = value => value ? "" : "Arrival Date is required.";
export const color = value => value ? "" : "Color is required.";
export const required = value => value ? "" : "Required";
export const oneRequired = value => value ? "" : "Please select at least one program";
export const password = value => value && value.length > 8 ? '' : 'Password must be at least 8 symbols.';
export const address = value => value ? "" : "Address is required.";
export const req = value =>   value && value.length != 0 ? "" : "Required";
export const abb = value =>  value && value.length > 1000 ? "Entered value must be in the specified range of 0 and 10000000" : "";
const userNameGetter = getter('username');
const emailGetter = getter('email');
export const formValidator = values => {
  const userName = userNameGetter(values);
  const emailValue = emailGetter(values);

  if (userName && emailValue && emailRegex.test(emailValue)) {
    return {};
  }

  return {
    VALIDATION_SUMMARY: 'Please fill in the following fields.',
    ['username']: !userName ? 'User Name is required.' : '',
    ['email']: emailValue && emailRegex.test(emailValue) ? '' : 'Email is required and should be in a valid format.'
  };
};