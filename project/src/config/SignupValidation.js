import * as Yub from "yup";

export const SignupValidation = Yub.object({
  email: Yub.string()
    .email("Please enter valid email")
    .required("Please enter email"),
  // cpassword: Yub.string().min(5).required("Please enter password")
});
