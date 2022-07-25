import * as yup from 'yup';

const SignUp = yup.object({
    email: yup.string().email("Invalid Email").required("Inform your email"),
    password: yup.string().min(6, "Password must be at least 6 digits").required("Enter the password"),
    password_confirm: yup.string().oneOf([yup.ref('password'), null], 'Confirmation password does not match')
});
  
const login = yup.object({
    email: yup.string().email("Invalid Email").required("Inform your email"),
    password: yup.string().min(6, "Password must be at least 6 digits").required("Enter the password"),
});

const listAthentication = {
    login,
    SignUp,
}

export default listAthentication;
