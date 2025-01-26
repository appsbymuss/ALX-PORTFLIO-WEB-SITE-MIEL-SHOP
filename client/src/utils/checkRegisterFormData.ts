import toast from "react-hot-toast";

export const checkRegisterFormData = (data: { firstName: string; lastName: string; gender: string; numberPhone: string; email: string; password: string }): boolean => {
  if (!data.firstName || !data.lastName || !data.gender || !data.numberPhone || !data.email || !data.password) {
    toast.error("All fields are required");
    return false;
  }


  // Add any additional validation logic here
  return true;
};
